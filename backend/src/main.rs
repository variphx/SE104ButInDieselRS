use std::net::SocketAddr;

use axum::Router;
use backend::{context::Context, handler};
use diesel::{
    r2d2::{ConnectionManager, Pool},
    PgConnection,
};
use tokio::net::TcpListener;

const PORT: u16 = 8080;

#[tokio::main]
async fn main() {
    let db = {
        dotenv::dotenv().expect("Failed to load environment variables");

        let database_url = std::env::var("DATABASE_URL").expect("DATABASE_URL is not set");

        let manager = ConnectionManager::<PgConnection>::new(database_url);

        Pool::builder()
            .build(manager)
            .expect("Could not build connection pool")
    };

    let context = Context::new(db);

    let api = Router::new()
        .nest("/chi-tiet-dkmh", handler::chi_tiet_dkmh::router())
        .nest("/chuong-trinh-hoc", handler::chuong_trinh_hoc::router())
        .nest("/dkmh", handler::dkmh::router())
        .nest("/doi-tuong", handler::doi_tuong::router())
        .nest("/hoc-ky", handler::hoc_ky::router())
        .nest("/hoc-phi", handler::hoc_phi::router())
        .nest("/khoa", handler::khoa::router())
        .nest("/mon-hoc", handler::mon_hoc::router())
        .nest("/mon-hoc-mo", handler::mon_hoc_mo::router())
        .nest("/nganh", handler::nganh::router())
        .nest("/que-quan", handler::que_quan::router())
        .nest("/session", handler::session::router())
        .nest("/sinh-vien", handler::sinh_vien::router())
        .nest("/tham-so", handler::tham_so::router())
        .nest("/users", handler::users::router());

    let app = Router::new().nest("/api", api).with_state(context);

    let socket = SocketAddr::new(
        std::net::IpAddr::V4(std::net::Ipv4Addr::new(0, 0, 0, 0)),
        PORT,
    );

    let listener = TcpListener::bind(socket).await.unwrap();

    axum::serve(listener, app).await.unwrap();
}
