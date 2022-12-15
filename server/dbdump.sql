-- MySQL dump 10.13  Distrib 5.7.40, for Linux (x86_64)
--
-- Host: localhost    Database: db
-- ------------------------------------------------------
-- Server version	5.7.40

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Category`
--

DROP TABLE IF EXISTS `Category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Category` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Category` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Category`
--

LOCK TABLES `Category` WRITE;
/*!40000 ALTER TABLE `Category` DISABLE KEYS */;
INSERT INTO `Category` VALUES (10,'bakery'),(12,'cafe'),(13,'dining_room'),(14,'grocery'),(15,'pizzeria'),(16,'ramen'),(17,'restaurant'),(18,'undefined'),(19,'fastfood');
/*!40000 ALTER TABLE `Category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Feedback`
--

DROP TABLE IF EXISTS `Feedback`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Feedback` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Place_ID` int(11) NOT NULL,
  `Rate` tinyint(4) NOT NULL,
  `Comment` varchar(140) DEFAULT NULL,
  `Budget_Rating` tinyint(4) DEFAULT NULL,
  `User_ID` int(11) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `Place_ID` (`Place_ID`),
  KEY `Users_ID` (`User_ID`),
  CONSTRAINT `Feedback_ibfk_1` FOREIGN KEY (`Place_ID`) REFERENCES `Place` (`ID`),
  CONSTRAINT `Feedback_ibfk_2` FOREIGN KEY (`User_ID`) REFERENCES `User` (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Feedback`
--

