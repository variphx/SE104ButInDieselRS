create table
    tham_so (
        id smallint not null,
        gia_tin_chi_lt bigint not null,
        gia_tin_chi_th bigint not null,
        he_so_tin_chi_lt smallint not null,
        he_so_tin_chi_th smallint not null,
        id_hoc_ky int not null,
        primary key (id),
        foreign key (id_hoc_ky) references hoc_ky (id)
    );

insert into
    tham_so (id, gia_tin_chi_lt, gia_tin_chi_th, he_so_tin_chi_lt, he_so_tin_chi_th, id_hoc_ky)
values
    (1, 17000, 18000, 15, 30, 1);
