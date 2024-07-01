use axum::{
    extract::{Query, State},
    response::IntoResponse,
    Json, Router,
};
use diesel::prelude::*;
use serde::Deserialize;

use crate::{
    context::Context,
    models::{HocKy, NewHocKy},
    schema::{hoc_ky, tham_so},
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
    use crate::schema::hoc_ky::dsl::*;

    let result = hoc_ky
        .filter(id.eq(params.id))
        .select(HocKy::as_select())
        .first(&mut context.db())
        .expect("Error loading from hoc_ky");

    Json(result).into_response()
}

async fn post(
    State(mut context): State<Context>,
    Json(value): Json<NewHocKy>,
) -> impl IntoResponse {
    let hoc_ky = diesel::insert_into(hoc_ky::table)
        .values(&value)
        .returning(HocKy::as_returning())
        .get_result(&mut context.db())
        .unwrap();

    diesel::update(tham_so::table.filter(tham_so::id.eq(1)))
        .set(tham_so::id_hoc_ky.eq(hoc_ky.id))
        .execute(&mut context.db())
        .unwrap();
}
