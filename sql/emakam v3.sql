-- phpMyAdmin SQL Dump
-- version 4.8.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 12, 2018 at 08:04 AM
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
-- Table structure for table `blok_makam`
--

CREATE TABLE `blok_makam` (
  `id_blok` int(11) NOT NULL,
  `id_tpu` int(11) NOT NULL,
  `kode_blok` varchar(45) DEFAULT NULL,
  `area_peta_blok` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `blok_makam`
--

INSERT INTO `blok_makam` (`id_blok`, `id_tpu`, `kode_blok`, `area_peta_blok`) VALUES
(1, 1, '1', 123),
(2, 1, '2', 3425435),
(3, 2, '3', 3452354),
(4, 2, '69', NULL),
(5, 1, '322', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `makam`
--

CREATE TABLE `makam` (
  `id_makam` int(11) NOT NULL,
  `nomor_makam` int(11) DEFAULT NULL,
  `kode_makam` varchar(45) DEFAULT NULL,
  `id_blok` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `makam`
--

INSERT INTO `makam` (`id_makam`, `nomor_makam`, `kode_makam`, `id_blok`) VALUES
(1, 890, 'makam1', 1),
(2, 69, 'makam2', 2),
(3, 322, 'makam3', 3);

-- --------------------------------------------------------

--
-- Table structure for table `penghuni_makam`
--

CREATE TABLE `penghuni_makam` (
  `id_penghuni_makam` int(11) NOT NULL,
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

INSERT INTO `penghuni_makam` (`id_penghuni_makam`, `nama`, `alamat_terakhir`, `tanggal_wafat`, `status`, `id_makam`, `nama_ahli_waris`, `alamat_ahli_waris`, `nik_ahli_waris`, `kontak_ahli_waris`) VALUES
(1, 'Manusia', 'Bumi', '2018-07-01 00:00:00', 123, 1, 'Nabi Adam', 'surga', '123456789', '+62'),
(2, 'Abdul', 'konohagakure', '2018-07-03 00:00:00', 1, 1, 'Dulab', 'idem', '6123123', '1241'),
(3, 'Bedu', 'veteran sanaan dikit', '2018-07-01 00:00:00', 1, 3, 'Beni', 'idem', '4123412', '3211'),
(4, 'Cindy', 'sebelahnya abdul', '2018-07-14 00:00:00', 1, 2, 'Chakra', 'idem', '121234', '6123'),
(5, 'a', 'a1', '2018-07-12 00:00:00', 1, 1, 'ja1', 'ja2', 'ja3', '1234'),
(6, 'b', 'b1', '2018-07-21 00:00:00', 1, 3, 'ib1', 'ib2', 'ib3', '8374'),
(7, 'c', 'c1', '2018-07-22 00:00:00', 1, 2, 'hc1', 'hc2', 'hc3', '8123'),
(8, 'd', 'd1', '2018-07-11 00:00:00', 1, 1, 'gd1', 'gd2', 'gd3', '3418'),
(9, 'e', 'e1', '2018-07-23 00:00:00', 1, 3, 'fe1', 'fe2', 'fe3', '3811'),
(10, 'f', 'f1', '2018-07-10 00:00:00', 1, 2, 'ef1', 'ef2', 'ef3', '4581'),
(11, 'g', 'g1', '2018-07-09 00:00:00', 1, 1, 'dg1', 'dg2', 'dg3', '7817'),
(12, 'h', 'h1', '2018-07-03 00:00:00', 1, 3, 'ch1', 'ch2', 'ch3', '1892'),
(13, 'i', 'i1', '2018-07-24 00:00:00', 1, 2, 'bi1', 'bi2', 'bi3', '4893'),
(14, 'j', 'j1', '2018-07-15 00:00:00', 1, 2, 'aj1', 'aj2', 'aj3', '6792'),
(15, 'dudul', 'disebelahnya adam', '2018-07-19 00:00:00', 1, 1, 'siapapun', 'disebelahnya adam juga', '1234123', '1234213');

-- --------------------------------------------------------

--
-- Table structure for table `role_tpu`
--

CREATE TABLE `role_tpu` (
  `id_role_tpu` int(11) NOT NULL,
  `id_tpu` int(11) NOT NULL,
  `id_user` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `role_tpu`
--

INSERT INTO `role_tpu` (`id_role_tpu`, `id_tpu`, `id_user`) VALUES
(1, 1, 1),
(2, 1, 2);

-- --------------------------------------------------------

--
-- Table structure for table `tpu`
--

CREATE TABLE `tpu` (
  `id_tpu` int(11) NOT NULL,
  `nama_tpu` varchar(45) DEFAULT NULL,
  `kode_tpu` varchar(10) DEFAULT NULL,
  `alamat_tpu` varchar(45) DEFAULT NULL,
  `area_peta_tpu` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tpu`
--

INSERT INTO `tpu` (`id_tpu`, `nama_tpu`, `kode_tpu`, `alamat_tpu`, `area_peta_tpu`) VALUES
(1, 'TPU Kasin Malang', 'MalangTPU1', 'Malang', 123123),
(2, 'TPU xxx', 'MalangTPU2', 'Malang', 98890),
(3, 'TPU sebelahnya kasin', 'TPUMalang3', 'Ngalam', NULL),
(4, 'TPU GreenGarden', NULL, 'Ngalam', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id_user` int(11) NOT NULL,
  `username` varchar(45) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `role` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id_user`, `username`, `password`, `role`) VALUES
(1, 'firman', 'password', 1),
(2, 'urubneg', 'genburu', 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `blok_makam`
--
ALTER TABLE `blok_makam`
  ADD PRIMARY KEY (`id_blok`),
  ADD KEY `fk_blok_makam_tpu_idx` (`id_tpu`);

--
-- Indexes for table `makam`
--
ALTER TABLE `makam`
  ADD PRIMARY KEY (`id_makam`),
  ADD KEY `fk_makam_blok_makam1_idx` (`id_blok`);

--
-- Indexes for table `penghuni_makam`
--
ALTER TABLE `penghuni_makam`
  ADD PRIMARY KEY (`id_penghuni_makam`),
  ADD KEY `fk_penghuni_makam_makam1_idx` (`id_makam`);

--
-- Indexes for table `role_tpu`
--
ALTER TABLE `role_tpu`
  ADD PRIMARY KEY (`id_role_tpu`),
  ADD KEY `fk_role_tpu_tpu1_idx` (`id_tpu`),
  ADD KEY `fk_role_tpu_user1_idx` (`id_user`);

--
-- Indexes for table `tpu`
--
ALTER TABLE `tpu`
  ADD PRIMARY KEY (`id_tpu`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id_user`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `blok_makam`
--
ALTER TABLE `blok_makam`
  MODIFY `id_blok` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `makam`
--
ALTER TABLE `makam`
  MODIFY `id_makam` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `penghuni_makam`
--
ALTER TABLE `penghuni_makam`
  MODIFY `id_penghuni_makam` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `role_tpu`
--
ALTER TABLE `role_tpu`
  MODIFY `id_role_tpu` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `tpu`
--
ALTER TABLE `tpu`
  MODIFY `id_tpu` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id_user` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `blok_makam`
--
ALTER TABLE `blok_makam`
  ADD CONSTRAINT `blok_makam_ibfk_1` FOREIGN KEY (`id_tpu`) REFERENCES `tpu` (`id_tpu`);

--
-- Constraints for table `makam`
--
ALTER TABLE `makam`
  ADD CONSTRAINT `makam_ibfk_1` FOREIGN KEY (`id_blok`) REFERENCES `blok_makam` (`id_blok`);

--
-- Constraints for table `penghuni_makam`
--
ALTER TABLE `penghuni_makam`
  ADD CONSTRAINT `penghuni_makam_ibfk_1` FOREIGN KEY (`id_makam`) REFERENCES `makam` (`id_makam`);

--
-- Constraints for table `role_tpu`
--
ALTER TABLE `role_tpu`
  ADD CONSTRAINT `role_tpu_ibfk_1` FOREIGN KEY (`id_tpu`) REFERENCES `tpu` (`id_tpu`),
  ADD CONSTRAINT `role_tpu_ibfk_2` FOREIGN KEY (`id_user`) REFERENCES `user` (`id_user`),
  ADD CONSTRAINT `role_tpu_ibfk_3` FOREIGN KEY (`id_role_tpu`) REFERENCES `tpu` (`id_tpu`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
