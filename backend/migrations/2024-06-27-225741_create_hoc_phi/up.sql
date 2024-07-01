create table
    hoc_phi (
        id serial,
        tong bigint not null,
        da_thanh_toan bigint not null,
        id_hoc_ky int not null,
        id_sinh_vien int not null,
        primary key (id),
        unique (id_sinh_vien, id_hoc_ky),
        foreign key (id_hoc_ky) references hoc_ky (id),
        foreign key (id_sinh_vien) references sinh_vien (id)
    );
