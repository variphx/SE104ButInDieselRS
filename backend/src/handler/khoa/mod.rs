use axum::{
    extract::{Query, State},
    response::IntoResponse,
    Json, Router,
};
use diesel::prelude::*;
use serde::Deserialize;

use crate::{context::Context, models::Khoa};

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
    use crate::schema::khoa::dsl::*;

    let result = khoa
        .filter(id.eq(params.id))
        .select(Khoa::as_select())
        .first(&mut context.db())
        .expect("Error loading from khoa");

    Json(result).into_response()
}
