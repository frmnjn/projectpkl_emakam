-- phpMyAdmin SQL Dump
-- version 4.8.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 07, 2019 at 03:07 PM
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
(5, 1, 'KASIN-C', NULL),
(6, 3, 'SAMAAN-A ', NULL),
(19, 3, 'SAMAAN-B', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `dokumen`
--

CREATE TABLE `dokumen` (
  `id` int(11) NOT NULL,
  `kode_registrasi` varchar(25) DEFAULT NULL,
  `nama_almarhum` varchar(50) DEFAULT NULL,
  `nama_pewaris` varchar(50) DEFAULT NULL,
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
(39, 'KASIN-39', 'Bambang Adi Natanegara', 'Abdul Rifai Natanegara', '1990-10-10 00:00:00', 'firmanbudis@gmail.com', 'Pegawai Negeri Sipil', 78, 1, 1, 'public/files/OMCPqPYxtSkefDTdIueoPkVEQO2oI630bDg7KH0g.jpeg', 'public/files/GyI6mUdirzYkAGs5yvU2W7DkBkLajo0cuQ1X50rX.jpeg', 'public/files/25zlJFyZ0FjYBaAymRP8Ucuno41joBFW76jz5WNJ.jpeg', 'public/files/25zlJFyZ0FjYBaAymRP8Ucuno41joBFW76jz5WNJ.jpeg', 'public/files/25zlJFyZ0FjYBaAymRP8Ucuno41joBFW76jz5WNJ.jpeg', 'Lengkap', 'Menunggu Persetujuan Kepala UPT', NULL, NULL, NULL, NULL),
(40, 'KASIN-40', 'Sutikno Teguh', 'Adji Muljo Teguh', '1992-12-05 00:00:00', 'firmanbudis@gmail.com', 'Karyawan Swasta', 79, 1, 1, 'public/files/hX2Tf5pbq8ByKiDtKg2Of3da2vQEEZKITOcOvLhO.jpeg', 'public/files/z2O3QjzR5FJf9kSrUlkgoRPbdyt6aKN21OwY7BDM.jpeg', 'public/files/pBkjGsgujUhzmJ7OkEkTMiEQl7yDp1XaeQSKeJY3.jpeg', 'public/files/pBkjGsgujUhzmJ7OkEkTMiEQl7yDp1XaeQSKeJY3.jpeg', 'public/files/pBkjGsgujUhzmJ7OkEkTMiEQl7yDp1XaeQSKeJY3.jpeg', 'Lengkap', 'Proses Selesai', '7 Februari 2019', '070', '7 Februari 2019', '123'),
(41, 'SAMAAN-41', 'Lala Putri Satrio', 'Bobby Iman Satrio', '1989-05-10 00:00:00', 'firmanbudis@gmail.com', 'Tentara Nasional Indonesia', 80, 3, 4, 'public/files/iFc0HoYsu3mwzBZvTFfSQWEtf7npOeXhQ4e0Xutg.jpeg', 'public/files/TBulYlI9ns3l7ZMNBh8IFmjUnuqLT4So8Zqs0sxa.jpeg', 'public/files/ZDu8lUIulpjoSepRdu8GUFOwKmIaZQW69j1K6HtS.jpeg', 'public/files/ZDu8lUIulpjoSepRdu8GUFOwKmIaZQW69j1K6HtS.jpeg', 'public/files/ZDu8lUIulpjoSepRdu8GUFOwKmIaZQW69j1K6HtS.jpeg', 'Lengkap', 'Menunggu Persetujuan Kepala UPT', NULL, NULL, NULL, NULL),
(42, 'SAMAAN-42', 'Muhammad Reza Setiawan', 'Chairul Iskandar Zulkarnaen', '1991-04-10 00:00:00', 'firmanbudis@gmail.com', 'Seniman', 81, 3, 4, 'public/files/x54Q1DPPvZ0ZM2xmq0FB0Fq93DWgBgOr5J1H9xU3.jpeg', 'public/files/WN5D5uPswfxqQ0hCCV2uZWNV4dQZwHv6WcyCeiSL.jpeg', 'public/files/tjvRMMvqRY83KxSAgEIxHnDBHvqzyL08rBldnRd0.jpeg', 'public/files/tjvRMMvqRY83KxSAgEIxHnDBHvqzyL08rBldnRd0.jpeg', 'public/files/tjvRMMvqRY83KxSAgEIxHnDBHvqzyL08rBldnRd0.jpeg', 'Lengkap', 'Menunggu Persetujuan Kepala UPT', NULL, NULL, NULL, NULL);

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
(13, 1, 'KASIN-A-1', 1, '-7.988767781280417', '112.62377628902561', '2019-02-07 19:20:48'),
(14, 1, 'KASIN-B-1', 2, '-7.987983669536812', '112.62353010597326', '2019-02-07 20:08:41'),
(15, 1, 'KASIN-C-1', 5, '-7.989243846296731', '112.6233048700011', '2019-02-07 20:09:25'),
(16, 1, 'SAMAAN-A -1', 6, '-7.958500825983523', '112.62813575828795', '2019-02-07 20:29:08'),
(17, 1, 'SAMAAN-B-1', 19, '-7.960137305857808', '112.63041626737686', '2019-02-07 20:29:30');

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
  `nama` varchar(50) DEFAULT NULL,
  `jenis_kelamin` varchar(10) DEFAULT NULL,
  `alamat_terakhir` varchar(1000) DEFAULT NULL,
  `tanggal_lahir_alm` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `tanggal_wafat` datetime DEFAULT NULL,
  `tanggal_pemakaman` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `status` varchar(20) DEFAULT NULL,
  `id_makam` int(11) NOT NULL,
  `nama_ahli_waris` varchar(50) DEFAULT NULL,
  `alamat_ahli_waris` varchar(1000) DEFAULT NULL,
  `nik_ahli_waris` varchar(45) DEFAULT NULL,
  `kontak_ahli_waris` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `penghuni_makam`
--

INSERT INTO `penghuni_makam` (`id_penghuni_makam`, `nama`, `jenis_kelamin`, `alamat_terakhir`, `tanggal_lahir_alm`, `tanggal_wafat`, `tanggal_pemakaman`, `status`, `id_makam`, `nama_ahli_waris`, `alamat_ahli_waris`, `nik_ahli_waris`, `kontak_ahli_waris`) VALUES
(78, 'Bambang Adi Natanegara', 'Laki-Laki', 'JL. BANDUNG 7C MALANG, PENANGGUNGAN, Kec. Klojen', '1970-12-15 00:00:00', '2018-05-10 00:00:00', '2018-05-11 00:00:00', 'Baru', 13, 'Abdul Rifai Natanegara', 'JL. BANDUNG 7C MALANG, PENANGGUNGAN, Kec. Klojen', '9741300679288073', '089010930521'),
(79, 'Sutikno Teguh', 'Laki-Laki', 'JL. SYARIF AL QODRI NO. 35 JL. ADE IRMA SURYANI NO. 50, Kauman, Kec. Klojen', '1981-07-15 00:00:00', '2019-01-15 00:00:00', '2019-01-16 00:00:00', 'Baru', 14, 'Adji Muljo Teguh', 'JL. SYARIF AL QODRI NO. 35 JL. ADE IRMA SURYANI NO. 50, Kauman, Kec. Klojen', '8684375302803923', '081644691714'),
(80, 'Lala Putri Satrio', 'Perempuan', 'JL. Candi Telagawangi No.39, Mojolangu, Kec. Lowokwaru', '1964-08-08 00:00:00', '2015-07-21 00:00:00', '2014-07-22 00:00:00', 'Baru', 16, 'Bobby Iman Satrio', 'JL. Candi Telagawangi No.39, Mojolangu, Kec. Lowokwaru', '9552040831036791', '087657725230'),
(81, 'Muhammad Reza Setiawan', 'Laki-Laki', 'L KH YUSUF 174 TASIKMADU LOWOKWARU MALANG, Tasikmadu, Kec. Lowokwaru', '1960-08-08 00:00:00', '2018-11-12 00:00:00', '2018-11-13 00:00:00', 'Baru', 16, 'Chairul Iskandar Zulkarnaen', 'L KH YUSUF 174 TASIKMADU LOWOKWARU MALANG, Tasikmadu, Kec. Lowokwaru', '0442495306196182', '086246716695');

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
(62, 5, '-7.953118898479589', '112.61268269949187'),
(63, 5, '-7.953357975354007', '112.61292409830321'),
(64, 5, '-7.953320785627145', '112.61327278547515'),
(65, 5, '-7.95306045744464', '112.61355709963073'),
(66, 5, '-7.952614180175923', '112.61362147264708'),
(67, 5, '-7.952576990381623', '112.61311721735228'),
(68, 5, '-7.952709811060108', '112.61268269949187'),
(155, 19, '-7.952992718961905', '112.61280339889754'),
(156, 19, '-7.952716452092901', '112.61274975471724'),
(157, 19, '-7.953194606171558', '112.6133720272087'),
(158, 19, '-7.9528227086029935', '112.61358123951186'),
(159, 19, '-7.952594257072243', '112.61327010326613');

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
(10, 15, 5),
(12, 17, 1),
(13, 18, 1),
(14, 20, 4),
(15, 21, 4);

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
(14, 3, 4),
(23, 1, 12),
(26, 3, 12),
(31, 1, 16),
(32, 3, 19);

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
(1, 'TPU Kasin Malang', 'KASIN', 1, '-7.988987310389188', '112.62391899199429'),
(3, 'TPU Samaan', 'SAMAAN', 4, '-7.958771170004733', '112.62956885907386');

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
(15, 'adminkecamatan', '$2y$10$.KtROaPHS7KpCa5pm86waujuH361uEUc8fWfDHEJQO5NfZWntELKm', 5),
(16, 'admintpukasin', '$2y$10$hAHPJBoOcjRVwwkKsW5JSeXauR48ua5IP1IegZmNYejdyu5qzz16u', 1),
(17, 'adminkecamatanklojen', '$2y$10$44iV7lTeWtpD5znB7eYpAuwQH53lKbZ9KKAFMqlYJyvUgfaL/CbLW', 5),
(18, 'kepalakecamatanklojen', '$2y$10$3m/YEVKf3JfD.Gecju1p1e4HLmOF7jBuDZpB/rqnqtCHmYddQXs8u', 4),
(19, 'admintpusamaan', '$2y$10$w5J.Ze0iHKXGfhWVJGiqfevCl1THDC0ilwH8tqDkV1uuDT3NNiKJ.', 1),
(20, 'adminkecamatanlowokwaru', '$2y$10$jGqq22M2yQvtxXk628c8LeXQTKEutQG4QJJBd/eolnWd..BdLfxdu', 5),
(21, 'kepalakecamatanlowokwaru', '$2y$10$9XHBqSwsO8hD5PE9BftHF.6lspGP3RkAdSm/Vz0LOHScL0wOyG1MO', 4);

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=43;

--
-- AUTO_INCREMENT for table `kecamatan`
--
ALTER TABLE `kecamatan`
  MODIFY `id_kecamatan` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `makam`
--
ALTER TABLE `makam`
  MODIFY `id_makam` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `notifikasi`
--
ALTER TABLE `notifikasi`
  MODIFY `id_notifikasi` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `penghuni_makam`
--
ALTER TABLE `penghuni_makam`
  MODIFY `id_penghuni_makam` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=82;

--
-- AUTO_INCREMENT for table `polygon`
--
ALTER TABLE `polygon`
  MODIFY `id_polygon` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=244;

--
-- AUTO_INCREMENT for table `role_kecamatan`
--
ALTER TABLE `role_kecamatan`
  MODIFY `id_role` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `role_tpu`
--
ALTER TABLE `role_tpu`
  MODIFY `id_role_tpu` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT for table `tpu`
--
ALTER TABLE `tpu`
  MODIFY `id_tpu` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id_user` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

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
