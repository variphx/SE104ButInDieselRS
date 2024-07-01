create table
    session (
        id text not null,
        username text not null,
        primary key (id),
        foreign key (username) references users (username)
    );
