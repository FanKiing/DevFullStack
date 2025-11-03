CREATE DATABASE IF NOT EXISTS GComptesBancaire;
USE GComptesBancaire;

CREATE TABLE Client (
  CIN        VARCHAR(20) PRIMARY KEY,
  nom        VARCHAR(60) NOT NULL,
  prenom     VARCHAR(60) NOT NULL,
  adr        VARCHAR(200),
  tel        VARCHAR(30)
);

CREATE TABLE Compte (
  NumCompte   INT AUTO_INCREMENT PRIMARY KEY,
  solde       DECIMAL(15,2) NOT NULL DEFAULT 0,
  TypeCompte  ENUM('CC','CE') NOT NULL,
  NumCl       VARCHAR(20) NOT NULL,
  FOREIGN KEY (NumCl) REFERENCES Client(CIN)
);

CREATE TABLE Operation (
  NumOP      INT AUTO_INCREMENT PRIMARY KEY,
  TypeOp     VARCHAR(20) NOT NULL,
  MontantOp  DECIMAL(15,2) NOT NULL,
  NumCpt     INT NOT NULL,
  DateOp     DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (NumCpt) REFERENCES Compte(NumCompte)
);


#1-

DELIMITER $$

CREATE TRIGGER TR_AJOUT_COMPTE
BEFORE INSERT ON Compte
FOR EACH ROW
BEGIN
  IF NEW.TypeCompte = 'CC' AND NEW.solde <= 1500 THEN
    SIGNAL SQLSTATE '45000'
      SET MESSAGE_TEXT = 'Solde initial insuffisant pour un compte CC (>1500 DH)';
  END IF;
END$$
DELIMITER ;


#2-

DELIMITER $$

CREATE TRIGGER TR_UNIQUE_CC_PAR_CLIENT
BEFORE INSERT ON Compte
FOR EACH ROW
BEGIN
  IF NEW.TypeCompte = 'CC' THEN
    IF (SELECT COUNT(*) FROM Compte WHERE NumCl = NEW.NumCl AND TypeCompte = 'CC') > 0 THEN
      SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Le client possède déjà un compte CC';
    END IF;
  END IF;
END$$
DELIMITER ;

#3-

DELIMITER $$

CREATE TRIGGER TR_NO_DELETE_SOLDE_NON_NUL
BEFORE DELETE ON Compte
FOR EACH ROW
BEGIN
  IF OLD.solde <> 0 THEN
    SIGNAL SQLSTATE '45000'
      SET MESSAGE_TEXT = 'Impossible de supprimer un compte dont le solde est non nul';
  END IF;
END$$
DELIMITER ;


#4-

DELIMITER $$

CREATE TRIGGER TR_UPDATE_COMPTE
BEFORE UPDATE ON Compte
FOR EACH ROW
BEGIN
  IF OLD.TypeCompte <> NEW.TypeCompte THEN
    IF (SELECT COUNT(*) FROM Operation WHERE NumCpt = OLD.NumCompte) > 0 THEN
      SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Impossible de modifier le type : des opérations existent déjà';
    END IF;
  END IF;
END$$
DELIMITER ;


#5-

DELIMITER $$

CREATE PROCEDURE Crediter_Interets()
BEGIN
  DECLARE done INT DEFAULT 0;
  DECLARE v_num INT;
  DECLARE v_solde DECIMAL(15,2);
  DECLARE cur CURSOR FOR SELECT NumCompte, solde FROM Compte WHERE TypeCompte = 'CE';
  DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = 1;

  OPEN cur;
  boucle: LOOP
    FETCH cur INTO v_num, v_solde;
    IF done THEN LEAVE boucle; END IF;

    UPDATE Compte SET solde = solde + (v_solde * 0.01) WHERE NumCompte = v_num;

    INSERT INTO Operation (TypeOp, MontantOp, NumCpt)
    VALUES ('INTERET', v_solde * 0.01, v_num);
  END LOOP;
  CLOSE cur;
END$$
DELIMITER ;

CALL Crediter_Interets();

#6-

DELIMITER $$

DELIMITER $$

CREATE PROCEDURE Appliquer_Frais()
BEGIN
  DECLARE done INT DEFAULT 0;
  DECLARE v_num INT;
  DECLARE cur CURSOR FOR
    SELECT DISTINCT NumCpt
    FROM Operation
    WHERE TypeOp = 'RETRAIT' AND MontantOp > 10000
      AND DateOp >= NOW() - INTERVAL 30 DAY;
  DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = 1;

  OPEN cur;
  boucle: LOOP
    FETCH cur INTO v_num;
    IF done THEN LEAVE boucle; END IF;

    UPDATE Compte SET solde = solde - 50 WHERE NumCompte = v_num;

    INSERT INTO Operation (TypeOp, MontantOp, NumCpt)
    VALUES ('FRAIS', 50, v_num);
  END LOOP;
  CLOSE cur;
END$$
DELIMITER ;




DELIMITER ;
