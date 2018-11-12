-- phpMyAdmin SQL Dump
-- version 4.8.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 12, 2018 at 02:17 PM
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
(19, 3, 'SAMAAN-B', NULL),
(23, 4, 'GG-qwe', NULL),
(29, 2, 'XXX-A', NULL),
(31, 4, 'GG-BB', NULL),
(33, 4, 'GG-DD', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `dokumen`
--

CREATE TABLE `dokumen` (
  `id` int(11) NOT NULL,
  `kode_registrasi` varchar(25) DEFAULT NULL,
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
  `file_sk` varchar(255) NOT NULL,
  `file_sk_lama` varchar(255) DEFAULT 'Kosong',
  `kelengkapan_dokumen` varchar(100) NOT NULL DEFAULT 'Tidak Lengkap',
  `status` varchar(50) NOT NULL,
  `tanggal_surat_permohonan` varchar(50) DEFAULT NULL,
  `no_surat_permohonan` varchar(50) DEFAULT NULL,
  `tanggal_surat_perizinin` varchar(50) DEFAULT NULL,
  `no_surat_perizinan` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `dokumen`
--

INSERT INTO `dokumen` (`id`, `kode_registrasi`, `nama_almarhum`, `nama_pewaris`, `tgllhr_ahli_waris`, `email`, `pekerjaan_ahli_waris`, `id_penghuni_makam`, `id_tpu`, `id_kecamatan`, `file_ktp`, `file_kk`, `file_surat_izin`, `file_sk`, `file_sk_lama`, `kelengkapan_dokumen`, `status`, `tanggal_surat_permohonan`, `no_surat_permohonan`, `tanggal_surat_perizinin`, `no_surat_perizinan`) VALUES
(36, 'GG-36', 'niini', 'nana', '1995-05-05 00:00:00', 'firenov53@gmail.com', 'asdasfasd', 64, 4, 4, 'public/files/i1xFgcixuA1W7IL21OcFuDU7p4eJOTZkrOrrBxJA.png', 'public/files/a9Pc3YYtAWmI2V88I7cYP96k0eu4kwQKKZ6NGd4A.png', 'public/files/lSvXUMUiunT994EhTmQte7s0HgkXOhrvVHppQFXx.png', 'public/files/lSvXUMUiunT994EhTmQte7s0HgkXOhrvVHppQFXx.png', 'public/files/lSvXUMUiunT994EhTmQte7s0HgkXOhrvVHppQFXx.png', 'Lengkap', 'Proses Selesai', '12 November 2018', 'SI/11/12', '12 November 2018', 'SI/11/12'),
(37, 'GG-37', 'joka', 'haha', '1995-05-05 00:00:00', 'firenov53@gmail.com', 'asfasdasd', 65, 4, 4, 'public/files/UBR3CVUzplItKYbOiOmNk9yUBhoEvem1Xlx3yB44.png', 'public/files/RJt7rAtrZDZrj0hnYjFmMf1UY7nf7tcqdysohtR9.jpeg', 'public/files/sgfvxBJ1KHccxIGecyAfeunNMwzeEiDX5aXapZhr.jpeg', 'public/files/sgfvxBJ1KHccxIGecyAfeunNMwzeEiDX5aXapZhr.jpeg', 'public/files/sgfvxBJ1KHccxIGecyAfeunNMwzeEiDX5aXapZhr.jpeg', 'Lengkap', 'Menunggu Persetujuan Kepala UPT', NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `kecamatan`
--

CREATE TABLE `kecamatan` (
  `id_kecamatan` int(11) NOT NULL,
  `nama` varchar(20) NOT NULL,
  `alamat_kecamatan` varchar(100) DEFAULT NULL,
  `no_telp_kecamatan` varchar(15) DEFAULT NULL,
  `kode_pos_kecamatan` varchar(10) DEFAULT NULL,
  `website_kecamatan` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `kecamatan`
--

INSERT INTO `kecamatan` (`id_kecamatan`, `nama`, `alamat_kecamatan`, `no_telp_kecamatan`, `kode_pos_kecamatan`, `website_kecamatan`) VALUES
(1, 'Klojen', 'Jl. Surabaya 6', '0341-362468', '65111', 'https://kecklojen.malangkota.go.id/'),
(2, 'Blimbing', 'Jl. Raden Intan Kav. 14', '0341-491330', '65125', 'http://kecblimbing.malangkota.go.id/'),
(3, 'Kedungkandang', 'Jl. Mayjen Sungkono 59', '0341-752273', '65137', 'http://keckedungkandang.malangkota.go.id/'),
(4, 'Lowokwaru', 'Jl. Cengger Ayam I/12', '0341-493162', '65141', 'http://keclowokwaru.malangkota.go.id/'),
(5, 'Sukun', 'Jl. Keben I', '0341-362468', '65147', 'http://kecsukun.malangkota.go.id/');

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
  `lng` varchar(100) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `makam`
--

INSERT INTO `makam` (`id_makam`, `nomor_makam`, `kode_makam`, `id_blok`, `lat`, `lng`, `created_at`) VALUES
(4, 12, 'XXX-B-12', 4, '-7.953922605129994', '112.6122323857984', '2018-10-15 08:16:17'),
(5, 341, 'XXX-A-341', 3, '-7.951656541897828', '112.6141133646347', '2018-10-15 08:16:17'),
(6, 12312, 'XXX-B-12312', 4, '-7.946656362112344', '112.61682445323652', '2018-10-15 08:16:17'),
(10, 2, 'GG-B-2', 10, '-7.952820052190582', '112.61318532031555', '2018-10-15 08:16:17'),
(11, 1, 'GG-C-1', 11, '-7.953796884276093', '112.61485488711116', '2018-10-15 08:16:17'),
(12, 12, 'A-1-12', 12, '-7.954972048346357', '112.61320043874832', '2018-10-15 08:16:17');

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
(24, 'dummy2', 'Perempuan', 'alamat dummy2', '2018-09-17 11:28:09', '2018-08-16 00:00:00', '2018-09-17 11:18:43', 'Diperpanjang', 11, 'ahli waris dummy 2', 'alamat dummy 2', '444444444444', '33333333333333'),
(25, 'Rizal', 'Laki-Laki', 'Malang', '2018-09-17 11:28:09', '2018-02-28 00:00:00', '2018-09-17 11:18:43', NULL, 6, 'Firman', 'Malang', '12312', '0822'),
(26, 'test', 'Laki-Laki', 'test', '2018-09-17 11:28:09', '2018-08-06 00:00:00', '2018-09-17 11:18:43', 'Expired', 10, 'test', 'test', '12', '123'),
(27, 'test', 'Laki-Laki', 'test', '2018-09-17 11:28:09', '2018-08-06 00:00:00', '2018-09-17 11:18:43', 'Expired', 10, 'test', 'test', '12', '123'),
(28, 'test', 'Laki-Laki', 'test', '2018-09-17 11:28:09', '2018-08-06 00:00:00', '2018-09-17 11:18:43', 'Expired', 10, 'test', 'test', '12', '123'),
(57, 'baru', 'Laki-Laki', 'baru', '2018-09-17 11:28:09', '2018-09-02 00:00:00', '2018-09-17 11:18:43', 'Ditimpa', 4, 'ahli waris dummy 1', 'adhliwarisdokumen1', '51345123', '1231523123'),
(58, 'dokumen baru', 'Laki-Laki', 'alamat dummy2', '2018-09-26 00:00:00', '2018-09-30 00:00:00', '2018-09-22 00:00:00', 'Expired', 12, 'ahli waris dummy 1', 'alamat dummy 2', '22222222222222', '1231523123'),
(59, 'dokumen1', 'Laki-Laki', NULL, '2018-09-27 00:00:00', '2018-09-27 00:00:00', '2018-09-07 00:00:00', 'Diperpanjang', 11, 'test', 'test', '22222222222222', '123123'),
(63, 'ihi', 'Laki-Laki', 'ihi', '2018-09-05 00:00:00', '2018-09-06 00:00:00', '2018-09-13 00:00:00', NULL, 10, 'aha', 'aha', '111', '111'),
(64, 'niini', 'Perempuan', 'asfsadasd', '1999-05-05 00:00:00', '2010-05-05 00:00:00', '2015-05-05 00:00:00', 'Diperpanjang', 10, 'nana', 'asdfasdsad', '1111111111', '1111111111111'),
(65, 'joka', 'Laki-Laki', 'asdgasd', '1999-11-21 00:00:00', '2018-05-12 00:00:00', '2018-07-12 00:00:00', 'Baru', 10, 'haha', '123124', '1111111111', '12123123'),
(66, 'yahi', 'Laki-Laki', 'asdasdad', '2000-12-15 00:00:00', '2015-03-31 00:00:00', '2015-03-04 00:00:00', 'Expired', 12, 'asdasd', 'asdasd', 'asdasd', 'asdasd');

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
(155, 19, '-7.952992718961905', '112.61280339889754'),
(156, 19, '-7.952716452092901', '112.61274975471724'),
(157, 19, '-7.953194606171558', '112.6133720272087'),
(158, 19, '-7.9528227086029935', '112.61358123951186'),
(159, 19, '-7.952594257072243', '112.61327010326613'),
(186, 23, '-7.952235641040576', '112.61300724678267'),
(187, 23, '-7.952936934320654', '112.61342030697097'),
(188, 23, '-7.952198451211938', '112.61333984070052'),
(215, 29, '-7.9529419815676485', '112.61319497628438'),
(216, 29, '-7.95278790966382', '112.61273900075184'),
(217, 29, '-7.952437263046268', '112.61295357747304'),
(218, 29, '-7.952702904450733', '112.61343101067769'),
(223, 31, '-7.95300573544195', '112.61331299348103'),
(224, 31, '-7.952368196252921', '112.61297503514515'),
(225, 31, '-7.952761345536622', '112.61285165353047'),
(226, 31, '-7.952649776183601', '112.61357048554646'),
(239, 33, '-7.95254378520527', '112.61292678051223'),
(240, 33, '-7.9529263086738435', '112.61269611053694'),
(241, 33, '-7.953128195916192', '112.61305552654494'),
(242, 33, '-7.9528891189078355', '112.61345785789717'),
(243, 33, '-7.952522533890999', '112.6133183830284');

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
(3, 13, 1),
(2, 13, 2),
(4, 13, 3),
(1, 13, 4),
(5, 13, 5),
(11, 15, 1),
(7, 15, 2),
(8, 15, 3),
(9, 15, 4),
(10, 15, 5);

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
(7, 1, 4),
(8, 1, 2),
(9, 4, 2),
(11, 2, 4),
(12, 4, 4),
(14, 3, 4),
(15, 5, 4),
(22, 4, 12),
(23, 1, 12),
(24, 10, 4),
(25, 13, 4),
(26, 3, 12),
(27, 2, 12),
(28, 5, 12),
(29, 10, 12),
(30, 13, 12);

-- --------------------------------------------------------

--
-- Table structure for table `tpu`
--

CREATE TABLE `tpu` (
  `id_tpu` int(11) NOT NULL,
  `nama_tpu` varchar(45) DEFAULT NULL,
  `kode_tpu` varchar(10) DEFAULT NULL,
  `id_kecamatan` int(11) DEFAULT NULL,
  `lat` varchar(250) NOT NULL,
  `lng` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tpu`
--

INSERT INTO `tpu` (`id_tpu`, `nama_tpu`, `kode_tpu`, `id_kecamatan`, `lat`, `lng`) VALUES
(1, 'TPU Kasin Malang', 'KASIN', 2, '-7.951947154203484', '112.61320675285833'),
(2, 'TPU xxx', 'XXX', 4, '', ''),
(3, 'TPU Samaan', 'SAMAAN', 1, '', ''),
(4, 'TPU GreenGarden', 'GG', 4, '', ''),
(5, 'TPU A', 'A', 5, '', ''),
(10, 'TPU Baru', 'B', 4, '', ''),
(13, 'TPU Curug', 'C', 3, '', '');

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
(2, 'admin', '$2y$10$UCsJtdGuLt0ADZgAUSjHCeBpcXnL27D7DxpmIoTV1eWkrJmDjDcKi', 0),
(4, 'admintpu', '$2y$10$2fE3IJjHbAU5JGCrLgD6yex.ZZ.5WlHHTgLv6hZogT80wn4DbSXZK', 1),
(12, 'kepalaupt', '$2y$10$VFmRGgPBQOBRd7fCr3PsCuNA5MzinLxn/mHEsuTsgBYtYkvZCx7tG', 2),
(13, 'kepalakecamatan', '$2y$10$pJUqeai/.OH/mHi7yzvCcerC70Y5vmI56MLhLzQdrXXuyjQdH4jni', 4),
(14, 'kepaladinas', '$2y$10$BogmAKSq9N4FCKfL8Qt9K.7YHVsm8yJzx2QuEj47QkefEkXwV.XAS', 3),
(15, 'adminkecamatan', '$2y$10$.KtROaPHS7KpCa5pm86waujuH361uEUc8fWfDHEJQO5NfZWntELKm', 5);

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
  MODIFY `id_blok` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- AUTO_INCREMENT for table `dokumen`
--
ALTER TABLE `dokumen`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;

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
  MODIFY `id_polygon` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=244;

--
-- AUTO_INCREMENT for table `role_kecamatan`
--
ALTER TABLE `role_kecamatan`
  MODIFY `id_role` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `role_tpu`
--
ALTER TABLE `role_tpu`
  MODIFY `id_role_tpu` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT for table `tpu`
--
ALTER TABLE `tpu`
  MODIFY `id_tpu` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id_user` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

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
