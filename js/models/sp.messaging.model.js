var SPModelMessaging = function(){
    this.model = 'messaging';
}

SPModelMessaging.prototype.wall = function(module, method, data, success, error){
    var self = this;
    sp.api(this.model + '.' + module, method, data, function(response){
        if(typeof success == 'function'){
            if (method == 'get'){
                response.data = self.prepareWallMessages(response.data);
            }
            success.call(this, response);
        }
    }, error);
}


SPModelMessaging.prototype.prepareWallMessages = function(response){
    var data = [];
               
    $.each(response,function(){
        var comments = [];
        if(typeof this.comments != 'undefined'){
            $.each(this.comments,function(){
                comments.push({
                    id: this.id,
                    avatar: sp.getAvatar(this.user.id),
                    userName: this.user.name,
                    userId : this.user.id,
                    time: $.timeago(new Date(this.date*1000)),
                    comment: this.comment_formatted,
                    full : true,
                    owner : (parseInt(sp.staff.admin.info.group) <= 3 || this.user.id == sp.staff.admin.info.id) ? 1 : 0
                });
            });
        }
        data.push({
            id: this.id,
            avatar: sp.getAvatar(this.user.id),
            userName: this.user.name,
            userId : this.user.id,
            time: $.timeago(new Date(this.date*1000)),
            sticky: parseInt(this.sticky),
            title: this.title_formatted,
            post: this.post_formatted,
            comments: comments,
            owner : (parseInt(sp.staff.admin.info.group) <= 3 || this.user.id == sp.staff.admin.info.id) ? 1 : 0
        });
    });
    return data;
}