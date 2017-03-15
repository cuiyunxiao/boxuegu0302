define(['jquery', 'common', 'nprogress', 'template'], function($, undefined, nprogress, template) {
	
	// 该页所有的js加载完毕，进度条结束。
	nprogress.done();
	
	// 渲染列表
	$.get('/v6/category', function(data) {
		if(data.code == 200) {
			$('#category-list-table').append(template('category-list-tpl', { list: data.result }));
		}
	});
});
