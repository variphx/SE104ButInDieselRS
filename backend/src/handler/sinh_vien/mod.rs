use axum::{
    extract::{Query, State},
    response::IntoResponse,
    Json, Router,
};
use diesel::prelude::*;
use serde::Deserialize;

use crate::{
    context::Context,
    models::{NewSinhVien, SinhVien},
};

mod all;
mod mssv;

pub fn router() -> Router<Context> {
    Router::new()
        .route("/get", axum::routing::get(get))
        .route("/post", axum::routing::post(post))
        .nest("/all", all::router())
        .nest("/mssv", mssv::router())
}

#[derive(Deserialize)]
struct Params {
    id: i32,
}

async fn get(
    State(mut context): State<Context>,
    Query(params): Query<Params>,
) -> impl IntoResponse {
    use crate::schema::sinh_vien::dsl::*;

    let result = sinh_vien
        .filter(id.eq(params.id))
        .select(SinhVien::as_select())
        .first(&mut context.db())
        .unwrap();

    Json(result).into_response()
}

async fn post(
    State(mut context): State<Context>,
    Json(value): Json<NewSinhVien>,
) -> impl IntoResponse {
    use crate::schema::sinh_vien::dsl::*;

    diesel::insert_into(sinh_vien)
        .values(&value)
        .execute(&mut context.db())
        .unwrap();
}
