-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- 主机： localhost
-- 生成日期： 2021-12-07 17:26:25
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
(4, '欧洲', '英国', '2021-11-25 00:00:00', '2021-12-07 15:06:28'),
(5, '欧洲', '德国', '2021-11-25 00:00:00', '2021-12-07 15:06:34'),
(14, '欧洲', '法国', '2021-11-29 16:25:00', '2021-12-07 15:06:40'),
(8, '欧洲', '意大利', '2021-11-26 16:36:36', '2021-12-07 15:06:46'),
(10, '欧洲', '西班牙', '2021-11-26 16:58:37', '2021-12-07 15:06:51'),
(15, '欧洲', '波兰', '2021-12-07 15:06:57', '2021-12-07 15:06:57'),
(16, '欧洲', '捷克', '2021-12-07 15:07:01', '2021-12-07 15:07:01'),
(17, '欧洲', '荷兰', '2021-12-07 15:07:07', '2021-12-07 15:07:07'),
(18, '', '奥地利', '2021-12-07 15:07:11', '2021-12-07 15:07:11'),
(19, '', '沙特', '2021-12-07 15:07:16', '2021-12-07 15:07:16'),
(20, '', '阿联酋', '2021-12-07 15:07:21', '2021-12-07 15:07:21');

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
(94, '2021-12-07', '洪大爷', '欧代易产品/CE检测', 100000, 10000, 1, 1, 'Eugene', '杭州技术部', 'wewe1212121', '洪氏集团', '18798808568', '', '', '2021-12-07 15:57:41', '2021-12-07 17:10:36'),
(99, '2021-10-05', '郑州睢楠网络科技有限公司', 'Eori', 40000, NULL, 2, 1, 'Doris', '杭州销售部', NULL, '闫占杰', '13838552575', '英国', NULL, '2021-12-07 17:14:44', '2021-12-07 17:14:44'),
(100, '2021-10-06', '郑州睢楠网络科技有限公司', '商标注册', 940000, NULL, 2, 1, 'Doris', '杭州销售部', 'TEM211386', '闫占杰', '13838552575', '法国', NULL, '2021-12-07 17:14:44', '2021-12-07 17:14:44'),
(101, '2021-10-07', '上海觅婉实业有限公司', '海外仓', 792600, 90000, 2, 2, 'summer', '杭州销售部', 'H1001', '陈雪', '18867966854', '法国', '英镑', '2021-12-07 17:14:44', '2021-12-07 17:14:44'),
(102, '2021-10-08', '上海觅婉实业有限公司', '海外仓', 884000, 100000, 2, 2, 'summer', '杭州销售部', 'H1001', '陈雪', '18867966854', '法国', '英镑', '2021-12-07 17:14:44', '2021-12-07 17:14:44'),
(103, '2021-10-09', '南昌市恒梦医疗设备维修有限公司', '欧代', 180000, NULL, 2, 1, 'summer', '杭州销售部', 'ED63152', '赖家隆', '18779158846', '法国', NULL, '2021-12-07 17:14:44', '2021-12-07 17:14:44'),
(104, '2021-10-10', '深圳市立先智能科技有限公司', '欧代', 180000, NULL, 2, 1, 'summer', '杭州销售部', 'ED54817', '徐惠', '13538001756', '英国', NULL, '2021-12-07 17:14:44', '2021-12-07 17:14:44'),
(105, '2021-10-11', '台州晨央电子商务有限公司', '欧代', 100000, NULL, 2, 1, 'kaylee', '杭州销售部', NULL, '洪盛', '13957692138', '英国', NULL, '2021-12-07 17:14:44', '2021-12-07 17:14:44'),
(106, '2021-10-12', '乐清市奇泰金属制品有限公司', '欧代', 180000, NULL, 2, 2, 'kaylee', '杭州销售部', NULL, '浙江龙为科技有限公司', '15158572686', '英国', NULL, '2021-12-07 17:14:44', '2021-12-07 17:14:44'),
(107, '2021-10-13', '乐清生爽电器厂', '欧代', 199900, NULL, 2, 2, 'summer', '杭州销售部', 'ED89479', '陈秀静', '13598166517', '英国', NULL, '2021-12-07 17:14:44', '2021-12-07 17:14:44'),
(108, '2021-10-14', '昆山聿怀商贸有限公司', '商标买卖', 1100000, NULL, 2, 1, 'summer', '杭州销售部', NULL, '杨敏', '13023200922', '英国', NULL, '2021-12-07 17:14:44', '2021-12-07 17:14:44'),
(109, '2021-10-15', '昆山宝瑞南贸易有限公司', '商标买卖', 1100000, NULL, 2, 1, 'summer', '杭州销售部', NULL, '杨敏', '13052038368', '英国', NULL, '2021-12-07 17:14:44', '2021-12-07 17:14:44'),
(110, '2021-10-16', '杭州九创家电有限公司', '欧代', 203898, NULL, 1, 1, 'summer', '杭州销售部', 'DSG538', '石岩', '19906722258', '英国', NULL, '2021-12-07 17:14:44', '2021-12-07 17:14:44'),
(111, '2021-10-17', '合肥贝茨机电科技有限公司', '欧代', 180000, NULL, 1, 1, 'Doris', '杭州销售部', 'ED52250', '合肥贝茨国际贸易有限公司', '13966736518', '英国', NULL, '2021-12-07 17:14:44', '2021-12-07 17:14:44'),
(112, '2021-10-18', '上海觅婉实业有限公司', '海外仓', 881400, 100000, 2, 2, 'summer', '杭州销售部', NULL, '陈雪', '18867966854', '英国', '英镑', '2021-12-07 17:14:44', '2021-12-07 17:14:44'),
(113, '2021-10-19', '上海觅婉实业有限公司', '海外仓', 1320000, 150000, 2, 2, 'summer', '杭州销售部', NULL, '陈雪', '18867966854', '英国', '英镑', '2021-12-07 17:14:44', '2021-12-07 17:14:44'),
(98, '2021-10-04', '深圳市小太宗智能科技有限公司', '欧代', 199900, NULL, 1, 1, 'Doris', '杭州销售部', 'ED65669', '侯汉周', '18855584601', '中国', NULL, '2021-12-07 17:14:44', '2021-12-07 17:14:44'),
(97, '2021-12-01', '洪大爷', '海外仓/德国海外仓', 111000, 1000, 2, 1, 'Eugene', '杭州技术部', 'haiwaic00211', 'aaa123123', '18888888888', '', '', '2021-12-07 16:08:13', '2021-12-07 17:12:42');

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
(2, 0, '欧代易产品', 2, '2021-11-25 00:00:00', '2021-11-25 00:00:00'),
(3, 0, '知识产权', 3, '2021-11-25 00:00:00', '2021-11-25 00:00:00'),
(4, 0, '物流', 4, '2021-11-25 00:00:00', '2021-11-25 00:00:00'),
(5, 0, '海外仓', 5, '2021-11-25 00:00:00', '2021-11-25 00:00:00'),
(6, 1, '意大利', 6, '2021-11-25 00:00:00', '2021-11-25 00:00:00'),
(19, 1, '波兰', 1, '2021-12-07 11:20:07', '2021-12-07 11:20:07'),
(8, 1, '法国', 6, '2021-11-25 00:00:00', '2021-11-25 00:00:00'),
(18, 1, '西班牙', 1, '2021-12-07 11:20:02', '2021-12-07 11:20:02'),
(13, 1, '英国', 1, '2021-11-26 17:47:47', '2021-11-26 18:13:33'),
(17, 1, '德国', 1, '2021-12-07 11:18:43', '2021-12-07 11:18:43'),
(20, 1, '捷克', 1, '2021-12-07 11:20:12', '2021-12-07 11:20:12'),
(21, 1, '荷兰', 1, '2021-12-07 11:20:18', '2021-12-07 11:20:18'),
(22, 1, '奥地利', 1, '2021-12-07 11:20:22', '2021-12-07 11:20:22'),
(23, 1, '沙特', 1, '2021-12-07 11:20:28', '2021-12-07 11:20:28'),
(24, 1, '阿联酋', 1, '2021-12-07 11:20:34', '2021-12-07 11:20:34'),
(25, 2, 'CE检测', 1, '2021-12-07 12:04:45', '2021-12-07 12:04:45'),
(26, 2, '欧盟责任人', 1, '2021-12-07 12:04:53', '2021-12-07 12:04:53'),
(27, 2, 'EPR', 1, '2021-12-07 12:04:58', '2021-12-07 12:04:58'),
(28, 26, '欧代', 1, '2021-12-07 12:05:35', '2021-12-07 12:05:35'),
(29, 26, '英代', 1, '2021-12-07 12:05:40', '2021-12-07 12:05:40'),
(30, 26, '德代', 1, '2021-12-07 12:05:45', '2021-12-07 12:05:45'),
(31, 27, '德国', 1, '2021-12-07 14:47:48', '2021-12-07 14:47:48'),
(32, 31, 'WEEE', 1, '2021-12-07 14:48:17', '2021-12-07 14:48:17'),
(33, 31, '电池法', 1, '2021-12-07 14:48:22', '2021-12-07 14:48:22'),
(34, 31, '包装法', 1, '2021-12-07 14:48:29', '2021-12-07 14:48:29'),
(35, 27, '法国', 1, '2021-12-07 15:02:15', '2021-12-07 15:02:15'),
(36, 35, 'WEEE', 1, '2021-12-07 15:03:57', '2021-12-07 15:03:57'),
(37, 35, '电池法', 1, '2021-12-07 15:04:05', '2021-12-07 15:04:05'),
(38, 35, '包装法', 1, '2021-12-07 15:04:13', '2021-12-07 15:04:13'),
(39, 35, '纺织品', 1, '2021-12-07 15:04:21', '2021-12-07 15:04:21'),
(40, 35, '家具', 1, '2021-12-07 15:04:27', '2021-12-07 15:04:27'),
(41, 35, '印刷纸', 1, '2021-12-07 15:04:34', '2021-12-07 15:04:34'),
(42, 3, '商标', 1, '2021-12-07 15:04:43', '2021-12-07 15:04:43'),
(43, 3, '外观专利', 1, '2021-12-07 15:04:51', '2021-12-07 15:04:51'),
(44, 5, '英国海外仓', 1, '2021-12-07 15:05:12', '2021-12-07 15:05:12'),
(45, 5, '德国海外仓', 1, '2021-12-07 15:05:21', '2021-12-07 15:05:21'),
(46, 44, '一件代发', 1, '2021-12-07 15:05:29', '2021-12-07 15:05:29'),
(47, 44, '整箱中转', 1, '2021-12-07 15:05:37', '2021-12-07 15:05:37'),
(48, 44, '贴换标', 1, '2021-12-07 15:05:44', '2021-12-07 15:05:44'),
(49, 45, '整箱中转', 1, '2021-12-07 15:05:52', '2021-12-07 15:05:52'),
(50, 45, '贴换标', 1, '2021-12-07 15:05:58', '2021-12-07 15:05:58');

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- 使用表AUTO_INCREMENT `jp_crm_sale_list`
--
ALTER TABLE `jp_crm_sale_list`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '序号', AUTO_INCREMENT=114;

--
-- 使用表AUTO_INCREMENT `jp_crm_sale_product`
--
ALTER TABLE `jp_crm_sale_product`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
