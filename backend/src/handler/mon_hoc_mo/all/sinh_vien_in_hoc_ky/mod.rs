use axum::{
    extract::{Query, State},
    response::IntoResponse,
    Json, Router,
};
use diesel::prelude::*;
use serde::Deserialize;

use crate::{
    context::Context,
    models::MonHocMo,
    schema::{chuong_trinh_hoc, mon_hoc_mo, sinh_vien},
};

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
    let results = mon_hoc_mo::table
        .inner_join(chuong_trinh_hoc::table.inner_join(sinh_vien::table))
        .filter(mon_hoc_mo::id_hoc_ky.eq(params.id_hoc_ky))
        .filter(sinh_vien::id.eq(params.id_sinh_vien))
        .select(MonHocMo::as_select())
        .load(&mut context.db())
        .unwrap();

    Json(results).into_response()
}
