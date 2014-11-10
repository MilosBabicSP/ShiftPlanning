var hash = function(){
    this.data = {};
}

hash.prototype.set = function(item, data){
    this.data[item] = data;
}

hash.prototype.get = function(item){
    return this.data[item];
}
