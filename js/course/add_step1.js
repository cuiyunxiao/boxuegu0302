define(['jquery', 'common', 'nprogress', 'util', 'template', 'ckeditor'], function($, undefined, nprogress, util, template, ckeditor) {
	
	// 该页所有的js加载完毕，进度条结束。
	nprogress.done();
	
	var cs_id = util.getQueryString('cs_id');
	
	// 渲染页面
	$.get('/v6/course/basic', { cs_id: cs_id }, function(data) {
		(data.code == 200) && ($('.steps').html(template('steps-tpl', data.result)));
		
		// 配置富文本编辑器
		var cke = ckeditor.replace('brief-textarea');
		
		// 选择顶级课程分类，更新子级分类
		$('#category-top-select').on('change', function() {
			var topId = $(this).val();
			$.get('/v6/category/child', { cg_id: topId }, function(data) {
				
				// 动态生成option课程分类子集，添加到对应的select元素中。
				var optionHTML = 
						'{{ each list }}\
						<option value="{{ $value.cg_id }}">{{ $value.cg_name }}</option>\
						{{ /each }}';
				var render = template.compile(optionHTML);
				$('#category-child-select').html(render({ list: data.result }));
			});
		});
		
		// 提交数据,提交成功后跳转到第二步的课程编辑页面
		$('#step-form').on('submit', function() {
			
			// 更新编辑器文本到textarea中.
			cke.updateElement();
			$.ajax({
				url: '/v6/course/update/basic',
				type: 'post',
				data: $(this).serialize() + '&cs_id=' + cs_id,
				success: function(data) {
					if(data.code == 200) {
						location.href = '/html/course/add_step2.html?cs_id=' + cs_id;
					}
				}
			});
			return false;
		});
	});
});
