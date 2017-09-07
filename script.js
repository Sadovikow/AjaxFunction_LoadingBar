	function feedbackMobile(){
		var name = $('#feedback-author').val();
		var phone = $('#feedback-phone').val();
		var type = $('#popup_box h3').html();
		$("#feedback-author").attr('style', 'border: 0;');
		$("#feedback-phone").attr('style', 'border: 0;');
		if(name != '' && phone != ''){
			var param = "name="+name+"&phone="+phone+"&type="+type;
			$('#popup_box input[type="submit"]').prop('disabled', true);
			$.ajax({
				url: "/ajax/feedback.php",
				data: param,
				beforeSend: function() {
					$('html').append('<div class="loadingbar"></div>'); // Начало процесса загрузки
				},
				success: function(data){
					$('#feedback-author').val("");
					$('#feedback-phone').val("");
					$('#popup_box input[type="submit"]').val('Отправлено!');
					$('#popup_box input[type="submit"]').attr('onclick', '');
					setTimeout(function(){$('#close_btn').click()}, 1500);
				},
				error: function(jqXHR, textStatus, errorThrown){
					//console.log('Error: '+ errorThrown); //debug
					$('#popup_box input[type="submit"]').prop('disabled', false); // Активируем кнопку, если ошибка, даем возможность отправить форму заново
				},
				complete: function() {
					$('.loadingbar').fadeOut(500, function(){$(this).remove()}); // Конец процесса загрузки
				}
			});
		}else if(name == '' && phone == ''){
			$("#feedback-author").attr('style', 'border: 2px solid #e00 !important;');
			$("#feedback-phone").attr('style', 'border: 2px solid #e00 !important;');
		}else if(phone == ''){
			$("#feedback-phone").attr('style', 'border: 2px solid #e00 !important;');
		}else {
		    $("#feedback-author").attr('style', 'border: 2px solid #e00 !important;');
		}
	}