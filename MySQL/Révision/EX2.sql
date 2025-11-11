#1-
CREATE DATABASE FastFoodDelivery;
USE FastFoodDelivery;


CREATE TABLE Batterie (
    id INT PRIMARY KEY AUTO_INCREMENT,
    numero_serie VARCHAR(50) UNIQUE NOT NULL,
    capacite DECIMAL(10,2) NOT NULL,
    sante_batterie INT NOT NULL,
    nombre_cycles INT NOT NULL,
    statut VARCHAR(50) NOT NULL
);

CREATE TABLE Technicien (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nom VARCHAR(100) NOT NULL,
    telephone VARCHAR(20),
    email VARCHAR(100),
    specialite VARCHAR(100)
);

CREATE TABLE Velo (
    id INT PRIMARY KEY AUTO_INCREMENT,
    matricule VARCHAR(50) UNIQUE NOT NULL,
    id_batterie INT,
    date_derniere_maintenance DATE,
    date_prochaine_maintenance DATE,
    FOREIGN KEY (id_batterie) REFERENCES Batterie(id)
);

CREATE TABLE Changement (
    id INT PRIMARY KEY AUTO_INCREMENT,
    id_velo INT NOT NULL,
    id_ancienne_batterie INT NOT NULL,
    id_nouvelle_batterie INT NOT NULL,
    date_changement DATE NOT NULL,
    id_technicien INT NOT NULL,
    raison VARCHAR(200),
    FOREIGN KEY (id_velo) REFERENCES Velo(id),
    FOREIGN KEY (id_ancienne_batterie) REFERENCES Batterie(id),
    FOREIGN KEY (id_nouvelle_batterie) REFERENCES Batterie(id),
    FOREIGN KEY (id_technicien) REFERENCES Technicien(id)
);

#2-

ALTER TABLE Velo ADD COLUMN nb_batteries INT UNSIGNED NOT NULL DEFAULT 0;

#3-

DELIMITER $$
CREATE TRIGGER TR1 BEFORE INSERT ON Batterie
FOR EACH ROW
BEGIN
    IF NEW.sante_batterie < 0 OR NEW.sante_batterie > 100 THEN
        SIGNAL SQLSTATE '45000' 
        SET MESSAGE_TEXT = 'La santé de la batterie doit être comprise entre 0 et 100';
    END IF;
END$$
DELIMITER ;

#4-

DELIMITER $$
CREATE TRIGGER TR2 AFTER INSERT ON Changement
FOR EACH ROW
BEGIN
	UPDATE Batterie
    SET statue = 'Retiré'
    WHERE id = NEW.id_ancienne_batterie;
END$$
DELIMITER ;

#5-

DELIMITER $$
CREATE FUNCTION FCT1(id_velo_param INT) RETURNS INT
READS SQL DATA
BEGIN
    DECLARE nb_batteries INT;
    
    SELECT COUNT(*) INTO nb_batteries
    FROM Changement
    WHERE id_velo = id_velo_param;
    
    RETURN nb_batteries;
END$$
DELIMITER ;

