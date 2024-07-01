use axum::{
    extract::{Query, State},
    response::IntoResponse,
    Json, Router,
};
use diesel::prelude::*;
use serde::Deserialize;

use crate::{context::Context, models::HocKy};

pub fn router() -> Router<Context> {
    Router::new().route("/get", axum::routing::get(get))
}

#[derive(Deserialize)]
struct Params {
    id: i32,
}

async fn get(
    State(mut context): State<Context>,
    Query(params): Query<Params>,
) -> impl IntoResponse {
    use crate::schema::{dkmh, hoc_ky, sinh_vien};

    let results = hoc_ky::table
        .inner_join(dkmh::table.inner_join(sinh_vien::table))
        .filter(sinh_vien::id.eq(params.id))
        .select(HocKy::as_select())
        .load(&mut context.db())
        .unwrap();

    Json(results).into_response()
}
