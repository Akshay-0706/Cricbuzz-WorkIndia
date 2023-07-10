const query = require('../services/database/query');

let guest = {};

guest.getMatchSchedules = async (req, res) => {
    query.getMatchSchedules()
        .then((result) => {
            for (let index = 0; index < result.length; index++) {
                delete result[index].status;
            }
            res.send(result);
        })
        .catch((err) => {
            res.status(500).send(err);
        });
};

guest.getMatchDetails = async (req, res) => {
    let team_1_id;
    let team_2_id;
    query.getMatchSchedules()
        .then(async (result) => {
            let match = result[0];
            let squads = {};
            console.log(match);
            await query.teamExists(match.team_1)
                .then((result) => {
                    team_1_id = result[0].team_id;
                })
                .catch((err) => {
                    res.status(500).send(err);
                });
            await query.teamExists(match.team_2)
                .then((result) => {
                    team_2_id = result[0].team_id;
                })
                .catch((err) => {
                    res.status(500).send(err);
                });
            await query.getTeamDetails(team_1_id)
                .then((result) => {
                    squads["team_1"] = result;
                })
                .catch((err) => {
                    res.status(500).send(err);
                });
            await query.getTeamDetails(team_2_id)
                .then((result) => {
                    squads["team_2"] = result;

                })
                .catch((err) => {
                    res.status(500).send(err);
                });
            match["squads"] = squads;
            res.send(match);
        })
        .catch((err) => {
            res.status(500).send(err);
        });
};

guest.getPlayerStats = async (req, res) => {
    query.getPlayerStats(req.params.player_id)
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            res.status(500).send(err);
        });
};


module.exports = guest;