# WorkIndia Cricbuzz
### Database schema

```
User
user_id int pk
username varchar(40)
password varchar(255)
email varchar(100)
timestamp timestamp

CMatch
match_id int pk
team_1_id int fk
team_2_id int fk
team_1 varchar(20)
team_2 varchar(20)
date date
venue varchar(100)
status varchar(10) // 'concluded' or 'upcoming' based on date

Team
team_id int pk
name varchar(40)

Player
player_id int pk
team_id int fk
name varchar(40)
matches_played int
runs int
average float(3, 1)
strike_rate float(3, 1)
role varchar(40) default 'not assigned'
```

#### Create tables

```
create table user
(
    user_id int primary key,
    username varchar(40),
    password varchar(255),
    email varchar(100),
    last_updated timestamp default now() on update now()
);

create table team
(
    team_id int primary key,
    name varchar(40)
);

create table cmatch
(
    match_id int primary key,
    team_1_id int,
    team_2_id int,
    team_1 varchar(20),
    team_2 varchar(20),
    date date,
    venue varchar(100),
    status varchar(10),
    foreign key (team_1_id) references team(team_id) on delete cascade,
    foreign key (team_2_id) references team(team_id) on delete cascade
);

create table player
(
    player_id int primary key,
    team_id int,
    name varchar(40),
    matches_played int,
    runs int,
    average float(3, 1),
    strike_rate float(3, 1),
    role varchar(40) default 'not assigned',
    foreign key (team_id) references team(team_id) on delete set null
);
```

#### Dummy data
```
insert into user(user_id, username, password, email)
values
(
    123,
    'Akshay',
    '1234',
    'akshay0706vhatkar@gmail.com'
);

insert into team(team_id, name) 
values
(
    123,
    'Australia'
);

insert into cmatch(match_id, team_1_id, team_2_id, team_1, team_2, date, venue, status) 
values(
    1,
    143,
    123,
    'India',
    'Australia',
    '2023-07-10',
    'Cricket Ground',
    'upcoming'
);

insert into player(player_id, team_id, name, matches_played, runs, average, strike_rate, role)
values(
    1,
    143,
    'MS Dhoni',
    600,
    4000,
    50.2,
    67.8,
    'Captain'
);
```