LOCK TABLES `Feedback` WRITE;
/*!40000 ALTER TABLE `Feedback` DISABLE KEYS */;
INSERT INTO `Feedback` VALUES (7,1,5,'VERY CCOOL',3,21),(8,11,5,'Lovely',4,22),(9,4,5,'Very tasty',5,21),(10,7,3,'Pinnaple pizza is good',2,16),(11,10,2,'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.',4,23),(12,11,1,'Thanks!',3,13);
/*!40000 ALTER TABLE `Feedback` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Place`
--

DROP TABLE IF EXISTS `Place`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Place` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Title` varchar(50) NOT NULL,
  `Adress` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Category_ID` int(11) NOT NULL,
  `Latitude` float NOT NULL,
  `Longitude` float NOT NULL,
  `Added_Timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `Requested_Timestamp` datetime DEFAULT NULL,
  `Opened` tinyint(1) DEFAULT '1',
  `Submission_User_ID` int(11) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `Category_ID` (`Category_ID`),
  KEY `Submission User` (`Submission_User_ID`),
  CONSTRAINT `Place_ibfk_1` FOREIGN KEY (`Category_ID`) REFERENCES `Category` (`ID`),
  CONSTRAINT `Place_ibfk_2` FOREIGN KEY (`Submission_User_ID`) REFERENCES `User` (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Place`
--

LOCK TABLES `Place` WRITE;
/*!40000 ALTER TABLE `Place` DISABLE KEYS */;
INSERT INTO `Place` VALUES (1,'McDonald\'s','Lubānas iela 76B, Latgales priekšpilsēta, Rīga, LV-1073',19,56.9312,24.1986,'2022-12-01 15:26:47',NULL,1,13),(2,'McDonald\'s','Gunāra Astras iela 17, Vidzemes priekšpilsēta, Rīga, LV-1082',19,56.9507,24.1853,'2022-12-01 15:38:25',NULL,1,14),(3,'McDonald\'s','Krasta iela 101A, Latgales priekšpilsēta, Rīga, LV-1019',19,56.9241,24.1625,'2022-12-01 15:52:21',NULL,1,15),(4,'LIDO','Krasta iela 76, Latgales priekšpilsēta, Rīga, LV-1019',13,56.927,24.1597,'2022-12-01 17:05:53',NULL,1,16),(5,'Hasana Kebabs Deglava','Augusta Deglava iela 69b, Vidzemes priekšpilsēta, Rīga, LV-1035',18,56.9484,24.1959,'2022-12-01 17:08:22',NULL,1,17),(7,'Maxima XXX','Andreja Saharova iela 20A, Latgales priekšpilsēta, Rīga, LV-1021',14,56.9418,24.207,'2022-12-01 17:10:20',NULL,1,14),(8,'Domino\'s Pizza','Augusta Deglava iela 100, Latgales priekšpilsēta, Rīga, LV-1082',15,56.949,24.1873,'2022-12-01 17:11:41',NULL,1,13),(9,'RamenRiga','Stabu iela 14, Centra rajons, Rīga, LV-1011',16,56.9578,24.1249,'2022-12-01 17:12:52',NULL,1,15),(10,'Caffeine LV','Tērbatas iela 68, Centra rajons, Rīga, LV-1011',16,56.9583,24.1313,'2022-12-01 17:13:58',NULL,1,13),(11,'Martin\'s Bakery','Vaļņu iela 28, Centra rajons, Rīga, LV-1050',10,56.9481,24.1133,'2022-12-01 17:15:38',NULL,1,20),(12,'Better Bread','Dzirnavu iela 31-1B, Centra rajons, Rīga, LV-1010',18,24.1123,56.9593,'2022-12-01 17:16:36',NULL,0,21),(13,'Cafe Lungo','Stirnu iela 4, Vidzemes priekšpilsēta, Rīga, LV-1082',12,56.9517,24.1845,'2022-12-07 11:11:50','2022-12-01 17:34:26',1,22);
/*!40000 ALTER TABLE `Place` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Place_Submission`
--

DROP TABLE IF EXISTS `Place_Submission`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Place_Submission` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Title` varchar(50) NOT NULL,
  `Adress` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Category_ID` int(11) NOT NULL,
  `Latitude` float NOT NULL,
  `Longitude` float NOT NULL,
  `Requested_Timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `Submission_User_ID` int(11) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `Category_ID` (`Category_ID`),
  KEY `Submission User` (`Submission_User_ID`),
  CONSTRAINT `Place_Submission_ibfk_1` FOREIGN KEY (`Category_ID`) REFERENCES `Category` (`ID`),
  CONSTRAINT `Place_Submission_ibfk_2` FOREIGN KEY (`Submission_User_ID`) REFERENCES `User` (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Place_Submission`
--

LOCK TABLES `Place_Submission` WRITE;
/*!40000 ALTER TABLE `Place_Submission` DISABLE KEYS */;
INSERT INTO `Place_Submission` VALUES (1,'Ja1z Pizza','Stirnu iela 18, Vidzemes priekšpilsēta, Rīga, LV-1082',15,56.9554,24.1824,'2022-12-01 17:34:26',21);
/*!40000 ALTER TABLE `Place_Submission` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `User`
--

DROP TABLE IF EXISTS `User`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `User` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Name` varchar(20) NOT NULL,
  `Surname` varchar(20) NOT NULL,
  `Login` varchar(20) DEFAULT NULL,
  `Password` varchar(20) DEFAULT NULL,
  `Phone` varchar(15) NOT NULL,
  `Email` varchar(50) DEFAULT NULL,
  `Registration_Timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `Role` enum('USER','ADMIN','MODERATOR') DEFAULT 'USER',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `User`
--

LOCK TABLES `User` WRITE;
/*!40000 ALTER TABLE `User` DISABLE KEYS */;
INSERT INTO `User` VALUES (1,'Mihails','Pavlovs',NULL,NULL,'+37128343867',NULL,'2022-12-01 12:58:58','ADMIN'),(13,'Nikita','Kolakovs','cool_user1','Cxy2U57E!m5Z','+37134567894','randy.berge@kuvalis.com','2022-12-01 13:40:32','USER'),(14,'Fedya','Kot','cool_user2','W2Yt969**fDn','+37123445678','zgerhold@gmail.com','2022-12-01 13:40:32','USER'),(15,'Daniella','Halik','cool_user3','w5T4CZ61vSL^','+37126578595','kathryn00@torphy.biz','2022-12-01 13:40:32','USER'),(16,'Fedya','Zravstvuyte','cool_user4','UXh6XTN3&1T1','+37123456789','hyman.mclaughlin@gmail.com','2022-12-01 13:40:32','USER'),(17,'Richard','Fediriv','cool_user5','aU65$tN7!gE1','+37124446789','bins.chloe@yahoo.com','2022-12-01 13:40:32','USER'),(18,'Alex','Krug','cool_user5','1dvK$RK5s27W','+37123456783','reta.fay@gmail.com','2022-12-01 13:40:32','USER'),(19,'Viktors','Kulakovs','cool_user6','bTq1&q5L1wm*','+37128343434','lkemmer@gmail.com','2022-12-01 13:40:32','USER'),(20,'Maksims','Cvetkovs','cool_user7','oZ*91o4KDrpj','+37128343456','shields.marlon@yahoo.com','2022-12-01 13:40:32','USER'),(21,'Andrew','McQueen','cool_user8','o7VY$6d4yw!4','+3712456789','shields.marlon@yahoo.com','2022-12-01 13:40:32','USER'),(22,'Nikita','TypeScript','cool_user9','^$50z0S3nqTr','+37124570026','shields.marlon@yahoo.com','2022-12-01 13:40:32','USER'),(23,'Aina','Sprogis','viktor','MyAngelJa1z','+37127563985','brendon.hodkiewicz@gmail.com','2022-12-01 13:40:32','USER');
/*!40000 ALTER TABLE `User` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-12-15  0:53:07
