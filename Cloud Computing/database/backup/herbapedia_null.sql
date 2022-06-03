-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 03, 2022 at 10:47 AM
-- Server version: 10.4.13-MariaDB
-- PHP Version: 7.4.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `herbapedia`
--

-- --------------------------------------------------------

--
-- Table structure for table `benefits`
--

CREATE TABLE `benefits` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `plant_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `locations`
--

CREATE TABLE `locations` (
  `id` int(11) NOT NULL,
  `lat` float DEFAULT NULL,
  `long` float DEFAULT NULL,
  `plant_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `nutritions`
--

CREATE TABLE `nutritions` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `plants`
--

CREATE TABLE `plants` (
  `id` int(11) NOT NULL,
  `name` varchar(45) DEFAULT NULL,
  `latin_name` varchar(45) DEFAULT NULL,
  `desc` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `plants_nutritions`
--

CREATE TABLE `plants_nutritions` (
  `plant_id` int(11) NOT NULL,
  `nutrition_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(45) DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `token` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `benefits`
--
ALTER TABLE `benefits`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_benefits_plants1_idx` (`plant_id`);

--
-- Indexes for table `locations`
--
ALTER TABLE `locations`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_loccations_plants1_idx` (`plant_id`);

--
-- Indexes for table `nutritions`
--
ALTER TABLE `nutritions`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `plants`
--
ALTER TABLE `plants`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `plants_nutritions`
--
ALTER TABLE `plants_nutritions`
  ADD PRIMARY KEY (`plant_id`,`nutrition_id`),
  ADD KEY `fk_plants_has_nutritions_nutritions1_idx` (`nutrition_id`),
  ADD KEY `fk_plants_has_nutritions_plants_idx` (`plant_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `benefits`
--
ALTER TABLE `benefits`
  ADD CONSTRAINT `fk_benefits_plants1` FOREIGN KEY (`plant_id`) REFERENCES `plants` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `locations`
--
ALTER TABLE `locations`
  ADD CONSTRAINT `fk_loccations_plants1` FOREIGN KEY (`plant_id`) REFERENCES `plants` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `plants_nutritions`
--
ALTER TABLE `plants_nutritions`
  ADD CONSTRAINT `fk_plants_has_nutritions_nutritions1` FOREIGN KEY (`nutrition_id`) REFERENCES `nutritions` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_plants_has_nutritions_plants` FOREIGN KEY (`plant_id`) REFERENCES `plants` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
