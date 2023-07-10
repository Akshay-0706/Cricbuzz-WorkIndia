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
    query.getMatchSchedules()
        .then((result) => {
            let match = result[0];
            console.log(match);
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