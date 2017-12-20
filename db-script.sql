-- --------------------------------------------------------
-- Hôte :                        127.0.0.1
-- Version du serveur:           10.1.21-MariaDB - mariadb.org binary distribution
-- SE du serveur:                Win32
-- HeidiSQL Version:             9.4.0.5125
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- Export de la structure de la base pour clickingdeadv2
CREATE DATABASE IF NOT EXISTS `clickingdeadv2` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `clickingdeadv2`;


-- Export de données de la table clickingdeadv2.accountachievement : ~4 rows (environ)
/*!40000 ALTER TABLE `accountachievement` DISABLE KEYS */;
INSERT INTO `accountachievement` (`iduser`, `idachievement`, `createdAt`, `updatedAt`) VALUES
	(1, 1, '2017-12-20 12:34:48', '2017-12-20 12:34:48'),
	(1, 2, '2017-12-20 12:35:03', '2017-12-20 12:35:03'),
	(1, 8, '2017-12-20 12:35:03', '2017-12-20 12:35:03'),
	(1, 19, '2017-12-20 12:34:51', '2017-12-20 12:34:51');
/*!40000 ALTER TABLE `accountachievement` ENABLE KEYS */;

-- Export de la structure de la table clickingdeadv2. accountautoclicker


-- Export de données de la table clickingdeadv2.accountautoclicker : ~0 rows (environ)
/*!40000 ALTER TABLE `accountautoclicker` DISABLE KEYS */;
/*!40000 ALTER TABLE `accountautoclicker` ENABLE KEYS */;

-- Export de la structure de la table clickingdeadv2. accounts
CREATE TABLE IF NOT EXISTS `accounts` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `nickname` varchar(20) NOT NULL,
  `password` char(60) NOT NULL,
  `email` varchar(60) NOT NULL,
  `nbzombies` bigint(11) NOT NULL,
  `nbhumains` bigint(11) NOT NULL,
  `score` double NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;

