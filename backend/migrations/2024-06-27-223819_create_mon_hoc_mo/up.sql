create table
    mon_hoc_mo (
        id serial,
        id_mon_hoc int not null,
        id_hoc_ky int not null,
        id_chuong_trinh_hoc int not null,
        primary key (id),
        foreign key (id_mon_hoc) references mon_hoc (id),
        foreign key (id_hoc_ky) references hoc_ky (id),
        foreign key (id_chuong_trinh_hoc) references chuong_trinh_hoc (id)
    );
