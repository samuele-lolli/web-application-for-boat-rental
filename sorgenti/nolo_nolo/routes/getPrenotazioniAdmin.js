const express = require("express");
let router = express.Router();
const server = require("../server")

router
    //recuperare tutti gli id dalla tabella users, quindi tutti gli id degli utenti
    .route("/getIdUsers")
    .get((req, res) => {
        server.databa.query("SELECT id FROM users",
            (err, result) => {
                if (err) {
                    console.log(err);
                }
                if (result.length > 0) {
                    res.json(result);
                } else{
                    res.send({message: "ERR"});
                }
            });
    });

module.exports = router;