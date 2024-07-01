use axum::{
    extract::{Query, State},
    response::IntoResponse,
    Json, Router,
};
use diesel::prelude::*;
use serde::Deserialize;

use crate::{
    context::Context,
    models::{HocPhi, NewHocPhi},
};

pub fn router() -> Router<Context> {
    Router::new()
        .route("/get", axum::routing::get(get))
        .route("/post", axum::routing::post(post))
}

#[derive(Deserialize)]
struct Params {
    id_hoc_ky: i32,
    id_sinh_vien: i32,
}

async fn get(
    State(mut context): State<Context>,
    Query(params): Query<Params>,
) -> impl IntoResponse {
    use crate::schema::hoc_phi::dsl::*;

    let result = hoc_phi
        .filter(id_hoc_ky.eq(params.id_hoc_ky))
        .filter(id_sinh_vien.eq(params.id_sinh_vien))
        .select(HocPhi::as_select())
        .first(&mut context.db())
        .unwrap();

    Json(result).into_response()
}

async fn post(
    State(mut context): State<Context>,
    Json(value): Json<NewHocPhi>,
) -> impl IntoResponse {
    use crate::schema::hoc_phi::dsl::*;

    diesel::insert_into(hoc_phi)
        .values(&value)
        .execute(&mut context.db())
        .unwrap();
}