-- Export de données de la table clickingdeadv2.accounts : ~12 rows (environ)
/*!40000 ALTER TABLE `accounts` DISABLE KEYS */;
INSERT INTO `accounts` (`id`, `nickname`, `password`, `email`, `nbzombies`, `nbhumains`, `score`, `createdAt`, `updatedAt`) VALUES
	(1, 'Admin', '$2a$10$Yt/Ln82SNcIkuXaGSjQ73uAabf5tzOKSgwTnLpczldLugESAB4MLy', 'admin@ad.min', 0, 7000000000, 0, '2017-12-08 14:57:53', '2017-12-20 14:43:39'),
	(2, 'Test', '$2a$10$WhLf42wWV7yjevB19dgzPezdUwBteAwqHPPhxCSQPM4irj/6eY7sy', '', 0, 0, 10, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
	(3, 'Syn', '$2a$10$PNGlXLPPDuVpWUY8q1ZbqeBZG5r/sgDui8zRhIFAVGr5x.C0bObzq', '', 0, 0, 37, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
	(4, 'Testscore', '$2a$10$/rCzzYkqI3n52pE3StTxNeEmlyuTA958hZt/C1BHQHbmVsA4QpLYi', '', 0, 0, 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
	(5, 'test1', '$2a$10$WHpZSFCik6TPk/L.WuOpcuPYe5c7sRAjKN.6AmUPxCt1hLrNxfPSG', '', 0, 0, 23, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
	(6, 'Test2', '$2a$10$QfUb.0kweBJt.kBcG5QF0eWA8M/yZDCu/MV9wPvEopVIxq39jOJwi', '', 0, 0, 3, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
	(7, 'test3', '$2a$10$AyKYJQwiLcr.pEtXtk4dReSeTnDKkF6ApUKXlq4HOq8mBeGU7Zz6m', '', 0, 0, 17, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
	(8, 'test4', '$2a$10$9YYEuJp0g811vVb3KSim6uwYKRfPQe0gk.TdwsSEuSZqvc7tvPV.G', '', 0, 0, 2, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
	(9, 'test5', '$2a$10$E7pzvxhGANwO3jbYjTCZ8Ohq7Kr3RV0oZtABSuqWc8x0wL5U9DxEC', '', 0, 0, 55, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
	(10, 'test6', '$2a$10$Qy7kLahp6uL4I0TVSmHzbuolyxh9JDsgSLdELt9SABnP5fVoz2ce2', '', 0, 0, 51, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
	(11, 'test8', '$2a$10$C0y7qcREYbjExV8yXz3FgOl9fXduVTNFAzc3KbosMpStnJulPViPu', '', 0, 0, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
	(12, 'test9', '$2a$10$d/jPLIRissOKuJoVHBW9jeGF.ihL5wSkMcAUgWsObrvNToGLVcpVK', '', 0, 0, 15, '0000-00-00 00:00:00', '0000-00-00 00:00:00');
/*!40000 ALTER TABLE `accounts` ENABLE KEYS */;

-- Export de la structure de la table clickingdeadv2. achievement
CREATE TABLE IF NOT EXISTS `achievement` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `libelle` varchar(40) NOT NULL,
  `description` varchar(200) NOT NULL,
  `image` varchar(120) NOT NULL,
  `points` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8;

-- Export de données de la table clickingdeadv2.achievement : ~22 rows (environ)
/*!40000 ALTER TABLE `achievement` DISABLE KEYS */;
INSERT INTO `achievement` (`id`, `libelle`, `description`, `image`, `points`, `createdAt`, `updatedAt`) VALUES
	(1, 'First Bite', 'first human infected', 'https://img15.hostingpics.net/pics/455947firstBite.png', 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
	(2, 'One for all', 'first continent totally infected', 'https://img15.hostingpics.net/pics/168069oneForAll.png', 2, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
	(3, 'A zombie to rule them all', 'All humans infected', '', 3, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
	(4, 'Zombrexit', 'All Europe infected', 'https://img15.hostingpics.net/pics/421689mapeurope.png', 4, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
	(5, 'Tentacle Madness', 'All Asia infected', 'https://img15.hostingpics.net/pics/729630mapasia.png', 5, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
	(6, 'Fast Food', 'All North America infected', 'https://img15.hostingpics.net/pics/734540mapNAmerica.png', 6, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
	(7, 'No more hunger', 'All Africa infected', 'https://img15.hostingpics.net/pics/944262mapafrica.png', 7, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
	(8, 'Welcome to nopeland !', 'All Oceania infected', 'https://img15.hostingpics.net/pics/701412mapoceania.png', 8, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
	(9, 'The wall is broken', 'All South America infected', 'https://img15.hostingpics.net/pics/879740mapSAmerica.png', 10, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
	(10, 'Click and Furious', '10 clicks in one second', '', 11, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
	(11, 'Do you know how fast you were clicking ?', '100 clicks in one second', '', 12, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
	(12, '1337 h4x0r', '1000 clicks in one second', '', 13, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
	(13, 'Karma is a bitch', 'Human are taking over your zombies', 'https://img15.hostingpics.net/pics/486896humankarma.png', 14, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
	(14, 'Evolution is a lie', 'Upgrade your zombies for the first time', 'https://img15.hostingpics.net/pics/675957amelioevolution.png', 15, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
	(15, 'The game, you just lost it', 'Lose against the humans', '', 16, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
	(16, 'U n00b', 'Lose on the first continent', '', 17, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
	(17, 'Veggie', 'Win without eating anybody', '', 18, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
	(18, 'Best username ever', 'create a profile with a username like xX_foobar_Xx', '', 19, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
	(19, 'Squad', '10 people infected', 'https://img15.hostingpics.net/pics/445334squad.png', 20, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
	(20, 'Beginning of Invasion', '50 people infected', 'https://img15.hostingpics.net/pics/935826invasion.png', 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
	(21, 'Creation of an army', '100 people infected', 'https://img15.hostingpics.net/pics/878751army.png', 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
	(22, 'Purge', '500 people infected', 'https://img15.hostingpics.net/pics/124191purge.png', 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00');
/*!40000 ALTER TABLE `achievement` ENABLE KEYS */;

-- Export de la structure de la table clickingdeadv2. autoclicker
CREATE TABLE IF NOT EXISTS `autoclicker` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `nb` int(10) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Export de données de la table clickingdeadv2.autoclicker : ~0 rows (environ)
/*!40000 ALTER TABLE `autoclicker` DISABLE KEYS */;
/*!40000 ALTER TABLE `autoclicker` ENABLE KEYS */;

-- Export de la structure de la table clickingdeadv2. leaderboards
CREATE TABLE IF NOT EXISTS `leaderboards` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nickname` varchar(255) DEFAULT NULL,
  `score` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- Export de la structure de la table clickingdeadv2. accountachievement
CREATE TABLE IF NOT EXISTS `accountachievement` (
  `iduser` int(10) NOT NULL,
  `idachievement` int(10) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`iduser`,`idachievement`),
  KEY `idachievement` (`idachievement`),
  CONSTRAINT `accountachievement_ibfk_1` FOREIGN KEY (`iduser`) REFERENCES `accounts` (`id`),
  CONSTRAINT `accountachievement_ibfk_2` FOREIGN KEY (`idachievement`) REFERENCES `achievement` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `accountautoclicker` (
  `iduser` int(10) NOT NULL,
  `idautoclicker` int(10) NOT NULL,
  `owned` int(10) NOT NULL,
  `upgrade` int(10) NOT NULL,
  PRIMARY KEY (`iduser`,`idautoclicker`),
  KEY `idautoclicker` (`idautoclicker`),
  CONSTRAINT `accountautoclickerr_ibfk_1` FOREIGN KEY (`iduser`) REFERENCES `accounts` (`id`),
  CONSTRAINT `accountautoclickerr_ibfk_2` FOREIGN KEY (`idautoclicker`) REFERENCES `autoclicker` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
-- Export de données de la table clickingdeadv2.leaderboards : ~2 rows (environ)
/*!40000 ALTER TABLE `leaderboards` DISABLE KEYS */;
INSERT INTO `leaderboards` (`id`, `nickname`, `score`, `createdAt`, `updatedAt`) VALUES
	(1, 'Nereyde', 888888888, '2017-12-08 14:57:53', '2017-12-08 14:57:53'),
	(2, 'Jeremy', 999999999, '2017-12-08 14:57:53', '2017-12-08 14:57:53');
/*!40000 ALTER TABLE `leaderboards` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
