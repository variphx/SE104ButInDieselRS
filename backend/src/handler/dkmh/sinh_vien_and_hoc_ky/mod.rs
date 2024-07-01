use axum::{
    extract::{Query, State},
    response::IntoResponse,
    Json, Router,
};
use diesel::prelude::*;
use serde::Deserialize;

use crate::{context::Context, models::DKMH, schema::dkmh};

pub fn router() -> Router<Context> {
    Router::new().route("/get", axum::routing::get(get))
}

#[derive(Deserialize)]
struct Params {
    id_sinh_vien: i32,
    id_hoc_ky: i32,
}

async fn get(
    State(mut context): State<Context>,
    Query(params): Query<Params>,
) -> impl IntoResponse {
    let result = dkmh::table
        .filter(dkmh::id_sinh_vien.eq(params.id_sinh_vien))
        .filter(dkmh::id_hoc_ky.eq(params.id_hoc_ky))
        .select(DKMH::as_select())
        .first(&mut context.db())
        .unwrap();

    Json(result).into_response()
}
