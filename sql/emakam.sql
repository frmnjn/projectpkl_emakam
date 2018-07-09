-- phpMyAdmin SQL Dump
-- version 4.8.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 06, 2018 at 06:20 AM
-- Server version: 10.1.33-MariaDB
-- PHP Version: 7.2.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `emakam`
--
CREATE DATABASE IF NOT EXISTS `emakam` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `emakam`;

-- --------------------------------------------------------

--
-- Table structure for table `penghuni_makam`
--

CREATE TABLE `penghuni_makam` (
  `id` int(11) NOT NULL,
  `nama` varchar(45) DEFAULT NULL,
  `alamat_terakhir` varchar(45) DEFAULT NULL,
  `tanggal_wafat` datetime DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  `id_makam` int(11) NOT NULL,
  `nama_ahli_waris` varchar(45) DEFAULT NULL,
  `alamat_ahli_waris` varchar(45) DEFAULT NULL,
  `nik_ahli_waris` varchar(45) DEFAULT NULL,
  `kontak_ahli_waris` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `penghuni_makam`
--

INSERT INTO `penghuni_makam` (`id`, `nama`, `alamat_terakhir`, `tanggal_wafat`, `status`, `id_makam`, `nama_ahli_waris`, `alamat_ahli_waris`, `nik_ahli_waris`, `kontak_ahli_waris`) VALUES
(1, 'manusia', 'bumi', '2018-07-01 00:00:00', 1, 1, 'nabi adam', 'surga', 'surga001', '+62');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `penghuni_makam`
--
ALTER TABLE `penghuni_makam`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `penghuni_makam`
--
ALTER TABLE `penghuni_makam`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
