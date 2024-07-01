use axum::{
    extract::{Query, State},
    response::IntoResponse,
    Json, Router,
};
use diesel::prelude::*;
use serde::Deserialize;

use crate::{
    context::Context,
    models::{NewUsers, Users},
};

pub fn router() -> Router<Context> {
    Router::new()
        .route("/get", axum::routing::get(get))
        .route("/post", axum::routing::post(post))
}

#[derive(Deserialize)]
struct Params {
    username: String,
}

async fn get(
    State(mut context): State<Context>,
    Query(params): Query<Params>,
) -> impl IntoResponse {
    use crate::schema::users::dsl::*;

    let result = users
        .select(Users::as_select())
        .filter(username.eq(params.username))
        .first(&mut context.db())
        .unwrap();

    Json(result).into_response()
}

async fn post(
    State(mut context): State<Context>,
    Json(value): Json<NewUsers>,
) -> impl IntoResponse {
    use crate::schema::users::dsl::*;

    diesel::insert_into(users)
        .values(&value)
        .execute(&mut context.db())
        .unwrap();
}
