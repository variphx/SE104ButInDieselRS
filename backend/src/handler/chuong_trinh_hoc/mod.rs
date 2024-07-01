use axum::{
    extract::{Query, State},
    response::IntoResponse,
    Json, Router,
};
use diesel::prelude::*;
use serde::Deserialize;

use crate::{
    context::Context,
    models::{ChuongTrinhHoc, NewChuongTrinhHoc},
};

mod all;

pub fn router() -> Router<Context> {
    Router::new()
        .route("/get", axum::routing::get(get))
        .route("/post", axum::routing::post(post))
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
    use crate::schema::chuong_trinh_hoc::dsl::*;

    let result = chuong_trinh_hoc
        .filter(id.eq(params.id))
        .select(ChuongTrinhHoc::as_select())
        .first(&mut context.db())
        .expect("Error loading chuong_trinh_hoc");

    Json(result).into_response()
}

async fn post(
    State(mut context): State<Context>,
    Json(values): Json<Vec<NewChuongTrinhHoc>>,
) -> impl IntoResponse {
    use crate::schema::chuong_trinh_hoc::dsl::*;

    diesel::insert_into(chuong_trinh_hoc)
        .values(&values)
        .execute(&mut context.db())
        .unwrap();
}
