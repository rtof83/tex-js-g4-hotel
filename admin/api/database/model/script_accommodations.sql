-- --------------------------------------------------------
-- Servidor:                     127.0.0.1
-- Versão do servidor:           8.0.32 - MySQL Community Server - GPL
-- OS do Servidor:               Win64
-- HeidiSQL Versão:              12.3.0.6589
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Copiando estrutura do banco de dados para hotel
CREATE DATABASE IF NOT EXISTS `hotel` /*!40100 DEFAULT CHARACTER SET utf8mb3 */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `hotel`;

-- Copiando estrutura para tabela hotel.accommodation
CREATE TABLE IF NOT EXISTS `accommodation` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `image` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `description` varchar(255) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb3;

-- Copiando dados para a tabela hotel.accommodation: ~9 rows (aproximadamente)
DELETE FROM `accommodation`;
INSERT INTO `accommodation` (`id`, `name`, `image`, `description`, `price`, `status`) VALUES
	(1, 'Quarto Casal', 'https://raw.githubusercontent.com/rtof83/tex-js-grupo4-final/main/src/assets/images/QuartoCasal.png', 'Nossa opção para você que busca um espaço mais intimista. Com design em madeira e vidro, destacando a luz natural, possui vista para o mar. Perfeito para um final de semana com quem você ama!', 190.00, 1),
	(2, 'Quarto Executivo', 'https://raw.githubusercontent.com/rtof83/tex-js-grupo4-final/main/src/assets/images/Su%C3%ADtePresidencial.jpg', 'Para você que busca conforto e mais espaço, a suíte executiva é a ideal. Além do design em madeira, possui paredes de vidro que permitem você acordar todas as manhãs com uma vista sensacional.', 350.00, 1),
	(3, 'Quarto Presidencial Luxo', 'https://raw.githubusercontent.com/rtof83/tex-js-grupo4-final/main/src/assets/images/quarto_hotel.jpg', 'Nossa principal acomodação, a suíte presidencial luxo possui 1.132 metros quadrados, design intimista com cores sóbrias e duas suítes com banheira de hidromassagem para a sua inteira disposição. Não deixe de conferir!', 600.00, 1),
	(4, 'Quarto Litoral', 'https://raw.githubusercontent.com/rtof83/tex-js-grupo4-final/main/src/assets/images/QuartoLuxo.jpg', 'Nossa opção para você que busca uma excelente vista para o mar! Desfrute de todo o nosso conforto com uma visão privilegiada do nosso litoral!', 800.00, 1),
	(5, 'Quarto Weekend', 'https://raw.githubusercontent.com/rtof83/tex-js-grupo4-final/main/src/assets/images/suite-estudio-3.jpg', 'Para você que busca uma opção confortável e simples. Nosso quarto weekend é perfeito para você que busca um lugar para descansar enquanto curte o final de semana em nossa cidade!', 400.00, 1),
	(6, 'Quarto Atlantic', 'https://raw.githubusercontent.com/rtof83/tex-js-grupo4-final/main/src/assets/images/suite-executiva-4.jpg', 'Um dos nossos melhores quartos! Possui um design em madeira, possui paredes de vidro que permitem você acordar todas as manhãs com uma vista sensacional.', 800.00, 1),
	(7, 'Quarto Holiday', 'https://raw.githubusercontent.com/rtof83/tex-js-grupo4-final/main/src/assets/images/1604663246841.jpg', 'Para você que busca uma opção confortável e simples. Nosso quarto weekend é perfeito para você que busca um lugar para descansar enquanto curte o feriado em nossa cidade!', 300.00, 1),
	(8, 'Quarto Honey Moon', 'https://raw.githubusercontent.com/rtof83/tex-js-grupo4-final/main/src/assets/images/suite-presidencial-1.jpg', 'Quarto perfeito para passar a lua de mel com quem você ama! Desfrute do nosso serviço de quarto plus, vista para o mar e todo o nosso conforto nesse momento tão especial!', 500.00, 1),
	(9, 'Quarto Day Off', 'https://raw.githubusercontent.com/rtof83/tex-js-grupo4-final/main/src/assets/images/Su%C3%ADtePresidencial.jpg', 'Quarto perfeito para descansar, com serviço de spa incluso, massagem especializada e todo o nosso conforto para tornar o seu dia de folga especial!', 100.00, 1);

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
