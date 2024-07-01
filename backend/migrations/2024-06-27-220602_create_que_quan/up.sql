create table
    que_quan (
        id serial,
        thanh_pho text not null,
        tinh text not null,
        primary key (id),
        unique (thanh_pho, tinh)
    );

insert into
    que_quan (thanh_pho, tinh)
values
    ('Nha Trang', 'Khánh Hòa'),
    ('Ninh Hòa', 'Khánh Hòa');
