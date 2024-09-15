-- Création de la base de données
CREATE DATABASE IF NOT EXISTS doublage_db;
USE doublage_db;

-- Table des utilisateurs
CREATE TABLE utilisateurs (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nom VARCHAR(100) NOT NULL,
    prenom VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    mot_de_passe VARCHAR(255) NOT NULL,
    role ENUM('doubleur', 'directeur_artistique', 'maison_production', 'admin') NOT NULL,
    date_inscription DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Table des maisons de production
CREATE TABLE maisons_production (
    id INT PRIMARY KEY AUTO_INCREMENT,
    id_utilisateur INT,
    nom VARCHAR(100) NOT NULL,
    FOREIGN KEY (id_utilisateur) REFERENCES utilisateurs(id)
);

-- Table des films
CREATE TABLE films (
    id INT PRIMARY KEY AUTO_INCREMENT,
    titre VARCHAR(255) NOT NULL,
    description TEXT,
    date_sortie DATE,
    id_production INT,
    statut ENUM('en_vente', 'en_production', 'termine') DEFAULT 'en_vente',
    FOREIGN KEY (id_production) REFERENCES maisons_production(id)
);

-- Table des rôles dans les films
CREATE TABLE roles (
    id INT PRIMARY KEY AUTO_INCREMENT,
    id_film INT,
    nom_personnage VARCHAR(100) NOT NULL,
    description TEXT,
    FOREIGN KEY (id_film) REFERENCES films(id)
);

-- Table de liaison entre directeurs artistiques et films
CREATE TABLE film_da (
    id INT PRIMARY KEY AUTO_INCREMENT,
    id_film INT,
    id_da INT,
    date_attribution DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_film) REFERENCES films(id),
    FOREIGN KEY (id_da) REFERENCES utilisateurs(id)
);

-- Table des contrats
CREATE TABLE contrats (
    id INT PRIMARY KEY AUTO_INCREMENT,
    id_utilisateur INT,
    id_film INT,
    id_role INT,
    date_debut DATE,
    date_fin DATE,
    statut ENUM('en_attente', 'accepte', 'refuse', 'termine') DEFAULT 'en_attente',
    FOREIGN KEY (id_utilisateur) REFERENCES utilisateurs(id),
    FOREIGN KEY (id_film) REFERENCES films(id),
    FOREIGN KEY (id_role) REFERENCES roles(id)
);

-- Table des disponibilités des doubleurs
CREATE TABLE disponibilites (
    id INT PRIMARY KEY AUTO_INCREMENT,
    id_doubleur INT,
    date_debut DATETIME,
    date_fin DATETIME,
    FOREIGN KEY (id_doubleur) REFERENCES utilisateurs(id)
);

-- Table des messages
CREATE TABLE messages (
    id INT PRIMARY KEY AUTO_INCREMENT,
    id_expediteur INT,
    id_destinataire INT,
    contenu TEXT,
    date_envoi DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_expediteur) REFERENCES utilisateurs(id),
    FOREIGN KEY (id_destinataire) REFERENCES utilisateurs(id)
);

-- Table des candidatures DA pour les films
CREATE TABLE candidatures_da (
    id INT PRIMARY KEY AUTO_INCREMENT,
    id_da INT,
    id_film INT,
    date_candidature DATETIME DEFAULT CURRENT_TIMESTAMP,
    statut ENUM('en_attente', 'acceptee', 'refusee') DEFAULT 'en_attente',
    FOREIGN KEY (id_da) REFERENCES utilisateurs(id),
    FOREIGN KEY (id_film) REFERENCES films(id)
);

-- Index pour optimiser les recherches fréquentes
CREATE INDEX idx_film_statut ON films(statut);
CREATE INDEX idx_utilisateur_role ON utilisateurs(role);
CREATE INDEX idx_contrat_statut ON contrats(statut);
CREATE INDEX idx_candidature_statut ON candidatures_da(statut);

-- Ajout des infos du film 
ALTER TABLE films
ADD COLUMN image VARCHAR(255) DEFAULT NULL,
ADD COLUMN duree INT DEFAULT NULL,
ADD COLUMN pays_origine VARCHAR(100) DEFAULT NULL,
ADD COLUMN realisateur VARCHAR(255) DEFAULT NULL,
ADD COLUMN scenaristes TEXT DEFAULT NULL,
ADD COLUMN genres VARCHAR(255) DEFAULT NULL,
ADD COLUMN budget DECIMAL(15,2) DEFAULT NULL,
ADD COLUMN nb_personnages_parlants INT DEFAULT NULL,
ADD COLUMN langue_originale VARCHAR(50) DEFAULT NULL,
ADD COLUMN notes_critiques DECIMAL(3,1) DEFAULT NULL,
ADD COLUMN lien_bande_annonce VARCHAR(255) DEFAULT NULL,
ADD COLUMN date_limite_doublage DATE DEFAULT NULL;

--Ajout des infos du rôle 
ALTER TABLE roles
ADD COLUMN importance VARCHAR(50) DEFAULT NULL,
ADD COLUMN acteur_original VARCHAR(100)  DEFAULT NULL,
ADD COLUMN sexe ENUM('Masculin', 'Féminin', 'Autre')  DEFAULT NULL,
ADD COLUMN age_approximatif INT  DEFAULT NULL,
ADD COLUMN accent_requis VARCHAR(100)  DEFAULT NULL,
ADD COLUMN particularites_voix TEXT  DEFAULT NULL,
ADD COLUMN nombre_scenes INT  DEFAULT NULL,
ADD COLUMN nombre_mots INT  DEFAULT NULL,
ADD COLUMN contexte_personnage TEXT  DEFAULT NULL,
ADD COLUMN notes_doublage TEXT  DEFAULT NULL,
ADD COLUMN statut_casting ENUM('À attribuer', 'Attribué', 'En cours d''enregistrement', 'Terminé') DEFAULT 'À attribuer';

-- Ajout d'un champs supprime pour ne plus afficher les films supprimé
ALTER TABLE `films` ADD `supprime` INT NOT NULL DEFAULT '0' AFTER `date_limite_doublage`; 