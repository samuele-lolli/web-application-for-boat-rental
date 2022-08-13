CREATE DATABASE nolonolo;
USE nolonolo;
-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Creato il: Set 11, 2021 alle 14:11
-- Versione del server: 10.4.20-MariaDB
-- Versione PHP: 8.0.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `nolonolo`
--

-- --------------------------------------------------------

--
-- Struttura della tabella `accessorio`
--

CREATE TABLE `accessorio` (
  `id` int(11) NOT NULL,
  `nome` varchar(50) NOT NULL,
  `descrizione` varchar(500) NOT NULL,
  `disponibilita` tinyint(1) NOT NULL,
  `immagine` varchar(150) NOT NULL,
  `tariffa` double(6,2) NOT NULL,
  `luogo` varchar(50) NOT NULL,
  `stato` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dump dei dati per la tabella `accessorio`
--

INSERT INTO `accessorio` (`id`, `nome`, `descrizione`, `disponibilita`, `immagine`, `tariffa`, `luogo`, `stato`) VALUES
(3000, 'Cressi Sub', 'Muta Da Apnea in 2 pezzi, spessore 5mm, colore mimetico.', 1, 'https://www.maremossoforzasette.it/media/catalog/product/cache/1/image/1180x1180/9df78eab33525d08d6e5fb8d27136e95/m/u/muta-cressi-sub-tracina.jpg', 10.99, 'Genova', 'Ottime condizioni, come nuova.'),
(3001, 'Quicksilver Softboard Soft Break, Black', 'La Soft Break è una funboard dal volume generoso per andare su onde di qualsiasi dimensione.', 1, 'https://www.mundo-surf.com/44456/tavola-da-surf-softboard-quiksilver-the-break.jpg', 10.33, 'Palermo', 'Tavola nuova, senza difetti.'),
(3002, 'Cressi Big Eyes Evolution', 'Maschera Subacquea di Alta qualità. Fibbie girevoli in tutte le direzioni e minimo volume interno. Boccaglio in dotazione.', 1, 'https://www.scubastore.com/f/13645/136450923/cressi-set-evo-big-eyes-alpha-ultra-dry.jpg', 5.15, 'Rimini', 'Buone condizioni, a parte qualche segno sulle lenti'),
(3003, 'Speedo Armbands Ju', 'Braccioli per imparare a nuotare in PVC.', 1, 'https://www.sportingks.com/image/cache/catalog/ProduktetBrende/1SPEEDO/5051746549556-800x800.jpg', 4.55, 'Ancona', 'Ottime condizioni.'),
(3004, 'Pavillo 67000', 'Materassino gonfiabile di plastica per una persona, colore blu. Comoda superficie floccata. Resistente struttura Coil Beam.', 1, 'https://m.media-amazon.com/images/I/71aKTFEQR8L._AC_SL1500_.jpg', 22.52, 'Ancona', 'Condizioni Eccellenti.'),
(3005, 'Cressi Palau Saf', 'Pinne molto particolari, destinate al nuoto e allo snorkeling, ma soprattutto a tutti i praticanti degli sport acquatici che abbiano l’esigenza di utilizzare le pinne solo in determinate situazioni.', 1, 'https://m.media-amazon.com/images/I/81GgE+1aZkL._AC_SL1500_.jpg', 15.55, 'Cagliari', 'Come nuove.');

-- --------------------------------------------------------

--
-- Struttura della tabella `amministratore`
--

CREATE TABLE `amministratore` (
  `id` int(11) NOT NULL,
  `email` varchar(50) NOT NULL,
  `pw` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dump dei dati per la tabella `amministratore`
--

INSERT INTO `amministratore` (`id`, `email`, `pw`) VALUES
(1, 'admin@gmail.com', '$2a$09$wD.zgkFh1Pd8vHxD1oItVODXGNzv3/Uh8WfTLub/9.JU3fJcD1zWy');

-- --------------------------------------------------------

--
-- Struttura della tabella `motore`
--

CREATE TABLE `motore` (
  `id` int(11) NOT NULL,
  `nome` varchar(50) NOT NULL,
  `descrizione` varchar(500) NOT NULL,
  `metratura` double(5,2) NOT NULL,
  `patente` tinyint(1) NOT NULL,
  `posti` int(11) NOT NULL,
  `cavalli` int(11) NOT NULL,
  `disponibilita` tinyint(1) NOT NULL,
  `immagine` varchar(150) NOT NULL,
  `tariffa` double(7,2) NOT NULL,
  `luogo` varchar(50) NOT NULL,
  `stato` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dump dei dati per la tabella `motore`
--

INSERT INTO `motore` (`id`, `nome`, `descrizione`, `metratura`, `patente`, `posti`, `cavalli`, `disponibilita`, `immagine`, `tariffa`, `luogo`, `stato`) VALUES
(1000, 'Allegra 19', 'Barca per famiglia con spazi ben sfruttati, molto confortevole.', 5.60, 0, 5, 40, 1, 'https://www.pollininautica.it/image/43507a31ac8550740bb3f3033a810b488cca.JPG', 255.33, 'Salerno', 'Buone condizioni generali.'),
(1001, 'Tecnonautica - Jeranto 11 Classic', 'Incredibile imbarcazione attrezzata con doccia, soggiorno, cucina e due camere da letto.', 12.00, 1, 12, 80, 1, 'https://www.youknowboat.com/wp-content/uploads/2016/12/gozzo-jeranto-750-classic-1.jpg', 240.66, 'Bari', 'Presenta segni di usura.'),
(1002, 'Blu Martin - Db 58 Custom', 'Veloce imbarcazione con anno di costruzione 2011, dispone di tre cabine con due bagni.', 17.70, 1, 14, 1800, 1, 'https://www.am-charter.com/wp-content/uploads/2015/06/charter-blumartin58-08.jpg', 602.43, 'Cagliari', 'Condizioni generali ottime.'),
(1003, 'Sea Ray 220 Sun Sport', 'Rapida barca a motore anno 2010. Motore Mercruiser 4.3 v6 225cv.', 4.70, 1, 5, 225, 1, 'https://s.sbito.it/img/21/21ef5ac3-f9d9-4103-97c3-690f530231a8/gallery-desktop-1x', 533.99, 'Venezia', 'Condizioni ottime.'),
(1004, 'Grand Trawler 62', 'Nato della collaborazione tra BENETEAU, Massimo Gino (Nauta Design) e Amedeo Migali (MICAD), il Grand Trawler 62 è il frutto di un lavoro che capitalizza il successo della gamma Swift Trawler e delle sue imbarcazioni estremamente autonome, funzionali e spaziose, ma anche l\'esperienza del Gruppo Beneteau nella produzione di unità di lusso.', 18.95, 1, 10, 1460, 1, 'https://www.beneteau.com/sites/default/files/public/styles/push_1440/public/exte_grand-trawler62_4_0.png?itok=kQ_PfQwZ', 599.99, 'Napoli', 'Come nuova.'),
(1005, 'Flyer 9 Spacedeck', 'Funzionale ed ergonomico, il Flyer 9 SPACEdeck è caratterizzato da un\'impressionante modularità che consente di soddisfare qualsiasi esigenza dei diportisti:  prendere il sole, trovarsi con gli amici oppure pescare.', 8.27, 1, 6, 500, 1, 'https://www.beneteau.com/sites/default/files/public/styles/push_1440/public/flyer-9-spacedeck-ext1.jpg?itok=fKR9jRPV', 355.55, 'Cagliari', 'Come nuova.');

-- --------------------------------------------------------

--
-- Struttura della tabella `nonalimentata`
--

CREATE TABLE `nonalimentata` (
  `id` int(11) NOT NULL,
  `nome` varchar(50) NOT NULL,
  `descrizione` varchar(500) NOT NULL,
  `metratura` double(5,2) NOT NULL,
  `posti` int(11) NOT NULL,
  `disponibilita` tinyint(1) NOT NULL,
  `immagine` varchar(150) NOT NULL,
  `tariffa` double(7,2) NOT NULL,
  `luogo` varchar(50) NOT NULL,
  `stato` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dump dei dati per la tabella `nonalimentata`
--

INSERT INTO `nonalimentata` (`id`, `nome`, `descrizione`, `metratura`, `posti`, `disponibilita`, `immagine`, `tariffa`, `luogo`, `stato`) VALUES
(2000, 'Borneo 2', 'Kayak rigido pensato per le gite in due, può essere usato anche da soli. Durante la navigazione, le ruote di trasporto integrate si richiudono.', 4.10, 3, 1, 'https://www.faress.com/web/uploads//products/pictures/big/16160611629948-canoaperformanceborneo2posticonsedilibicsport.jpg', 40.55, 'Livorno', 'Come nuovo.'),
(2001, 'Intex 58357 - Explorer PRO 200', 'Portata massima 120 kg, tre camere d\'aria inclusa quella ausiliaria interna allo scafo, fondo gonfiabile con struttura I-BEAM per grande confort.', 1.96, 2, 1, 'https://m.media-amazon.com/images/I/81Lge53XmTL._AC_SL1500_.jpg', 31.25, 'Genova', 'Ottime Condizioni.'),
(2002, 'Intex 68324, Canotto Excursion', 'Remi in alluminio e pompa manuale, portata ottima 400 kg, a norma ISO 6185-1 NMMA-ABYC. 3 camere d\'aria inclusa quella interna per maggiore galleggiabilità.', 3.15, 4, 1, 'https://m.media-amazon.com/images/I/717AbE3NqUL._AC_SL1500_.jpg', 50.99, 'Rimini', 'Come nuovo.'),
(2003, 'Saiman Hunter', 'Barca a remi in vetroresina. Dotazione standard: cinghie, dollen, 2 vani portaoggetti con serratura, 3 panche.', 1.48, 4, 1, 'https://img.boot24.com/hs/obm/440/440781/kleinboot-sonstige-terhi-440781-saiman-hunter-1-1-143721.jpg', 63.99, 'Venezia', 'Condizioni accettabili, ma completamente funzionale.'),
(2004, 'Intex 68307NP, Canotto Explorer K2', 'Kayak con 2 sedili gonfiabili regolabili con schienale e removibili, maniglie alle estremita\' per un trasporto agevole. Ha 2 camere d\'aria indipendenti con valvole Boston per un gonfiaggio e uno sgonfiaggio più rapidi. Portata massima 180 kg.', 3.12, 2, 1, 'https://m.media-amazon.com/images/I/71gVYic0OVL._AC_SL1500_.jpg', 35.99, 'Venezia', 'Condizioni ottime.'),
(2005, 'Tender 220', 'Piccolo scafo adatto a vari usi. Ideale come tender di servizio per grossi scafi, pratico per gli appassionati di pesca. Tender 220 ha una stabilità eccezionale dovuta alla sua carena catamarana formata da 2 chiglie laterali.', 2.20, 2, 1, 'https://cdn.shopify.com/s/files/1/0309/4524/7368/products/tender220-bianco_1024x1024@2x.jpg?v=1601504794', 51.12, 'Cagliari', 'Come nuovo');

-- --------------------------------------------------------

--
-- Struttura della tabella `prenotazione`
--

CREATE TABLE `prenotazione` (
  `data` date NOT NULL,
  `idBarca` int(11) NOT NULL,
  `idUser` int(11) NOT NULL,
  `emailAmministratore` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


--
-- Struttura della tabella `restituzioni`
--

CREATE TABLE `restituzioni` (
  `id` int(11) NOT NULL,
  `idBarca` int(11) DEFAULT NULL,
  `dataInizio` date DEFAULT NULL,
  `dataFine` date DEFAULT NULL,
  `idUser` int(11) DEFAULT NULL,
  `restituito` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dump dei dati per la tabella `restituzioni`
--

INSERT INTO `restituzioni` (`id`, `idBarca`, `dataInizio`, `dataFine`, `idUser`, `restituito`) VALUES
(1, 1005, '2021-08-20', '2021-08-30', 1, 0),
(2, 3004, '2021-08-19', '2021-08-27', 2, 0);

-- --------------------------------------------------------

--
-- Struttura della tabella `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(500) NOT NULL,
  `nome` varchar(50) NOT NULL,
  `cognome` varchar(50) NOT NULL,
  `telefono` varchar(15) NOT NULL,
  `dataNascita` date NOT NULL,
  `patente` tinyint(1) NOT NULL,
  `puntiFedelta` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dump dei dati per la tabella `users`
--

INSERT INTO `users` (`id`, `email`, `password`, `nome`, `cognome`, `telefono`, `dataNascita`, `patente`, `puntiFedelta`) VALUES
(1, 'paolorossi@gmail.com', '$2b$10$CjSHG.IkovypvYUO2NJTQeE3afdZv5YK/5sevo0Bu4ZJ3VlSw90zm', 'Paolo', 'Rossi', '33822828191', '1984-02-16', 1, 0),
(2, 'chiarabianchi@libero.it', '$2b$10$nIiQvfWw7bEPD3T6oMqS8O2Sc7nNiqBjdNGwfuu4P6vZblWS0zADG', 'Chiara', 'Bianchi', '344223322378', '1997-06-20', 0, 0);

-- --------------------------------------------------------

--
-- Struttura della tabella `vela`
--

CREATE TABLE `vela` (
  `id` int(11) NOT NULL,
  `nome` varchar(50) NOT NULL,
  `descrizione` varchar(500) NOT NULL,
  `metratura` double(5,2) NOT NULL,
  `patente` tinyint(1) NOT NULL,
  `posti` int(11) NOT NULL,
  `cavalli` int(11) NOT NULL,
  `disponibilita` tinyint(1) NOT NULL,
  `immagine` varchar(150) NOT NULL,
  `tariffa` double(7,2) NOT NULL,
  `luogo` varchar(50) NOT NULL,
  `stato` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dump dei dati per la tabella `vela`
--

INSERT INTO `vela` (`id`, `nome`, `descrizione`, `metratura`, `patente`, `posti`, `cavalli`, `disponibilita`, `immagine`, `tariffa`, `luogo`, `stato`) VALUES
(1, 'Bavaria 42', 'Barca a vela da crociera, 2007. Materiale di costruzione: Vetroresina.', 12.99, 1, 6, 55, 1, 'https://d2q3rxfa5yof4u.cloudfront.net/uploads/styles/shadowbox/public/Bavaria%2042%20Cruiser/bavaria-42-cruiser1314698858.jpg', 449.99, 'Messina', 'Condizioni ottime, non presenta segni di usura.'),
(2, 'Contest 50 CS', 'Yacht a vela, 2005. Lucidatura scafo e antivegetativa.', 14.99, 1, 7, 100, 1, 'https://itboat.com/uploads/43d4/d62c9b5b6709.jpg', 259.79, 'Pescara', 'Condizioni generali buone, qualche parte in metallo presenta ruggine.'),
(3, 'Carolina 24', 'Barca a vela calssica, struttura in legno con la tecnica dello strip-planking.', 7.00, 0, 2, 40, 1, 'https://www.barchedepocaeclassiche.it/images/bec11/Agnese-una-Carolina-al-Cantiere-Fortunato/Il%20Carolina%2024%20in%20navigazione%20(1).jpg', 330.33, 'Napoli', 'Condizioni ottime, appena restaurata.'),
(4, 'First 27', 'Moderna barca planante che offre sensazioni uniche per una crociera con la famiglia, una gita in giornata o durante la regata di club. Gli allestimenti di questo piccolo cruiser possono ospitare fino a 6 persone con cabina separata a prua, un ampio quadrato aperto, una zona cucina con lavello e frigo e un WC marino.', 7.99, 0, 6, 15, 1, 'https://www.beneteau.com/sites/default/files/public/styles/push_1440/public/first27-sailing-exp1.jpg?itok=0aPEzdlH', 499.25, 'Venezia', 'Condizioni ottime.'),
(5, 'First 24 SE', 'Facilmente trasportabile, permette di andare alla scoperta di nuovi orizzonti. Può ospitare a bordo quattro persone offrendo un comfort semplice e ottimizzato.', 7.29, 0, 4, 0, 1, 'https://www.beneteau.com/sites/default/files/public/styles/push_1440/public/first24-se-sailing-exp.jpg?itok=Z5q2_W2P', 450.25, 'Riccione', 'Come nuova.'),
(6, 'First Yacht SE', 'Questa unità “Luxury Performance” è stata creata per armatori esigenti ed attenti conoscitori della vela. Carena performante ed equilibrio al timone per emozioni uniche. Piano di coperta pulito, interni marini e moderni, impreziositi da modanature in legno lamellare, sullo sfondo laccato bianco delle paratie.', 17.12, 1, 10, 110, 1, 'https://www.beneteau.com/sites/default/files/public/styles/push_1440/public/exterieur_3_3.jpg?itok=jejcb_1C', 610.11, 'Otranto', 'Condizioni Ottime.');

--
-- Indici per le tabelle scaricate
--

--
-- Indici per le tabelle `accessorio`
--
ALTER TABLE `accessorio`
  ADD PRIMARY KEY (`id`);

--
-- Indici per le tabelle `amministratore`
--
ALTER TABLE `amministratore`
  ADD PRIMARY KEY (`id`);

--
-- Indici per le tabelle `motore`
--
ALTER TABLE `motore`
  ADD PRIMARY KEY (`id`);

--
-- Indici per le tabelle `nonalimentata`
--
ALTER TABLE `nonalimentata`
  ADD PRIMARY KEY (`id`);

--
-- Indici per le tabelle `prenotazione`
--
ALTER TABLE `prenotazione`
  ADD KEY `idUser` (`idUser`);

--
-- Indici per le tabelle `restituzioni`
--
ALTER TABLE `restituzioni`
  ADD PRIMARY KEY (`id`);

--
-- Indici per le tabelle `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Indici per le tabelle `vela`
--
ALTER TABLE `vela`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT per le tabelle scaricate
--

--
-- AUTO_INCREMENT per la tabella `accessorio`
--
ALTER TABLE `accessorio`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3006;

--
-- AUTO_INCREMENT per la tabella `amministratore`
--
ALTER TABLE `amministratore`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT per la tabella `motore`
--
ALTER TABLE `motore`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1006;

--
-- AUTO_INCREMENT per la tabella `nonalimentata`
--
ALTER TABLE `nonalimentata`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2006;

--
-- AUTO_INCREMENT per la tabella `restituzioni`
--
ALTER TABLE `restituzioni`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT per la tabella `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT per la tabella `vela`
--
ALTER TABLE `vela`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Limiti per le tabelle scaricate
--

--
-- Limiti per la tabella `prenotazione`
--
ALTER TABLE `prenotazione`
  ADD CONSTRAINT `prenotazione_ibfk_1` FOREIGN KEY (`idUser`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
