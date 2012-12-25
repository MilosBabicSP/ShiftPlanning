var SPModelLocation = function(){
    this.model = 'location';
}


SPModelLocation.prototype.locationsList = function(r){
    if (typeof r != 'undefined' && r == true){
        spModel.location.get('locations', {}, function(response){
            sp.staff.raw.locations = response.data;
            sp.staff.data.locations = sp.map(response.data);
        });
    } else {
        return sp.staff.data.locations;
    }
}