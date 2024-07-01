use axum::{extract::{Query, State}, Router};
use serde::Deserialize;

use crate::context::Context;

pub fn router() -> Router<Context> {
    Router::new()
}

#[derive(Deserialize)]
struct Params {
    
}

async fn get(State(mut context): State<Context>, Query(params): Query<Params>)
