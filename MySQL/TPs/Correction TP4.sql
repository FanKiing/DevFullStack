CREATE DATABASE LeGourmetRS;
USE LeGourmetRS;

CREATE TABLE IF NOT EXISTS produits (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nom VARCHAR(255) NOT NULL,
    quantite_stock INT NOT NULL CHECK (quantite_stock >= 0),
    prix_unitaire DECIMAL(10,2) NOT NULL CHECK (prix_unitaire >= 0)
);

CREATE TABLE IF NOT EXISTS commandes (
    id INT PRIMARY KEY AUTO_INCREMENT,
    produit_id INT NOT NULL,
    quantite INT NOT NULL CHECK (quantite >= 1),
    total DECIMAL(10,2) NOT NULL,
    date_commande DATETIME DEFAULT CURRENT_TIMESTAMP,
    statut ENUM('EN_ATTENTE', 'VALIDEE', 'ANNULEE') DEFAULT 'EN_ATTENTE',
    FOREIGN KEY (produit_id) REFERENCES produits(id)
);

CREATE TABLE IF NOT EXISTS alertes_stock (
    id INT PRIMARY KEY AUTO_INCREMENT,
    produit_id INT NOT NULL,
    quantite_actuelle INT NOT NULL,
    date_alerte DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (produit_id) REFERENCES produits(id)
);


DELIMITER //
#1-

CREATE PROCEDURE sp_valider_commande(IN p_commande_id INT)
BEGIN
    DECLARE v_produit_id INT;
    DECLARE v_quantite INT;
    DECLARE v_stock_actuel INT;

    SELECT produit_id, quantite INTO v_produit_id, v_quantite
    FROM commandes
    WHERE id = p_commande_id AND statut = 'EN_ATTENTE';

    IF v_produit_id IS NULL THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Commande introuvable ou déjà traitée';
    END IF;

    SELECT quantite_stock INTO v_stock_actuel
    FROM produits
    WHERE id = v_produit_id;

    IF v_stock_actuel < v_quantite THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Stock insuffisant';
    END IF;

    UPDATE produits
    SET quantite_stock = quantite_stock - v_quantite
    WHERE id = v_produit_id;

    UPDATE commandes
    SET statut = 'VALIDEE'
    WHERE id = p_commande_id;

END //
DELIMITER ;


DELIMITER //
#2-

CREATE PROCEDURE sp_annuler_commande(IN p_command_id INT)
BEGIN
	DECLARE v_produit_id INT;
    DECLARE v_quantite INT;
    DECLARE v_statut VARCHAR(20);
    
    SELECT produit_id, quantite, statut INTO v_produit_id, v_quantite, v_statut
    FROM commandes
    
    WHERE id = p_commande_id;
    
	IF v_produit_id IS NULL THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Commande introuvable';
    END IF;


    IF v_statut = 'VALIDEE' THEN
        UPDATE produits
        SET quantite_stock = quantite_stock + v_quantite
        WHERE id = v_produit_id;
    END IF;


    UPDATE commandes
    SET statut = 'ANNULEE'
    WHERE id = p_commande_id;

END //
 DELIMITER ;   
 
 
 
 #3-
 
DELIMITER //

CREATE EVENT ev_annulation_auto
ON SCHEDULE EVERY 1 DAY
STARTS CURRENT_TIMESTAMP
DO
BEGIN
    DECLARE done INT DEFAULT FALSE;
    DECLARE cmd_id INT;
    DECLARE cur CURSOR FOR 
        SELECT id FROM commandes 
        WHERE statut = 'EN_ATTENTE' AND date_commande < NOW() - INTERVAL 2 DAY;
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = TRUE;

    OPEN cur;
    read_loop: LOOP
        FETCH cur INTO cmd_id;
        IF done THEN
            LEAVE read_loop;
        END IF;
        CALL sp_annuler_commande(cmd_id);
    END LOOP;
    CLOSE cur;
END //

DELIMITER ;
 
DELIMITER //
 
#4-

CREATE PROCEDURE sp_guard_stock()
BEGIN
    IF EXISTS (SELECT 1 FROM produits WHERE quantite_stock <= 0) THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Produit(s) avec stock négatif ou nul détecté(s)';
    END IF;
END //
DELIMITER ;

DELIMITER //

#5-

CREATE PROCEDURE sp_ajouter_produit(
	IN p_nom VARCHAR(255),
    IN p_quantite_stock INT,
    IN p_prix_unitaire DECIMAL (10,2)
)

BEGIN
	IF p_quantite_stock < 0 OR p_prix_unitaire < 0 THEN 
    SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Quantité ou prix négatif interdit';
    END IF;

    INSERT INTO produits (nom, quantite_stock, prix_unitaire)
    VALUES (p_nom, p_quantite_stock, p_prix_unitaire);
END //
DELIMITER ;


DELIMITER //

#6-

CREATE PROCEDURE sp_supprimer_commande(IN p_commande_id INT)
BEGIN
    DECLARE v_statut VARCHAR(20);

    SELECT statut INTO v_statut
    FROM commandes
    WHERE id = p_commande_id;

    IF v_statut IS NULL THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Commande introuvable';
    END IF;

    IF v_statut != 'EN_ATTENTE' THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Impossible de supprimer une commande déjà validée ou annulée';
    END IF;

    DELETE FROM commandes WHERE id = p_commande_id;
END //

DELIMITER ;

DELIMITER //

#7-











DELIMITER ;