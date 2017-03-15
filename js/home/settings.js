define(['jquery', 'common', 'nprogress', 'template', 'region', 'datepicker', 'datepickerLanguage', 'ckeditor', 'uploadify'], 
function($, undefined, nprogress, template, undefined, datepicker, undefined, ckeditor, undefined) {
	
	// 该页所有的js加载完毕，进度条结束。
	nprogress.done();
	
	/**
	 * 展示个人信息到表单
	 * */
	$.get('/v6/teacher/profile', function(data) {
		if(data.code == 200) {
			$('#profile').html(template('profile-form-tpl', data.result));
			
			// 配置省市三级联动
			$('.hometown').region({
				url: '/lib/region/region.json'
			});
			
			// 配置日期插件
			$('.datepicker').datepicker({
				language: 'zh-CN',
				format: 'yyyy-mm-dd',
				endDate: new Date()
			});
			
			// 配置头像上传插件
			$('#upfile').uploadify({
				swf: '/lib/uploadify/uploadify.swf',
				uploader: '/v6/uploader/avatar',
				fileObjName: 'tc_avatar',
				fileTypeExts: '*.gif; *.jpg; *.png',
				height: $('.preview').height(),
				buttonText: '',
				// 头像上传成功后，解析字符串数据，然后把上传的地址设置到表单中，供提交；同时更新用户头像的预览。
				onUploadSuccess: function(file, data) {
					var data = JSON.parse(data);
					$('.preview img').attr('src', data.result.path);
				}
			});
			
			// 配置富文本编辑器
			var edit = ckeditor.replace('ckeditor');
			
			// 监听提交事件
			$('.form-horizontal').on('submit', function() {
				
				// 生成一个tc_hometown参数，格式为：省|市|县
				var hometown = $('.hometown select').map(function() {
					return $(this).find('option:selected').text();
				}).toArray().join('|');
				
				// 比较挫的办法
//				var p = $('#p').find('option:selected').text();
//				var c = $('#c').find('option:selected').text();
//				var d = $('#d').find('option:selected').text();
//				var hometown = p + '|' + c + '|' + d;
				
				// 设置文本框的内容为富文本编辑器内容
				edit.updateElement();
				
				// 修改数据，成功后刷新当前页。
				$.ajax({
					url: '/v6/teacher/modify',
					type: 'post',
					data: $(this).serialize() + '&tc_hometown=' + hometown,
					success: function(data) {
						if(data.code == 200) {
							location.reload();
						}
					}
				})
				
				return false;
			});
		}
	});
});
