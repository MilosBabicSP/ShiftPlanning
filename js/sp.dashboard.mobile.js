ShiftPlanningDashboard.prototype.initialize = function(){
    var self = this;
    $(document).ready(function(){
        self.wallEvents();
        self.inboxEvents();
    });
}

ShiftPlanningDashboard.prototype.loadSubPageEvents = function(subpage){
    switch(subpage){
        case 'wall':
            this.wallSubEvents();
            break;
        case 'upcomingShifts':
            this.upcomingShifts();
            break;
        case 'inbox':
            this.inboxSubEvents();
            break;
        case 'logout':
            sp.staff.logout();
            break;
    }
}

ShiftPlanningDashboard.prototype.wallEvents = function(){
    var self = this;
    $('#da_wa_nm_b').bind(clickEvent, function(e){
        e.preventDefault();
        $('#da_wa_nm_f').toggleClass('hidden');
        $('#da_wa_nm_ti').val('');
        $('#da_wa_nm_me').val('');
    });
    
    $('#da_wa_nm_ca').bind(clickEvent, function(e){
        e.preventDefault();
        $('#da_wa_nm_b').trigger(clickEvent);
    });
    
    $('#da_wa_nm_sa').bind(clickEvent, function(e){
        e.preventDefault();
        spModel.messaging.create('wall', {
            post : $.trim($('#da_wa_nm_ti').val()), 
            title: $.trim($('#da_wa_nm_me').val())
            }, function(response){
            self.wallSubEvents();
        }, function(response){
            console.log(response);
        });
    })
    
    $('#da_wa_li').delegate('.msgRpl, .cmtCount', clickEvent, function(e){
        e.preventDefault();
        var id = $(this).attr('rel');
        if (!$('#da_wa_msg_' + id).find('.cmts').is(':visible')){
            $('#da_wa_msg_' + id).find('.cmtCount').hide();
            $('#da_wa_msg_' + id).find('.cmts').show();
            if ($(this).hasClass('msgRpl')){
                $('#da_wa_msg_' + id).find('input[type=text]').focus();
            }
        } else {
            if ($(this).hasClass('msgRpl')){
                $('#da_wa_msg_' + id).find('input[type=text]').val($('#da_wa_msg_' + id).find('input[type=text]').attr('origin'));
            }
            $('#da_wa_msg_' + id).find('.cmtCount').show();
            $('#da_wa_msg_' + id).find('.cmts').hide();
        }
    });
    
    $('#da_wa_li').delegate('.msgDel', clickEvent, function(e){
        e.preventDefault();
        var obj = $(this);
        var c = confirm('Do you want to delete this message?');
        if (c){
            var id = $(this).attr('rel');
            var del = 'message';
            if ($(this).hasClass('comment')){
                del = 'comment';
            }
            spModel.messaging.del('wall', {
                id : id, 
                'delete' : del
            }, function(response){
                obj.parent().fadeOut('fast', function(){
                    $(this).remove();
                });
            }, function(response){
                console.log(response);
            });
        }
    });

    $('#da_wa_li').delegate('input[type=text]', 'focus', function(){
        $(this).attr('origin',$(this).val());
        $(this).val('');
    });
    
    $('#da_wa_li').delegate('input[type=submit]', clickEvent, function(){
        var obj = $(this);
        var id = $(this).attr('rel');
        var post = $.trim($('#da_wa_msg_' + id + ' input[type=text]').val());
        if (post.length == 0){
            alert('Please write your message');
            return false;
        }
        spModel.messaging.create('wall', {
            post: post, 
            id: id
        }, function(response) {
            console.log(response);
            var d = {
                avatar : sp.staff.admin.info.dfAvatar,
                id : id,
                userName : sp.staff.admin.info.name,
                comment: post,
                time : 'Now'
            }
            obj.parent().before($.tmpl($('#te_da_wa_me_co'), d));
        }, function(response){
            console.log(response);
        });
        
        return true;
    });
}

