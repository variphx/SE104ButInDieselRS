use std::sync::Arc;

use diesel::{
    r2d2::{ConnectionManager, Pool, PooledConnection},
    PgConnection,
};

#[derive(Clone)]
pub struct Context {
    db: Arc<Pool<ConnectionManager<PgConnection>>>,
}

impl Context {
    pub fn new(db: Pool<ConnectionManager<PgConnection>>) -> Self {
        Self { db: Arc::new(db) }
    }
}

impl Context {
    pub fn db(&mut self) -> PooledConnection<ConnectionManager<PgConnection>> {
        self.db.get().unwrap()
    }
}
