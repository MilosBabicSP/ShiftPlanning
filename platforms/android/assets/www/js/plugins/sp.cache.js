var CacheCore = function(){
    this.cache = {};
    this.dependencies = {
        dashboard : {
            main : {
                type : 'time',
                attr : '0'
            },
            inbox : {
                type : 'time',
                attr : '0'
            },
            settings : {
                type : 'time',
                attr : '0'
            }
        },
        staff : {
            staffList : {
                type : 'time',
                attr : '0'
            },
            addEmployee : {
                type : 'time',
                attr : '0'
            },
            fastAssignment : {
                type : 'time',
                attr : '0'
            }
        },
        timeClock : {
            overview : {
                type : 'time',
                attr : '0'
            },
            addClockTime : {
                type : 'time',
                attr : '0'
            },
            manageTimeSheets : {
                type : 'time',
                attr : '0'
            }
        }
    };
}

CacheCore.prototype.addDependecy = function(data){
    this.dependencies[data.page][data.subpage] = data.depends
}


//if page is already used display page without calling inner javascript of that page.
CacheCore.prototype.readC = function(page, subpage){
    var c = page + '.' + subpage;
    if (typeof this.cache[c] != 'undefined'){
        return false;
    } else {
        if (this.dependencies[page][subpage].type == 'time'){
            var self = this;
            setTimeout(function(){
                delete self.cache[c];
            },this.dependencies[page][subpage].attr);
        }
        this.cache[c] = true;
    }
    return true;
}


CacheCore.prototype.clearChangeCache = function(apiCall){
    var self = this;
    $.each(self.dependencies, function(i, item){
        $.each(item, function(iL2, itemL2){
            if (itemL2.type == 'change' && $.inArray(apiCall, itemL2.attr)){
                self.cache[i + '.' + iL2] = null;
            }
        });
    });
}

CacheCore.prototype.flushAll = function(){
    this.cache = {};
}





