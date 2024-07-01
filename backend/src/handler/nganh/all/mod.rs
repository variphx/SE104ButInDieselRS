use axum::{extract::State, response::IntoResponse, Json, Router};
use diesel::prelude::*;

use crate::{context::Context, models::Nganh};

pub fn router() -> Router<Context> {
    Router::new().route("/get", axum::routing::get(get))
}

async fn get(State(mut context): State<Context>) -> impl IntoResponse {
    use crate::schema::nganh::dsl::*;

    let results = nganh
        .select(Nganh::as_select())
        .load(&mut context.db())
        .expect("Error loading from nganh");

    Json(results).into_response()
}
