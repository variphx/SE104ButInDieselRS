use axum::Router;

use crate::context::Context;

mod hoc_ky;

pub fn router() -> Router<Context> {
    Router::new().nest("/hoc-ky", hoc_ky::router())
}
