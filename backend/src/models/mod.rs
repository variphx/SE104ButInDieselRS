use diesel::prelude::*;
use serde::{Deserialize, Serialize};

#[derive(Queryable, Selectable, Serialize)]
#[diesel(table_name = crate::schema::chi_tiet_dkmh)]
#[diesel(check_for_backend(diesel::pg::Pg))]
pub struct ChiTietDKMH {
    pub id: i32,
    pub id_dkmh: i32,
    pub id_mon_hoc_mo: i32,
}

#[derive(Insertable, Deserialize)]
#[diesel(table_name = crate::schema::chi_tiet_dkmh)]
#[diesel(check_for_backend(diesel::pg::Pg))]
pub struct NewChiTietDKMH {
    pub id_dkmh: i32,
    pub id_mon_hoc_mo: i32,
}

#[derive(Queryable, Selectable, Serialize)]
#[diesel(table_name = crate::schema::chuong_trinh_hoc)]
#[diesel(check_for_backend(diesel::pg::Pg))]
pub struct ChuongTrinhHoc {
    pub id: i32,
    pub id_nganh: i32,
    pub id_hoc_ky: i32,
}

#[derive(Insertable, Deserialize)]
#[diesel(table_name = crate::schema::chuong_trinh_hoc)]
#[diesel(check_for_backend(diesel::pg::Pg))]
pub struct NewChuongTrinhHoc {
    pub id_nganh: i32,
    pub id_hoc_ky: i32,
}

#[derive(Queryable, Selectable, Serialize)]
#[diesel(table_name = crate::schema::dkmh)]
#[diesel(check_for_backend(diesel::pg::Pg))]
pub struct DKMH {
    pub id: i32,
    pub id_sinh_vien: i32,
    pub id_hoc_ky: i32,
}

#[derive(Insertable, Deserialize)]
#[diesel(table_name = crate::schema::dkmh)]
#[diesel(check_for_backend(diesel::pg::Pg))]
pub struct NewDKMH {
    pub id_sinh_vien: i32,
    pub id_hoc_ky: i32,
}

#[derive(Queryable, Selectable, Serialize)]
#[diesel(table_name = crate::schema::doi_tuong)]
#[diesel(check_for_backend(diesel::pg::Pg))]
pub struct DoiTuong {
    pub id: i32,
    pub ten: String,
    pub he_so_hoc_phi: f64,
}

#[derive(Queryable, Selectable, Serialize)]
#[diesel(table_name = crate::schema::hoc_ky)]
#[diesel(check_for_backend(diesel::pg::Pg))]
pub struct HocKy {
    pub id: i32,
    pub ten: String,
    pub nam_hoc: i32,
}

#[derive(Insertable, Deserialize)]
#[diesel(table_name = crate::schema::hoc_ky)]
#[diesel(check_for_backend(diesel::pg::Pg))]
pub struct NewHocKy {
    pub ten: String,
    pub nam_hoc: i32,
}

#[derive(Queryable, Selectable, Serialize)]
#[diesel(table_name = crate::schema::hoc_phi)]
#[diesel(check_for_backend(diesel::pg::Pg))]
pub struct HocPhi {
    pub id: i32,
    pub tong: i64,
    pub da_thanh_toan: i64,
    pub id_hoc_ky: i32,
    pub id_sinh_vien: i32,
}

#[derive(Insertable, Deserialize)]
#[diesel(table_name = crate::schema::hoc_phi)]
#[diesel(check_for_backend(diesel::pg::Pg))]
pub struct NewHocPhi {
    pub tong: i64,
    pub da_thanh_toan: i64,
    pub id_hoc_ky: i32,
    pub id_sinh_vien: i32,
}

#[derive(Queryable, Selectable, Serialize)]
#[diesel(table_name = crate::schema::khoa)]
#[diesel(check_for_backend(diesel::pg::Pg))]
pub struct Khoa {
    pub id: i32,
    pub ten: String,
}

#[derive(Queryable, Selectable, Serialize)]
#[diesel(table_name = crate::schema::mon_hoc)]
#[diesel(check_for_backend(diesel::pg::Pg))]
pub struct MonHoc {
    pub id: i32,
    pub id_khoa: i32,
    pub ten: String,
    pub loai: String,
    pub so_tiet: i32,
    pub so_tin_chi: i32,
}

