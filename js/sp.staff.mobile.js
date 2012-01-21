ShiftPlanningStaff.prototype.initialize = function(){
    var self = this;
    $(document).ready(function(){
        $('#lo_b').bind('click', function(){
           self.login(); 
        });
    });
}

ShiftPlanningStaff.prototype.login = function(){
    var u = $('#lo_u').val();
    var p = $('#lo_p').val();
    $('.loginContainer').fadeOut(500, function(){
        $('body').removeClass('login');
        $('html').css('height','auto');
        $('.applicationContainer').fadeIn(500);
        $('.loginForm input').val('');
    });
}