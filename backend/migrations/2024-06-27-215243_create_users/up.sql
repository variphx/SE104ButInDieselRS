create table
    users (
        username text not null,
        hash_pwd text not null,
        primary key (username)
    );

insert into
    users (username, hash_pwd)
values
    ('admin', '$argon2id$v=19$m=16,t=2,p=1$R1U0emNEMU9iR0owSTNHbg$nvxjd0rTHHOls0NBGDqy4w');
