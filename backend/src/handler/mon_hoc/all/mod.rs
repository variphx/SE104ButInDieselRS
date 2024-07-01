use axum::{extract::State, response::IntoResponse, Json, Router};
use diesel::prelude::*;

use crate::{context::Context, models::MonHoc};

pub fn router() -> Router<Context> {
    Router::new().route("/get", axum::routing::get(get))
}

async fn get(State(mut context): State<Context>) -> impl IntoResponse {
    use crate::schema::mon_hoc::dsl::*;

    let results = mon_hoc
        .select(MonHoc::as_select())
        .load(&mut context.db())
        .unwrap();

    Json(results).into_response()
}
