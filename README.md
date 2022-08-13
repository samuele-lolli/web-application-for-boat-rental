NoloBoats, sito di noleggio barche.

Gruppo:
Marco Dal Pian 0000892947 marco.dalpian@studio.unibo.it
Samuele Lolli 0000890835 samuele.lolli@studio.unibo.it

AVVERTENZE
- React gira sulla porta 3000, assicurarsi che non sia occupata.
- Express gira sulla porta 3001, assicurarsi che non sia occupata.

ISTRUZIONI PER AVVIARE IL PROGETTO
- Avviare XAMPP.
- Lanciare il dump del database(nolonolo.sql) sul workbench di mysql.
- Recarsi nella cartella /sorgenti/nolo_nolo dal terminale.
- Eseguire il comando "npm install".
- Recarsi nella cartella /sorgenti/nolo_nolo/client dal terminale.
- Eseguire il comando "npm install".
- Recarsi nella cartella /sorgenti/nolo_nolo dal terminale.
- Eseguire il comando "npm run server".
- Eseguire il comando "npm run client", a questo punto si aprira' automaticamente la home del sito sul browser.

FUNZIONAMENTO DELL'APPLICAZIONE WEB

Credenziali(le password sul database sono criptate):
ADMIN: email: admin@gmail.com password: ciaociao
CLIENTI: email: paolorossi@gmail.com password: rossi9876 (possiede una patente nautica)
		 email: chiarabianchi@libero.it password: bianchi1234 (non possiede una patente nautica)

Login/Iscrizione: E' possibile effettuare la registrazione o il login al sito direttamente dalla home principale, attraverso i bottoni che si trovano sulla barra di navigazione.

Home front-office: Una volta superato il login, e' possibile visualizzare le barche e accessori disponibili al noleggio e effettuare una o piu' prenotazioni.  
			Nella sezione "Le tue prenotazioni" sottostante, si possono visualizzare le prenotazioni attuali, passate e future, ed effettuare le operazioni ad esse relative(cancellazione, modifica e restituzione). La modifica e la cancellazione e' disponibile solo per prenotazioni future. La restituzione e' disponibile per le prenotazioni passate e attuali.
			Nel caso in cui ci sia una prenotazione passata ancora non restituita, e' previsto il pagamento di una penale. Dopo la restituzione lato front-office, l'amministratore ha la possibilita' di accettare la restituzione attraverso il back-office. 
			Nella barra di navigazione in alto sono presenti varie funzioni. Si possono consultare i contatti del sito e visualizzare il carrello presso il quale si effettuano prenotazioni. Infine, sulla destra vi e' un bottone che fa scendere un menu a tendina presso il quale si possono visualizzare e aggiornare le informazioni del profilo, le prenotazioni attuali, le statistiche del sito, il cambio tema(light mode/dark mode) e il tasto di logout.

Home back-office: Sono previste operazioni di aggiornamento, inserimento e cancellazione dei dati che riguardano l'utente e le barche(Es.: prezzo, condizioni e descrizione di una barca, e 					  cancellare un cliente che non ha prenotazioni). Nella parte inferiore della home del back-office vi e' la sezione relativa alle prenotazioni. In quest'ultima e' possibile: 					  retrodatare un noleggio e accettare la restituzione di una barca. Il tasto per il logout si trova in alto a destra nella barra di navigazione.
