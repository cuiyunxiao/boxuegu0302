define(['jquery', 'common', 'nprogress', 'template'], function($, undefined, nprogress, template) {
	
	// 该页所有的js加载完毕，进度条结束。
	nprogress.done();
	
	// 讲师列表数据缓存
	var treacherListCache;
	try{
		treacherListCache = JSON.parse(localStorage.getItem('treacherListCache'));
	}catch(e){}
	
	/**
	 * 如果存在缓存数据优先使用缓存，
	 * 否则发送ajax请求重新获取数据，然后进行缓存。
	 * */
	if(treacherListCache) {
		var html = template('teacher-list-tpl', {list: treacherListCache});
		$('#teacher-list-tbody').html(html);
	}else {
		$.get('/v6/teacher', function(data) {
			if(data.code == 200) {
				localStorage.setItem('treacherListCache',  JSON.stringify(data.result));
				var html = template('teacher-list-tpl', {list: data.result});
				$('#teacher-list-tbody').html(html);
			}
		});
	}
	
	// 通过事件委托的方式给动态生成的a标签绑定点击事件，
	// 然后获取讲师详细信息并展示。
	$('#teacher-list-tbody').on('click', '.teacher-view', function() {
		$.get('/v6/teacher/view', {
			tc_id: $(this).parent().attr('data-id')
		}, function(data) {
			if(data.code == 200) {
				var html = template('teacher-view-tpl', data.result);
				$('#teacherModal').html(html);
			}
		});
	});
	
	// 讲师状态修改
	$('#teacher-list-tbody').on('click', '.teacher-status', function() {
		var $self = $(this);
		$.ajax({
			url: '/v6/teacher/handle',
			type: 'post',
			data: {
				tc_id: $(this).parent().attr('data-id'),
				tc_status: $(this).parent().attr('data-status')
			},
			success: function(data) {
				if(data.code == 200) {
					// 得到修改后的状态，使用该状态修改按钮名称&父元素的data-status属性值
					$self.html(data.result.tc_status == 0? '开启': '注销');
					$self.parent().attr('data-status', data.result.tc_status);
				}
			}
		});
	});
});
