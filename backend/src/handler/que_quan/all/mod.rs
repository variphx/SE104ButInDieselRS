use axum::{extract::State, response::IntoResponse, Json, Router};
use diesel::prelude::*;

use crate::{context::Context, models::QueQuan};

pub fn router() -> Router<Context> {
    Router::new().route("/get", axum::routing::get(get))
}

async fn get(State(mut context): State<Context>) -> impl IntoResponse {
    use crate::schema::que_quan::dsl::*;

    let results = que_quan
        .select(QueQuan::as_select())
        .load(&mut context.db())
        .expect("Error loading from que_quan");

    Json(results).into_response()
}
