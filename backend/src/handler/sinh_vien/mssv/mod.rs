use axum::{
    extract::{Query, State},
    response::IntoResponse,
    Json, Router,
};
use diesel::prelude::*;
use serde::Deserialize;

use crate::context::Context;

pub fn router() -> Router<Context> {
    Router::new().route("/get", axum::routing::get(get))
}

#[derive(Deserialize)]
struct Params {
    mssv: String,
}

async fn get(
    State(mut context): State<Context>,
    Query(params): Query<Params>,
) -> impl IntoResponse {
    use crate::schema::sinh_vien::dsl::*;

    let result: i32 = sinh_vien
        .select(id)
        .filter(mssv.eq(params.mssv))
        .first(&mut context.db())
        .unwrap();

    Json(result).into_response()
}
