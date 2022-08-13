const express = require("express");
const bcrypt = require("bcrypt");
let router = express.Router();
const server = require("../server")

router
    .route("/loginAdmin")
    //controlla che esista una sessione admin, se esiste invia le informazioni di sessione, e loggedIn a true
    .get((req,res) => {
        if(req.session.admin) {
            res.send({loggedIn: true, admin: req.session.admin})
            console.log(req.session.admin)
        } else {
            res.send({loggedIn: false})
        }
    })

    //effettua i vari controlli sul login, se tutto va a buon fine setta la sessione dell'admin
    .post((req, res) => {
        const emailAdmin = req.body.emailLog;
        const passwordAdmin = req.body.passwordLog;

        if(emailAdmin && passwordAdmin) {
            server.databa.query("SELECT * FROM amministratore WHERE email = ?",
                emailAdmin,
                (err, result) => {
                    if (err) {
                        console.log(err);
                    }
                    if(result){
                        console.log(result);
                    }
                    if (result.length > 0) {
                        //decripta la password per poterla leggere
                        bcrypt.compare(passwordAdmin, result[0]["pw"], (error, response) => {
                            if (response) {
                                req.session.admin = result;
                                res.json(result);
                                console.log(result);
                            } else {
                                res.send({message: "Hai inserito una password sbagliata!"});
                            }
                            if(error){
                                console.log(error);
                            }
                        })
                    } else {
                        res.send({message: "L'admin " + emailAdmin + " non esiste!"});
                    }
                });
        } else {
            res.status(400).json("Bad request");
        }
    });
router
    //pulisce il cookie dell'admin e restituisce uno status di successo se il logout va a buon fine
    .route("/logoutAdmin")
    .post((req,res) => {
        const id = req.body.id
        if(id) {
            res.clearCookie('userId')
            res.status(200).json('Admin ' +id+ ' ha effettuato il logout con successo.')
        } else {
            res.status(400).json("Bad request")
        }
    })
module.exports = router;