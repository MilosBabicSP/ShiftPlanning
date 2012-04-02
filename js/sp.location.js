function ShiftPlanningLocation(){
    this.initialize();
    return true;
}

ShiftPlanningLocation.prototype = {
    data: {},
    raw: {},
    initialize: function(){
        $(document).ready(function(){
            $('#wrapper').delegate('select.locations', 'change', function(){
                var obj = $(this);
                if ($(this).val() == 'add'){
                    var loc = prompt ("Enter location name.","");
                    if (loc != null){
                        spModel.location.create('location', {name : loc, type : $(this).find('option:last').attr('type')}, function(response){
                            obj.find('optgroup:first').append('<option val="' + response.data.id + '">' + response.data.name + '</option>');
                            obj.val(obj.find('optgroup:first option:last').val());
                            spModel.location.locationsList(true);
                        });
                    }
                }
            });
        });
    }
    
}

