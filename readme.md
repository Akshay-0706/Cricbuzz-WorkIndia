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
    foreign key (team_1_id) references team(team_id),
    foreign key (team_2_id) references team(team_id)
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
    foreign key (team_id) references team(team_id)
);
```