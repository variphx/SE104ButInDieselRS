use axum::{
    extract::{Query, State},
    response::IntoResponse,
    Json, Router,
};
use diesel::prelude::*;
use serde::Deserialize;

use crate::{context::Context, models::ChiTietDKMH, schema::chi_tiet_dkmh};

pub fn router() -> Router<Context> {
    Router::new().route("/get", axum::routing::get(get))
}

#[derive(Deserialize)]
struct Params {
    id_dkmh: i32,
}

async fn get(
    State(mut context): State<Context>,
    Query(params): Query<Params>,
) -> impl IntoResponse {
    let results = chi_tiet_dkmh::table
        .filter(chi_tiet_dkmh::id_dkmh.eq(params.id_dkmh))
        .select(ChiTietDKMH::as_select())
        .load(&mut context.db())
        .unwrap();

    Json(results).into_response()
}
