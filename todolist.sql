-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2025. Ápr 10. 13:04
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
(39, 'fdgdg', 'dfgd', 8, 1, 5, 1, '2025-03-11'),
(40, 'Proba', 'Proba leiras', 8, 6, 3, 1, '2025-03-12'),
(41, 'teszr', 'Teszt leiras', 9, 4, 3, 1, '2025-03-12'),
(42, 'teszr', 'Teszt leiras', 9, 5, 10, 1, '2025-03-13'),
(43, 'teszr', 'Teszt leiras', 9, 5, 10, 1, '2025-03-12'),
(44, 'Prob', 'dfsdfsfd', 8, 1, 6, 1, '2025-03-12'),
(45, 'Proba', 'asdadasdsaasd', 8, 4, 3, 1, '2025-03-13'),
(46, 'Probaa', 'dfgdfgfdgdfg', 8, 3, 7, 1, '2025-03-13'),
(47, 'edzés', 'futás', 11, 4, 10, 0, '2025-03-14'),
(48, 'fdssfsf', 'sdsfds', 8, 5, 3, 1, '2025-03-20'),
(49, 'teszt', 'Tezdsgsdgsdgdsgsgsggdsdgsdgsdgsdgsdgdsgdsdgsgsgsg', 8, 3, 5, 1, '2025-04-10'),
(53, 'Proba', 'Teszt leiras', 8, 1, 5, 0, '2025-04-10'),
(54, 'Probas', 'Teszt leiras', 8, 1, 5, 0, '2025-04-10');

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
(8, 't', 't@gmail.com', '$2y$10$.47uQuIDnux.XBmTefojoefQkeuAWXyk.uwQqs409krvsrQH.T.1S'),
(9, 'Teszt2', 'teszt2@gmail.com', '$2y$10$59qzVQOlUrwOnIVcdfpngOTUu779neG39fjUXDdb6zwjmDZ8UsM/K'),
(10, 'Teszr2', 'teszt3@gmail.com', '$2y$10$PC2./o.Ljh7RdQwX4PAx8eLjzC4emwukd81YO1eDYdmtbgTJ9UCaS'),
(11, 'asdasd', 'asdasd@gmail.com', '$2y$10$vV7hwwvSmPvj4/vgMY0Ndu57b8XwJY6NxXR.E0JxbFa3O6LEYFFcO');

--
-- Indexek a kiírt táblákhoz
--

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
-- AUTO_INCREMENT a táblához `label`
--
ALTER TABLE `label`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT a táblához `task`
--
ALTER TABLE `task`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=56;

--
-- AUTO_INCREMENT a táblához `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- Megkötések a kiírt táblákhoz
--

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
