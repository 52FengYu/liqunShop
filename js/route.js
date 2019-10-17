//站点标题名称
var WebSiteName = '利群网商';

//网页路径
var WebRoute = {
	'Host': 'http://o2o.liqunshop.com', //网站网址根目录
	'DebugHost': 'http://127.0.0.1:7020', //网站网址根目录
	'Index': '/realindex.html?t=20180525', //首页
	'Member': {
		'Login': '/view/member/login.html?t=20190622', //登录
		'Register': '/view/member/register.html?t=20190622', //注册
	},
	'Page':{
		'Class':'/view/page/Class.html?t=20191011',	//一级列表页
		'ClassSearch':'/view/page/ClassSearch.html?t=20191011',	//二级列表页
		'Coupon':'/view/page/Coupon.html?t=20191011',	//优惠券页
		'giftCard':'/view/page/giftCard.html?t=20191011',	//礼品卡页
		'MembershipCard':'/view/page/MembershipCard.html?t=20191011',	//会员卡页
		'Personal':'/view/page/Personal.html?t=20191011',	//个人中心页
		'ProductSearch':'/view/page/ProductSearch.html?t=20191011',	//搜索页
		'Collection':'/view/page/Collection.html?t=20191011',	//我的收藏页
		'address':'/view/page/address.html?t=20191011',	//收货地址列表
		'addAddress':'/view/page/addAddress.html?t=20191011',	//添加地址
		'mapAddress':'/view/page/mapAddress.html?t=20191011',	//地图选点
		'editAddress':'/view/page/editAddress.html?t=20191012',	//修改收货地址
		'productDetail':'/view/page/productDetail.html?t=20191015',//商品詳情頁
	}
};


//CSS路径
var CSSRoute = {
	'Host': 'http://o2o.liqunshop.com/css', //CSS文件存放网址根目录 
	'DebugHost': 'http://127.0.0.1:7020/css', //CSS文件存放网址根目录 
	'Common': '/common.css?t=20180522', //公共样式 
	'WeUI': '/common/weui.min.css', //WeUI
	'JqWeUI': '/common/jquery-weui.min-1.2.0.css', //JQWeUI
	'mintUI':'/common/mintUI.css',
	'Swiper': '/common/swiper.min.css', //幻灯片
	'Iconfont': '/common/iconfont.css', //iconfont
	'Index': '/realindex.css?t=2019062303', //首页
	'Member': {
		'Login': '/member/login.css?t=20190622', //登录
		'Register': '/member/register.css?t=20190622', //注册
	},
	'Page':{
		'Index':'/page/index.css?t=20190808',
		'Class':'/page/Class.css?t=20191005',
		'ClassSearch':'/page/ClassSearch.css?t=20191005',
		'giftCard':'/page/giftCard.css?t=20191005',
		'MembershipCard':'/page/MembershipCard.css?t=20191005',
		'Personal':'/page/Personal.css?t=20191005',
		'productSearch':'/page/productSearch.css?t=20191005',
		'layUI':'/page/layui.css?t=20191005',
		'Coupon':'/page/Coupon.css?t=20191005',
		'Collection':'/page/Collection.css?t=20191007',
		'address':'/page/address.css?t=20191012',
		'addAddress':'/page/addAddress.css?t=20191012',
		'editAddress':'/page/editAddress.css?t=20191012',
	}
};

//JS路径
var JSRoute = {
	'Host': 'http://o2o.liqunshop.com/js', //JS文件存放网址根目录
	'DebugHost': 'http://127.0.0.1:7020/js', //JS文件存放网址根目录 
	'Common': '/common.js?t=20190622', //公共脚本
	'cookie': '/common/jquery.cookie-1.4.1.js', //cookie操作
	'vue': '/common/vue-2.6.10.min.js', //vue
	'dialog': '/common/lhgDialog-4.2.0/lhgdialog.min.js?skin=discuz', //消息框
	'JqWeUI': '/common/jquery-weui.min-1.2.0.js', //JQWeUI
	'mintUI':'/common/mintUI.js',	//mintUI
	'Swiper': '/common/swiper.min.js', //幻灯片
	'Index': '/realindex.js?t=2019062303', //首页
	'Member': {
		'Login': '/member/login.js?t=20190622', //登录
		'Register': '/member/register.js?t=20190622', //注册
	},
	'Page':{
		'Index':'/page/index.js?t=20190808',
		'Class':'/page/Class.js?t=20191005',
		'ClassSearch':'/page/ClassSearch.js?t=20191005',
		'Coupon':'/page/Coupon.js?t=20191005',
		'giftCard':'/page/giftCard.js?t=20191005',
		'MembershipCard':'/page/MembershipCard.js?t=20191005',
		'Personal':'/page/Personal.js?t=20191005',
		'ProductSearch':'/page/ProductSearch.js?t=20191005',
		'Collection':'/page/Collection.js?t=20191007',
		'address':'/page/address.js?t=20191012',
		'addAddress':'/page/addAddress.js?t=20191012',
		'editAddress':'/page/editAddress.js?t=20191012',
	}
};

//图片服务路径
var ImageRoute = {
	'Host': 'http://images.liqunshop.com',
	'DebugHost': 'http://10.50.107.206:5060'
};


//后端服务路径
var Service = {
	'Host': 'http://wsappservice.liqunshop.com',
	'DebugHost': 'http://wsappservice.liqunshop.com'
};
