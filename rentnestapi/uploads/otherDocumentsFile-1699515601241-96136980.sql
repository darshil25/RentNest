-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 08, 2023 at 01:46 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `waitlift`
--

-- --------------------------------------------------------

--
-- Table structure for table `equipmentqueue`
--

CREATE TABLE `equipmentqueue` (
  `equipmentqueueId` int(11) NOT NULL,
  `gymId` int(11) NOT NULL DEFAULT 0,
  `equipmentId` int(11) NOT NULL DEFAULT 0,
  `userId` int(11) NOT NULL DEFAULT 0,
  `duration` varchar(8) DEFAULT NULL,
  `startTime` time NOT NULL,
  `endTime` time NOT NULL,
  `start` varchar(30) DEFAULT NULL,
  `end` varchar(30) DEFAULT NULL,
  `created` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `is_exit` tinyint(4) NOT NULL DEFAULT 0,
  `delete` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `equipmentqueue`
--

INSERT INTO `equipmentqueue` (`equipmentqueueId`, `gymId`, `equipmentId`, `userId`, `duration`, `startTime`, `endTime`, `start`, `end`, `created`, `updated`, `is_exit`, `delete`) VALUES
(1, 1, 20, 10, '12', '17:28:59', '17:40:59', '2023-11-01 17:28:59', '2023-11-01 17:40:59', '2023-11-01 06:28:59', '2023-11-01 06:28:59', 0, 0),
(2, 1, 16, 10, '10', '17:29:04', '17:39:04', '2023-11-01 17:29:04', '2023-11-01 17:39:04', '2023-11-01 06:29:04', '2023-11-01 06:29:04', 0, 0),
(3, 1, 17, 10, '14', '17:29:09', '17:43:09', '2023-11-01 17:29:09', '2023-11-01 17:43:09', '2023-11-01 06:29:09', '2023-11-01 06:29:09', 0, 0),
(4, 1, 18, 10, '6', '17:29:15', '17:35:15', '2023-11-01 17:29:15', '2023-11-01 17:35:15', '2023-11-01 06:29:15', '2023-11-01 06:29:15', 0, 0),
(5, 1, 18, 10, '6', '17:35:15', '17:41:15', '2023-11-01 17:35:15', '2023-11-01 17:41:15', '2023-11-01 06:29:45', '2023-11-01 06:29:45', 0, 0),
(6, 1, 18, 10, '6', '17:41:15', '17:47:15', '2023-11-01 17:41:15', '2023-11-01 17:47:15', '2023-11-01 06:31:14', '2023-11-01 06:31:14', 0, 0),
(7, 1, 21, 10, '20', '17:44:43', '18:04:43', '2023-11-01 17:44:43', '2023-11-01 18:04:43', '2023-11-01 06:44:43', '2023-11-01 06:44:43', 0, 0),
(8, 1, 21, 10, '20', '18:04:43', '18:24:43', '2023-11-01 18:04:43', '2023-11-01 18:24:43', '2023-11-01 06:44:46', '2023-11-01 06:44:46', 0, 0),
(9, 1, 15, 10, '15', '18:24:43', '18:40:00', '2023-11-01 18:24:43', '2023-11-01 18:40:00', '2023-11-01 06:45:00', '2023-11-08 12:45:45', 0, 0),
(10, 1, 17, 11, '14', '18:40:00', '19:10:10', '2023-11-01 18:40:00', '2023-11-01 19:10:10', '2023-11-01 06:45:10', '2023-11-08 12:46:08', 0, 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `equipmentqueue`
--
ALTER TABLE `equipmentqueue`
  ADD PRIMARY KEY (`equipmentqueueId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `equipmentqueue`
--
ALTER TABLE `equipmentqueue`
  MODIFY `equipmentqueueId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
