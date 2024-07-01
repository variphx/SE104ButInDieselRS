// @generated automatically by Diesel CLI.

diesel::table! {
    chi_tiet_dkmh (id) {
        id -> Int4,
        id_dkmh -> Int4,
        id_mon_hoc_mo -> Int4,
    }
}

diesel::table! {
    chuong_trinh_hoc (id) {
        id -> Int4,
        id_nganh -> Int4,
        id_hoc_ky -> Int4,
    }
}

diesel::table! {
    dkmh (id) {
        id -> Int4,
        id_sinh_vien -> Int4,
        id_hoc_ky -> Int4,
    }
}

diesel::table! {
    doi_tuong (id) {
        id -> Int4,
        ten -> Text,
        he_so_hoc_phi -> Float8,
    }
}

diesel::table! {
    hoc_ky (id) {
        id -> Int4,
        ten -> Text,
        nam_hoc -> Int4,
    }
}

diesel::table! {
    hoc_phi (id) {
        id -> Int4,
        tong -> Int8,
        da_thanh_toan -> Int8,
        id_hoc_ky -> Int4,
        id_sinh_vien -> Int4,
    }
}

diesel::table! {
    khoa (id) {
        id -> Int4,
        ten -> Text,
    }
}

diesel::table! {
    mon_hoc (id) {
        id -> Int4,
        id_khoa -> Int4,
        ten -> Text,
        loai -> Text,
        so_tiet -> Int4,
        so_tin_chi -> Int4,
    }
}

diesel::table! {
    mon_hoc_mo (id) {
        id -> Int4,
        id_mon_hoc -> Int4,
        id_hoc_ky -> Int4,
        id_chuong_trinh_hoc -> Int4,
    }
}

diesel::table! {
    nganh (id) {
        id -> Int4,
        id_khoa -> Int4,
        ten -> Text,
    }
}

diesel::table! {
    que_quan (id) {
        id -> Int4,
        thanh_pho -> Text,
        tinh -> Text,
    }
}

diesel::table! {
    session (id) {
        id -> Text,
        username -> Text,
    }
}

diesel::table! {
    sinh_vien (id) {
        id -> Int4,
        mssv -> Text,
        ten -> Text,
        ngay_sinh -> Text,
        gioi_tinh -> Text,
        id_que_quan -> Int4,
        id_doi_tuong -> Int4,
        id_chuong_trinh_hoc -> Int4,
    }
}

diesel::table! {
    tham_so (id) {
        id -> Int2,
        gia_tin_chi_lt -> Int8,
        gia_tin_chi_th -> Int8,
        he_so_tin_chi_lt -> Int2,
        he_so_tin_chi_th -> Int2,
        id_hoc_ky -> Int4,
    }
}

diesel::table! {
    users (username) {
        username -> Text,
        hash_pwd -> Text,
    }
}

diesel::joinable!(chi_tiet_dkmh -> dkmh (id_dkmh));
diesel::joinable!(chi_tiet_dkmh -> mon_hoc_mo (id_mon_hoc_mo));
diesel::joinable!(chuong_trinh_hoc -> hoc_ky (id_hoc_ky));
diesel::joinable!(chuong_trinh_hoc -> nganh (id_nganh));
diesel::joinable!(dkmh -> hoc_ky (id_hoc_ky));
diesel::joinable!(dkmh -> sinh_vien (id_sinh_vien));
diesel::joinable!(hoc_phi -> hoc_ky (id_hoc_ky));
diesel::joinable!(hoc_phi -> sinh_vien (id_sinh_vien));
diesel::joinable!(mon_hoc -> khoa (id_khoa));
diesel::joinable!(mon_hoc_mo -> chuong_trinh_hoc (id_chuong_trinh_hoc));
diesel::joinable!(mon_hoc_mo -> hoc_ky (id_hoc_ky));
diesel::joinable!(mon_hoc_mo -> mon_hoc (id_mon_hoc));
diesel::joinable!(nganh -> khoa (id_khoa));
diesel::joinable!(session -> users (username));
diesel::joinable!(sinh_vien -> chuong_trinh_hoc (id_chuong_trinh_hoc));
diesel::joinable!(sinh_vien -> doi_tuong (id_doi_tuong));
diesel::joinable!(sinh_vien -> que_quan (id_que_quan));
diesel::joinable!(tham_so -> hoc_ky (id_hoc_ky));

diesel::allow_tables_to_appear_in_same_query!(
    chi_tiet_dkmh,
    chuong_trinh_hoc,
    dkmh,
    doi_tuong,
    hoc_ky,
    hoc_phi,
    khoa,
    mon_hoc,
    mon_hoc_mo,
    nganh,
    que_quan,
    session,
    sinh_vien,
    tham_so,
    users,
);
