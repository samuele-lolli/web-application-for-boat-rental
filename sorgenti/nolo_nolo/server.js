const express = require("express");
const cors = require("cors");
const PORT = process.env.PORT || 3001;
const app = express();
const mysql = require("mysql");

const databa = mysql.createConnection({
    user:"root",
    password:"",
    database:"nolonolo",
    host:"localhost",
});
exports.databa = databa;
app.use(express.json());

app.use(cors({
    origin: ["http://localhost:3000"],
    methods:["GET", "POST"],
    credentials: true
}));

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");

app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(session({
    key: "userId",
    secret: "boh",
    resave: false,
    saveUninitialized:false,
    cookie: {
        expires: 8.64e+7,  //24 ore in millisecondi
    }
}))

app.get("/", (req, res) => {
    res.json({ message: "Hello from server!" });
});

const loginLogoutUtenti = require("./routes/loginLogoutUtenti");
app.use("/", loginLogoutUtenti);

const registerUtenti = require("./routes/registerUtenti");
app.use("/", registerUtenti);

const updateProfiloUtenti = require("./routes/updateProfiloUtenti");
app.use("/", updateProfiloUtenti);

const fetchBarcheAccessori = require("./routes/fetchBarcheAccessori");
app.use("/", fetchBarcheAccessori);

const getCalendario = require("./routes/getCalendario");
app.use("/", getCalendario);

const prenotazione = require("./routes/prenotazione");
app.use("/", prenotazione);

const loginLogoutAdmin = require("./routes/loginLogoutAdmin");
app.use("/", loginLogoutAdmin);

const operazioniOggettiAdmin = require("./routes/operazioniOggettiAdmin");
app.use("/", operazioniOggettiAdmin);

const caricaBarcheDeleteAdmin = require("./routes/caricaBarcheDeleteAdmin");
app.use("/", caricaBarcheDeleteAdmin)

const stats = require("./routes/stats");
app.use("/", stats)

const operazioniUtentiAdmin = require("./routes/operazioniUtentiAdmin")
app.use("/", operazioniUtentiAdmin)

const getPrenotazioniAdmin = require("./routes/getPrenotazioniAdmin");
app.use("/", getPrenotazioniAdmin)

const restituzioni = require("./routes/restituzioni");
app.use("/", restituzioni)


app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});