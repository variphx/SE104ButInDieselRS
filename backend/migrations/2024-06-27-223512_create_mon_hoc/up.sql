create table
    mon_hoc (
        id serial,
        id_khoa int not null,
        ten text not null,
        loai text not null,
        so_tiet int not null,
        so_tin_chi int not null,
        primary key (id),
        foreign key (id_khoa) references khoa (id),
        constraint check_loai check (loai in ('LT', 'TH'))
    );
