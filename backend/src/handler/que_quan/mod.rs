use axum::{
    extract::{Query, State},
    response::IntoResponse,
    Json, Router,
};
use diesel::prelude::*;
use serde::Deserialize;

use crate::{context::Context, models::QueQuan};

mod all;

pub fn router() -> Router<Context> {
    Router::new()
        .route("/get", axum::routing::get(get))
        .nest("/all", all::router())
}

#[derive(Deserialize)]
struct Params {
    id: i32,
}

async fn get(
    State(mut context): State<Context>,
    Query(params): Query<Params>,
) -> impl IntoResponse {
    use crate::schema::que_quan::dsl::*;

    let result = que_quan
        .select(QueQuan::as_select())
        .filter(id.eq(params.id))
        .first(&mut context.db())
        .expect("Error loading from que_quan");

    Json(result).into_response()
}
