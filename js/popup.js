$(function(){
	// 加载设置
	var defaultConfig = {color: 'white'}; // 默认配置
	chrome.storage.sync.get(defaultConfig, function(items) {
		document.body.style.backgroundColor = items.color;
	});

	// 初始化国际化
	// $('#test_i18n').html(chrome.i18n.getMessage("helloWorld"));
})

var bg = chrome.extension.getBackgroundPage();

$('#min_window').click(e => {
	alert('bg')
	console.log('bg')
	console.log(bg.getMinWindow())
	let MinWindow = bg.getMinWindow();

	new MinWindow();
})
