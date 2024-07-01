use axum::Router;

use crate::context::Context;

mod dkmh;

pub fn router() -> Router<Context> {
    Router::new().nest("/dkmh", dkmh::router())
}
