const admin = require('../controller/admin');
const guest = require('../controller/guest');
const express = require('express');
const morgan = require('morgan');
const router = express.Router();

router.use(morgan("dev"));

router.post("/admin/signup", admin.create);
router.post("/admin/login", admin.login);
// router.post("/api/matches", admin.createMatch);
// router.post("/api/teams/:team_id/squad", admin.addMemberToSquad);

// router.get("/api/matches", guest.getMatchSchedules);
// router.get("/api/matches/:match_id", guest.getMatchDetails);
// router.get("/api/players/:player_id/stats", guest.getPlayerStats);

module.exports = router