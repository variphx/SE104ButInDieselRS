use axum::{
    extract::{Query, State},
    response::IntoResponse,
    Json, Router,
};
use diesel::prelude::*;
use serde::Deserialize;

use crate::{
    context::Context,
    models::{MonHoc, NewMonHoc},
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
    use crate::schema::mon_hoc::dsl::*;

    let result = mon_hoc
        .filter(id.eq(params.id))
        .select(MonHoc::as_select())
        .first(&mut context.db())
        .expect("Error loading from mon_hoc");

    Json(result).into_response()
}

async fn post(
    State(mut context): State<Context>,
    Json(values): Json<Vec<NewMonHoc>>,
) -> impl IntoResponse {
    use crate::schema::mon_hoc::dsl::*;

    diesel::insert_into(mon_hoc)
        .values(&values)
        .execute(&mut context.db())
        .unwrap();
}
