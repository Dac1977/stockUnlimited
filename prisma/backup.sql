/*!999999\- enable the sandbox mode */ 
-- MariaDB dump 10.19  Distrib 10.6.18-MariaDB, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: controlstock_new
-- ------------------------------------------------------
-- Server version	10.6.18-MariaDB-0ubuntu0.22.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Current Database: `controlstock_new`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `railway` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */;

USE `railway`;

--
-- Table structure for table `balanzas`
--

DROP TABLE IF EXISTS `balanzas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `balanzas` (
  `id_balanza` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `tag` varchar(255) NOT NULL,
  `model` varchar(30) NOT NULL,
  `peso_actual` decimal(10,2) unsigned NOT NULL,
  PRIMARY KEY (`id_balanza`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `balanzas`
--

LOCK TABLES `balanzas` WRITE;
/*!40000 ALTER TABLE `balanzas` DISABLE KEYS */;
/*!40000 ALTER TABLE `balanzas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cashflow`
--

DROP TABLE IF EXISTS `cashflow`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cashflow` (
  `id_movimiento` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `id_empresa` int(10) unsigned NOT NULL,
  `id_negocio` int(10) unsigned NOT NULL,
  `id_usuario` int(10) unsigned NOT NULL,
  `id_centrocosto` int(10) unsigned NOT NULL,
`fecha_carga` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `fecha_vto` date NOT NULL,
  `fecha_pago` date NOT NULL,
  `tipo` enum('A','B','C','X','IMP') NOT NULL,
  `comprobante` int(10) unsigned NOT NULL,
  `signo` enum('I','E') NOT NULL,
  `importe` double(10,2) NOT NULL,
  `detalle` varchar(50) NOT NULL,
  `id_pago` int(10) unsigned NOT NULL,
  `observacion` varchar(255) NOT NULL,
  PRIMARY KEY (`id_movimiento`),
  KEY `id_centrocosto` (`id_centrocosto`,`id_negocio`,`id_pago`,`id_usuario`),
  KEY `id_empresa` (`id_empresa`)
) ENGINE=MyISAM AUTO_INCREMENT=46110 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cashflow`
--

LOCK TABLES `cashflow` WRITE;
/*!40000 ALTER TABLE `cashflow` DISABLE KEYS */;
/*!40000 ALTER TABLE `cashflow` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `centrocostos`
--

DROP TABLE IF EXISTS `centrocostos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `centrocostos` (
  `id_centrocosto` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `id_empresa` int(10) unsigned NOT NULL,
  `centrocosto` varchar(30) NOT NULL,
  PRIMARY KEY (`id_centrocosto`),
  KEY `id_empresa` (`id_empresa`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `centrocostos`
--

LOCK TABLES `centrocostos` WRITE;
/*!40000 ALTER TABLE `centrocostos` DISABLE KEYS */;
/*!40000 ALTER TABLE `centrocostos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `clientes`
--

DROP TABLE IF EXISTS `clientes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `clientes` (
  `id_cliente` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `id_negocio` int(10) unsigned NOT NULL,
  `usuario` varchar(30) NOT NULL,
  `password` varchar(30) NOT NULL,
  `correo` varchar(50) DEFAULT NULL,
  `telefono` mediumtext DEFAULT NULL,
  `cuil` bigint(20) unsigned DEFAULT NULL,
  `ctacte` tinyint(1) NOT NULL DEFAULT 0,
  `acosto` tinyint(1) NOT NULL DEFAULT 0,
  `descuento` decimal(5,2) NOT NULL DEFAULT 0.00,
  `pin` tinyint(6) unsigned DEFAULT NULL,
  PRIMARY KEY (`id_cliente`),
  KEY `id_negocio` (`id_negocio`)
) ENGINE=MyISAM AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clientes`
--

LOCK TABLES `clientes` WRITE;
/*!40000 ALTER TABLE `clientes` DISABLE KEYS */;
INSERT INTO `clientes` VALUES (6,3,'usuario_prueba3','password123','usuario@example2.com','123456789',20123456789,1,1,10.00,200),(5,2,'usuario_prueba2','password123','usuario@example2.com','123456789',20123456789,1,1,10.00,200),(4,1,'usuario_prueba','password123','usuario@example.com','123456789',20123456789,1,1,10.00,200);
/*!40000 ALTER TABLE `clientes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `compras`
--

DROP TABLE IF EXISTS `compras`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `compras` (
  `id_comprobante` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `comprobante` int(10) unsigned NOT NULL,
  `id_proveedor` int(10) unsigned NOT NULL,
  `id_usuario` int(10) unsigned NOT NULL,
  `id_deposito` int(10) unsigned NOT NULL,
  `id_negocio` int(10) unsigned NOT NULL,
  `id_pago` int(10) unsigned NOT NULL,
  `id_transaccion` int(20) DEFAULT NULL,
  `fecha_comprobante` datetime DEFAULT NULL,
  `fecha_carga` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `fecha_pago` datetime DEFAULT NULL,
  `costo_total` decimal(8,2) unsigned NOT NULL,
  `venta_total` decimal(8,2) unsigned NOT NULL,
  `estado` varchar(1) NOT NULL DEFAULT '1' COMMENT '0=borrador pedido,1=pagado, 2=pendiente de pago',
  `impuesto1` decimal(8,2) NOT NULL,
  `impuesto2` decimal(8,2) NOT NULL,
  PRIMARY KEY (`id_comprobante`),
  KEY `id_usuario` (`id_usuario`),
  KEY `id_pago` (`id_pago`),
  KEY `id_deposito` (`id_deposito`,`id_negocio`),
  KEY `comprobante` (`comprobante`),
  KEY `id_proveedor` (`id_proveedor`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci PACK_KEYS=0;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `compras`
--

LOCK TABLES `compras` WRITE;
/*!40000 ALTER TABLE `compras` DISABLE KEYS */;
/*!40000 ALTER TABLE `compras` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `compras_renglones`
--

DROP TABLE IF EXISTS `compras_renglones`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `compras_renglones` (
  `id_renglon` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `id_comprobante` int(10) unsigned NOT NULL,
  `id_producto` int(10) unsigned NOT NULL,
  `cantidad` decimal(8,2) unsigned NOT NULL,
  `px_costo` decimal(8,2) unsigned NOT NULL,
  `px_venta` decimal(8,2) unsigned NOT NULL,
  PRIMARY KEY (`id_renglon`),
  KEY `id_comprobante` (`id_comprobante`),
  KEY `id_producto` (`id_producto`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci PACK_KEYS=0;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `compras_renglones`
--

LOCK TABLES `compras_renglones` WRITE;
/*!40000 ALTER TABLE `compras_renglones` DISABLE KEYS */;
/*!40000 ALTER TABLE `compras_renglones` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `conciliaciones`
--

DROP TABLE IF EXISTS `conciliaciones`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `conciliaciones` (
  `id_conciliacion` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `id_negocio` int(10) unsigned NOT NULL,
  `fecha` date NOT NULL,
  `bloquear` tinyint(1) NOT NULL DEFAULT 1,
  `efectivo_sist` decimal(10,2) NOT NULL,
  `efectivo_caja` decimal(10,2) NOT NULL,
  `observacion` varchar(255) NOT NULL,
  PRIMARY KEY (`id_conciliacion`),
  KEY `id_negocio` (`id_negocio`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `conciliaciones`
--

LOCK TABLES `conciliaciones` WRITE;
/*!40000 ALTER TABLE `conciliaciones` DISABLE KEYS */;
/*!40000 ALTER TABLE `conciliaciones` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cuentas`
--

DROP TABLE IF EXISTS `cuentas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cuentas` (
  `id_cuenta` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `usuario` varchar(30) NOT NULL,
  `correo` varchar(30) NOT NULL,
  `password` varchar(30) NOT NULL,
  `cant_empresas` tinyint(3) unsigned NOT NULL DEFAULT 1,
  `cant_negocios` tinyint(3) unsigned NOT NULL DEFAULT 1,
  `cant_puestos` tinyint(3) unsigned NOT NULL DEFAULT 1,
  `cant_usuarios` tinyint(3) unsigned NOT NULL DEFAULT 2,
  `historial_comprobantes` enum('trimestral','semestral','anual','perpetuo') NOT NULL DEFAULT 'semestral',
  `historial_comprobantes_renglones` enum('trimestral','semestral','anual','perpetuo') NOT NULL DEFAULT 'trimestral',
  `reportes_unificados` tinyint(1) unsigned NOT NULL DEFAULT 0,
  `audit_ia` tinyint(1) unsigned NOT NULL DEFAULT 0,
  `ctasctes` tinyint(1) unsigned NOT NULL DEFAULT 0,
  `cashflow` tinyint(1) unsigned NOT NULL DEFAULT 0,
  `balanzas` tinyint(1) unsigned NOT NULL DEFAULT 0,
  PRIMARY KEY (`id_cuenta`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cuentas`
--

LOCK TABLES `cuentas` WRITE;
/*!40000 ALTER TABLE `cuentas` DISABLE KEYS */;
/*!40000 ALTER TABLE `cuentas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `depositos`
--

DROP TABLE IF EXISTS `depositos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `depositos` (
  `id_deposito` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `id_negocio` int(10) unsigned NOT NULL,
  `deposito` varchar(30) NOT NULL,
  `stock_negativo` tinyint(1) NOT NULL DEFAULT 1,
  PRIMARY KEY (`id_deposito`),
  KEY `id_negocio` (`id_negocio`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `depositos`
--

LOCK TABLES `depositos` WRITE;
/*!40000 ALTER TABLE `depositos` DISABLE KEYS */;
/*!40000 ALTER TABLE `depositos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `empresas`
--

DROP TABLE IF EXISTS `empresas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `empresas` (
  `id_empresa` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `id_cuenta` int(10) unsigned NOT NULL,
  `empresa` varchar(30) NOT NULL,
  `unificar_productos` tinyint(1) NOT NULL DEFAULT 0,
  `unificar_clientes` tinyint(1) NOT NULL DEFAULT 0,
  `id_negocio_default` int(10) unsigned NOT NULL DEFAULT 0 COMMENT '0=todos;n=id_negocio',
  PRIMARY KEY (`id_empresa`),
  KEY `id_cuenta` (`id_cuenta`),
  KEY `id_negocio_default` (`id_negocio_default`),
  CONSTRAINT `empresas_ibfk_1` FOREIGN KEY (`id_cuenta`) REFERENCES `cuentas` (`id_cuenta`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `empresas`
--

LOCK TABLES `empresas` WRITE;
/*!40000 ALTER TABLE `empresas` DISABLE KEYS */;
/*!40000 ALTER TABLE `empresas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `impresoras`
--

DROP TABLE IF EXISTS `impresoras`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `impresoras` (
  `id_impresora` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `id_puesto` int(10) unsigned NOT NULL,
  `impresora` varchar(20) NOT NULL,
  `direccion` varchar(30) NOT NULL,
  `copias` tinyint(4) NOT NULL DEFAULT 1,
  PRIMARY KEY (`id_impresora`),
  KEY `id_puesto` (`id_puesto`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `impresoras`
--

LOCK TABLES `impresoras` WRITE;
/*!40000 ALTER TABLE `impresoras` DISABLE KEYS */;
/*!40000 ALTER TABLE `impresoras` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `negocios`
--

DROP TABLE IF EXISTS `negocios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `negocios` (
  `id_negocio` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `id_empresa` int(10) unsigned NOT NULL,
  `negocio` varchar(30) NOT NULL,
  `gps` varchar(37) NOT NULL,
  `redondeo` enum('sin redondear','entero','5','10','100') NOT NULL DEFAULT 'entero',
  PRIMARY KEY (`id_negocio`),
  KEY `id_empresa` (`id_empresa`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `negocios`
--

LOCK TABLES `negocios` WRITE;
/*!40000 ALTER TABLE `negocios` DISABLE KEYS */;
/*!40000 ALTER TABLE `negocios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pagos`
--

DROP TABLE IF EXISTS `pagos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pagos` (
  `id_pago` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `id_negocio` int(10) unsigned NOT NULL,
  `medio` varchar(30) NOT NULL COMMENT 'efectivo, mercado pago, transferencia, tarjeta, facturas proveedores (cuando compran de caja)',
  PRIMARY KEY (`id_pago`),
  KEY `id_negocio` (`id_negocio`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pagos`
--

LOCK TABLES `pagos` WRITE;
/*!40000 ALTER TABLE `pagos` DISABLE KEYS */;
/*!40000 ALTER TABLE `pagos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `productos`
--

DROP TABLE IF EXISTS `productos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `productos` (
  `id_producto` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `codigo` bigint(13) unsigned NOT NULL,
  `producto` varchar(30) NOT NULL,
  `codigo_presentacion` bigint(13) unsigned NOT NULL,
  `id_rubros` varchar(30) NOT NULL,
  `id_proveedores` varchar(30) NOT NULL,
  `margen` decimal(5,2) DEFAULT NULL,
  `margen_forzar` tinyint(1) NOT NULL DEFAULT 0,
  `px_costo` decimal(10,2) unsigned DEFAULT NULL,
  `px_venta` decimal(10,2) unsigned DEFAULT NULL,
  `fecha_rotacion` date DEFAULT NULL,
  `fecha_update` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `mostrar` tinyint(1) NOT NULL DEFAULT 1,
  `control_stock` tinyint(1) NOT NULL DEFAULT 1,
  `comprar` tinyint(1) NOT NULL DEFAULT 1,
  `lista_rapida` tinyint(1) NOT NULL DEFAULT 0,
  `acepta_desc` tinyint(1) NOT NULL DEFAULT 1,
  `acepta_ctacte` tinyint(1) NOT NULL DEFAULT 1,
  `tags` varchar(256) NOT NULL,
  `ranking` tinyint(3) unsigned DEFAULT NULL,
  `activo` tinyint(1) NOT NULL DEFAULT 1,
  `id_negocio` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id_producto`),
  KEY `codigo` (`codigo`),
  KEY `codigo_presentacion` (`codigo_presentacion`),
  KEY `id_negocio` (`id_negocio`)
) ENGINE=MyISAM AUTO_INCREMENT=9608 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `productos`
--

LOCK TABLES `productos` WRITE;
/*!40000 ALTER TABLE `productos` DISABLE KEYS */;
INSERT INTO `productos` VALUES (9584,123456,'Producto de prueba',654321,'Rubro1','Proveedor1',10.00,1,100.00,150.00,'2025-02-02','2025-02-03 12:58:41',1,0,1,1,1,1,'tag1,tag2',1,1,1),(9607,123462,'chic cola',1237,'2','23424',50.00,0,780.00,1200.00,'2025-02-18','2025-02-11 22:26:44',1,1,1,0,1,1,'tag1,tag3',12,1,2),(9604,123459,'7up',1678123546781,'2','2',70.00,0,700.00,1400.00,'2025-02-13','2025-02-06 19:49:37',1,1,1,0,1,1,'tag1,tag3',1,1,2),(9601,123458,'cocacola',1234,'1111','2',60.00,0,1000.00,1500.00,'2025-02-13','2025-02-06 18:26:34',1,1,1,0,1,1,'tag1,tag3',1,1,2),(9606,123461,'pepsi',23424,'2','3452',50.00,0,1000.00,1500.00,'2025-02-14','2025-02-07 16:57:11',1,1,1,0,1,1,'tag1,tag3',5,1,2),(9605,123461,'fanta',34562362,'2','4',45.00,0,695.00,1300.00,'2025-02-19','2025-02-07 14:24:40',1,1,1,0,1,1,'tag1,tag3',6,1,2);
/*!40000 ALTER TABLE `productos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `productos_combos`
--

DROP TABLE IF EXISTS `productos_combos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `productos_combos` (
  `id_renglon` int(11) NOT NULL AUTO_INCREMENT,
  `id_producto_combo` int(10) unsigned NOT NULL DEFAULT 0 COMMENT 'hace referencia al id_producto que se creara como combo referenciado a tabla productos ejemplo: CAFE+TORTA\r\n',
  `id_producto` int(10) unsigned NOT NULL COMMENT 'hace referencia a cada producto que se va a descontar stock, ',
  `cantidad` tinyint(3) unsigned NOT NULL DEFAULT 1,
  PRIMARY KEY (`id_renglon`),
  KEY `id_producto_combo` (`id_producto_combo`),
  KEY `id_producto` (`id_producto`)
) ENGINE=MyISAM AUTO_INCREMENT=173 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `productos_combos`
--

LOCK TABLES `productos_combos` WRITE;
/*!40000 ALTER TABLE `productos_combos` DISABLE KEYS */;
/*!40000 ALTER TABLE `productos_combos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `productos_diferencial`
--

DROP TABLE IF EXISTS `productos_diferencial`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `productos_diferencial` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `id_producto` int(10) unsigned NOT NULL,
  `hora_desde` time NOT NULL,
  `hora_hasta` time NOT NULL,
  `px_diferencial_valor` decimal(8,2) NOT NULL,
  `px_diferencial_porc` decimal(5,2) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_producto` (`id_producto`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `productos_diferencial`
--

LOCK TABLES `productos_diferencial` WRITE;
/*!40000 ALTER TABLE `productos_diferencial` DISABLE KEYS */;
/*!40000 ALTER TABLE `productos_diferencial` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `productos_model`
--

DROP TABLE IF EXISTS `productos_model`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `productos_model` (
  `id_producto` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `codigo` bigint(13) unsigned NOT NULL,
  `producto` varchar(30) NOT NULL,
  `presentacion` enum('unidad','pack','caja','cajon') NOT NULL DEFAULT 'unidad',
  `cantidad` tinyint(3) unsigned NOT NULL DEFAULT 1,
  `peso_unitario` decimal(8,2) unsigned NOT NULL,
  `codigo_presentacion` bigint(13) unsigned NOT NULL,
  `foto` blob NOT NULL,
  `id_rubros` varchar(30) NOT NULL,
  `id_proveedores` varchar(30) NOT NULL,
  PRIMARY KEY (`id_producto`),
  KEY `codigo` (`codigo`),
  KEY `codigo_presentacion` (`codigo_presentacion`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `productos_model`
--

LOCK TABLES `productos_model` WRITE;
/*!40000 ALTER TABLE `productos_model` DISABLE KEYS */;
/*!40000 ALTER TABLE `productos_model` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `productos_pack`
--

DROP TABLE IF EXISTS `productos_pack`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `productos_pack` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `id_producto` int(10) unsigned NOT NULL,
  `cantidad_min` int(10) unsigned NOT NULL,
  `px_pack_valor` decimal(8,2) NOT NULL,
  `px_pack_porc` decimal(5,2) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_producto` (`id_producto`)
) ENGINE=InnoDB AUTO_INCREMENT=2637 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `productos_pack`
--

LOCK TABLES `productos_pack` WRITE;
/*!40000 ALTER TABLE `productos_pack` DISABLE KEYS */;
/*!40000 ALTER TABLE `productos_pack` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `productos_prohibir`
--

DROP TABLE IF EXISTS `productos_prohibir`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `productos_prohibir` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `id_producto` int(10) unsigned NOT NULL,
  `hora_desde` time NOT NULL,
  `hora_hasta` time NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_producto` (`id_producto`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `productos_prohibir`
--

LOCK TABLES `productos_prohibir` WRITE;
/*!40000 ALTER TABLE `productos_prohibir` DISABLE KEYS */;
/*!40000 ALTER TABLE `productos_prohibir` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `proveedores`
--

DROP TABLE IF EXISTS `proveedores`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `proveedores` (
  `id_proveedor` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `id_negocio` int(10) unsigned NOT NULL,
  `proveedor` varchar(30) NOT NULL,
  `cuil` bigint(20) unsigned NOT NULL,
  `contacto` varchar(30) NOT NULL,
  `telefono` varchar(30) NOT NULL,
  `correo` varchar(50) NOT NULL,
  `pedidos_mail` tinyint(1) NOT NULL DEFAULT 0,
  `pedidos_telefono` tinyint(1) NOT NULL DEFAULT 0,
  `control_stock` tinyint(1) NOT NULL DEFAULT 1,
  `dias_preventista` set('L','M','M','J','V','S','D') NOT NULL,
  `dias_entrega` set('L','M','M','J','V','S','D') NOT NULL,
  PRIMARY KEY (`id_proveedor`),
  KEY `id_negocio` (`id_negocio`)
) ENGINE=MyISAM AUTO_INCREMENT=169 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `proveedores`
--

LOCK TABLES `proveedores` WRITE;
/*!40000 ALTER TABLE `proveedores` DISABLE KEYS */;
INSERT INTO `proveedores` VALUES (166,2,'distroso55',20253524341,'josé','23342342','rwqr@sdfasf.com',0,0,1,'L','M'),(167,2,'distroso45',20253524341,'josé','23342342','rwqr@sdfasf.com',0,0,1,'L','M'),(168,2,'distroso55',20253524341,'josé','23342342','rwqr@sdfasf.com',0,0,1,'L','M');
/*!40000 ALTER TABLE `proveedores` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `puestos`
--

DROP TABLE IF EXISTS `puestos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `puestos` (
  `id_puesto` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `id_negocio` int(10) unsigned NOT NULL,
  `id_deposito` int(10) unsigned NOT NULL,
  `puesto` varchar(20) NOT NULL,
  `ip` varchar(15) NOT NULL,
  `activo` tinyint(1) NOT NULL DEFAULT 1,
  `pos` tinyint(1) NOT NULL DEFAULT 1,
  `id_impresoras` varchar(30) DEFAULT NULL COMMENT 'Puede imprimir en varias comanderas, ejemplo, ticket y cocina',
  `id_balanza` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id_puesto`),
  KEY `id_negocio` (`id_negocio`),
  KEY `id_deposito` (`id_deposito`)
) ENGINE=MyISAM AUTO_INCREMENT=611 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `puestos`
--

LOCK TABLES `puestos` WRITE;
/*!40000 ALTER TABLE `puestos` DISABLE KEYS */;
/*!40000 ALTER TABLE `puestos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rubros`
--

DROP TABLE IF EXISTS `rubros`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `rubros` (
  `id_rubro` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `id_negocio` int(10) unsigned NOT NULL,
  `rubro` varchar(30) NOT NULL,
  `margen` decimal(5,2) NOT NULL DEFAULT 0.00,
  PRIMARY KEY (`id_rubro`),
  KEY `id_negocio` (`id_negocio`)
) ENGINE=MyISAM AUTO_INCREMENT=93 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rubros`
--

LOCK TABLES `rubros` WRITE;
/*!40000 ALTER TABLE `rubros` DISABLE KEYS */;
/*!40000 ALTER TABLE `rubros` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `stock`
--

DROP TABLE IF EXISTS `stock`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `stock` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `id_producto` int(10) unsigned NOT NULL,
  `id_negocio` int(10) unsigned NOT NULL,
  `id_deposito` int(10) unsigned NOT NULL,
  `stock` int(11) NOT NULL DEFAULT 0,
  `fecha_arqueo` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_producto` (`id_producto`),
  KEY `id_negocio` (`id_negocio`),
  KEY `id_deposito` (`id_deposito`)
) ENGINE=MyISAM AUTO_INCREMENT=18512 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `stock`
--

LOCK TABLES `stock` WRITE;
/*!40000 ALTER TABLE `stock` DISABLE KEYS */;
/*!40000 ALTER TABLE `stock` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `stock_ideal`
--

DROP TABLE IF EXISTS `stock_ideal`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `stock_ideal` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `id_producto` int(10) unsigned NOT NULL,
  `id_negocio` int(10) unsigned NOT NULL,
  `id_deposito` int(10) unsigned NOT NULL,
  `stock` int(10) unsigned NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  KEY `id_producto` (`id_producto`),
  KEY `id_negocio` (`id_negocio`),
  KEY `id_deposito` (`id_deposito`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `stock_ideal`
--

LOCK TABLES `stock_ideal` WRITE;
/*!40000 ALTER TABLE `stock_ideal` DISABLE KEYS */;
/*!40000 ALTER TABLE `stock_ideal` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `transferencias`
--

DROP TABLE IF EXISTS `transferencias`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `transferencias` (
  `id_transferencia` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `fecha` datetime NOT NULL,
  `id_deposito_desde` int(10) unsigned NOT NULL,
  `id_deposito_hacia` int(10) unsigned NOT NULL,
  `costo_total` decimal(8,2) NOT NULL,
  `venta_total` decimal(8,2) NOT NULL,
  PRIMARY KEY (`id_transferencia`)
) ENGINE=MyISAM AUTO_INCREMENT=7793 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transferencias`
--

LOCK TABLES `transferencias` WRITE;
/*!40000 ALTER TABLE `transferencias` DISABLE KEYS */;
/*!40000 ALTER TABLE `transferencias` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `transferencias_renglones`
--

DROP TABLE IF EXISTS `transferencias_renglones`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `transferencias_renglones` (
  `id_renglon` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `id_transferencia` int(10) unsigned NOT NULL,
  `id_producto` int(10) unsigned NOT NULL,
  `cantidad` decimal(8,2) NOT NULL,
  `px_costo` decimal(10,2) NOT NULL,
  `px_venta` decimal(10,2) NOT NULL,
  PRIMARY KEY (`id_renglon`)
) ENGINE=MyISAM AUTO_INCREMENT=566224 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transferencias_renglones`
--

LOCK TABLES `transferencias_renglones` WRITE;
/*!40000 ALTER TABLE `transferencias_renglones` DISABLE KEYS */;
/*!40000 ALTER TABLE `transferencias_renglones` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `turnos`
--

DROP TABLE IF EXISTS `turnos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `turnos` (
  `id_turno` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `turno` int(10) unsigned NOT NULL,
  `id_usuario` int(10) unsigned NOT NULL,
  `id_puesto` int(10) unsigned NOT NULL,
  `id_negocio` int(10) unsigned NOT NULL,
  `id_deposito` int(10) unsigned NOT NULL,
  `fecha_desde` datetime NOT NULL DEFAULT current_timestamp(),
  `fecha_hasta` datetime DEFAULT NULL,
  `estado` set('abierto','cerrado','conciliado') NOT NULL DEFAULT 'abierto',
  `costos_totales` decimal(12,2) DEFAULT NULL,
  `ventas_totales` decimal(12,2) DEFAULT NULL,
  `count_esc` tinyint(3) unsigned DEFAULT NULL,
  `count_balanza_error` tinyint(3) unsigned DEFAULT NULL,
  PRIMARY KEY (`id_turno`),
  KEY `idx_id_usuario` (`id_usuario`),
  KEY `idx_id_puesto` (`id_puesto`),
  KEY `id_negocio` (`id_negocio`),
  KEY `id_deposito` (`id_deposito`)
) ENGINE=MyISAM AUTO_INCREMENT=11366 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `turnos`
--

LOCK TABLES `turnos` WRITE;
/*!40000 ALTER TABLE `turnos` DISABLE KEYS */;
/*!40000 ALTER TABLE `turnos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `turnos_desgloce`
--

DROP TABLE IF EXISTS `turnos_desgloce`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `turnos_desgloce` (
  `id_desgloce` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `id_turno` int(10) unsigned NOT NULL,
  `id_pago` int(10) unsigned NOT NULL,
  `monto` decimal(8,2) NOT NULL,
  PRIMARY KEY (`id_desgloce`),
  KEY `id_turno` (`id_turno`),
  KEY `id_pago` (`id_pago`),
  CONSTRAINT `turnos_desgloce_ibfk_1` FOREIGN KEY (`id_pago`) REFERENCES `pagos` (`id_pago`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `turnos_desgloce`
--

LOCK TABLES `turnos_desgloce` WRITE;
/*!40000 ALTER TABLE `turnos_desgloce` DISABLE KEYS */;
/*!40000 ALTER TABLE `turnos_desgloce` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `turnos_entregas`
--

DROP TABLE IF EXISTS `turnos_entregas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `turnos_entregas` (
  `id_entrega` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `id_turno` int(10) unsigned NOT NULL,
  `id_pago` int(10) unsigned NOT NULL,
  `fecha` datetime NOT NULL DEFAULT current_timestamp(),
  `monto` decimal(8,2) NOT NULL,
  PRIMARY KEY (`id_entrega`),
  KEY `id_turno` (`id_turno`,`id_pago`),
  KEY `id_pago` (`id_pago`),
  CONSTRAINT `turnos_entregas_ibfk_1` FOREIGN KEY (`id_pago`) REFERENCES `pagos` (`id_pago`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `turnos_entregas`
--

LOCK TABLES `turnos_entregas` WRITE;
/*!40000 ALTER TABLE `turnos_entregas` DISABLE KEYS */;
/*!40000 ALTER TABLE `turnos_entregas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `usuarios` (
  `id_usuario` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `id_cuenta` int(10) unsigned NOT NULL,
  `usuario` varchar(30) NOT NULL,
  `correo` varchar(50) DEFAULT NULL,
  `cuil` int(10) unsigned NOT NULL,
  `password` varchar(20) NOT NULL,
  `permisos` VARCHAR(255) NOT NULL DEFAULT 'id_puestos:0;acceso_libre:1',
  `activo` tinyint(1) NOT NULL DEFAULT 1,
  PRIMARY KEY (`id_usuario`),
  KEY `id_cuenta` (`id_cuenta`)
) ENGINE=MyISAM AUTO_INCREMENT=100 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ventas`
--

DROP TABLE IF EXISTS `ventas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ventas` (
  `id_comprobante` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `id_turno` int(10) unsigned NOT NULL,
  `id_negocio` int(10) unsigned NOT NULL,
  `id_cliente` int(10) unsigned NOT NULL,
  `id_pago` int(10) unsigned NOT NULL,
  `id_transaccion` int(20) DEFAULT NULL,
  `fecha` datetime NOT NULL DEFAULT current_timestamp(),
  `costo_total` decimal(8,2) unsigned NOT NULL,
  `venta_total` decimal(8,2) unsigned NOT NULL,
  `estado` varchar(1) NOT NULL DEFAULT '1' COMMENT '0=pendiente,1=cobrado',
  `variacion_venta` decimal(8,2) NOT NULL COMMENT 'determina si el cliente tiene descuento o aumento +/-',
  `variacion_peso` decimal(8,2) NOT NULL,
  PRIMARY KEY (`id_comprobante`),
  KEY `id_turno` (`id_turno`),
  KEY `id_pago` (`id_pago`),
  KEY `id_deposito` (`id_negocio`,`id_cliente`)
) ENGINE=MyISAM AUTO_INCREMENT=1618948 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci PACK_KEYS=0;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ventas`
--

LOCK TABLES `ventas` WRITE;
/*!40000 ALTER TABLE `ventas` DISABLE KEYS */;
/*!40000 ALTER TABLE `ventas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ventas_renglones`
--

DROP TABLE IF EXISTS `ventas_renglones`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ventas_renglones` (
  `id_renglon` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `id_comprobante` bigint(20) unsigned NOT NULL,
  `id_producto` int(10) unsigned NOT NULL,
  `cantidad` decimal(8,2) unsigned NOT NULL,
  `px_costo` decimal(8,2) unsigned NOT NULL,
  `px_venta` decimal(8,2) unsigned NOT NULL,
  PRIMARY KEY (`id_renglon`),
  KEY `id_comprobante` (`id_comprobante`),
  KEY `id_producto` (`id_producto`)
) ENGINE=MyISAM AUTO_INCREMENT=2439879 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci PACK_KEYS=0;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ventas_renglones`
--

LOCK TABLES `ventas_renglones` WRITE;
/*!40000 ALTER TABLE `ventas_renglones` DISABLE KEYS */;
/*!40000 ALTER TABLE `ventas_renglones` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-02-12 11:43:12