#[derive(Insertable, Deserialize)]
#[diesel(table_name = crate::schema::mon_hoc)]
#[diesel(check_for_backend(diesel::pg::Pg))]
pub struct NewMonHoc {
    pub id_khoa: i32,
    pub ten: String,
    pub loai: String,
    pub so_tiet: i32,
    pub so_tin_chi: i32,
}

#[derive(Queryable, Selectable, Serialize)]
#[diesel(table_name = crate::schema::mon_hoc_mo)]
#[diesel(check_for_backend(diesel::pg::Pg))]
pub struct MonHocMo {
    pub id: i32,
    pub id_mon_hoc: i32,
    pub id_hoc_ky: i32,
    pub id_chuong_trinh_hoc: i32,
}

#[derive(Insertable, Deserialize)]
#[diesel(table_name = crate::schema::mon_hoc_mo)]
#[diesel(check_for_backend(diesel::pg::Pg))]
pub struct NewMonHocMo {
    pub id_mon_hoc: i32,
    pub id_hoc_ky: i32,
    pub id_chuong_trinh_hoc: i32,
}

#[derive(Queryable, Selectable, Serialize)]
#[diesel(table_name = crate::schema::nganh)]
#[diesel(check_for_backend(diesel::pg::Pg))]
pub struct Nganh {
    pub id: i32,
    pub id_khoa: i32,
    pub ten: String,
}

#[derive(Queryable, Selectable, Serialize)]
#[diesel(table_name = crate::schema::que_quan)]
#[diesel(check_for_backend(diesel::pg::Pg))]
pub struct QueQuan {
    pub id: i32,
    pub thanh_pho: String,
    pub tinh: String,
}

#[derive(Queryable, Selectable, Serialize)]
#[diesel(table_name = crate::schema::session)]
#[diesel(check_for_backend(diesel::pg::Pg))]
pub struct Session {
    pub id: String,
    pub username: String,
}

#[derive(Insertable, Deserialize)]
#[diesel(table_name = crate::schema::session)]
#[diesel(check_for_backend(diesel::pg::Pg))]
pub struct NewSession {
    pub id: String,
    pub username: String,
}

#[derive(Queryable, Selectable, Serialize)]
#[diesel(table_name = crate::schema::sinh_vien)]
#[diesel(check_for_backend(diesel::pg::Pg))]
pub struct SinhVien {
    pub id: i32,
    pub mssv: String,
    pub ten: String,
    pub ngay_sinh: String,
    pub gioi_tinh: String,
    pub id_que_quan: i32,
    pub id_doi_tuong: i32,
    pub id_chuong_trinh_hoc: i32,
}

#[derive(Insertable, Deserialize)]
#[diesel(table_name = crate::schema::sinh_vien)]
#[diesel(check_for_backend(diesel::pg::Pg))]
pub struct NewSinhVien {
    pub ten: String,
    pub mssv: String,
    pub ngay_sinh: String,
    pub gioi_tinh: String,
    pub id_que_quan: i32,
    pub id_doi_tuong: i32,
    pub id_chuong_trinh_hoc: i32,
}

#[derive(Queryable, Selectable, Serialize)]
#[diesel(table_name = crate::schema::tham_so)]
#[diesel(check_for_backend(diesel::pg::Pg))]
pub struct ThamSo {
    pub id: i16,
    pub gia_tin_chi_lt: i64,
    pub gia_tin_chi_th: i64,
    pub he_so_tin_chi_lt: i16,
    pub he_so_tin_chi_th: i16,
    pub id_hoc_ky: i32,
}

#[derive(Queryable, Selectable, Serialize)]
#[diesel(table_name = crate::schema::users)]
#[diesel(check_for_backend(diesel::pg::Pg))]
pub struct Users {
    pub username: String,
    pub hash_pwd: String,
}

#[derive(Insertable, Deserialize)]
#[diesel(table_name = crate::schema::users)]
#[diesel(check_for_backend(diesel::pg::Pg))]
pub struct NewUsers {
    pub username: String,
    pub hash_pwd: String,
}
