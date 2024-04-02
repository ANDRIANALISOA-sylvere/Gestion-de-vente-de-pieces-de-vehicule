-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : mar. 02 avr. 2024 à 09:19
-- Version du serveur : 8.0.31
-- Version de PHP : 8.0.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `gestion_vente`
--

-- --------------------------------------------------------

--
-- Structure de la table `articlescommandes`
--

DROP TABLE IF EXISTS `articlescommandes`;
CREATE TABLE IF NOT EXISTS `articlescommandes` (
  `ArticleCommandeId` varchar(50) NOT NULL,
  `CommandeId` varchar(50) NOT NULL,
  `ProduitId` int NOT NULL,
  `quantite` int NOT NULL,
  `PrixUnitaire` int NOT NULL,
  PRIMARY KEY (`ArticleCommandeId`),
  KEY `CommandeId` (`CommandeId`),
  KEY `ProduitId` (`ProduitId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Structure de la table `articlespanier`
--

DROP TABLE IF EXISTS `articlespanier`;
CREATE TABLE IF NOT EXISTS `articlespanier` (
  `ArticlePanierId` varchar(50) NOT NULL,
  `PanierId` varchar(50) NOT NULL,
  `ProduitId` varchar(50) NOT NULL,
  `quantite` int NOT NULL,
  PRIMARY KEY (`ArticlePanierId`),
  KEY `PanierId` (`PanierId`),
  KEY `ProduitId` (`ProduitId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Structure de la table `categorie`
--

DROP TABLE IF EXISTS `categorie`;
CREATE TABLE IF NOT EXISTS `categorie` (
  `CategorieId` varchar(50) NOT NULL,
  `Nom` varchar(150) NOT NULL,
  PRIMARY KEY (`CategorieId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Structure de la table `clients`
--

DROP TABLE IF EXISTS `clients`;
CREATE TABLE IF NOT EXISTS `clients` (
  `ClientId` varchar(50) NOT NULL,
  `Nom` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `Prenom` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `mot_passe` varchar(8) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `adresse` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `ville` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `province` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `code_postal` varchar(3) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `pays` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`ClientId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Structure de la table `commandes`
--

DROP TABLE IF EXISTS `commandes`;
CREATE TABLE IF NOT EXISTS `commandes` (
  `CommandeId` varchar(50) NOT NULL,
  `ClientId` varchar(50) NOT NULL,
  `DateCommande` date NOT NULL,
  `AdresseLivraison` varchar(255) NOT NULL,
  `TotalCommande` int NOT NULL,
  PRIMARY KEY (`CommandeId`),
  KEY `ClientId` (`ClientId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Structure de la table `marque`
--

DROP TABLE IF EXISTS `marque`;
CREATE TABLE IF NOT EXISTS `marque` (
  `MarqueId` varchar(50) NOT NULL,
  `Nom` varchar(50) NOT NULL,
  PRIMARY KEY (`MarqueId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `marque`
--

INSERT INTO `marque` (`MarqueId`, `Nom`) VALUES
('vf', 'vd');

-- --------------------------------------------------------

--
-- Structure de la table `paiements`
--

DROP TABLE IF EXISTS `paiements`;
CREATE TABLE IF NOT EXISTS `paiements` (
  `PaiementId` varchar(50) NOT NULL,
  `CommandeId` varchar(50) NOT NULL,
  `Montant` int NOT NULL,
  `ModePaiement` varchar(155) NOT NULL,
  PRIMARY KEY (`PaiementId`),
  KEY `CommandeId` (`CommandeId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Structure de la table `panier`
--

DROP TABLE IF EXISTS `panier`;
CREATE TABLE IF NOT EXISTS `panier` (
  `PanierId` varchar(50) NOT NULL,
  `ClienId` varchar(50) NOT NULL,
  `DateCreation` date NOT NULL,
  PRIMARY KEY (`PanierId`),
  KEY `ClienId` (`ClienId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Structure de la table `produits`
--

DROP TABLE IF EXISTS `produits`;
CREATE TABLE IF NOT EXISTS `produits` (
  `ProduitId` varchar(50) NOT NULL,
  `Nom` varchar(255) NOT NULL,
  `Description` varchar(255) NOT NULL,
  `prix` int NOT NULL,
  `QuantiteStock` int NOT NULL,
  `CategorieId` varchar(50) NOT NULL,
  `MarqueId` varchar(50) NOT NULL,
  `CheminPhoto` varchar(255) NOT NULL,
  PRIMARY KEY (`ProduitId`),
  KEY `CategorieId` (`CategorieId`),
  KEY `MarqueId` (`MarqueId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `articlescommandes`
--
ALTER TABLE `articlescommandes`
  ADD CONSTRAINT `articlescommandes_ibfk_1` FOREIGN KEY (`CommandeId`) REFERENCES `commandes` (`CommandeId`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `articlespanier`
--
ALTER TABLE `articlespanier`
  ADD CONSTRAINT `articlespanier_ibfk_1` FOREIGN KEY (`ProduitId`) REFERENCES `produits` (`ProduitId`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `articlespanier_ibfk_2` FOREIGN KEY (`PanierId`) REFERENCES `panier` (`PanierId`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `commandes`
--
ALTER TABLE `commandes`
  ADD CONSTRAINT `commandes_ibfk_1` FOREIGN KEY (`ClientId`) REFERENCES `clients` (`ClientId`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `paiements`
--
ALTER TABLE `paiements`
  ADD CONSTRAINT `paiements_ibfk_1` FOREIGN KEY (`CommandeId`) REFERENCES `commandes` (`CommandeId`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `panier`
--
ALTER TABLE `panier`
  ADD CONSTRAINT `panier_ibfk_1` FOREIGN KEY (`ClienId`) REFERENCES `clients` (`ClientId`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `produits`
--
ALTER TABLE `produits`
  ADD CONSTRAINT `produits_ibfk_1` FOREIGN KEY (`CategorieId`) REFERENCES `categorie` (`CategorieId`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `produits_ibfk_2` FOREIGN KEY (`MarqueId`) REFERENCES `marque` (`MarqueId`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
