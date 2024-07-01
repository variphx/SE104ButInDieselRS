create table
    khoa (
        id serial,
        ten text not null,
        primary key (id)
    );

insert into
    khoa (ten)
values
    ('Khoa học Máy tính'),
    ('Công nghệ Phần mềm'),
    ('Kỹ thuật Máy tính');
