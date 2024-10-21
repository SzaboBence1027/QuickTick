-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2024. Okt 21. 12:25
-- Kiszolgáló verziója: 10.4.32-MariaDB
-- PHP verzió: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Adatbázis: `todolist`
--

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `groups`
--

CREATE TABLE `groups` (
  `id` int(11) NOT NULL,
  `g_name` varchar(50) DEFAULT NULL,
  `leader_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `group_link`
--

CREATE TABLE `group_link` (
  `user_id` int(11) NOT NULL,
  `group_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `label`
--

CREATE TABLE `label` (
  `id` int(11) NOT NULL,
  `l_name` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `label`
--

INSERT INTO `label` (`id`, `l_name`) VALUES
(1, 'Otthoni feladat');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `task`
--

CREATE TABLE `task` (
  `id` int(11) NOT NULL,
  `t_name` varchar(50) DEFAULT NULL,
  `description` varchar(100) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `label_id` int(11) DEFAULT NULL,
  `priority` smallint(6) DEFAULT NULL,
  `progresson` smallint(6) DEFAULT NULL,
  `deadline` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(50) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `password` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `groups`
--
ALTER TABLE `groups`
  ADD PRIMARY KEY (`id`),
  ADD KEY `felhasznalo_id` (`leader_id`);

--
-- A tábla indexei `group_link`
--
ALTER TABLE `group_link`
  ADD PRIMARY KEY (`user_id`,`group_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `group_id` (`group_id`);

--
-- A tábla indexei `label`
--
ALTER TABLE `label`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `task`
--
ALTER TABLE `task`
  ADD PRIMARY KEY (`id`),
  ADD KEY `felhasznalo_id` (`user_id`),
  ADD KEY `cimke_id` (`label_id`);

--
-- A tábla indexei `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `groups`
--
ALTER TABLE `groups`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `label`
--
ALTER TABLE `label`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT a táblához `task`
--
ALTER TABLE `task`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Megkötések a kiírt táblákhoz
--

--
-- Megkötések a táblához `groups`
--
ALTER TABLE `groups`
  ADD CONSTRAINT `groups_ibfk_1` FOREIGN KEY (`leader_id`) REFERENCES `users` (`id`);

--
-- Megkötések a táblához `group_link`
--
ALTER TABLE `group_link`
  ADD CONSTRAINT `group_link_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `group_link_ibfk_2` FOREIGN KEY (`group_id`) REFERENCES `groups` (`id`);

--
-- Megkötések a táblához `task`
--
ALTER TABLE `task`
  ADD CONSTRAINT `task_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `task_ibfk_2` FOREIGN KEY (`label_id`) REFERENCES `label` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
