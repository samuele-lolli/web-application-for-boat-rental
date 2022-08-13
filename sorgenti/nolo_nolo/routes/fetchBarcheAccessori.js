const express = require("express");
let router = express.Router();
const server = require("../server")

router
    //recupera le barche a motore e tutti i dati relativi
    .route("/barchemotore")
    .get((req, res) => {
        server.databa.query("SELECT * FROM motore",
            (err, result) => {
                if (err) {
                    console.log(err);
                }
                if(result) {
                    // console.log(result);
                    if (result.length > 0) {
                        res.json(result);
                    } else {
                        res.status(400).json("Bad request");
                    }
                }
            });
    });

router
    //recupera le barche non alimentate e tutti i dati relativi
    .route("/nonalimentata")
    .get((req, res) => {
        server.databa.query("SELECT * FROM nonalimentata",
            (err, result) => {
                if (err) {
                    console.log(err);
                }
                if(result) {
                    // console.log(result);
                    if (result.length > 0) {
                        res.json(result);
                    } else {
                        res.status(400).json("Bad request");
                    }
                }
            });
    });

router
    //recupera le barche a vela e tutti i dati relativi
    .route("/vela")
    .get((req, res) => {
        server.databa.query("SELECT * FROM vela",
            (err, result) => {
                if (err) {
                    console.log(err);
                }
                if(result) {
                    // console.log(result);
                    if (result.length > 0) {
                        res.json(result);
                    } else {
                        res.status(400).json("Bad request");
                    }
                }
            });
    });

router
    //recupera gli accessori e tutti i dati relativi
    .route("/accessori")
    .get((req, res) => {
        server.databa.query("SELECT * FROM accessorio",
            (err, result) => {
                if (err) {
                    console.log(err);
                }
                if(result) {
                    // console.log(result);
                    if (result.length > 0) {
                        res.json(result);
                    } else {
                        res.status(400).json("Bad request");
                    }
                }
            });
    });

////////MODIFICA MODAL/////////
router
    .route("/getCard")
    //recupera la barca a seconda dell'id che gli viene passato
    .post((req, res) => {
        const idBarca = req.body.idBarca;

        if(idBarca<1000){
            server.databa.query("SELECT * FROM vela WHERE id=?",
                [idBarca],
                (err, result) => {
                    if (err) {
                        console.log(err);
                    }
                    if(result) {
                        // console.log(result);
                        if (result.length > 0) {
                            res.json(result);
                        } else {
                            res.status(400).json("Bad request");
                        }
                    }
                });
        }
        if(idBarca<2000 && idBarca>=1000){
            server.databa.query("SELECT * FROM motore WHERE id=?",
                [idBarca],
                (err, result) => {
                    if (err) {
                        console.log(err);
                    }
                    if(result) {
                        // console.log(result);
                        if (result.length > 0) {
                            res.json(result);
                        } else {
                            res.status(400).json("Bad request");
                        }
                    }
                });
        }
        if(idBarca<3000 && idBarca>=2000){
            server.databa.query("SELECT * FROM nonalimentata WHERE id=?",
                [idBarca],
                (err, result) => {
                    if (err) {
                        console.log(err);
                    }
                    if(result) {
                        // console.log(result);
                        if (result.length > 0) {
                            res.json(result);
                        } else {
                            res.status(400).json("Bad request");
                        }
                    }
                });
        }
        if(idBarca<4000 && idBarca>=3000){
            server.databa.query("SELECT * FROM accessorio WHERE id=?",
                [idBarca],
                (err, result) => {
                    if (err) {
                        console.log(err);
                    }
                    if(result) {
                        // console.log(result);
                        if (result.length > 0) {
                            res.json(result);
                        } else {
                            res.status(400).json("Bad request");
                        }
                    }
                });
        }
    });

router
    //recupera la patente a seconda dell'idUtente che gli viene passato.
    .route("/patente")
    .post((req, res) => {
        const idUtente = req.body.idUtente;

        server.databa.query("SELECT patente FROM users WHERE id=?",
            [idUtente],
            (err, result) => {
                if (err) {
                    console.log(err);
                }
                if(result) {
                    // console.log(result);
                    if (result.length > 0) {
                        res.json(result);
                    } else {
                        res.status(400).json("Bad request");
                    }
                }
            });
    });

module.exports = router;