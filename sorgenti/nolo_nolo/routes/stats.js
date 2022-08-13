const express = require("express");
let router = express.Router();
const server = require("../server")

router
    //query per contare il numero di giorni che una barca è stata prenotata
    //restituisce quella con più giorni di prenotazione
    .route("/barcaStat")
    .get((req, res) => {
        server.databa.query("SELECT       idBarca,\n" +
            "             COUNT(idBarca) AS `value_occurrence` \n" +
            "    FROM     nolonolo.prenotazione\n" +
            "    GROUP BY idBarca\n" +
            "    ORDER BY `value_occurrence` DESC\n" +
            "    LIMIT    1;",
            (err, result) => {
                if (err) {
                    console.log(err);
                }
                if (result.length>0) {
                    res.json(result)
                } else{
                    res.send({message: "ERR"})
                }
            });
    });

//query per contare il numero di giorni che un utente ha effettuato di prenotazioni
//restituisce l'utente con più giorni di prenotazione
router
    .route("/utenteStat")
    .get((req, res) => {
        server.databa.query("SELECT       idUser,\n" +
            "             COUNT(idUser) AS `value_occurrence` \n" +
            "    FROM     nolonolo.prenotazione\n" +
            "    GROUP BY idUser\n" +
            "    ORDER BY `value_occurrence` DESC\n" +
            "    LIMIT    1;",
            (err, result) => {
                if (err) {
                    console.log(err);
                }
                if (result.length>0) {
                    res.json(result)
                } else{
                    res.send({message: "ERR"})
                }
            });
    });


router
    //estrae il nome e cognome dell'utente con piu prenotazioni, tramite l'id passato come parametro
    .route("/nomeCognome")
    .post((req, res) => {
        const idUser = req.body.idUser;
        server.databa.query("SELECT nome, cognome FROM users WHERE id=?",
            [idUser],
            (err, result) => {
                if (err) {
                    console.log(err);
                }
                if (result.length>0) {
                    res.json(result)
                } else{
                    res.send({message: "ERR"})
                }
            });
    });

module.exports = router;