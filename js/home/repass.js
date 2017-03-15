define(['jquery', 'common', 'nprogress'], function($, undefined, nprogress) {
	
	// 该页所有的js加载完毕，进度条结束。
	nprogress.done();
	
	// 密码修改
	$('#repass-form').on('submit', function() {
		$.ajax({
			url: '/v6/teacher/repass',
			type: 'post',
			data: $(this).serialize(),
			success: function(data) {
				if(data.code == 200) {
					$('#logout').trigger('click');
				}
			}
		});
		return false;
	});
});
