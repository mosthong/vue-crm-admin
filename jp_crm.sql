-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- 主机： localhost
-- 生成日期： 2021-11-30 10:23:54
-- 服务器版本： 8.0.12
-- PHP 版本： 7.3.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 数据库： `jp_crm`
--

-- --------------------------------------------------------

--
-- 表的结构 `jp_admin_users`
--

CREATE TABLE `jp_admin_users` (
  `id` int(11) NOT NULL COMMENT 'primary key',
  `roles` char(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '权限',
  `role_name` char(30) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '权限名',
  `username` varchar(30) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT 'user name',
  `password` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT 'user age',
  `created_at` datetime DEFAULT NULL COMMENT 'created time',
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '更新时间'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='后台管理用户' ROW_FORMAT=COMPACT;

--
-- 转存表中的数据 `jp_admin_users`
--

INSERT INTO `jp_admin_users` (`id`, `roles`, `role_name`, `username`, `password`, `created_at`, `updated_at`) VALUES
(3, 'admin', '超级管理员', 'admin', 'd479fa8be248bf1b7d9ed48e193f8315', '2021-11-24 00:00:00', '2021-11-24 00:00:00');

-- --------------------------------------------------------

--
-- 表的结构 `jp_crm_country`
--

CREATE TABLE `jp_crm_country` (
  `id` int(11) NOT NULL,
  `continent` char(50) DEFAULT NULL COMMENT '大洲，区域',
  `country` char(50) DEFAULT NULL COMMENT '国家',
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `jp_crm_country`
--

INSERT INTO `jp_crm_country` (`id`, `continent`, `country`, `created_at`, `updated_at`) VALUES
(4, '欧洲', '法国', '2021-11-25 00:00:00', '2021-11-25 17:23:02'),
(5, '中东', '沙特', '2021-11-25 00:00:00', '2021-11-25 17:23:02'),
(14, '', '中国', '2021-11-29 16:25:00', '2021-11-29 16:25:56'),
(8, '欧洲', '波兰', '2021-11-26 16:36:36', '2021-11-26 16:36:36'),
(10, '欧洲', '芬兰', '2021-11-26 16:58:37', '2021-11-26 16:58:37');

-- --------------------------------------------------------

--
-- 表的结构 `jp_crm_sale_list`
--

CREATE TABLE `jp_crm_sale_list` (
  `id` int(11) NOT NULL COMMENT '序号',
  `pay_time` date DEFAULT NULL COMMENT '收款时间',
  `customer_name` char(100) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '客户名称',
  `product_name` char(200) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '产品名称',
  `transaction_price` int(60) DEFAULT NULL COMMENT '成交价格（元）',
  `transaction_price_foreign` int(60) DEFAULT NULL COMMENT '成交价格（外币）',
  `is_invoice` int(1) DEFAULT NULL COMMENT '是否开票:1开票2未开票',
  `pay_methods` int(11) DEFAULT NULL COMMENT '收款方式：1对公2对私',
  `sale_person` char(30) NOT NULL COMMENT '销售员',
  `sale_department` char(50) DEFAULT NULL COMMENT '销售部门',
  `customer_code` char(50) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '客户编号',
  `pay_name` char(100) NOT NULL COMMENT '打款人信息',
  `pay_contact_info` char(20) NOT NULL COMMENT '联系方式（电话/微信/钉钉）',
  `country` char(50) DEFAULT NULL COMMENT '国家地区',
  `remark` varchar(200) DEFAULT NULL COMMENT '备注',
  `created_at` datetime NOT NULL COMMENT '创建时间',
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '更新时间'
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `jp_crm_sale_list`
--

INSERT INTO `jp_crm_sale_list` (`id`, `pay_time`, `customer_name`, `product_name`, `transaction_price`, `transaction_price_foreign`, `is_invoice`, `pay_methods`, `sale_person`, `sale_department`, `customer_code`, `pay_name`, `pay_contact_info`, `country`, `remark`, `created_at`, `updated_at`) VALUES
(1, '2021-11-24', '测试公司2', 'EORI', 199900, 99900, 2, 1, 'Eugene1', '技术部', 'qu11212475', '测试人', '18798808568', '阿联酋', NULL, '2021-11-09 00:00:00', '2021-11-26 12:41:36'),
(2, '2021-11-02', '测试公司2', 'CE', 1999, 999, 1, 2, 'Eugene', '技术部', 'qu11212475', '测试人', '18798808568', '阿联酋', NULL, '2021-11-09 00:00:00', '2021-11-26 15:38:59'),
(16, '2021-12-14', '测试公司4', 'vat', 1999, 999, 1, 1, 'Eugene', '技术部', 'qu11212475', '测试人', '18798808568', '德国', NULL, '2021-11-09 00:00:00', '2021-11-26 13:04:11'),
(14, '2021-11-24', '测试公司2', 'EORI', 199900, 99900, 2, 1, 'Eugene1', '技术部', 'qu11212475', '测试人', '18798808568', '阿联酋', NULL, '2021-11-09 00:00:00', '2021-11-26 12:41:36'),
(5, '2021-11-23', '测试公司4', 'vat', 1999, 999, 1, 1, 'Eugene', '技术部', 'qu11212475', '测试人', '18798808568', '墨西哥', NULL, '2021-11-09 00:00:00', '2021-11-26 15:40:10'),
(6, '2021-11-23', '测试公司5', '物流', 1999, 999, 1, 1, 'Eugene', '销售部', 'qu11212475', '测试人', '18798808568', '墨西哥', NULL, '2021-11-09 00:00:00', '2021-11-26 15:44:53'),
(15, '2021-11-02', '测试公司2', '海外仓', 1999, 999, 1, 2, 'Eugene', '技术部', 'qu11212475', '测试人', '18798808568', '阿联酋', NULL, '2021-11-09 00:00:00', '2021-11-26 15:47:41'),
(8, '2021-11-26', 'grandplan2', 'eori', 59999, 1258, 1, 1, 'dogy', '杭州', 'qq21313', 'hong', '18798808568', '中国', NULL, '2021-11-26 11:00:19', '2021-11-26 12:59:55'),
(9, '2021-11-26', 'grandplan2', 'CE', 59999, 1258, 1, 1, 'dogy', '杭州', 'qq21313', 'hong', '18798808568', '德国', '', '2021-11-26 11:00:33', '2021-11-26 12:59:49'),
(10, '2021-11-26', 'grandplan', 'eori', 59999, 1258, 1, 1, 'dogy', '杭州', 'qq21313', 'hong', '18798808568', '中国', '', '2021-11-26 11:00:34', '2021-11-26 11:00:34'),
(11, '2021-11-26', 'grandplan', 'eori', 59999, 1258, 1, 1, 'dogy', '杭州', 'qq21313', 'hong', '18798808568', '中国', '', '2021-11-26 11:00:34', '2021-11-26 11:00:34'),
(12, '2021-11-26', 'grandplan', 'eori', 59999, 1258, 1, 1, 'dogy', '杭州', 'qq21313', 'hong', '18798808568', '中国', '', '2021-11-26 11:00:34', '2021-11-26 11:00:34'),
(13, '2021-11-03', '腾讯集团', 'EORI', 20000, 1000, 1, 1, 'Eugene', '技术部', 'vat0014211', '马化腾', '18798808568', '德国', '', '2021-11-26 12:35:25', '2021-11-26 12:35:25'),
(17, '2021-11-23', '测试公司5', 'vat', 1999, 999, 1, 1, 'Eugene', '销售部', 'qu11212475', '测试人', '18798808568', '英国', NULL, '2021-11-09 00:00:00', '2021-11-26 18:14:20'),
(18, '2021-11-26', 'grandplan2', 'eori', 59999, 1258, 1, 1, 'dogy', '杭州', 'qq21313', 'hong', '18798808568', '中国', NULL, '2021-11-26 11:00:19', '2021-11-26 13:03:22'),
(19, '2021-11-26', 'grandplan2', 'CE', 59999, 1258, 1, 1, 'dogy', '杭州', 'qq21313', 'hong', '18798808568', '德国', '', '2021-11-26 11:00:33', '2021-11-26 12:59:49'),
(20, '2021-11-26', 'grandplan', 'eori', 59999, 1258, 1, 1, 'dogy', '杭州', 'qq21313', 'hong', '18798808568', '法国', '', '2021-11-26 11:00:34', '2021-11-29 16:28:16'),
(21, '2021-11-26', 'grandplan', 'eori', 59999, 1258, 1, 1, 'dogy', '杭州', 'qq21313', 'hong', '18798808568', '中国', '', '2021-11-26 11:00:34', '2021-11-29 17:09:26'),
(22, '2021-11-26', 'grandplan', 'eori', 59999, 1258, 1, 1, 'dogy', '杭州', 'qq21313', 'hong', '18798808568', '中国', '', '2021-11-26 11:00:34', '2021-11-26 11:00:34'),
(23, '2021-11-03', '腾讯集团', 'EORI', 20000, 1000, 1, 1, 'Eugene', '技术部', 'vat0014211', '马化腾', '18798808568', '德国', '', '2021-11-26 12:35:25', '2021-11-26 12:35:25'),
(24, '2021-10-04', '深圳市小太宗智能科技有限公司', '欧代', 199900, NULL, 1, 1, 'Doris', '杭州销售部', 'ED65669', '侯汉周', '18855584601', '中国', NULL, '2021-11-26 14:44:32', '2021-11-26 14:44:32'),
(25, '2021-10-05', '郑州睢楠网络科技有限公司', 'Eori', 40000, NULL, 2, 1, 'Doris', '杭州销售部', NULL, '闫占杰', '13838552575', '英国', NULL, '2021-11-26 14:44:32', '2021-11-26 14:44:32'),
(26, '2021-10-06', '郑州睢楠网络科技有限公司', '商标注册', 940000, NULL, 2, 1, 'Doris', '杭州销售部', 'TEM211386', '闫占杰', '13838552575', '法国', NULL, '2021-11-26 14:44:32', '2021-11-26 14:44:32'),
(27, '2021-10-07', '上海觅婉实业有限公司', '海外仓', 792600, 90000, 2, 2, 'summer', '杭州销售部', 'H1001', '陈雪', '18867966854', '法国', '英镑', '2021-11-26 14:44:32', '2021-11-26 14:44:32'),
(28, '2021-10-08', '上海觅婉实业有限公司', '海外仓', 884000, 100000, 2, 2, 'summer', '杭州销售部', 'H1001', '陈雪', '18867966854', '法国', '英镑', '2021-11-26 14:44:32', '2021-11-26 14:44:32'),
(29, '2021-10-09', '南昌市恒梦医疗设备维修有限公司', '欧代', 180000, NULL, 2, 1, 'summer', '杭州销售部', 'ED63152', '赖家隆', '18779158846', '法国', NULL, '2021-11-26 14:44:32', '2021-11-26 14:44:32'),
(30, '2021-10-10', '深圳市立先智能科技有限公司', '欧代', 180000, NULL, 2, 1, 'summer', '杭州销售部', 'ED54817', '徐惠', '13538001756', '英国', NULL, '2021-11-26 14:44:32', '2021-11-26 14:44:32'),
(31, '2021-10-11', '台州晨央电子商务有限公司', '欧代', 100000, NULL, 2, 1, 'kaylee', '杭州销售部', NULL, '洪盛', '13957692138', '英国', NULL, '2021-11-26 14:44:32', '2021-11-26 14:44:32'),
(32, '2021-10-12', '乐清市奇泰金属制品有限公司', '欧代', 180000, NULL, 2, 2, 'kaylee', '杭州销售部', NULL, '浙江龙为科技有限公司', '15158572686', '英国', NULL, '2021-11-26 14:44:32', '2021-11-26 14:44:32'),
(33, '2021-10-13', '乐清生爽电器厂', '欧代', 199900, NULL, 2, 2, 'summer', '杭州销售部', 'ED89479', '陈秀静', '13598166517', '英国', NULL, '2021-11-26 14:44:32', '2021-11-26 14:44:32'),
(34, '2021-10-14', '昆山聿怀商贸有限公司', '商标买卖', 1100000, NULL, 2, 1, 'summer', '杭州销售部', NULL, '杨敏', '13023200922', '英国', NULL, '2021-11-26 14:44:32', '2021-11-26 14:44:32'),
(35, '2021-10-15', '昆山宝瑞南贸易有限公司', '商标买卖', 1100000, NULL, 2, 1, 'summer', '杭州销售部', NULL, '杨敏', '13052038368', '英国', NULL, '2021-11-26 14:44:32', '2021-11-26 14:44:32'),
(36, '2021-10-16', '杭州九创家电有限公司', '欧代', 203898, NULL, 1, 1, 'summer', '杭州销售部', 'DSG538', '石岩', '19906722258', '英国', NULL, '2021-11-26 14:44:32', '2021-11-26 14:44:32'),
(37, '2021-10-17', '合肥贝茨机电科技有限公司', '欧代', 180000, NULL, 1, 1, 'Doris', '杭州销售部', 'ED52250', '合肥贝茨国际贸易有限公司', '13966736518', '英国', NULL, '2021-11-26 14:44:32', '2021-11-26 14:44:32'),
(38, '2021-10-18', '上海觅婉实业有限公司', '海外仓', 881400, 100000, 2, 2, 'summer', '杭州销售部', NULL, '陈雪', '18867966854', '英国', '英镑', '2021-11-26 14:44:32', '2021-11-26 14:44:32'),
(39, '2021-10-19', '上海觅婉实业有限公司', '海外仓', 1320000, 150000, 2, 2, 'summer', '杭州销售部', NULL, '陈雪', '18867966854', '英国', '英镑', '2021-11-26 14:44:32', '2021-11-26 14:44:32'),
(40, '2021-10-03', '合肥贝茨机电科技有限公司', NULL, NULL, NULL, NULL, NULL, '', '杭州销售部', NULL, '', '', '英国', NULL, '2021-11-26 14:44:32', '2021-11-26 14:44:32'),
(41, '2021-10-04', '深圳市小太宗智能科技有限公司', '欧代', 199900, NULL, 1, 1, 'Doris', '杭州销售部', 'ED65669', '侯汉周', '18855584601', '中国', NULL, '2021-11-26 14:44:57', '2021-11-26 14:44:57'),
(42, '2021-10-05', '郑州睢楠网络科技有限公司', 'Eori', 40000, NULL, 2, 1, 'Doris', '杭州销售部', NULL, '闫占杰', '13838552575', '英国', NULL, '2021-11-26 14:44:57', '2021-11-26 14:44:57'),
(43, '2021-10-06', '郑州睢楠网络科技有限公司', '商标注册', 940000, NULL, 2, 1, 'Doris', '杭州销售部', 'TEM211386', '闫占杰', '13838552575', '法国', NULL, '2021-11-26 14:44:57', '2021-11-26 14:44:57'),
(44, '2021-10-07', '上海觅婉实业有限公司', '海外仓', 792600, 90000, 2, 2, 'summer', '杭州销售部', 'H1001', '陈雪', '18867966854', '法国', '英镑', '2021-11-26 14:44:57', '2021-11-26 14:44:57'),
(45, '2021-10-08', '上海觅婉实业有限公司', '海外仓', 884000, 100000, 2, 2, 'summer', '杭州销售部', 'H1001', '陈雪', '18867966854', '法国', '英镑', '2021-11-26 14:44:57', '2021-11-26 14:44:57'),
(46, '2021-10-09', '南昌市恒梦医疗设备维修有限公司', '欧代', 180000, NULL, 2, 1, 'summer', '杭州销售部', 'ED63152', '赖家隆', '18779158846', '法国', NULL, '2021-11-26 14:44:57', '2021-11-26 14:44:57'),
(47, '2021-10-10', '深圳市立先智能科技有限公司', '欧代', 180000, NULL, 2, 1, 'summer', '杭州销售部', 'ED54817', '徐惠', '13538001756', '英国', NULL, '2021-11-26 14:44:57', '2021-11-26 14:44:57'),
(48, '2021-10-11', '台州晨央电子商务有限公司', '欧代', 100000, NULL, 2, 1, 'kaylee', '杭州销售部', NULL, '洪盛', '13957692138', '英国', NULL, '2021-11-26 14:44:57', '2021-11-26 14:44:57'),
(49, '2021-10-12', '乐清市奇泰金属制品有限公司', '欧代', 180000, NULL, 2, 2, 'kaylee', '杭州销售部', NULL, '浙江龙为科技有限公司', '15158572686', '英国', NULL, '2021-11-26 14:44:57', '2021-11-26 14:44:57'),
(50, '2021-10-13', '乐清生爽电器厂', '欧代', 199900, NULL, 2, 2, 'summer', '杭州销售部', 'ED89479', '陈秀静', '13598166517', '英国', NULL, '2021-11-26 14:44:57', '2021-11-26 14:44:57'),
(51, '2021-10-14', '昆山聿怀商贸有限公司', '商标买卖', 1100000, NULL, 2, 1, 'summer', '杭州销售部', NULL, '杨敏', '13023200922', '英国', NULL, '2021-11-26 14:44:57', '2021-11-26 14:44:57'),
(52, '2021-10-15', '昆山宝瑞南贸易有限公司', '商标买卖', 1100000, NULL, 2, 1, 'summer', '杭州销售部', NULL, '杨敏', '13052038368', '英国', NULL, '2021-11-26 14:44:57', '2021-11-26 14:44:57'),
(53, '2021-10-16', '杭州九创家电有限公司', '欧代', 203898, NULL, 1, 1, 'summer', '杭州销售部', 'DSG538', '石岩', '19906722258', '英国', NULL, '2021-11-26 14:44:57', '2021-11-26 14:44:57'),
(54, '2021-10-17', '合肥贝茨机电科技有限公司', '欧代', 180000, NULL, 1, 1, 'Doris', '杭州销售部', 'ED52250', '合肥贝茨国际贸易有限公司', '13966736518', '英国', NULL, '2021-11-26 14:44:57', '2021-11-26 14:44:57'),
(55, '2021-10-18', '上海觅婉实业有限公司', '海外仓', 881400, 100000, 2, 2, 'summer', '杭州销售部', NULL, '陈雪', '18867966854', '英国', '英镑', '2021-11-26 14:44:57', '2021-11-26 14:44:57'),
(56, '2021-10-19', '上海觅婉实业有限公司', '海外仓', 1320000, 150000, 2, 2, 'summer', '杭州销售部', NULL, '陈雪', '18867966854', '英国', '英镑', '2021-11-26 14:44:57', '2021-11-26 14:44:57'),
(57, '2021-10-03', '合肥贝茨机电科技有限公司', NULL, NULL, NULL, NULL, NULL, '', '杭州销售部', NULL, '', '', '英国', NULL, '2021-11-26 14:44:57', '2021-11-26 14:44:57'),
(58, '2021-11-26', '大爷', 'EORI', 30000, 10000, 2, 2, '小小', '技术部', 'FF1218554', '大爷', '18888888888', '英国', '', '2021-11-26 15:54:10', '2021-11-26 15:54:10'),
(59, '2021-12-30', 'AA1121', 'CE', 2122000, 22000, 1, 1, 'AA1121', 'AA1121', 'AA1121', 'AA1121', 'AA1121', '啊撒啊', 'AA1121', '2021-11-26 17:56:07', '2021-11-26 17:56:28'),
(60, '2021-11-29', 'DASDAS', 'EORI', 0, 0, 1, 1, 'DASD', 'DASDAS', 'ASDASD', 'DASD', 'DASD', '法国', '', '2021-11-29 16:56:26', '2021-11-29 16:56:26'),
(61, '2021-11-29', 'DASD', '物流', 0, 0, 1, 1, 'DAS', 'DASD', 'ASD', '', '', '法国', '', '2021-11-29 17:04:47', '2021-11-29 17:04:47'),
(62, '2021-10-04', '深圳市小太宗智能科技有限公司', '欧代', 199900, NULL, 1, 1, 'Doris', '杭州销售部', 'ED65669', '侯汉周', '18855584601', '中国', NULL, '2021-11-29 17:12:32', '2021-11-29 17:12:32'),
(63, '2021-10-05', '郑州睢楠网络科技有限公司', 'Eori', 40000, NULL, 2, 1, 'Doris', '杭州销售部', NULL, '闫占杰', '13838552575', '英国', NULL, '2021-11-29 17:12:32', '2021-11-29 17:12:32'),
(64, '2021-10-06', '郑州睢楠网络科技有限公司', '商标注册', 940000, NULL, 2, 1, 'Doris', '杭州销售部', 'TEM211386', '闫占杰', '13838552575', '法国', NULL, '2021-11-29 17:12:32', '2021-11-29 17:12:32'),
(65, '2021-10-07', '上海觅婉实业有限公司', '海外仓', 792600, 90000, 2, 2, 'summer', '杭州销售部', 'H1001', '陈雪', '18867966854', '法国', '英镑', '2021-11-29 17:12:32', '2021-11-29 17:12:32'),
(66, '2021-10-08', '上海觅婉实业有限公司', '海外仓', 884000, 100000, 2, 2, 'summer', '杭州销售部', 'H1001', '陈雪', '18867966854', '法国', '英镑', '2021-11-29 17:12:32', '2021-11-29 17:12:32'),
(67, '2021-10-09', '南昌市恒梦医疗设备维修有限公司', '欧代', 180000, NULL, 2, 1, 'summer', '杭州销售部', 'ED63152', '赖家隆', '18779158846', '法国', NULL, '2021-11-29 17:12:32', '2021-11-29 17:12:32'),
(68, '2021-10-10', '深圳市立先智能科技有限公司', '欧代', 180000, NULL, 2, 1, 'summer', '杭州销售部', 'ED54817', '徐惠', '13538001756', '英国', NULL, '2021-11-29 17:12:32', '2021-11-29 17:12:32'),
(69, '2021-10-11', '台州晨央电子商务有限公司', '欧代', 100000, NULL, 2, 1, 'kaylee', '杭州销售部', NULL, '洪盛', '13957692138', '英国', NULL, '2021-11-29 17:12:32', '2021-11-29 17:12:32'),
(70, '2021-10-12', '乐清市奇泰金属制品有限公司', '欧代', 180000, NULL, 2, 2, 'kaylee', '杭州销售部', NULL, '浙江龙为科技有限公司', '15158572686', '英国', NULL, '2021-11-29 17:12:32', '2021-11-29 17:12:32'),
(71, '2021-10-13', '乐清生爽电器厂', '欧代', 199900, NULL, 2, 2, 'summer', '杭州销售部', 'ED89479', '陈秀静', '13598166517', '英国', NULL, '2021-11-29 17:12:32', '2021-11-29 17:12:32'),
(72, '2021-10-14', '昆山聿怀商贸有限公司', '商标买卖', 1100000, NULL, 2, 1, 'summer', '杭州销售部', NULL, '杨敏', '13023200922', '英国', NULL, '2021-11-29 17:12:32', '2021-11-29 17:12:32'),
(73, '2021-10-15', '昆山宝瑞南贸易有限公司', '商标买卖', 1100000, NULL, 2, 1, 'summer', '杭州销售部', NULL, '杨敏', '13052038368', '英国', NULL, '2021-11-29 17:12:32', '2021-11-29 17:12:32'),
(74, '2021-10-16', '杭州九创家电有限公司', '欧代', 203898, NULL, 1, 1, 'summer', '杭州销售部', 'DSG538', '石岩', '19906722258', '英国', NULL, '2021-11-29 17:12:32', '2021-11-29 17:12:32'),
(75, '2021-10-17', '合肥贝茨机电科技有限公司', '欧代', 180000, NULL, 1, 1, 'Doris', '杭州销售部', 'ED52250', '合肥贝茨国际贸易有限公司', '13966736518', '英国', NULL, '2021-11-29 17:12:32', '2021-11-29 17:12:32'),
(76, '2021-10-18', '上海觅婉实业有限公司', '海外仓', 881400, 100000, 2, 2, 'summer', '杭州销售部', NULL, '陈雪', '18867966854', '英国', '英镑', '2021-11-29 17:12:32', '2021-11-29 17:12:32'),
(77, '2021-10-19', '上海觅婉实业有限公司', '海外仓', 1320000, 150000, 2, 2, 'summer', '杭州销售部', NULL, '陈雪', '18867966854', '英国', '英镑', '2021-11-29 17:12:32', '2021-11-29 17:12:32'),
(78, '2021-10-04', '深圳市小太宗智能科技有限公司', '欧代', 199900, NULL, 1, 1, 'Doris', '杭州销售部', 'ED65669', '侯汉周', '18855584601', '中国', NULL, '2021-11-29 17:12:48', '2021-11-29 17:12:48'),
(79, '2021-10-05', '郑州睢楠网络科技有限公司', 'Eori', 40000, NULL, 2, 1, 'Doris', '杭州销售部', NULL, '闫占杰', '13838552575', '英国', NULL, '2021-11-29 17:12:48', '2021-11-29 17:12:48'),
(80, '2021-10-06', '郑州睢楠网络科技有限公司', '商标注册', 940000, NULL, 2, 1, 'Doris', '杭州销售部', 'TEM211386', '闫占杰', '13838552575', '法国', NULL, '2021-11-29 17:12:48', '2021-11-29 17:12:48'),
(81, '2021-10-07', '上海觅婉实业有限公司', '海外仓', 792600, 90000, 2, 2, 'summer', '杭州销售部', 'H1001', '陈雪', '18867966854', '法国', '英镑', '2021-11-29 17:12:48', '2021-11-29 17:12:48'),
(82, '2021-10-08', '上海觅婉实业有限公司', '海外仓', 884000, 100000, 2, 2, 'summer', '杭州销售部', 'H1001', '陈雪', '18867966854', '法国', '英镑', '2021-11-29 17:12:48', '2021-11-29 17:12:48'),
(83, '2021-10-09', '南昌市恒梦医疗设备维修有限公司', '欧代', 180000, NULL, 2, 1, 'summer', '杭州销售部', 'ED63152', '赖家隆', '18779158846', '法国', NULL, '2021-11-29 17:12:48', '2021-11-29 17:12:48'),
(84, '2021-10-10', '深圳市立先智能科技有限公司', '欧代', 180000, NULL, 2, 1, 'summer', '杭州销售部', 'ED54817', '徐惠', '13538001756', '英国', NULL, '2021-11-29 17:12:48', '2021-11-29 17:12:48'),
(85, '2021-10-11', '台州晨央电子商务有限公司', '欧代', 100000, NULL, 2, 1, 'kaylee', '杭州销售部', NULL, '洪盛', '13957692138', '英国', NULL, '2021-11-29 17:12:48', '2021-11-29 17:12:48'),
(86, '2021-10-12', '乐清市奇泰金属制品有限公司', '欧代', 180000, NULL, 2, 2, 'kaylee', '杭州销售部', NULL, '浙江龙为科技有限公司', '15158572686', '英国', NULL, '2021-11-29 17:12:48', '2021-11-29 17:12:48'),
(87, '2021-10-13', '乐清生爽电器厂', '欧代', 199900, NULL, 2, 2, 'summer', '杭州销售部', 'ED89479', '陈秀静', '13598166517', '英国', NULL, '2021-11-29 17:12:48', '2021-11-29 17:12:48'),
(88, '2021-10-14', '昆山聿怀商贸有限公司', '商标买卖', 1100000, NULL, 2, 1, 'summer', '杭州销售部', NULL, '杨敏', '13023200922', '英国', NULL, '2021-11-29 17:12:48', '2021-11-29 17:12:48'),
(89, '2021-10-15', '昆山宝瑞南贸易有限公司', '商标买卖', 1100000, NULL, 2, 1, 'summer', '杭州销售部', NULL, '杨敏', '13052038368', '英国', NULL, '2021-11-29 17:12:48', '2021-11-29 17:12:48'),
(90, '2021-10-16', '杭州九创家电有限公司', '欧代', 203898, NULL, 1, 1, 'summer', '杭州销售部', 'DSG538', '石岩', '19906722258', '英国', NULL, '2021-11-29 17:12:48', '2021-11-29 17:12:48'),
(91, '2021-10-17', '合肥贝茨机电科技有限公司', '欧代', 180000, NULL, 1, 1, 'Doris', '杭州销售部', 'ED52250', '合肥贝茨国际贸易有限公司', '13966736518', '英国', NULL, '2021-11-29 17:12:48', '2021-11-29 17:12:48'),
(92, '2021-10-18', '上海觅婉实业有限公司', '海外仓', 881400, 100000, 2, 2, 'summer', '杭州销售部', NULL, '陈雪', '18867966854', '英国', '英镑', '2021-11-29 17:12:48', '2021-11-29 17:12:48'),
(93, '2021-10-19', '上海觅婉实业有限公司', '海外仓', 1320000, 150000, 2, 2, 'summer', '杭州销售部', NULL, '陈雪', '18867966854', '英国', '英镑', '2021-11-29 17:12:48', '2021-11-29 17:12:48');

-- --------------------------------------------------------

--
-- 表的结构 `jp_crm_sale_product`
--

CREATE TABLE `jp_crm_sale_product` (
  `id` int(11) NOT NULL,
  `parent_id` int(2) DEFAULT '0' COMMENT '父分类ID',
  `category_name` char(50) NOT NULL COMMENT '分类名',
  `sort` int(11) NOT NULL COMMENT '排序',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `jp_crm_sale_product`
--

INSERT INTO `jp_crm_sale_product` (`id`, `parent_id`, `category_name`, `sort`, `created_at`, `updated_at`) VALUES
(1, 0, 'VAT', 1, '2021-11-25 00:00:00', '2021-11-25 00:00:00'),
(2, 0, '欧代产品', 2, '2021-11-25 00:00:00', '2021-11-25 00:00:00'),
(3, 0, '商标', 3, '2021-11-25 00:00:00', '2021-11-25 00:00:00'),
(4, 0, '物流', 4, '2021-11-25 00:00:00', '2021-11-25 00:00:00'),
(5, 0, '海外仓', 5, '2021-11-25 00:00:00', '2021-11-25 00:00:00'),
(6, 1, 'EORI', 6, '2021-11-25 00:00:00', '2021-11-25 00:00:00'),
(7, 2, 'CE', 7, '2021-11-25 00:00:00', '2021-11-25 00:00:00'),
(8, 1, 'EORI222', 6, '2021-11-25 00:00:00', '2021-11-25 00:00:00'),
(14, 3, '撒旦发射点', 1, '2021-11-26 17:49:02', '2021-11-26 17:50:43'),
(13, 1, '杀杀杀1', 1, '2021-11-26 17:47:47', '2021-11-26 18:13:33');

--
-- 转储表的索引
--

--
-- 表的索引 `jp_admin_users`
--
ALTER TABLE `jp_admin_users`
  ADD PRIMARY KEY (`id`);

--
-- 表的索引 `jp_crm_country`
--
ALTER TABLE `jp_crm_country`
  ADD PRIMARY KEY (`id`);

--
-- 表的索引 `jp_crm_sale_list`
--
ALTER TABLE `jp_crm_sale_list`
  ADD PRIMARY KEY (`id`);

--
-- 表的索引 `jp_crm_sale_product`
--
ALTER TABLE `jp_crm_sale_product`
  ADD PRIMARY KEY (`id`);

--
-- 在导出的表使用AUTO_INCREMENT
--

--
-- 使用表AUTO_INCREMENT `jp_admin_users`
--
ALTER TABLE `jp_admin_users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'primary key', AUTO_INCREMENT=4;

--
-- 使用表AUTO_INCREMENT `jp_crm_country`
--
ALTER TABLE `jp_crm_country`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- 使用表AUTO_INCREMENT `jp_crm_sale_list`
--
ALTER TABLE `jp_crm_sale_list`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '序号', AUTO_INCREMENT=94;

--
-- 使用表AUTO_INCREMENT `jp_crm_sale_product`
--
ALTER TABLE `jp_crm_sale_product`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
