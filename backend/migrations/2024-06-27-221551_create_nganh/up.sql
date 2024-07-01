create table
    nganh (
        id serial,
        id_khoa int not null,
        ten text not null,
        primary key (id),
        foreign key (id_khoa) references khoa (id)
    );

insert into
    nganh (id_khoa, ten)
values
    (1, 'Khoa học Máy tính (Chính quy)'),
    (1, 'Khoa học Máy tính (Tài năng)'),
    (1, 'Khoa học Máy tính (Chất lượng cao)'),
    (2, 'Công nghệ Phần mềm (Chính quy)'),
    (3, 'Kỹ thuật Máy tính (Chính quy)');
