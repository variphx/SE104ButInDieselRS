create table
    chi_tiet_dkmh (
        id serial,
        id_dkmh int not null,
        id_mon_hoc_mo int not null,
        primary key (id),
        unique (id_dkmh, id_mon_hoc_mo),
        foreign key (id_dkmh) references dkmh (id),
        foreign key (id_mon_hoc_mo) references mon_hoc_mo (id)
    );
