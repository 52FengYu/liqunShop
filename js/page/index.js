//系统错误捕获
const errorHandler = (error, vm) => {
	console.error('抛出全局异常');
	console.error(vm);
	console.error(error);

}

Vue.config.errorHandler = errorHandler;
Vue.prototype.$throw = (error) => errorHandler(error, this);

$(function() {

	FastClick.attach(document.body);


	if ($.trim(pagedata) === '') {
		goPage(WebRoute.Host + WebRoute.Index);
		return false;
	}

	// 	Vue.config.errorHandler = (err, vm, info) => {
	// 		console.error('通过vue errorHandler捕获的错误')
	// 		console.error(err)
	// 		console.error(vm)
	// 		console.error(info)
	// 
	// 		// 在这个方法内可以将捕获到的错误进行上报到后台或者发送错误信息到 node 中间层
	// 		// 上报到后台之后，在请错误请求到页面中进行可视化
	// 	}

	var vm = new Vue({
		el: '#app',
		data: function() {
			return {
				pagedatalist: pagedata.PageContent,
			}
		},
		components: {

		},
		created: function() {

		},
		mounted: function() {
			window.vm = this;

		},
		computed: {

		},
		methods: {

		},
	});

	setTimeout(() => {
		//幻灯片
		var mySwiper = new Swiper('.swiper-container', {
			loop: true, //是否循环展示图片
			observer: true, //修改swiper自己或子元素时，自动初始化swiper 
			observeParents: false, //修改swiper的父元素时，自动初始化swiper 
			onSlideChangeEnd: function(swiper) {
				swiper.update();
				mySwiper.startAutoplay();
				mySwiper.reLoop();
			},
			autoplay: {
				delay: 2000, //2秒切换一次 
				disableOnInteraction: false,
			},
			pagination: {
				el: '.swiper-pagination',
				clickable: true,
			},
		});
	}, 300)

	$('body').css('display', 'block');
});
