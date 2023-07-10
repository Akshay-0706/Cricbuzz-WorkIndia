const express = require('express');
require('dotenv/config');
const app = express();
const router = require('./routes/route');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/app", router);

app.listen(process.env.PORT, () => {
    console.log("Ready, running at port " + process.env.PORT);
});
