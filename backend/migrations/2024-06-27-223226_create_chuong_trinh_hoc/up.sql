create table
    chuong_trinh_hoc (
        id serial,
        id_nganh int not null,
        id_hoc_ky int not null,
        primary key (id),
        unique (id_nganh, id_hoc_ky),
        foreign key (id_nganh) references nganh (id),
        foreign key (id_hoc_ky) references hoc_ky (id)
    );
