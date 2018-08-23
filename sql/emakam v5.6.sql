-- phpMyAdmin SQL Dump
-- version 4.8.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 23, 2018 at 10:34 PM
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
(1, 1, 'KASIN-A', 123),
(2, 1, 'KASIN-B', 3425435),
(3, 2, 'XXX-A', 3452354),
(4, 2, 'XXX-B', NULL),
(5, 1, 'KASIN-C', NULL),
(6, 3, 'SAMAAN-A ', NULL),
(7, 4, 'GG-A', NULL),
(10, 4, 'GG-B', NULL),
(11, 4, 'GG-C', NULL),
(12, 5, 'A-1', NULL),
(13, 5, 'A-2', NULL),
(14, 5, 'A-3', NULL),
(15, 6, 'ASOY-A', NULL),
(18, 6, 'ASOY-B', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `dokumen`
--

CREATE TABLE `dokumen` (
  `id` int(11) NOT NULL,
  `nama_almarhum` varchar(20) DEFAULT NULL,
  `nama_pewaris` varchar(20) DEFAULT NULL,
  `email` varchar(50) NOT NULL,
  `file_ktp` varchar(255) DEFAULT NULL,
  `file_kk` varchar(255) DEFAULT NULL,
  `kelengkapan_dokumen` varchar(100) NOT NULL DEFAULT 'Tidak Lengkap',
  `status` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `dokumen`
--

INSERT INTO `dokumen` (`id`, `nama_almarhum`, `nama_pewaris`, `email`, `file_ktp`, `file_kk`, `kelengkapan_dokumen`, `status`) VALUES
(15, 'alm1', 'asd', '', 'public/files/file.jpg', 'public/files/photo.jpg', 'Lengkap', 'Menunggu Persetujuan Kepala Dinas'),
(16, 'alm2', 'asd', '', 'public/files/photo.pdf', 'public/files/file.pdf', 'Lengkap', 'Proses Selesai');

-- --------------------------------------------------------

--
-- Table structure for table `makam`
--

CREATE TABLE `makam` (
  `id_makam` int(11) NOT NULL,
  `nomor_makam` int(11) DEFAULT NULL,
  `kode_makam` varchar(45) DEFAULT NULL,
  `id_blok` int(11) NOT NULL,
  `lat` varchar(100) NOT NULL,
  `lng` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `makam`
--

INSERT INTO `makam` (`id_makam`, `nomor_makam`, `kode_makam`, `id_blok`, `lat`, `lng`) VALUES
(1, 890, 'KASIN-A-890', 1, '-7.952785518827597', '112.61465141466238'),
(2, 69, 'KASIN-B-69', 2, '-7.952155948546503', '112.61316922706146'),
(3, 322, 'KASIN-C-322', 5, '-7.95331148289619', '112.61356782846678'),
(4, 12, 'XXX-B-12', 4, '-7.953922605129994', '112.6122323857984'),
(5, 341, 'null-341', 3, '-7.951656541897828', '112.6141133646347'),
(6, 12312, 'XXX-B-12312', 4, '-7.946656362112344', '112.61682445323652'),
(10, 2, 'GG-B-2', 10, '-7.952820052190582', '112.61318532031555'),
(11, 1, 'GG-C-1', 11, '-7.953796884276093', '112.61485488711116'),
(12, 12, 'A-1-12', 12, '-7.954972048346357', '112.61320043874832');

-- --------------------------------------------------------

--
-- Table structure for table `notifikasi`
--

CREATE TABLE `notifikasi` (
  `id_notifikasi` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `content` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `penghuni_makam`
--

CREATE TABLE `penghuni_makam` (
  `id_penghuni_makam` int(11) NOT NULL,
  `nama` varchar(45) DEFAULT NULL,
  `alamat_terakhir` varchar(45) DEFAULT NULL,
  `tanggal_wafat` datetime DEFAULT NULL,
  `status` varchar(20) DEFAULT NULL,
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
(1, 'Manusia', 'Bumi', '2018-07-01 00:00:00', 'Ditimpa', 1, 'Nabi Adam', 'seberangnya abdul', '123456789', '+62'),
(2, 'Abdul', 'Sigura-gura', '2018-07-03 00:00:00', 'Ditimpa', 1, 'Dulab', 'idem', '6123123', '1241'),
(3, 'Bedu', 'Bendungan Hilir', '2018-07-01 00:00:00', 'Ditimpa', 3, 'Beni', 'idem', '4123412', '3211'),
(4, 'Cindy', 'Kerto-Kerto', '2018-07-14 00:00:00', 'Ditimpa', 2, 'Chakra', 'idem', '121234', '6123'),
(5, 'a', 'a1', '2018-07-12 00:00:00', 'Ditmpa', 1, 'ja1', 'ja2', 'ja3', '1234'),
(6, 'b', 'b1', '2018-07-21 00:00:00', 'Ditimpa', 3, 'ib1', 'ib2', 'ib3', '8374'),
(7, 'c', 'c1', '2018-07-22 00:00:00', 'Ditimpa', 2, 'hc1', 'hc2', 'hc3', '8123'),
(8, 'd', 'd1', '2018-07-11 00:00:00', 'Ditimpa', 1, 'gd1', 'gd2', 'gd3', '3418'),
(9, 'e', 'e1', '2018-07-23 00:00:00', 'Ditimpa', 3, 'fe1', 'fe2', 'fe3', '3811'),
(10, 'f', 'f1', '2018-07-10 00:00:00', 'Ditimpa', 2, 'ef1', 'ef2', 'ef3', '4581'),
(11, 'g', 'g1', '2018-07-09 00:00:00', 'Ditimpa', 1, 'dg1', 'dg2', 'dg3', '7817'),
(12, 'h', 'h1', '2018-07-03 00:00:00', 'Diperpanjang', 3, 'ch1', 'ch2', 'ch3', '1892'),
(13, 'i', 'i1', '2018-07-24 00:00:00', 'Ditimpa', 2, 'bi1', 'bi2', 'bi3', '4893'),
(14, 'j', 'j1', '2018-07-15 00:00:00', 'Ditimpa', 2, 'aj1', 'aj2', 'aj3', '6792'),
(15, 'dudul', 'disebelahnya adam', '2018-07-19 00:00:00', 'Ditimpa', 1, 'siapapun', 'disebelahnya adam juga', '1234123', '1234213'),
(18, 'asdasdasdad', 'asdasdasd', '2018-07-12 00:00:00', 'Ditimpa', 1, 'asdasd', 'adasd', 'asdasd', 'asdasd'),
(19, 'qasdasf', 'asdqwfs', '2018-07-09 00:00:00', 'Ditimpa', 1, 'aaaaaaaaaaa', 'bbbbbbbbbbbb', '111111111111', '222222222'),
(20, 'asdqwd', 'qwdqwe12', '2018-07-04 00:00:00', 'Ditimpa', 2, '12dwasdq', '21dwasd', '3333333333', '44444444444'),
(21, 'qwe', 'wqwe', '2018-07-10 00:00:00', 'Ditimpa', 2, 'qweqwe', 'qweqwe', '2222222222', '11111111'),
(22, 'Yukimak', 'disini aja', '2018-07-18 00:00:00', 'Expired', 5, 'kumikay', 'asdasd', '51345123', '1231523123'),
(23, 'dummy1', 'alamat dummy1', '2018-08-15 00:00:00', 'Ditimpa', 1, 'dudul', 'alamat dummy 1', '12312', '1231523123'),
(24, 'dummy2', 'alamat dummy2', '2018-08-16 00:00:00', 'Diperpanjang', 11, 'ahli waris dummy 2', 'alamat dummy 2', '444444444444', '33333333333333'),
(25, 'Rizal', 'Malang', '2018-02-28 00:00:00', NULL, 6, 'Firman', 'Malang', '12312', '0822');

-- --------------------------------------------------------

--
-- Table structure for table `polygon`
--

CREATE TABLE `polygon` (
  `id_polygon` int(11) NOT NULL,
  `id_blok` int(11) NOT NULL,
  `lat` varchar(100) NOT NULL,
  `lng` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `polygon`
--

INSERT INTO `polygon` (`id_polygon`, `id_blok`, `lat`, `lng`) VALUES
(14, 1, '-7.952832006046328', '112.61283826761473'),
(15, 1, '-7.953161401045218', '112.61292409830321'),
(16, 1, '-7.953023267690795', '112.6135356419586'),
(17, 1, '-7.952576990381623', '112.61362147264708'),
(23, 2, '-7.952343225882998', '112.61311185293425'),
(24, 2, '-7.952911698409032', '112.61266660623778'),
(25, 2, '-7.952869195817513', '112.61339616708983'),
(42, 4, '-7.953076395909545', '112.61282217436064'),
(43, 4, '-7.952428231170638', '112.61286508970488'),
(44, 4, '-7.952762939319455', '112.61353027754058'),
(50, 3, '-7.952948888172991', '112.61285436086882'),
(51, 3, '-7.952980765110841', '112.61325132780303'),
(52, 3, '-7.952449482489793', '112.61353027754058'),
(53, 3, '-7.952327287389608', '112.61291873388518'),
(54, 3, '-7.952566364725473', '112.61271488600005'),
(62, 5, '-7.953118898479589', '112.61268269949187'),
(63, 5, '-7.953357975354007', '112.61292409830321'),
(64, 5, '-7.953320785627145', '112.61327278547515'),
(65, 5, '-7.95306045744464', '112.61355709963073'),
(66, 5, '-7.952614180175923', '112.61362147264708'),
(67, 5, '-7.952576990381623', '112.61311721735228'),
(68, 5, '-7.952709811060108', '112.61268269949187'),
(84, 13, '-7.953097647195114', '112.61289191179503'),
(85, 13, '-7.952847944520112', '112.61273097925414'),
(86, 13, '-7.952454795319413', '112.61275243692626'),
(87, 13, '-7.952300723232575', '112.61305284433593'),
(88, 13, '-7.952316661727009', '112.61346590452422'),
(89, 13, '-7.952587616037477', '112.61364829473723'),
(90, 13, '-7.9528798214658', '112.61357855730284'),
(91, 13, '-7.953097647195114', '112.61342835359801'),
(107, 14, '-7.95237775928322', '112.61302334003676'),
(108, 14, '-7.952622149417128', '112.61289459400405'),
(109, 14, '-7.952919667644436', '112.61278194122542'),
(110, 14, '-7.952893103525773', '112.61328619652022'),
(111, 14, '-7.952595585279179', '112.61345249347914'),
(112, 14, '-7.952399010604997', '112.61318963699568'),
(113, 14, '-7.952298066816779', '112.613066255381'),
(114, 14, '-7.952260876993801', '112.61293214493026'),
(115, 14, '-7.95245213890461', '112.61285704307784'),
(116, 14, '-7.952553082654913', '112.61273902588118'),
(117, 14, '-7.952404323435265', '112.61264246635665'),
(118, 14, '-7.952584959623526', '112.61258882217635'),
(119, 14, '-7.952739031603599', '112.61258882217635'),
(120, 14, '-7.952935606114824', '112.6125620000862'),
(121, 14, '-7.953036549746125', '112.612706839373'),
(122, 15, '-7.952228999999987', '112.61273902588118'),
(123, 15, '-7.952361820791178', '112.61264246635665'),
(124, 15, '-7.95262746224451', '112.6128141277336'),
(125, 15, '-7.952361820791178', '112.61316281490554'),
(126, 15, '-7.952106804834116', '112.61287850074996'),
(146, 18, '-7.95235650796035', '112.6129750602745'),
(147, 18, '-7.952978108699447', '112.61278730564345'),
(148, 18, '-7.952213061502169', '112.61288922958602'),
(149, 18, '-7.952930293291424', '112.61325937443007'),
(150, 18, '-7.952202435836593', '112.61345785789717'),
(151, 18, '-7.9521652460049514', '112.61320036583174'),
(152, 18, '-7.952106804834116', '112.6130126112007'),
(153, 18, '-7.952446826074963', '112.61277121238936'),
(154, 18, '-7.952574333967607', '112.61264246635665');

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
(4, 4, 1),
(6, 2, 1),
(7, 1, 4),
(8, 1, 2),
(9, 4, 2),
(11, 2, 4),
(12, 4, 4),
(13, 5, 1),
(14, 3, 4),
(15, 5, 4),
(21, 6, 6);

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
(1, 'TPU Kasin Malang', 'KASIN', 'Malang', 123123),
(2, 'TPU xxx', 'XXX', 'Malang', 98890),
(3, 'TPU Samaan', 'SAMAAN', 'Ngalam', NULL),
(4, 'TPU GreenGarden', 'GG', 'Ngalam', NULL),
(5, 'TPU A', 'A', 'Veteran Malang', NULL),
(6, 'TPU ASOOY', 'ASOY', 'Malang', NULL);

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
(1, 'firman', '$2y$10$e185AUci/0zEfRW7HrbMbuPLT/t4FBZ/BpTJo1Rj2.dueVNrm1Wtq', 1),
(2, 'admin', '$2y$10$UCsJtdGuLt0ADZgAUSjHCeBpcXnL27D7DxpmIoTV1eWkrJmDjDcKi', 0),
(4, 'fadhlan', '$2y$10$jBsvNz5BZUrQP.XxUeWMiuydMs3vEXYiBcuEGeh6.Hldf.h0pTqWO', 1),
(6, 'kiki', '$2y$10$Cw.UZ6u/pJyWHJe1URVEzOwF.GSJSNEPfMtJSM4DADNi22eRGijfi', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `blok_makam`
--
ALTER TABLE `blok_makam`
  ADD PRIMARY KEY (`id_blok`),
  ADD KEY `fk_blok_makam_tpu_idx` (`id_tpu`),
  ADD KEY `id_blok` (`id_blok`);

--
-- Indexes for table `dokumen`
--
ALTER TABLE `dokumen`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `makam`
--
ALTER TABLE `makam`
  ADD PRIMARY KEY (`id_makam`),
  ADD KEY `fk_makam_blok_makam1_idx` (`id_blok`);

--
-- Indexes for table `notifikasi`
--
ALTER TABLE `notifikasi`
  ADD PRIMARY KEY (`id_notifikasi`),
  ADD KEY `id_user` (`id_user`);

--
-- Indexes for table `penghuni_makam`
--
ALTER TABLE `penghuni_makam`
  ADD PRIMARY KEY (`id_penghuni_makam`),
  ADD KEY `fk_penghuni_makam_makam1_idx` (`id_makam`);

--
-- Indexes for table `polygon`
--
ALTER TABLE `polygon`
  ADD PRIMARY KEY (`id_polygon`),
  ADD KEY `polygon_ibfk_1` (`id_blok`);

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
  MODIFY `id_blok` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `dokumen`
--
ALTER TABLE `dokumen`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `makam`
--
ALTER TABLE `makam`
  MODIFY `id_makam` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `notifikasi`
--
ALTER TABLE `notifikasi`
  MODIFY `id_notifikasi` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `penghuni_makam`
--
ALTER TABLE `penghuni_makam`
  MODIFY `id_penghuni_makam` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `polygon`
--
ALTER TABLE `polygon`
  MODIFY `id_polygon` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=155;

--
-- AUTO_INCREMENT for table `role_tpu`
--
ALTER TABLE `role_tpu`
  MODIFY `id_role_tpu` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `tpu`
--
ALTER TABLE `tpu`
  MODIFY `id_tpu` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id_user` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

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
-- Constraints for table `notifikasi`
--
ALTER TABLE `notifikasi`
  ADD CONSTRAINT `notifikasi_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `user` (`id_user`);

--
-- Constraints for table `penghuni_makam`
--
ALTER TABLE `penghuni_makam`
  ADD CONSTRAINT `penghuni_makam_ibfk_1` FOREIGN KEY (`id_makam`) REFERENCES `makam` (`id_makam`);

--
-- Constraints for table `polygon`
--
ALTER TABLE `polygon`
  ADD CONSTRAINT `polygon_ibfk_1` FOREIGN KEY (`id_blok`) REFERENCES `blok_makam` (`id_blok`);

--
-- Constraints for table `role_tpu`
--
ALTER TABLE `role_tpu`
  ADD CONSTRAINT `role_tpu_ibfk_1` FOREIGN KEY (`id_tpu`) REFERENCES `tpu` (`id_tpu`),
  ADD CONSTRAINT `role_tpu_ibfk_2` FOREIGN KEY (`id_user`) REFERENCES `user` (`id_user`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
