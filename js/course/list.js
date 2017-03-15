define(['jquery', 'common', 'nprogress', 'template'], function($, undefined, nprogress, template) {
	
	// 该页所有的js加载完毕，进度条结束。
	nprogress.done();
	
	// 页面渲染
	$.get('/v6/course', function(data) {
		if(data.code == 200) {
			$('.courses').append(template('course-tpl', { list: data.result }));
		}
	});
});
