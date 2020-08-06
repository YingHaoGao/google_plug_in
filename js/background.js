chrome.contextMenus.create({
	title: "测试右键菜单",
	onclick () {
		alert('您点击了右键菜单！')
	}
});
chrome.contextMenus.create({
	title: '使用度娘搜索：%s', // %s表示选中的文字
	contexts: ['selection'], // 只有当选中文字时才会出现此右键菜单
	onclick: function(params) {
		// 注意不能使用location.href，因为location是属于background的window对象
		chrome.tabs.create({url: 'https://www.baidu.com/s?ie=utf-8&wd=' + encodeURI(params.selectionText)});
	}
});

// 悬浮窗口
const MinWindow = function(options) {
	// let adsorb = options.adsorb;
	// let location = options.location;
	// let size = options.size;
	// let windowHref = options.windowHref;

	// /* ------------ 原型属性 ------------ */
	// // 是否吸附
	// this.adsorb = adsorb || false;
	// // 初始位置
	// this.location = location || { top: 0, left: 0 };
	// // 初始窗口大小
	// this.size = size || { width: 200, height: 200 };
	// // 访问网址
	// this.windowHref = windowHref || 'www.baidu.com';


	/* ------------ 内部方法 ------------ */
	// 构建dom
	const createDom = () => {
		let that = this;
		// let { location, size } = that;

		let dContainer = $('<div>', {
			class: 'container'
		});

		// dContainer.css({ 'top': location.top, 'left': location.left, 'width': size.width, 'height': size.height });
		$('body').append(dContainer);
	}


	/* ------------ 注入依赖 ------------ */
	// 向页面注入jquery
	const injectJquery = () => {
		// 访问被检查的页面DOM需要使用inspectedWindow
		// 简单例子：检测被检查页面是否使用了jQuery
		chrome.devtools.inspectedWindow.eval("jQuery.fn.jquery", (result, isException) => {
			if(isException) {
				jsPath = 'js/jquery-3.3.1.min.js';
				var temp = document.createElement('script');
				temp.setAttribute('type', 'text/javascript');
				temp.src = chrome.extension.getURL(jsPath);
				temp.onload = () => {
					// 放在页面不好看，执行完后移除掉
					this.parentNode.removeChild(this);
				};
				document.body.appendChild(temp);
			}
		});
	}

	/* ------------ 执行 ------------ */
	// injectJquery();
	createDom();
};

function getMinWindow () {
	return MinWindow;
}