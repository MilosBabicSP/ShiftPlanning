ShiftPlanningDashboard.prototype.initialize = function(){
    var self = this;
    $(document).ready(function(){
        self.wallEvents();
    });
}

ShiftPlanningDashboard.prototype.loadSubPageEvents = function(subpage){
    console.log(subpage);
    switch(subpage){
        case 'wall':
            this.wallSubEvents();
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
                ('#da_wa_msg_' + id).find('input[type=text]').val($('#da_wa_msg_' + id).find('input[type=text]').attr('origin'));
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



//sub page events
ShiftPlanningDashboard.prototype.wallSubEvents = function(){
    spModel.messaging.get('wall', {}, function(response){
        $('#da_wa_li').html($.tmpl($('#te_da_wa_me'), response.data));
    }, function(){
        
        });
}


//functions
ShiftPlanningDashboard.prototype.openComments = function(id){
    
    
    }


ShiftPlanningDashboard.prototype.loadPage = function(){
    
    }



