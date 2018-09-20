-- phpMyAdmin SQL Dump
-- version 4.8.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 20, 2018 at 07:53 AM
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
  `tgllhr_ahli_waris` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `email` varchar(50) NOT NULL DEFAULT 'mail.defailt@mail.com',
  `pekerjaan_ahli_waris` varchar(50) NOT NULL,
  `id_penghuni_makam` int(11) NOT NULL,
  `id_tpu` int(11) NOT NULL,
  `id_kecamatan` int(11) NOT NULL,
  `file_ktp` varchar(255) DEFAULT NULL,
  `file_kk` varchar(255) DEFAULT NULL,
  `file_surat_izin` varchar(255) NOT NULL,
  `kelengkapan_dokumen` varchar(100) NOT NULL DEFAULT 'Tidak Lengkap',
  `status` varchar(50) NOT NULL,
  `tanggal_surat_permohonan` varchar(50) DEFAULT NULL,
  `no_surat_permohonan` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `dokumen`
--

INSERT INTO `dokumen` (`id`, `nama_almarhum`, `nama_pewaris`, `tgllhr_ahli_waris`, `email`, `pekerjaan_ahli_waris`, `id_penghuni_makam`, `id_tpu`, `id_kecamatan`, `file_ktp`, `file_kk`, `file_surat_izin`, `kelengkapan_dokumen`, `status`, `tanggal_surat_permohonan`, `no_surat_permohonan`) VALUES
(15, 'alm1', 'asd', '2018-09-17 11:44:00', '', '', 0, 1, 1, 'public/files/file.jpg', 'public/files/photo.jpg', 'public/files/file.jpg', 'Lengkap', 'Menunggu Persetujuan Kepala Kecamatan', NULL, NULL),
(16, 'alm2', 'asd', '2018-09-17 11:44:00', '', '', 0, 1, 1, 'public/files/photo.pdf', 'public/files/file.pdf', 'public/files/file.jpg', 'Lengkap', 'Menunggu Persetujuan Kepala Kecamatan', NULL, NULL),
(18, 'dokumen1', 'ahliwarisdokumen1', '2018-09-17 11:44:00', 'mail.defailt@mail.com', '', 0, 1, 1, 'public/files/6oy7JBLYXrYqVkluCgwTDjyaxnRm48wCAqCqUlQm.png', 'public/files/aca9hPxhF93N7I9qvK8K8wzygC4vohzKy9U96l1e.jpeg', 'public/files/file.jpg', 'Dokumen Kurang', 'Menunggu Persetujuan Kepala UPT', NULL, NULL),
(19, 'baru', 'ahli waris dummy 1', '2018-09-17 11:44:00', 'mail.defailt@mail.com', '', 0, 1, 1, 'public/files/Em02HNsyEZH2sdk65oXcEU8BtFm0rCZQsFdYN0MM.png', 'public/files/uy1eyDGEPGjGwiPgkXqNENMHDrGPtUzW9oLo74ts.jpeg', 'public/files/file.jpg', 'Lengkap', 'Proses Selesai', NULL, NULL),
(22, 'dokumen baru', 'ahli waris dummy 1', '2018-09-26 00:00:00', 'fadhlanmuhamad@gmail.com', 'programmer', 0, 1, 1, 'public/files/PBGHrLY6KCwEOQhGaciS8JerxrR1PXg0JoAYoWF6.png', 'public/files/rJsFgub3wrX3pxQ4iymkhFFrwAQvdoujRPl9Ccmv.jpeg', 'public/files/WA5j80Sof7yYRzEYfuCjA8zGCMwT8sJxugxkh3gt.jpeg', 'Lengkap', 'Proses Selesai', NULL, NULL),
(23, 'dokumen1', 'test', '2018-09-19 00:00:00', 'fadhlanmuhamad@gmail.com', 'programmer', 0, 1, 1, 'public/files/MyUwyrmxxmERkGLFq2TCYmN9nRo0Im0eC8gbP0zK.png', 'public/files/V0dUhzAT9bajs0n5d10sPSG05QJ73wUimYynRuPE.jpeg', 'public/files/xOfKCXiVV8s8f5APhe81r9sSRSXwx06UbwYWBYij.jpeg', 'Lengkap', 'Proses Selesai', NULL, NULL),
(24, 'alm1', 'baru1', '2018-09-26 00:00:00', 'fadhlanmuhamad@gmail.com', 'programmer', 0, 1, 2, 'public/files/IzE1ITdEMGc9flvfXzfHOx6ZDPmLqYJKdmw8WbT7.png', 'public/files/7E5duevbAd5PjDsLVsrxeGfKyzMdQEno7aJXPUZp.jpeg', 'public/files/ogB5AAtxQueffFECDAVacOvQ24souhPYfZLLeOyn.jpeg', 'Lengkap', 'Proses Selesai', NULL, NULL),
(25, 'ihi', 'aha', '2018-08-29 00:00:00', 'firmanbudis@gmail.com', 'aha', 0, 4, 4, 'public/files/8ak3hSd2pz8jumY8SHU9lZO4ilriubHzh5KIDAih.png', 'public/files/52XZsLIls3ZN6XCVK700UWhIoy6Uty6HVaCwhqne.png', 'public/files/czvbIwTvfBDlQuVZ90EXqYl4oKN8HiR3pKLCYTeD.png', 'Dokumen Kurang', 'Menunggu Persetujuan Kepala UPT', NULL, NULL),
(26, 'Firman Budi Safrizal', 'a', '2018-09-11 00:00:00', 'firmanbudis@gmail.com', 'asd', 66, 4, 4, 'public/files/w1nsPb3zvtwFrQoB9cXddBfSGXiNFnjDk7PeMvPO.png', 'public/files/jDHRhYRtwd18k0kbiHSl6WIgDGYKNTXZiWyfs2Fj.png', 'public/files/HEir4tFyACQFFkMlIe6xPF6r8KifjK0FEfwGStOi.png', 'Lengkap', 'Menunggu Persetujuan Kepala Dinas', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `kecamatan`
--

CREATE TABLE `kecamatan` (
  `id_kecamatan` int(11) NOT NULL,
  `nama` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `kecamatan`
--

INSERT INTO `kecamatan` (`id_kecamatan`, `nama`) VALUES
(1, 'Klojen'),
(2, 'Blimbing'),
(3, 'Kedungkandang'),
(4, 'Lowokwaru'),
(5, 'Sukun');

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
(5, 341, 'XXX-A-341', 3, '-7.951656541897828', '112.6141133646347'),
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
  `content` varchar(100) NOT NULL,
  `status` varchar(10) NOT NULL DEFAULT 'Unread'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `notifikasi`
--

INSERT INTO `notifikasi` (`id_notifikasi`, `id_user`, `content`, `status`) VALUES
(1, 12, 'Entri perizinan baru menunggu persetujuan anda 1', 'read'),
(2, 12, 'Entri perizinan baru menunggu persetujuan anda 2', 'read'),
(3, 12, 'Entri perizinan baru menunggu persetujuan anda 3', 'read'),
(4, 12, 'Entri perizinan baru menunggu persetujuan anda 4', 'read'),
(11, 12, 'Entri perizinan baru menunggu persetujuan anda 5', 'read'),
(12, 12, 'Entri perizinan baru menunggu persetujuan anda 6', 'read'),
(13, 12, 'Entri perizinan baru menunggu persetujuan anda 7', 'read'),
(14, 12, 'Entri perizinan baru menunggu persetujuan anda 8', 'read'),
(15, 4, 'Entri perizinan baru menunggu persetujuan anda 9', 'read'),
(16, 4, 'Entri perizinan baru menunggu persetujuan anda 10', 'read');

-- --------------------------------------------------------

--
-- Table structure for table `penghuni_makam`
--

CREATE TABLE `penghuni_makam` (
  `id_penghuni_makam` int(11) NOT NULL,
  `nama` varchar(45) DEFAULT NULL,
  `jenis_kelamin` varchar(10) DEFAULT NULL,
  `alamat_terakhir` varchar(45) DEFAULT NULL,
  `tanggal_lahir_alm` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `tanggal_wafat` datetime DEFAULT NULL,
  `tanggal_pemakaman` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
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

INSERT INTO `penghuni_makam` (`id_penghuni_makam`, `nama`, `jenis_kelamin`, `alamat_terakhir`, `tanggal_lahir_alm`, `tanggal_wafat`, `tanggal_pemakaman`, `status`, `id_makam`, `nama_ahli_waris`, `alamat_ahli_waris`, `nik_ahli_waris`, `kontak_ahli_waris`) VALUES
(1, 'Manusia', 'Laki-Laki', 'Bumi', '2018-09-18 00:00:00', '2018-07-26 00:00:00', '2018-09-30 00:00:00', 'Ditimpa', 1, 'Nabi Adam', 'seberangnya abdul', '123456789', '+621'),
(2, 'Abdul', 'Laki-Laki', 'Sigura-gura', '2018-09-17 11:28:09', '2018-07-03 00:00:00', '2018-09-17 11:18:43', 'Ditimpa', 1, 'Dulab', 'idem', '6123123', '1241'),
(3, 'Bedu', 'Laki-Laki', 'Bendungan Hilir', '2018-09-17 11:28:09', '2018-07-01 00:00:00', '2018-09-17 11:18:43', 'Ditimpa', 3, 'Beni', 'idem', '4123412', '3211'),
(4, 'Cindy', 'Perempuan', 'Kerto-Kerto', '2018-09-17 11:28:09', '2018-07-14 00:00:00', '2018-09-17 11:18:43', 'Ditimpa', 2, 'Chakra', 'idem', '121234', '6123'),
(5, 'a', 'Perempuan', 'a1', '2018-09-17 11:28:09', '2018-07-12 00:00:00', '2018-09-17 11:18:43', 'Ditmpa', 1, 'ja1', 'ja2', 'ja3', '1234'),
(6, 'b', 'Perempuan', 'b1', '2018-09-17 11:28:09', '2018-07-21 00:00:00', '2018-09-17 11:18:43', 'Ditimpa', 3, 'ib1', 'ib2', 'ib3', '8374'),
(7, 'c', 'Perempuan', 'c1', '2018-09-17 11:28:09', '2018-07-22 00:00:00', '2018-09-17 11:18:43', 'Ditimpa', 2, 'hc1', 'hc2', 'hc3', '8123'),
(8, 'd', 'Perempuan', 'd1', '2018-09-17 11:28:09', '2018-07-11 00:00:00', '2018-09-17 11:18:43', 'Ditimpa', 1, 'gd1', 'gd2', 'gd3', '3418'),
(9, 'e', 'Perempuan', 'e1', '2018-09-17 11:28:09', '2018-07-23 00:00:00', '2018-09-17 11:18:43', 'Ditimpa', 3, 'fe1', 'fe2', 'fe3', '3811'),
(10, 'f', 'Perempuan', 'f1', '2018-09-17 11:28:09', '2018-07-10 00:00:00', '2018-09-17 11:18:43', 'Ditimpa', 2, 'ef1', 'ef2', 'ef3', '4581'),
(11, 'g', 'Perempuan', 'g1', '2018-09-17 11:28:09', '2018-07-09 00:00:00', '2018-09-17 11:18:43', 'Ditimpa', 1, 'dg1', 'dg2', 'dg3', '7817'),
(12, 'h', 'Perempuan', 'h1', '2018-09-17 11:28:09', '2018-07-03 00:00:00', '2018-09-17 11:18:43', 'Diperpanjang', 3, 'ch1', 'ch2', 'ch3', '1892'),
(13, 'i', 'Perempuan', 'i1', '2018-09-17 11:28:09', '2018-07-24 00:00:00', '2018-09-17 11:18:43', 'Ditimpa', 2, 'bi1', 'bi2', 'bi3', '4893'),
(14, 'j', 'Laki-Laki', 'j1', '2018-09-17 11:28:09', '2018-07-15 00:00:00', '2018-09-17 11:18:43', 'Ditimpa', 2, 'aj1', 'aj2', 'aj3', '6792'),
(15, 'dudul', 'Laki-Laki', 'disebelahnya adam', '2018-09-17 11:28:09', '2018-07-19 00:00:00', '2018-09-17 11:18:43', 'Ditimpa', 1, 'siapapun', 'disebelahnya adam juga', '1234123', '1234213'),
(18, 'asdasdasdad', 'Laki-Laki', 'asdasdasd', '2018-09-17 11:28:09', '2018-07-12 00:00:00', '2018-09-17 11:18:43', 'Ditimpa', 1, 'asdasd', 'adasd', 'asdasd', 'asdasd'),
(19, 'qasdasf', 'Perempuan', 'asdqwfs', '2018-09-17 11:28:09', '2018-07-09 00:00:00', '2018-09-17 11:18:43', 'Ditimpa', 1, 'aaaaaaaaaaa', 'bbbbbbbbbbbb', '111111111111', '222222222'),
(20, 'asdqwd', 'Perempuan', 'qwdqwe12', '2018-09-17 11:28:09', '2018-07-04 00:00:00', '2018-09-17 11:18:43', 'Ditimpa', 2, '12dwasdq', '21dwasd', '3333333333', '44444444444'),
(21, 'qwe', 'Perempuan', 'wqwe', '2018-09-17 11:28:09', '2018-07-10 00:00:00', '2018-09-17 11:18:43', 'Ditimpa', 2, 'qweqwe', 'qweqwe', '2222222222', '11111111'),
(23, 'dummy1', 'Perempuan', 'alamat dummy1', '2018-09-17 11:28:09', '2018-08-15 00:00:00', '2018-09-17 11:18:43', 'Ditimpa', 1, 'dudul', 'alamat dummy 1', '12312', '1231523123'),
(24, 'dummy2', 'Perempuan', 'alamat dummy2', '2018-09-17 11:28:09', '2018-08-16 00:00:00', '2018-09-17 11:18:43', 'Diperpanjang', 11, 'ahli waris dummy 2', 'alamat dummy 2', '444444444444', '33333333333333'),
(25, 'Rizal', 'Laki-Laki', 'Malang', '2018-09-17 11:28:09', '2018-02-28 00:00:00', '2018-09-17 11:18:43', NULL, 6, 'Firman', 'Malang', '12312', '0822'),
(26, 'test', 'Laki-Laki', 'test', '2018-09-17 11:28:09', '2018-08-06 00:00:00', '2018-09-17 11:18:43', 'Expired', 10, 'test', 'test', '12', '123'),
(27, 'test', 'Laki-Laki', 'test', '2018-09-17 11:28:09', '2018-08-06 00:00:00', '2018-09-17 11:18:43', 'Expired', 10, 'test', 'test', '12', '123'),
(28, 'test', 'Laki-Laki', 'test', '2018-09-17 11:28:09', '2018-08-06 00:00:00', '2018-09-17 11:18:43', 'Expired', 10, 'test', 'test', '12', '123'),
(57, 'baru', 'Laki-Laki', 'baru', '2018-09-17 11:28:09', '2018-09-02 00:00:00', '2018-09-17 11:18:43', 'Ditimpa', 4, 'ahli waris dummy 1', 'adhliwarisdokumen1', '51345123', '1231523123'),
(58, 'dokumen baru', 'Laki-Laki', 'alamat dummy2', '2018-09-26 00:00:00', '2018-09-30 00:00:00', '2018-09-22 00:00:00', 'Expired', 12, 'ahli waris dummy 1', 'alamat dummy 2', '22222222222222', '1231523123'),
(59, 'dokumen1', 'Laki-Laki', NULL, '2018-09-27 00:00:00', '2018-09-27 00:00:00', '2018-09-07 00:00:00', 'Diperpanjang', 11, 'test', 'test', '22222222222222', '123123'),
(60, 'alm1', 'Laki-Laki', 'alm1', '2018-09-17 00:00:00', '2018-09-23 00:00:00', '2018-09-29 00:00:00', 'Diperpanjang', 2, 'baru1', 'baru1', '51345123', '1231523123'),
(61, 'alm1', 'Laki-Laki', 'alm1', '2018-09-17 00:00:00', '2018-09-23 00:00:00', '2018-09-29 00:00:00', 'Diperpanjang', 2, 'baru1', 'baru1', '51345123', '1231523123'),
(62, 'baru2', 'Perempuan', 'alamat baru2', '2018-09-20 00:00:00', '2018-09-20 00:00:00', '2018-09-20 00:00:00', 'Diperpanjang', 3, 'ahli waris dummy 1', 'alamat dummy 2', '22222222222222', '1231523123'),
(63, 'ihi', 'Laki-Laki', 'ihi', '2018-09-05 00:00:00', '2018-09-06 00:00:00', '2018-09-13 00:00:00', NULL, 10, 'aha', 'aha', '111', '111'),
(64, 'Firman Budi Safrizal', 'Laki-Laki', 'asd', '2018-09-04 00:00:00', '2018-09-11 00:00:00', '2018-09-06 00:00:00', 'Diperpanjang', 10, 'ehe', 'ehe', '123', '123'),
(65, 'Firman Budi Safrizal', 'Laki-Laki', 'asdasd', '2018-08-29 00:00:00', '2018-09-12 00:00:00', '2018-09-12 00:00:00', 'Expired', 10, 'qweqwe', 'qweqwe', '1123', '123'),
(66, 'Firman Budi Safrizal', 'Laki-Laki', 'aa', '2018-09-19 00:00:00', '2018-09-20 00:00:00', '2018-09-20 00:00:00', 'Expired', 11, 'a', 'a', '123123', '123');

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
-- Table structure for table `role_kecamatan`
--

CREATE TABLE `role_kecamatan` (
  `id_role` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `id_kecamatan` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `role_kecamatan`
--

INSERT INTO `role_kecamatan` (`id_role`, `id_user`, `id_kecamatan`) VALUES
(2, 6, 4),
(1, 13, 4);

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
(21, 6, 6),
(22, 4, 12);

-- --------------------------------------------------------

--
-- Table structure for table `tpu`
--

CREATE TABLE `tpu` (
  `id_tpu` int(11) NOT NULL,
  `nama_tpu` varchar(45) DEFAULT NULL,
  `kode_tpu` varchar(10) DEFAULT NULL,
  `id_kecamatan` int(11) DEFAULT NULL,
  `area_peta_tpu` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tpu`
--

INSERT INTO `tpu` (`id_tpu`, `nama_tpu`, `kode_tpu`, `id_kecamatan`, `area_peta_tpu`) VALUES
(1, 'TPU Kasin Malang', 'KASIN', 2, 123123),
(2, 'TPU xxx', 'XXX', 4, 98890),
(3, 'TPU Samaan', 'SAMAAN', 1, NULL),
(4, 'TPU GreenGarden', 'GG', 4, NULL),
(5, 'TPU A', 'A', 5, NULL),
(6, 'TPU ASOOY', 'ASOY', 3, NULL),
(10, 'TPU Baru', 'B', 4, NULL);

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
(6, 'kiki', '$2y$10$Cw.UZ6u/pJyWHJe1URVEzOwF.GSJSNEPfMtJSM4DADNi22eRGijfi', 5),
(12, 'kupt', '$2y$10$VFmRGgPBQOBRd7fCr3PsCuNA5MzinLxn/mHEsuTsgBYtYkvZCx7tG', 2),
(13, 'kpkec', '$2y$10$pJUqeai/.OH/mHi7yzvCcerC70Y5vmI56MLhLzQdrXXuyjQdH4jni', 4),
(14, 'kdinas', '$2y$10$BogmAKSq9N4FCKfL8Qt9K.7YHVsm8yJzx2QuEj47QkefEkXwV.XAS', 3);

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
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_kecamatan` (`id_kecamatan`),
  ADD KEY `id_tpu` (`id_tpu`);

--
-- Indexes for table `kecamatan`
--
ALTER TABLE `kecamatan`
  ADD PRIMARY KEY (`id_kecamatan`);

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
-- Indexes for table `role_kecamatan`
--
ALTER TABLE `role_kecamatan`
  ADD PRIMARY KEY (`id_role`),
  ADD KEY `id_user` (`id_user`,`id_kecamatan`),
  ADD KEY `id_kecamatan` (`id_kecamatan`);

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
  ADD PRIMARY KEY (`id_tpu`),
  ADD KEY `id_kecamatan` (`id_kecamatan`);

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT for table `kecamatan`
--
ALTER TABLE `kecamatan`
  MODIFY `id_kecamatan` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `makam`
--
ALTER TABLE `makam`
  MODIFY `id_makam` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `notifikasi`
--
ALTER TABLE `notifikasi`
  MODIFY `id_notifikasi` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `penghuni_makam`
--
ALTER TABLE `penghuni_makam`
  MODIFY `id_penghuni_makam` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=67;

--
-- AUTO_INCREMENT for table `polygon`
--
ALTER TABLE `polygon`
  MODIFY `id_polygon` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=155;

--
-- AUTO_INCREMENT for table `role_kecamatan`
--
ALTER TABLE `role_kecamatan`
  MODIFY `id_role` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `role_tpu`
--
ALTER TABLE `role_tpu`
  MODIFY `id_role_tpu` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `tpu`
--
ALTER TABLE `tpu`
  MODIFY `id_tpu` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id_user` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `blok_makam`
--
ALTER TABLE `blok_makam`
  ADD CONSTRAINT `blok_makam_ibfk_1` FOREIGN KEY (`id_tpu`) REFERENCES `tpu` (`id_tpu`);

--
-- Constraints for table `dokumen`
--
ALTER TABLE `dokumen`
  ADD CONSTRAINT `dokumen_ibfk_1` FOREIGN KEY (`id_kecamatan`) REFERENCES `kecamatan` (`id_kecamatan`),
  ADD CONSTRAINT `dokumen_ibfk_2` FOREIGN KEY (`id_tpu`) REFERENCES `tpu` (`id_tpu`);

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
-- Constraints for table `polygon`
--
ALTER TABLE `polygon`
  ADD CONSTRAINT `polygon_ibfk_1` FOREIGN KEY (`id_blok`) REFERENCES `blok_makam` (`id_blok`);

--
-- Constraints for table `role_kecamatan`
--
ALTER TABLE `role_kecamatan`
  ADD CONSTRAINT `role_kecamatan_ibfk_1` FOREIGN KEY (`id_kecamatan`) REFERENCES `kecamatan` (`id_kecamatan`),
  ADD CONSTRAINT `role_kecamatan_ibfk_2` FOREIGN KEY (`id_user`) REFERENCES `user` (`id_user`);

--
-- Constraints for table `role_tpu`
--
ALTER TABLE `role_tpu`
  ADD CONSTRAINT `role_tpu_ibfk_1` FOREIGN KEY (`id_tpu`) REFERENCES `tpu` (`id_tpu`),
  ADD CONSTRAINT `role_tpu_ibfk_2` FOREIGN KEY (`id_user`) REFERENCES `user` (`id_user`);

--
-- Constraints for table `tpu`
--
ALTER TABLE `tpu`
  ADD CONSTRAINT `tpu_ibfk_1` FOREIGN KEY (`id_kecamatan`) REFERENCES `kecamatan` (`id_kecamatan`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
