ALTER DATABASE db_aae6f8_maringlavas SET SINGLE_USER WITH
ROLLBACK IMMEDIATE;
GO
ALTER DATABASE db_aae6f8_maringlavas COLLATE Croatian_CI_AS;
GO
ALTER DATABASE db_aae6f8_maringlavas SET MULTI_USER;
GO

use Library;

create table genres(
id int not null primary key identity(1,1),
name varchar(50) not null
);

create table books(
id int not null primary key identity(1,1),
name varchar(20) not null,
publishyear int not null,
availablefrom datetime not null,
price decimal not null,
genreid int not null,
isavailabledigitally bit not null
);


alter table books add foreign key (genreid) references genres(id);

insert into genres (name)
values ('Beletristika');
insert into genres (name)
values ('Programiranje');
insert into genres (name)
values ('Povijest');
insert into genres (name)
values ('Politika');
insert into genres (name)
values ('Samopomoć');

