use axum::{
    extract::{Query, State},
    response::IntoResponse,
    Json, Router,
};
use diesel::prelude::*;
use serde::Deserialize;

use crate::{
    context::Context,
    models::{NewDKMH, DKMH},
    schema::dkmh,
};

mod all;
mod sinh_vien_and_hoc_ky;

pub fn router() -> Router<Context> {
    Router::new()
        .route("/get", axum::routing::get(get))
        .route("/post", axum::routing::post(post))
        .nest("/all", all::router())
        .nest("/sinh-vien-and-hoc-ky", sinh_vien_and_hoc_ky::router())
}

#[derive(Deserialize)]
struct Params {
    id: i32,
}

async fn get(
    State(mut context): State<Context>,
    Query(params): Query<Params>,
) -> impl IntoResponse {
    let result = dkmh::table
        .filter(dkmh::id.eq(params.id))
        .select(DKMH::as_select())
        .first(&mut context.db())
        .unwrap();

    Json(result).into_response()
}

async fn post(
    State(mut context): State<Context>,
    Json(values): Json<Vec<NewDKMH>>,
) -> impl IntoResponse {
    use crate::schema::dkmh::dsl::*;

    diesel::insert_into(dkmh)
        .values(values)
        .execute(&mut context.db())
        .unwrap();
}
