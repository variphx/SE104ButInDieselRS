create table
    doi_tuong (
        id serial,
        ten text not null,
        he_so_hoc_phi double precision not null,
        primary key (id)
    );

insert into
    doi_tuong (ten, he_so_hoc_phi)
values
    ('Đối tượng phổ thông', 1.0),
    ('Con/cháu người có công với cách mạng', 0.6);
