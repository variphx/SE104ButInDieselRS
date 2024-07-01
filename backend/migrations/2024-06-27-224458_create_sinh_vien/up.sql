create table
    sinh_vien (
        id serial,
        mssv text not null,
        ten text not null,
        ngay_sinh text not null,
        gioi_tinh text not null,
        id_que_quan int not null,
        id_doi_tuong int not null,
        id_chuong_trinh_hoc int not null,
        primary key (id),
        unique (mssv),
        foreign key (id_que_quan) references que_quan (id),
        foreign key (id_doi_tuong) references doi_tuong (id),
        foreign key (id_chuong_trinh_hoc) references chuong_trinh_hoc (id),
        constraint check_gioi_tinh check (gioi_tinh in ('Nam', 'Nữ'))
    );
