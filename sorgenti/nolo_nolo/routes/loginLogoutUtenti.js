const express = require("express");
const bcrypt = require("bcrypt");
let router = express.Router();
const server = require("../server")
//Login utente
router
    //controlla che esista una sessione user, se esiste invia le informazioni di sessione, e loggedIn a true
    .route("/login")
    .get((req,res) => {
        if(req.session.user) {
            res.send({loggedIn: true, user: req.session.user})
        } else {
            res.send({loggedIn: false})
        }
    })
    //effettua i vari controlli sul login, se tutto va a buon fine setta la sessione dell'utente
    .post((req, res) => {
        const email = req.body.emailLog;
        const password = req.body.passwordLog;

        if(email && password) {
           server.databa.query("SELECT * FROM users WHERE email = ?",
                email,
                (err, result) => {
                    if (err) {
                        console.log(err);
                    }
                    if(result){
                        console.log(result);
                    }
                    if (result.length > 0) {
                        bcrypt.compare(password, result[0].password, (error, response) => {
                            if (response) {
                                req.session.user = result;
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
                        res.send({message: "L'utente " + email + " non esiste!"});
                    }
                });
        } else {
            res.status(400).json("Bad request");
        }
    });


//Logout utenti
router
    //pulisce il cookie dell'utente e restituisce uno status di successo se il logout va a buon fine
    .route("/logout")
    .post((req,res) => {
        const id = req.body.id
        if(id) {
            res.clearCookie('userId')
            res.status(200).json('Utente ' +id+ ' ha effettuato il logout con successo.')
        } else {
            res.status(400).json("Bad request")
        }
    })

module.exports = router;