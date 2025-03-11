-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2025. Már 11. 10:32
-- Kiszolgáló verziója: 10.4.28-MariaDB
-- PHP verzió: 8.2.4

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
  `l_name` varchar(50) DEFAULT NULL,
  `color` varchar(7) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `label`
--

INSERT INTO `label` (`id`, `l_name`, `color`) VALUES
(1, 'Nincs cimke', '#96948F'),
(2, 'Munka', '#33FF57'),
(3, 'Személyes', '#3357FF'),
(4, 'Egészség', '#78E08F'),
(5, 'Pénzügy', '#F7B93B'),
(6, 'Tanulás', '#60A3BC'),
(7, 'Otthon', '#A29BFE'),
(8, 'Hobbik', '#D980FA'),
(10, 'Utazás', '#38ADA9'),
(11, 'Iskola', '#FA983A'),
(12, 'Vásárlás', '#FDA8DF'),
(13, 'Javítás', '#E55039');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `task`
--

CREATE TABLE `task` (
  `id` int(11) NOT NULL,
  `t_name` varchar(50) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `label_id` int(11) DEFAULT NULL,
  `priority` smallint(6) DEFAULT NULL,
  `progresson` smallint(6) DEFAULT NULL,
  `deadline` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `task`
--

INSERT INTO `task` (`id`, `t_name`, `description`, `user_id`, `label_id`, `priority`, `progresson`, `deadline`) VALUES
(25, 'Anyas', 'gfkgidjghjdhgjhfdij', 8, 1, 1, 1, '2025-03-05'),
(26, 'teszt', '2321313', 8, 1, 7, 1, '2025-03-11'),
(27, 'dsfsfsffsf', 'adsadadsad', 8, 2, 7, 1, '2025-03-11'),
(28, 'Szemelyes', '012', 8, 3, 5, 1, '2025-03-11'),
(29, 'Egezseg', '12', 8, 4, 2, 12, '2025-03-11'),
(30, 'Penzugy', 'dfsf', 8, 5, 3, 2, '2025-03-11'),
(31, 'Tanulas', 'ds', 8, 6, 3, 3, '2025-03-11'),
(32, 'Otthon', 'd', 8, 7, 5, 21, '2025-03-11'),
(33, 'Hobbi', '12', 8, 8, 5, 21, '2025-03-11'),
(34, 'Utazas', 'sada', 8, 10, 5, 1, '2025-03-11'),
(35, 'Iskola', 'sdfsf', 8, 11, 1, 1, '2025-03-11'),
(36, 'Vásárlás', 'sd', 8, 12, 3, 1, '2025-03-11'),
(37, 'Javitas', '2323', 8, 13, 3, 1212, '2025-03-11'),
(38, 'Lopás', 'Elkell lopni', 8, 2, 5, 4, '2025-03-10'),
(39, 'fdgdg', 'dfgd', 8, 1, 5, 1, '2025-03-11');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(50) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `password` varchar(250) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`) VALUES
(5, 'Teszt', 'teszt@gmail.com', '$2y$10$VFg/3i2csDC6W1lQjPsGmexPfw6qI5DtJFwfY.lnNt1KsHBJ28Kna'),
(8, 't', 't@gmail.com', '$2y$10$.47uQuIDnux.XBmTefojoefQkeuAWXyk.uwQqs409krvsrQH.T.1S');

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT a táblához `task`
--
ALTER TABLE `task`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;

--
-- AUTO_INCREMENT a táblához `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

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
  ADD CONSTRAINT `task_ibfk_2` FOREIGN KEY (`label_id`) REFERENCES `label` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
