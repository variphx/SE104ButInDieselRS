use axum::{extract::State, response::IntoResponse, Json, Router};
use diesel::prelude::*;

use crate::{context::Context, models::ThamSo};

pub fn router() -> Router<Context> {
    Router::new().route("/get", axum::routing::get(get))
}

async fn get(State(mut context): State<Context>) -> impl IntoResponse {
    use crate::schema::tham_so::dsl::*;

    let result = tham_so
        .select(ThamSo::as_select())
        .filter(id.eq(1))
        .first(&mut context.db())
        .unwrap();

    Json(result).into_response()
}
