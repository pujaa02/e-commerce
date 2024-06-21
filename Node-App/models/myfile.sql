-- MySQL dump 10.13  Distrib 8.0.36, for Linux (x86_64)
--
-- Host: localhost    Database: e_commerce
-- ------------------------------------------------------
-- Server version	8.0.37-0ubuntu0.20.04.3

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `product_data`
--

DROP TABLE IF EXISTS `product_data`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_data` (
  `product_data_id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL,
  `price` float DEFAULT NULL,
  `description` text,
  `category` varchar(56) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `rate` float DEFAULT NULL,
  `count` int DEFAULT NULL,
  PRIMARY KEY (`product_data_id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_data`
--

LOCK TABLES `product_data` WRITE;
/*!40000 ALTER TABLE `product_data` DISABLE KEYS */;
INSERT INTO `product_data` VALUES (1,'Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops',110,'Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) \nin the padded sleeve, your everyday','men\'s clothing','https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg',4.2,0),(2,'Mens Casual Premium Slim Fit T-Shirts',22,'Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. \nThe Henley style round neckline includes a three-button placket.','men\'s clothing','https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg',4.8,0),(3,'Mens Cotton Jacket',56,'great outerwear jackets for Spring/Autumn/Winter, suitable for many occasions, such as working, hiking, camping, mountain/rock climbing, cycling, traveling or other outdoors. Good gift choice for you or your family member. A warm hearted love to Father, husband or son in this\n thanksgiving or Christmas Day.','men\'s clothing','https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg',5,0),(4,'Mens Casual Slim Fit',16,'The color could be slightly different between on the screen and in practice. / Please note that body builds vary by person, therefore, detailed size information\n should be reviewed below on the product description.','men\'s clothing','https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg',2.8,0),(5,'John Hardy Women\'s Legends Naga Gold & Silver Dragon Station Chain Bracelet',695,'From our Legends Collection, the Naga was inspired by the mythical water dragon that protects the ocean\'s pearl. Wear facing inward to be bestowed with love and abundance, or outward for protection.','jewelery','https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_.jpg',5,0),(6,'Solid Gold Petite Micropave ',168,'Satisfaction Guaranteed. Return or exchange any order within 30 days.Designed and sold by Hafeez Center in the United States. Satisfaction Guaranteed. Return or exchange any order within 30 days.','jewelery','https://fakestoreapi.com/img/61sbMiUnoGL._AC_UL640_QL65_ML3_.jpg',4.7,0),(7,'White Gold Plated Princess',10,'Classic Created Wedding Engagement Solitaire Diamond Promise Ring for Her. Gifts to spoil your love more for Engagement, Wedding, Anniversary, Valentine\'s Day...','jewelery','https://fakestoreapi.com/img/71YAIFU48IL._AC_UL640_QL65_ML3_.jpg',3.3,0),(8,'Pierced Owl Rose Gold Plated Stainless Steel Double',11,'Rose Gold Plated Double Flared Tunnel Plug Earrings. Made of 316L Stainless Steel','jewelery','https://fakestoreapi.com/img/51UDEzMJVpL._AC_UL640_QL65_ML3_.jpg',2.8,0),(9,'WD 2TB Elements Portable External Hard Drive - USB 3.0 ',64,'USB 3.0 and USB 2.0 Compatibility Fast data transfers Improve PC Performance High Capacity; Compatibility Formatted NTFS for Windows 10, Windows 8.1, Windows 7; Reformatting may be required for other operating systems; Compatibility may vary depending on user’s hardware configuration and operating system','electronics','https://fakestoreapi.com/img/61IBBVJvSDL._AC_SY879_.jpg',3.7,0),(10,'SanDisk SSD PLUS 1TB Internal SSD - SATA III 6 Gb/s',109,'Easy upgrade for faster boot up, shutdown, application load and response (As compared to 5400 RPM SATA 2.5” hard drive; Based on published specifications and internal benchmarking tests using PCMark vantage scores) Boosts burst write performance, making it ideal for typical PC workloads The perfect balance of performance and reliability Read/write speeds of up to 535MB/s/450MB/s (Based on internal testing; Performance may vary depending upon drive capacity, host device, OS and application.)','electronics','https://fakestoreapi.com/img/61U7T1koQqL._AC_SX679_.jpg',3.5,0),(11,'Silicon Power 256GB SSD 3D NAND A55 SLC Cache Performance Boost SATA III 2.5',109,'3D NAND flash are applied to deliver high transfer speeds Remarkable transfer speeds that enable faster bootup and improved overall system performance. The advanced SLC Cache Technology allows performance boost and longer lifespan 7mm slim design suitable for Ultrabooks and Ultra-slim notebooks. Supports TRIM command, Garbage Collection technology, RAID, and ECC (Error Checking & Correction) to provide the optimized performance and enhanced reliability.','electronics','https://fakestoreapi.com/img/71kWymZ+c+L._AC_SX679_.jpg',5,0),(12,'WD 4TB Gaming Drive Works with Playstation 4 Portable External Hard Drive',114,'Expand your PS4 gaming experience, Play anywhere Fast and easy, setup Sleek design with high capacity, 3-year manufacturer\'s limited warranty','electronics','https://fakestoreapi.com/img/61mtL65D4cL._AC_SX679_.jpg',5,0),(13,'Acer SB220Q bi 21.5 inches Full HD (1920 x 1080) IPS Ultra-Thin',599,'21. 5 inches Full HD (1920 x 1080) widescreen IPS display And Radeon free Sync technology. No compatibility for VESA Mount Refresh Rate: 75Hz - Using HDMI port Zero-frame design | ultra-thin | 4ms response time | IPS panel Aspect ratio - 16: 9. Color Supported - 16. 7 million colors. Brightness - 250 nit Tilt angle -5 degree to 15 degree. Horizontal viewing angle-178 degree. Vertical viewing angle-178 degree 75 hertz','electronics','https://fakestoreapi.com/img/81QpkIctqPL._AC_SX679_.jpg',3.9,0),(14,'Samsung 49-Inch CHG90 144Hz Curved Gaming Monitor (LC49HG90DMNXZA) – Super Ultrawide Screen QLED ',1000,'49 INCH SUPER ULTRAWIDE 32:9 CURVED GAMING MONITOR with dual 27 inch screen side by side QUANTUM DOT (QLED) TECHNOLOGY, HDR support and factory calibration provides stunningly realistic and accurate color and contrast 144HZ HIGH REFRESH RATE and 1ms ultra fast response time work to eliminate motion blur, ghosting, and reduce input lag','electronics','https://fakestoreapi.com/img/81Zt42ioCgL._AC_SX679_.jpg',2.2,0),(15,'BIYLACLESEN Women\'s 3-in-1 Snowboard Jacket Winter Coats',57,'Note:The Jackets is US standard size, Please choose size as your usual wear Material: 100% Polyester; \nDetachable Liner Fabric: Warm Fleece. Detachable Functional Liner: Skin Friendly, Lightweigt \nand Warm.Stand Collar Liner jacket, keep you warm in cold weather. Zippered Pockets: 2 Zippered Hand Pockets,\n 2 Zippered Pockets on Chest (enough to keep cards or keys)and 1 Hidden Pocket Inside.','women\'s clothing','https://fakestoreapi.com/img/51Y5NI-I5jL._AC_UX679_.jpg',3.9,0),(16,'Lock and Love Women\'s Removable Hooded Faux Leather Moto Biker Jacket',30,'100% POLYURETHANE(shell) 100% POLYESTER(lining) \n75% POLYESTER 25% COTTON (SWEATER), Faux leather material for style and comfort / 2 pockets of front, \n2-For-One Hooded denim style faux leather jacket.','women\'s clothing','https://fakestoreapi.com/img/81XH0e8fefL._AC_UY879_.jpg',3.4,0),(17,'Rain Jacket Women Windbreaker Striped Climbing Raincoats',40,'Lightweight perfet for trip or casual wear---Long sleeve with hooded, adjustable drawstring waist design. Button and zipper front closure raincoat, fully stripes Lined and The Raincoat has 2 side pockets are a good size to hold all kinds of things, it covers the hips, and the hood is generous but doesn\'t overdo it.Attached Cotton Lined Hood with Adjustable Drawstrings give it a real styled look.','women\'s clothing','https://fakestoreapi.com/img/71HblAHs5xL._AC_UY879_-2.jpg',4.2,0),(18,'MBJ Women\'s Solid Short Sleeve Boat Neck V ',10,'95% RAYON 5% SPANDEX, Made in USA or Imported, Do Not Bleach, Lightweight fabric with great stretch for comfort, Ribbed on sleeves and neckline / Double stitching on bottom hem','women\'s clothing','https://fakestoreapi.com/img/71z3kpMAYsL._AC_UY879_.jpg',5,0),(19,'Opna Women\'s Short Sleeve Moisture',8,'100% Polyester, Machine wash, 100% cationic polyester interlock, Machine Wash & Pre Shrunk for a Great Fit, Lightweight, roomy and highly breathable with moisture wicking fabric which helps to keep moisture away, Soft Lightweight Fabric with comfortable V-neck collar and a slimmer fit, delivers a sleek, more feminine silhouette and Added Comfort','women\'s clothing','https://fakestoreapi.com/img/51eg55uWmdL._AC_UX679_.jpg',5,0),(20,'DANVOUY Womens T Shirt Casual Cotton Short',13,'95%Cotton,5%Spandex, Features: Casual, Short Sleeve, Letter Print,V-Neck,Fashion Tees, The fabric is soft and has some stretch., Occasion: Casual/Office/Beach/School/Home/Street. Season: Spring,Summer,Autumn,Winter.','women\'s clothing','https://fakestoreapi.com/img/61pHAEJ4NML._AC_UX679_.jpg',4.9,0),(21,'Essence Mascara Lash Princess',9.99,'The Essence Mascara Lash Princess is a popular mascara known for its volumizing and lengthening effects. Achieve dramatic lashes with this long-lasting and cruelty-free formula.','beauty','https://cdn.dummyjson.com/products/images/beauty/Essence%20Mascara%20Lash%20Princess/1.png',4.9,0),(22,'Eyeshadow Palette with Mirror',19.99,'The Eyeshadow Palette with Mirror offers a versatile range of eyeshadow shades for creating stunning eye looks. With a built-in mirror, it\'s convenient for on-the-go makeup application.','beauty','https://cdn.dummyjson.com/products/images/beauty/Eyeshadow%20Palette%20with%20Mirror/1.png',3.2,0),(23,'Powder Canister',14.99,'The Powder Canister is a finely milled setting powder designed to set makeup and control shine. With a lightweight and translucent formula, it provides a smooth and matte finish.','beauty','https://cdn.dummyjson.com/products/images/beauty/Powder%20Canister/1.png',3.8,0);
/*!40000 ALTER TABLE `product_data` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `user_id` int NOT NULL DEFAULT '0',
  `fname` varchar(255) NOT NULL,
  `lname` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `gender` varchar(255) NOT NULL,
  `bd` date NOT NULL,
  `password` varchar(255) DEFAULT NULL,
  `access_key` varchar(255) DEFAULT NULL,
  `isdeleted` int NOT NULL DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'puja','moravadiya','puja@abc.com','8745961245','female','2002-11-30','$2a$07$r12bR/aO2fyqao0UTlZvaO4dcQaudQQ/pJNl69P630Wl.ms5rnQWy','5EcR2DGVEhuY',0,'2024-06-04 12:23:25','2024-06-04 12:23:38'),(2,'Riannon','Ellord','riannon@123gmail.com','4512784512','male','2002-04-03','$2a$07$SuIViI6Usv2DAifSuKFkg.ni/TYAYYu3c6moxW4/Fp6XL7729w3B6','djckKd8oOSOI',0,'2024-06-04 12:24:15','2024-06-04 12:24:36'),(3,'mnvmn','ncgn','jhsdv@gmail.com','7878787878','female','2024-06-03',NULL,'pUwgxIJoH9yk',0,'2024-06-04 13:29:13','2024-06-04 13:29:13'),(4,'mitalli','vora','mitali@gmail.com','8745961245','female','2002-06-10','$2a$07$Y0Z7EHw1738bkfs777.zg.GGjD5CTrcIGsuFnL1qtyDqz0.IJJ9HK','nb6uu77YsEDf',1,'2024-06-05 05:45:27','2024-06-17 08:50:50');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `watchlist`
--

DROP TABLE IF EXISTS `watchlist`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `watchlist` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `product_data_id` int DEFAULT NULL,
  `isDeleted` int DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `watchlist`
--

LOCK TABLES `watchlist` WRITE;
/*!40000 ALTER TABLE `watchlist` DISABLE KEYS */;
/*!40000 ALTER TABLE `watchlist` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-06-21 11:20:18
