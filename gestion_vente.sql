-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : jeu. 23 mai 2024 à 09:30
-- Version du serveur : 10.4.32-MariaDB
-- Version de PHP : 8.2.12

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
-- Structure de la table `categorie`
--

CREATE TABLE `categorie` (
  `ID_Categorie` varchar(20) NOT NULL,
  `Nom` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `categorie`
--

INSERT INTO `categorie` (`ID_Categorie`, `Nom`) VALUES
('CAT001', 'Pièces de moteur'),
('CAT002', 'Pièces de freinage'),
('CAT003', 'Pièces de suspension'),
('CAT004', 'Pièces de transmission'),
('CAT005', 'Pièces électriques'),
('CAT006', 'Pièces de carrosserie'),
('CAT007', 'Accessoires intérieurs'),
('CAT008', 'Accessoires extérieurs'),
('CAT009', 'Outillage'),
('CAT010', 'Lubrifiants'),
('CAT011', 'Pièces de refroidissement'),
('CAT012', 'Pièces d\'échappement'),
('CAT013', 'Pièces de direction'),
('CAT014', 'Pièces d\'éclairage'),
('CAT015', 'Pièces de châssis'),
('CAT016', 'Pièces de climatisation'),
('CAT017', 'Pièces de sécurité'),
('CAT018', 'Pièces de confort'),
('CAT019', 'Pièces de performance'),
('CAT020', 'Pièces de décoration'),
('CAT021', 'Pièces de nettoyage'),
('CAT022', 'Pièces de réparation'),
('CAT023', 'Pièces de remplacement'),
('CAT024', 'Pièces de maintenance'),
('CAT025', 'Pièces de diagnostic'),
('CAT026', 'Pièces de transformation'),
('CAT027', 'Pièces de personnalisation'),
('CAT028', 'Pièces de protection'),
('CAT029', 'Pièces de sécurité routière'),
('CAT030', 'Pièces de remise à neuf');

-- --------------------------------------------------------

--
-- Structure de la table `clients`
--

CREATE TABLE `clients` (
  `ID_Client` varchar(50) NOT NULL,
  `Nom` varchar(255) NOT NULL,
  `adresse` varchar(255) NOT NULL,
  `Tel` varchar(10) NOT NULL,
  `email` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `clients`
--

INSERT INTO `clients` (`ID_Client`, `Nom`, `adresse`, `Tel`, `email`) VALUES
('CLI001', 'John Doe', '123 Rue principale, Ville A', '0612345678', 'john.doe@example.com'),
('CLI002', 'Jane Smith', '456 Avenue des Fleurs, Ville B', '0723456789', 'jane.smith@example.com'),
('CLI003', 'Bob Johnson', '789 Impasse des Chênes, Ville C', '0834567890', 'bob.johnson@example.com'),
('CLI004', 'Alice Williams', '1011 Rue des Érables, Ville D', '0945678901', 'alice.williams@example.com'),
('CLI005', 'Tom Brown', '1213 Boulevard du Parc, Ville E', '0156789012', 'tom.brown@example.com'),
('CLI006', 'Sarah Davis', '1415 Allée des Tilleuls, Ville F', '0267890123', 'sarah.davis@example.com'),
('CLI007', 'Michael Wilson', '1617 Rue des Peupliers, Ville G', '0378901234', 'michael.wilson@example.com'),
('CLI008', 'Emily Anderson', '1819 Avenue des Chênes, Ville H', '0489012345', 'emily.anderson@example.com'),
('CLI009', 'David Taylor', '2021 Impasse des Bouleaux, Ville I', '0590123456', 'david.taylor@gmail.com'),
('CLI010', 'Sophia Martinez', '2223 Rue des Sapins, Ville J', '0601234567', 'sophia.martinez@example.com'),
('CLI011', 'Daniel Hernandez', '2425 Boulevard des Tilleuls, Ville K', '0712345678', 'daniel.hernandez@example.com'),
('CLI012', 'Olivia Gonzalez', '2627 Allée des Érables, Ville L', '0823456789', 'olivia.gonzalez@example.com'),
('CLI013', 'William Perez', '2829 Rue des Peupliers, Ville M', '0934567890', 'william.perez@example.com'),
('CLI014', 'Emma Sanchez', '3031 Avenue des Chênes, Ville N', '0145678901', 'emma.sanchez@example.com'),
('CLI015', 'Joseph Rodriguez', '3233 Impasse des Bouleaux, Ville O', '0256789012', 'joseph.rodriguez@example.com'),
('CLI016', 'Isabella Ramirez', '3435 Rue des Sapins, Ville P', '0367890123', 'isabella.ramirez@example.com'),
('CLI017', 'Matthew Torres', '3637 Boulevard des Tilleuls, Ville Q', '0478901234', 'matthew.torres@example.com'),
('CLI018', 'Mia Rivera', '3839 Allée des Érables, Ville R', '0589012345', 'mia.rivera@example.com'),
('CLI019', 'Jacob Flores', '4041 Rue des Peupliers, Ville S', '0690123456', 'jacob.flores@example.com'),
('CLI020', 'Abigail Gomez', '4243 Avenue des Chênes, Ville T', '0701234567', 'abigail.gomez@example.com'),
('CLI021', 'Michael Diaz', '4445 Impasse des Bouleaux, Ville U', '0812345678', 'michael.diaz@example.com'),
('CLI022', 'Emily Garcia', '4647 Rue des Sapins, Ville V', '0923456789', 'emily.garcia@example.com'),
('CLI023', 'David Gutierrez', '4849 Boulevard des Tilleuls, Ville W', '0134567890', 'david.gutierrez@example.com'),
('CLI024', 'Sophia Chavez', '5051 Allée des Érables, Ville X', '0245678901', 'sophia.chavez@example.com'),
('CLI025', 'Daniel Castillo', '5253 Rue des Peupliers, Ville Y', '0356789012', 'daniel.castillo@example.com'),
('CLI026', 'Olivia Vargas', '5455 Avenue des Chênes, Ville Z', '0467890123', 'olivia.vargas@example.com'),
('CLI027', 'William Fernandez', '5657 Impasse des Bouleaux, Ville A1', '0578901234', 'william.fernandez@example.com'),
('CLI028', 'Emma Morales', '5859 Rue des Sapins, Ville B1', '0689012345', 'emma.morales@example.com'),
('CLI029', 'Joseph Jimenez', '6061 Boulevard des Tilleuls, Ville C1', '0790123456', 'joseph.jimenez@example.com'),
('CLI030', 'Isabella Gonzalez', '6263 Allée des Érables, Ville D1', '0801234567', 'isabella.gonzalez@example.com');

-- --------------------------------------------------------

--
-- Structure de la table `commandes`
--

CREATE TABLE `commandes` (
  `ID_Commande` varchar(20) NOT NULL,
  `ID_Client` varchar(50) NOT NULL,
  `DateCommande` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `commandes`
--

INSERT INTO `commandes` (`ID_Commande`, `ID_Client`, `DateCommande`) VALUES
('cmd001', 'CLI009', '2024-04-27'),
('cmd0010', 'CLI009', '2024-05-19'),
('CMD0011', 'CLI007', '2024-05-09'),
('cmd0015', 'CLI012', '2024-05-03'),
('cmd002', 'CLI009', '2024-04-27'),
('cmd003', 'CLI009', '2024-04-28'),
('cmd0034', 'CLI002', '2024-04-18'),
('cmd004', 'CLI010', '2024-04-28'),
('cmd0045', 'CLI027', '2024-05-12'),
('cmd005', 'CLI005', '2024-04-30'),
('cmd0067', 'CLI004', '2024-05-25'),
('cmd008', 'CLI005', '2024-04-27');

-- --------------------------------------------------------

--
-- Structure de la table `commande_details`
--

CREATE TABLE `commande_details` (
  `id` int(11) NOT NULL,
  `id_commande` varchar(20) NOT NULL,
  `id_produit` varchar(20) NOT NULL,
  `quantite` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `commande_details`
--

INSERT INTO `commande_details` (`id`, `id_commande`, `id_produit`, `quantite`) VALUES
(62, 'cmd001', 'PIE005', 2),
(63, 'cmd002', 'PIE008', 2),
(64, 'cmd002', 'PIE009', 2),
(65, 'cmd008', 'PIE001', 3),
(66, 'cmd003', 'PIE005', 3),
(67, 'cmd004', 'PIE001', 1),
(68, 'cmd005', 'PIE005', 5),
(69, 'cmd0010', 'PIE005', 3),
(70, 'CMD0011', 'PIE005', 3),
(71, 'cmd0034', 'PIE001', 0),
(72, 'cmd0015', 'PIE006', 2),
(73, 'cmd0045', 'PIE009', 2),
(74, 'cmd0067', 'PIE009', 3);

-- --------------------------------------------------------

--
-- Structure de la table `entree_stock`
--

CREATE TABLE `entree_stock` (
  `ID_Entree` int(11) NOT NULL,
  `Date_entree` date NOT NULL,
  `ID_Piece` varchar(20) NOT NULL,
  `ID_Fournisseur` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `fournisseurs`
--

CREATE TABLE `fournisseurs` (
  `ID_Fournisseur` varchar(20) NOT NULL,
  `Nom` varchar(255) NOT NULL,
  `Adresse` varchar(255) NOT NULL,
  `Tel` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `fournisseurs`
--

INSERT INTO `fournisseurs` (`ID_Fournisseur`, `Nom`, `Adresse`, `Tel`) VALUES
('FOU001', 'AutoParts Inc.', '12 Rue de l\'Industrie, Ville X', '0412345678'),
('FOU002', 'CarPartners', '34 Avenue des Entrepreneurs, Ville Y', '0523456789'),
('FOU003', 'VehicleSolutions', '56 Boulevard de la Performance, Ville Z', '0634567890'),
('FOU004', 'AutomotivePro', '78 Rue des Mécaniciens, Ville A', '0745678901'),
('FOU005', 'CarPartsMaster', '90 Avenue des Réparateurs, Ville B', '0745678903'),
('FOU006', 'VehiclePartners', '123 Boulevard de l\'Automobile, Ville C', '0967890123'),
('FOU008', 'CarPartsPlanet', '167 Avenue des Techniciens, Ville E', '0289012345'),
('FOU009', 'VehiclePartsPro', '189 Boulevard des Équipementiers, Ville F', '0390123456'),
('FOU010', 'AutomotiveSupplies', '211 Rue des Réparateurs, Ville G', '0401234567'),
('FOU011', 'CarPartsWarehouse', '233 Avenue des Mécaniciens, Ville H', '0512345678'),
('FOU012', 'VehiclePartsMaster', '255 Boulevard de l\'Automobile, Ville I', '0623456789'),
('FOU013', 'AutoPartsSolutions', '277 Rue des Garagistes, Ville J', '0734567890'),
('FOU014', 'CarPartsUnlimited', '299 Avenue des Techniciens, Ville K', '0845678901'),
('FOU015', 'VehiclePartsExpress', '321 Boulevard des Équipementiers, Ville L', '0956789012'),
('FOU016', 'AutomotiveDirect', '343 Rue des Réparateurs, Ville M', '0167890123'),
('FOU017', 'CarPartsGalaxy', '365 Avenue des Mécaniciens, Ville N', '0278901234'),
('FOU018', 'VehiclePartsWorld', '387 Boulevard de l\'Automobile, Ville O', '0389012345'),
('FOU019', 'AutoPartsNation', '409 Rue des Garagistes, Ville P', '0490123456'),
('FOU020', 'CarPartsGlobal', '431 Avenue des Techniciens, Ville Q', '0501234567'),
('FOU021', 'VehiclePartsAlliance', '453 Boulevard des Équipementiers, Ville R', '0612345678'),
('FOU022', 'AutomotiveSuppliers', '475 Rue des Réparateurs, Ville S', '0723456789'),
('FOU023', 'CarPartsUniverse', '497 Avenue des Mécaniciens, Ville T', '0834567890'),
('FOU024', 'VehiclePartsPrime', '519 Boulevard de l\'Automobile, Ville U', '0945678901'),
('FOU025', 'AutoPartsEmporium', '541 Rue des Garagistes, Ville V', '0156789012'),
('FOU026', 'CarPartsDepot', '563 Avenue des Techniciens, Ville W', '0267890123'),
('FOU027', 'VehiclePartsMart', '585 Boulevard des Équipementiers, Ville X', '0378901234'),
('FOU028', 'AutomotiveOutlet', '607 Rue des Réparateurs, Ville Y', '0489012345'),
('FOU029', 'CarPartsPlaza', '629 Avenue des Mécaniciens, Ville Z', '0590123456'),
('FOU030', 'VehiclePartsShop', '651 Boulevard de l\'Automobile, Ville A1', '0601234567');

-- --------------------------------------------------------

--
-- Structure de la table `marque`
--

CREATE TABLE `marque` (
  `ID_Marque` varchar(20) NOT NULL,
  `Nom` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `marque`
--

INSERT INTO `marque` (`ID_Marque`, `Nom`) VALUES
('MAR001', 'Toyota'),
('MAR002', 'Honda'),
('MAR003', 'Ford'),
('MAR004', 'Chevrolet'),
('MAR005', 'Nissan'),
('MAR006', 'Volkswagen'),
('MAR007', 'BMW'),
('MAR008', 'Mercedes-Benz'),
('MAR009', 'Audit'),
('MAR010', 'Hyundai'),
('MAR011', 'Kia'),
('MAR012', 'Mazda'),
('MAR013', 'Subaru'),
('MAR014', 'Mitsubishi'),
('MAR015', 'Suzuki'),
('MAR016', 'Lexus'),
('MAR017', 'Infiniti'),
('MAR018', 'Acura'),
('MAR019', 'Volvo'),
('MAR020', 'Land Rover'),
('MAR021', 'Jaguar'),
('MAR022', 'Porsche'),
('MAR023', 'Jeep'),
('MAR024', 'Chrysler'),
('MAR025', 'Dodge'),
('MAR026', 'Ram'),
('MAR027', 'GMC'),
('MAR028', 'Cadillac'),
('MAR029', 'Lincoln'),
('MAR030', 'Buick');

-- --------------------------------------------------------

--
-- Structure de la table `pieces`
--

CREATE TABLE `pieces` (
  `ID_Piece` varchar(20) NOT NULL,
  `Nom` varchar(255) NOT NULL,
  `Prix_unitaire_ht` int(11) NOT NULL,
  `ID_Categorie` varchar(20) NOT NULL,
  `ID_marque` varchar(20) NOT NULL,
  `Stock_disponible` int(11) NOT NULL,
  `ID_Fournisseur` varchar(20) NOT NULL,
  `TVA` int(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `pieces`
--

INSERT INTO `pieces` (`ID_Piece`, `Nom`, `Prix_unitaire_ht`, `ID_Categorie`, `ID_marque`, `Stock_disponible`, `ID_Fournisseur`, `TVA`) VALUES
('PIE001', 'Moteur', 30000, 'CAT001', 'MAR001', 5, 'FOU001', 20),
('PIE002', 'Plaquettes de frein', 39000, 'CAT002', 'MAR002', 0, 'FOU002', 20),
('PIE003', 'Amortisseur avant', 89000, 'CAT003', 'MAR003', 2, 'FOU003', 20),
('PIE004', 'Embrayage', 19000, 'CAT004', 'MAR004', 1, 'FOU004', 20),
('PIE005', 'Alternateur', 15000, 'CAT005', 'MAR005', 10, 'FOU005', 20),
('PIE006', 'Rétroviseur extérieur', 69000, 'CAT006', 'MAR006', 0, 'FOU006', 20),
('PIE008', 'Déflecteur de capot', 32000, 'CAT008', 'MAR008', 21, 'FOU008', 20),
('PIE009', 'Clé à cliquet', 14000, 'CAT009', 'MAR009', 0, 'FOU009', 20),
('PIE010', 'Huile moteur', 24000, 'CAT010', 'MAR010', 9, 'FOU010', 20),
('PIE011', 'Pompe à eau', 79000, 'CAT011', 'MAR011', 19, 'FOU011', 20),
('PIE012', 'Silencieux échappement', 23000, 'CAT012', 'MAR012', 23, 'FOU012', 20);

-- --------------------------------------------------------

--
-- Structure de la table `sortie_stock`
--

CREATE TABLE `sortie_stock` (
  `ID_Sortie` int(11) NOT NULL,
  `Date_Sortie` date NOT NULL,
  `ID_Piece` varchar(20) NOT NULL,
  `Quantite` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `utilisateur`
--

CREATE TABLE `utilisateur` (
  `matricule` varchar(20) NOT NULL,
  `nom` varchar(20) NOT NULL,
  `prenom` varchar(20) NOT NULL,
  `email` varchar(30) NOT NULL,
  `mdp` varchar(80) NOT NULL,
  `role` varchar(15) NOT NULL,
  `otp` varchar(250) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `utilisateur`
--

INSERT INTO `utilisateur` (`matricule`, `nom`, `prenom`, `email`, `mdp`, `role`, `otp`) VALUES
('E1', 'ANDRIANALISOA', 'Joséphin Sylvère', 'josephinsylvere@gmail.com', '$2b$10$oC9juVJw16rkBxPlvjoy1eklfBW85l88/OdpBe8n3Tl5/PFi0ylz6', 'Administrateur', NULL),
('E2', 'RAZAFITSALAMA', 'Sandra Laëticia', 'sandrarazafitsalama@gmail.com', '$2b$10$G/DLppTdY1GkXwZsvuMe0OABTg.6TnsI.TNGjrlE3JdqxO0cMWTsa', 'Employé', NULL);

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `categorie`
--
ALTER TABLE `categorie`
  ADD PRIMARY KEY (`ID_Categorie`);

--
-- Index pour la table `clients`
--
ALTER TABLE `clients`
  ADD PRIMARY KEY (`ID_Client`);

--
-- Index pour la table `commandes`
--
ALTER TABLE `commandes`
  ADD PRIMARY KEY (`ID_Commande`),
  ADD UNIQUE KEY `ID_Commande` (`ID_Commande`),
  ADD KEY `ClientId` (`ID_Client`);

--
-- Index pour la table `commande_details`
--
ALTER TABLE `commande_details`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_commande` (`id_commande`);

--
-- Index pour la table `entree_stock`
--
ALTER TABLE `entree_stock`
  ADD PRIMARY KEY (`ID_Entree`),
  ADD KEY `ID_Piece` (`ID_Piece`,`ID_Fournisseur`),
  ADD KEY `ID_Fournisseur` (`ID_Fournisseur`);

--
-- Index pour la table `fournisseurs`
--
ALTER TABLE `fournisseurs`
  ADD PRIMARY KEY (`ID_Fournisseur`);

--
-- Index pour la table `marque`
--
ALTER TABLE `marque`
  ADD PRIMARY KEY (`ID_Marque`);

--
-- Index pour la table `pieces`
--
ALTER TABLE `pieces`
  ADD PRIMARY KEY (`ID_Piece`),
  ADD KEY `ID_Categorie` (`ID_Categorie`,`ID_marque`),
  ADD KEY `ID_Fournisseur` (`ID_Fournisseur`),
  ADD KEY `ID_marque` (`ID_marque`);

--
-- Index pour la table `sortie_stock`
--
ALTER TABLE `sortie_stock`
  ADD PRIMARY KEY (`ID_Sortie`),
  ADD KEY `ID_Piece` (`ID_Piece`);

--
-- Index pour la table `utilisateur`
--
ALTER TABLE `utilisateur`
  ADD PRIMARY KEY (`matricule`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `commande_details`
--
ALTER TABLE `commande_details`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=75;

--
-- AUTO_INCREMENT pour la table `entree_stock`
--
ALTER TABLE `entree_stock`
  MODIFY `ID_Entree` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `sortie_stock`
--
ALTER TABLE `sortie_stock`
  MODIFY `ID_Sortie` int(11) NOT NULL AUTO_INCREMENT;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `commandes`
--
ALTER TABLE `commandes`
  ADD CONSTRAINT `commandes_ibfk_1` FOREIGN KEY (`ID_Client`) REFERENCES `clients` (`ID_Client`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `commande_details`
--
ALTER TABLE `commande_details`
  ADD CONSTRAINT `commande_details_ibfk_1` FOREIGN KEY (`id_commande`) REFERENCES `commandes` (`ID_Commande`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `entree_stock`
--
ALTER TABLE `entree_stock`
  ADD CONSTRAINT `entree_stock_ibfk_1` FOREIGN KEY (`ID_Fournisseur`) REFERENCES `fournisseurs` (`ID_Fournisseur`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `entree_stock_ibfk_2` FOREIGN KEY (`ID_Piece`) REFERENCES `pieces` (`ID_Piece`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `pieces`
--
ALTER TABLE `pieces`
  ADD CONSTRAINT `pieces_ibfk_1` FOREIGN KEY (`ID_Fournisseur`) REFERENCES `fournisseurs` (`ID_Fournisseur`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `pieces_ibfk_2` FOREIGN KEY (`ID_Categorie`) REFERENCES `categorie` (`ID_Categorie`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `pieces_ibfk_3` FOREIGN KEY (`ID_marque`) REFERENCES `marque` (`ID_Marque`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `sortie_stock`
--
ALTER TABLE `sortie_stock`
  ADD CONSTRAINT `sortie_stock_ibfk_1` FOREIGN KEY (`ID_Piece`) REFERENCES `pieces` (`ID_Piece`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
