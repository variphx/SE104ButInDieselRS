use axum::{
    extract::{Query, State},
    response::IntoResponse,
    Json, Router,
};
use diesel::prelude::*;
use serde::Deserialize;

use crate::{
    context::Context,
    models::{NewSession, Session},
};

pub fn router() -> Router<Context> {
    Router::new()
        .route("/get", axum::routing::get(get))
        .route("/post", axum::routing::post(post))
}

#[derive(Deserialize)]
struct Params {
    id: String,
}

async fn get(
    State(mut context): State<Context>,
    Query(params): Query<Params>,
) -> impl IntoResponse {
    use crate::schema::session::dsl::*;

    let result = session
        .select(Session::as_select())
        .filter(id.eq(params.id))
        .first(&mut context.db())
        .expect("Error loading from session");

    Json(result).into_response()
}

async fn post(
    State(mut context): State<Context>,
    Json(values): Json<Vec<NewSession>>,
) -> impl IntoResponse {
    use crate::schema::session::dsl::*;

    diesel::insert_into(session)
        .values(&values)
        .execute(&mut context.db())
        .expect("Error inserting into session");
}