ShiftPlanningDashboard.prototype.inboxEvents = function(){
    var self = this;
    $('#da_in_me').delegate('.msgHead', clickEvent, function(e){
        e.preventDefault();
        var id = $(this).attr('messageId');
        var obj = $(this);
        if (obj.hasClass('extended')){
            obj.parent().toggleClass('extended');
        } else {
            spModel.messaging.update('message', {id : id, read : 1}, function(response){
                obj.parent().toggleClass('extended');
                obj.parent().removeClass('unread');
            });
        }
    });
    
    $('#da_in_nm_b, #da_in_nm_ca').bind(clickEvent, function(e){
        $('#da_in_nm_f').toggleClass('hidden');
        $('#da_in_nm_ti').val('');
        $('#da_in_nm_me').val('');
        $('#da_in_nm_to').val(0);
    });
    
    $('#da_in_nm_sa').bind(clickEvent, function(e){
        self.sendMessage();
    });
    
    $('#da_in_me').delegate('a.butRpl', clickEvent, function(e){
        e.preventDefault();
        var id = $(this).attr('rel');
        $('#da_in_msg_' + id).find('.newMsg').show(function(){
            var obj = $(this).parents('.newMsg');
            obj.find('input[type=text]').val('re: ' + $('#da_in_msg_' + id).find('.msgHead h5').html());
        });
    });
    
    $('#da_in_me').delegate('a.butDel', clickEvent, function(e){
        e.preventDefault();
        var c = confirm('Are you sure you want to delete this messaage?');
        if (!c){
            return false;
        }
        var id = $(this).attr('rel');
        spModel.messaging.del('message', {id : id}, function(response){
            $('#da_in_msg_' + id).fadeOut('fast', function(){
                $(this).remove();
            });
        });
        
    });
    
    $('#da_in_me').delegate('.msgBody .newMsg .title .fr', clickEvent, function(e){
        var obj = $(this).parents('.newMsg');
        var data = {
            subject : obj.find('input[type=text]').val(),
            message : obj.find('textarea').val(),
            to : obj.find('input[type=hidden]').val()
        };
        
        spModel.messaging.create('message', data, function(resonse){
            self.inboxSubEvents();
        });
    });
    
    $('#da_in_me').delegate('.msgBody .newMsg .title .fl', clickEvent, function(e){
        e.preventDefault();
        var obj = $(this).parents('.newMsg');
        obj.find('input[type=text]').val('');
        obj.find('textarea').val('');
        obj.hide('fast');
    });
}


//sub page events
ShiftPlanningDashboard.prototype.wallSubEvents = function(){
    spModel.messaging.get('wall', {}, function(response){
        $('#da_wa_li').html($.tmpl($('#te_da_wa_me'), response.data));
    }, function(){
        
    });
}

ShiftPlanningDashboard.prototype.upcomingShifts = function(){
    var send = {
        start_date: 'today', 
        end_date: 'today +2 months', 
        mode: 'employee'
    };
    if (typeof employee != 'undefined'){
        send.employees = sp.staff.admin.info.id
    } else {
        send.employees = sp.staff.admin.info.id;
    }
    spModel.schedule.get('shifts', send, function(response){
        var data = [];
        if(typeof response.data != 'undefined' && response.data.length > 0){
            data = response.data;
        }
        if (data.length > 0){
            $('#da_up_li').html($.tmpl($('#te_da_up_li'), data));
            $('#da_up_li').next().hide();
        } else {
            $('#da_up_li').hide()
            $('#da_up_li').next().show();
        }
    });
}

ShiftPlanningDashboard.prototype.inboxSubEvents = function(){
    spModel.messaging.get('messages', {mode : 'to'}, function(response){
        $('#da_in_me').html($.tmpl($('#te_da_wa_in'), response.data));
    }, function(response){
        console.log(response);
    });
    
    $('#da_in_nm_to').html(spView.staffOption());
}

//functions
ShiftPlanningDashboard.prototype.openComments = function(id){
    
}

ShiftPlanningDashboard.prototype.sendMessage = function(){
    var self = this;
    var data = {
        subject : $('#da_in_nm_ti').val(),
        message : $('#da_in_nm_me').val(),
        to  : $('#da_in_nm_to').val()
    }
    
    spModel.messaging.create('message', data, function(response){
        $('#da_in_nm_b').trigger(clickEvent);
        self.inboxSubEvents();
    });
}



ShiftPlanningDashboard.prototype.loadPage = function(){
    
}



