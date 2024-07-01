use axum::{
    extract::{Query, State},
    response::IntoResponse,
    Json, Router,
};
use diesel::prelude::*;
use serde::Deserialize;

use crate::{
    context::Context,
    models::{MonHocMo, NewMonHocMo},
    schema::mon_hoc_mo,
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
    let result = mon_hoc_mo::table
        .filter(mon_hoc_mo::id.eq(params.id))
        .select(MonHocMo::as_select())
        .first(&mut context.db())
        .unwrap();

    Json(result).into_response()
}

async fn post(
    State(mut context): State<Context>,
    Json(value): Json<NewMonHocMo>,
) -> impl IntoResponse {
    use crate::schema::mon_hoc_mo::dsl::*;

    diesel::insert_into(mon_hoc_mo)
        .values(&value)
        .execute(&mut context.db())
        .expect("Error inserting into mon_hoc_mo");
}
