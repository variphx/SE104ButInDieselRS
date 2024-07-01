use axum::{
    extract::{Query, State},
    response::IntoResponse,
    Json, Router,
};
use diesel::prelude::*;
use serde::Deserialize;

use crate::{
    context::Context,
    models::{ChiTietDKMH, NewChiTietDKMH},
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
    use crate::schema::chi_tiet_dkmh::dsl::*;

    let result = chi_tiet_dkmh
        .filter(id.eq(params.id))
        .select(ChiTietDKMH::as_select())
        .first(&mut context.db())
        .expect("Error loading chi_tiet_dkmh");

    Json(result).into_response()
}

async fn post(
    State(mut context): State<Context>,
    Json(value): Json<NewChiTietDKMH>,
) -> impl IntoResponse {
    use crate::schema::chi_tiet_dkmh::dsl::*;

    diesel::insert_into(chi_tiet_dkmh)
        .values(&value)
        .execute(&mut context.db())
        .expect("Failed to insert into chi_tiet_dkmh");
}
