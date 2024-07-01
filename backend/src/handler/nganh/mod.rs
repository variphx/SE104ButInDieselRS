use axum::{
    extract::{Query, State},
    response::IntoResponse,
    Json, Router,
};
use diesel::prelude::*;
use serde::Deserialize;

mod all;

use crate::{context::Context, models::Nganh};

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
    use crate::schema::nganh::dsl::*;

    let result = nganh
        .select(Nganh::as_select())
        .filter(id.eq(params.id))
        .first(&mut context.db())
        .expect("Error loading from nganh");

    Json(result).into_response()
}
