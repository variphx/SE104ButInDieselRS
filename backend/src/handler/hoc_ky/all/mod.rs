use axum::Router;

use crate::context::Context;

mod sinh_vien;

pub fn router() -> Router<Context> {
    Router::new().nest("/sinh-vien", sinh_vien::router())
}
