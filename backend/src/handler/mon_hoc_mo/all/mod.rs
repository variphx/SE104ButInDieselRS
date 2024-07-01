use axum::{extract::State, response::IntoResponse, Json, Router};
use diesel::prelude::*;

use crate::{context::Context, models::MonHocMo};

mod sinh_vien_in_hoc_ky;

pub fn router() -> Router<Context> {
    Router::new()
        .route("/get", axum::routing::get(get))
        .nest("/sinh-vien-in-hoc-ky", sinh_vien_in_hoc_ky::router())
}

async fn get(State(mut context): State<Context>) -> impl IntoResponse {
    use crate::schema::mon_hoc_mo::dsl::*;

    let results = mon_hoc_mo
        .select(MonHocMo::as_select())
        .load(&mut context.db())
        .expect("Error loading from mon_hoc_mo");

    Json(results).into_response()
}
