define(['jquery', 'common', 'nprogress', 'util', 'template'], function($, undefined, nprogress, util, template) {
	
	// 该页所有的js加载完毕，进度条结束。
	nprogress.done();
	
	var cs_id = util.getQueryString('cs_id');
	
	// 渲染模版
	$.get('/v6/course/lesson', { cs_id: cs_id }, function(data) {
		if(data.code == 200) {
			$('.steps').html(template('step-tpl', data.result));
		}
	});
	
	// 添加章节
	$(document).on('click', '#lesson-add', function() {
		$('#chapterModal').modal();
	});
	
	// 编辑章节
	$(document).on('click', '#lesson-edit', function() {
		$('#chapterModal').modal();
	});
});
