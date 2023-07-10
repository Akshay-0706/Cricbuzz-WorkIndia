const query = require('../services/database/query');
const hash = require('../services/hash');

let admin = {};
let min = 100000
let max = 900000

admin.signup = async (req, res) => {
    req.body["user_id"] = Math.floor(Math.random() * (max - min) + min);
    let hashed = await hash.encrypt(req.body.password);
    req.body.password = hashed;
    let response = {};

    query.createUser(req.body)
        .then((result) => {
            response.status = "Admin Account successfully created";
            response.status_code = 200;
            response.user_id = req.body.user_id.toString();
            res.send(response);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send(err);
        });
};

// todo
admin.login = async (req, res) => {
    query.loginUser()
        .then((result) => {
            console.log(result);
            res.send(result);
        })
        .catch((err) => {
            res.status(500).send(err);
        });
};

admin.createMatch = async (req, res) => {
    let team1 = {};
    let team2 = {};
    query.teamExists(req.body.team_1)
        .then((result) => {
            if (result.length == 0) {
                team1.team_id = Math.floor(Math.random() * (max - min) + min);
                team1.name = req.body.team_1;
                query.createTeam(team1)
                    .then((result) => {
                        console.log(team1.name + " created successfully");
                    })
                    .catch((err) => {
                        console.log(err);
                        res.status(500).send(err);
                    });
                res.send(result);
            }
            else {
                console.log(req.body.team_1);
                console.log("Team already exists");
                team1.team_id = result[0].team_id;
            }

            query.teamExists(req.body.team_2)
                .then((result) => {
                    if (result.length == 0) {
                        team2.team_id = Math.floor(Math.random() * (max - min) + min);
                        team2.name = req.body.team_2;
                        query.createTeam(team2)
                            .then((result) => {
                                console.log(team2.name + " created successfully");
                            })
                            .catch((err) => {
                                console.log(err);
                                res.status(500).send(err);
                            });
                    }
                    else {
                        console.log(req.body.team_2);
                        console.log("Team already exists");
                        team2.team_id = result[0].team_id;
                    }

                    let match = {};
                    match = req.body;
                    match.team_1_id = team1.team_id;
                    match.team_2_id = team2.team_id;
                    match.match_id = Math.floor(Math.random() * (max - min) + min);
                    match.status = 'upcoming';
                    console.log(match);

                    query.createMatch(match)
                        .then((result) => {
                            console.log(result);
                            res.send(
                                {
                                    "message": "Match created successfully",
                                    "match_id": match.match_id.toString()
                                }
                            );
                        })
                        .catch((err) => {
                            res.status(500).send(err);
                        });
                })
                .catch((err) => {
                    console.log(err);
                    res.status(500).send(err);
                });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send(err);
        });

    // query.teamExists(req.team_2)
    //     .then((result) => {
    //         console.log(result);
    //         res.send(result);
    //     })
    //     .catch((err) => {
    //         res.status(500).send(err);
    //     });

    // query.createMatch()
    //     .then((result) => {
    //         console.log(result);
    //         res.send(result);
    //     })
    //     .catch((err) => {
    //         res.status(500).send(err);
    //     });
};

module.exports = admin;