-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le :  Dim 21 juin 2020 à 21:59
-- Version du serveur :  10.4.10-MariaDB
-- Version de PHP :  7.3.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `groupomania`
--

-- --------------------------------------------------------

--
-- Structure de la table `comments`
--

DROP TABLE IF EXISTS `comments`;
CREATE TABLE IF NOT EXISTS `comments` (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `userId` int(10) UNSIGNED NOT NULL,
  `postId` int(10) UNSIGNED NOT NULL,
  `date` datetime NOT NULL DEFAULT current_timestamp(),
  `comContent` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_comments_postId` (`postId`),
  KEY `fk_comments_userId` (`userId`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `comments`
--

INSERT INTO `comments` (`id`, `userId`, `postId`, `date`, `comContent`) VALUES
(13, 25, 14, '2020-06-09 14:59:08', 'auto commentaire'),
(23, 25, 14, '2020-06-15 16:55:41', 'encore un com'),
(24, 25, 18, '2020-06-15 17:11:16', '<script>alert(\'test\');</script>'),
(26, 2, 18, '2020-06-16 22:44:45', 'un com de plus');

-- --------------------------------------------------------

--
-- Structure de la table `likes`
--

DROP TABLE IF EXISTS `likes`;
CREATE TABLE IF NOT EXISTS `likes` (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `postId` int(10) UNSIGNED NOT NULL,
  `userId` int(10) UNSIGNED NOT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  KEY `fk_like_postId` (`postId`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `likes`
--

INSERT INTO `likes` (`id`, `postId`, `userId`) VALUES
(5, 23, 25);

-- --------------------------------------------------------

--
-- Structure de la table `posts`
--

DROP TABLE IF EXISTS `posts`;
CREATE TABLE IF NOT EXISTS `posts` (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `userId` int(10) UNSIGNED NOT NULL,
  `title` varchar(50) NOT NULL,
  `content` text NOT NULL,
  `date` datetime NOT NULL,
  `likes` int(10) UNSIGNED NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  KEY `fk_userId` (`userId`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `posts`
--

INSERT INTO `posts` (`id`, `userId`, `title`, `content`, `date`, `likes`) VALUES
(2, 2, 'Mon premier post (Delphine)', 'post blabla ', '2020-05-27 11:59:56', 0),
(14, 25, 'titre modif', 'et contenu modifié', '2020-06-09 14:37:58', 0),
(18, 25, 'essai de script', '<script>alert(\'test\');</script>', '2020-06-15 16:59:53', 0),
(19, 27, 'post de oui', 'oui oui', '2020-06-15 17:54:36', 0),
(23, 25, 'je veux écrire un très très très grand titre', '\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent lobortis faucibus tellus, a porta nunc euismod ac. In pellentesque tempus efficitur. Aenean condimentum ultricies faucibus. Curabitur nulla urna, bibendum a euismod vitae, pulvinar fringilla justo. Nulla bibendum consequat augue lacinia blandit. Sed elit libero, mollis sit amet congue sed, fermentum quis leo. Praesent eu feugiat diam. Vestibulum posuere risus nunc, et fringilla ante aliquet sed. Pellentesque eu velit turpis. Proin molestie mauris vel eros consequat egestas. Phasellus sed convallis tellus. Aenean dictum dui vitae ligula facilisis, in tincidunt purus auctor.\n\nDuis elit sapien, ultricies sit amet dui hendrerit, facilisis ullamcorper mi. Mauris non dui mauris. Donec id lectus tristique, euismod nunc nec, sollicitudin dui. Vestibulum ullamcorper sapien vitae libero blandit tempus. Aliquam facilisis vitae tellus vel elementum. Vestibulum pretium auctor dui. Proin et suscipit massa, sit amet dapibus nulla tortor. ', '2020-06-16 22:31:28', 1);

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `lastName` varchar(255) NOT NULL,
  `firstName` varchar(255) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `moderation` int(11) UNSIGNED DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id`, `lastName`, `firstName`, `email`, `password`, `moderation`) VALUES
(2, 'Violette', 'Delphine', 'delphine@test.fr', '$2b$10$.VGiPKdsz3TNk9i0jbsHJejZUmc9It/OEoPkfihVkyvPGd1BOGOzu', NULL),
(25, 'Charlie', 'Rose', 'rose@test.fr', '$2b$10$bH4KkGcbZqtXrAiwrzYN9.mZhuiDC80EoKVIPDgyo5YrjE11Xn5eW', 1),
(27, 'oui', 'oui', 'oui@test.fr', '$2b$10$CdkeiymjdVJarXbbodGuJeVbyApMpMF2xo9KMIEIBASVDvq8Oe1PW', NULL);

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `comments`
--
ALTER TABLE `comments`
  ADD CONSTRAINT `fk_comments_postId` FOREIGN KEY (`postId`) REFERENCES `posts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_comments_userId` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `likes`
--
ALTER TABLE `likes`
  ADD CONSTRAINT `fk_like_postId` FOREIGN KEY (`postId`) REFERENCES `posts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_like_userId` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_likes_postId` FOREIGN KEY (`postId`) REFERENCES `posts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_likes_userId` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `posts`
--
ALTER TABLE `posts`
  ADD CONSTRAINT `fk_userId` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
