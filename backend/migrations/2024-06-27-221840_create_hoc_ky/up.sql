create table
    hoc_ky (
        id serial,
        ten text not null,
        nam_hoc int not null,
        primary key (id),
        unique (ten, nam_hoc),
        constraint check_ten check (ten in ('Một', 'Hai', 'Hè'))
    );

insert into
    hoc_ky (ten, nam_hoc)
values
    ('Một', 2022);
