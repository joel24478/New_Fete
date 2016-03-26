/* 
	filename: validation.js
	Author: Zheondre Calcano 
	Created on: 3/25/16 at 7:44 pm
	Project: Fete
	validation scripts for sign-up and login
*/
//page 240 from Getting MEAN
$('#SignUp').submit(function (e) {
	$('.alert.alert-danger').hide();
	if (!$('input#name').val() || !$('input#email').val() || !$('input#pw').val()) {
		if ($('.alert.alert-danger').length) {
			$('.alert.alert-danger').show();
		} else {
			$(this).prepend('<div role="alert" class="alert alert-danger">All fields required, please try again</div>');
		}
		return false;
	}
});