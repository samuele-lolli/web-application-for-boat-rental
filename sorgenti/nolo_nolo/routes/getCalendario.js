const express = require("express");
let router = express.Router();
const server = require("../server")

router
    .route("/disponibilita")
    //recupera tutte le date di prenotazione/noleggio di una specifica barca passata come param.
    .post((req, res) => {
        const idBarca = req.body.idBarca;

        server.databa.query("SELECT data FROM prenotazione WHERE idBarca = ?",
            [idBarca],
            (err, result) => {
                if (err) {
                    console.log(err);
                }
                if (result.length > 0) {
                    res.json(result);
                } else{
                    res.send({message: ""});
                }
            });
    });

router
    .route("/controlla")
    //recupera le date di prenotazione di una data barca e di un dato range di date
    //se alcune date sono uguali a quelle passate come parametro, restituiamo ERR
    //altrimenti restituiamo OK
    .post((req, res) => {
        const dateArray = req.body.dateArray;
        const idBarca = req.body.idBarca;
        let h=0;

        for(let i=0; i<dateArray.length; i++){
            server.databa.query("SELECT data FROM prenotazione WHERE idBarca = ? AND data = ?",
                [idBarca, dateArray[i]],
                (err, result) => {
                    if (err) {
                        console.log(err);
                    }
                    if (result.length>0 && h===0) {
                        res.send({message: "ERR"})
                        h=1;
                    }
                    if(h===0 && i===(dateArray.length-1)){
                        res.send({message: "OK"})
                    }
                });
        }
    });

module.exports = router;