const db = require('./config');

let query = {};

// User table
query.createUser = (user) =>
    new Promise((resolve, reject) => {
        db.query("insert into user(user_id, username, password, email) values(?, ?, ?, ?)",
            [
                user.user_id,
                user.username,
                user.password,
                user.email
            ], (err, res) => {
                if (err)
                    reject(err);
                else
                    resolve(res);
            });
    });

// todo
query.loginUser = (user) =>
    new Promise((resolve, reject) => {
        db.query("select * from user where username = ?",
            [
                user.username
            ], (err, res) => {
                if (err)
                    reject(err);
                else {
                    console.log(res);
                    resolve(res);
                }
            });
    });

query.createMatch = (match) =>
    new Promise((resolve, reject) => {
        db.query("insert into cmatch(match_id, team_1_id, team_2_id, team_1, team_2, date, venue, status) values(?, ?, ?, ?, ?, ?, ?, ?)",
            [
                match.match_id,
                match.team_1_id,
                match.team_2_id,
                match.team_1,
                match.team_2,
                match.date,
                match.venue,
                match.status
            ], (err, res) => {
                if (err)
                    reject(err);
                else
                    resolve(res);
            });
    });

query.getMatchSchedules = () =>
    new Promise((resolve, reject) => {
        db.query("select match_id, team_1, team_2, date, venue from cmatch",
            (err, res) => {
                if (err)
                    reject(err);
                else
                    resolve(res);
            });
    });

query.getTeamDetails = (team) =>
    new Promise((resolve, reject) => {
        db.query("select player.player_id, player.name from cmatch join player on cmatch.team_1_id = player.team_id where cmatch.team_1_id = ?",
            [
                team.team_id
            ], (err, res) => {
                if (err)
                    reject(err);
                else
                    resolve(res);
            });
    });


// todo
query.addTeamMember = (player) =>
    new Promise((resolve, reject) => {
        db.query("select * from player where player_id = ?",
            [
                player.player_id
            ], (err, res) => {
                if (err)
                    reject(err);
                else {
                    console.log(res);
                    resolve(res);
                }
            });
    });

query.getPlayerStats = (player) =>
    new Promise((resolve, reject) => {
        db.query("select player_id, name, matches_played, runs, average, strike_rate from player where player_id = ?",
            [
                player.player_id
            ], (err, res) => {
                if (err)
                    reject(err);
                else
                    resolve(res);
            });
    });