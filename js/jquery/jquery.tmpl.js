(function( jQuery, undefined ){
	jQuery.fn.extend({
		tmpl: function( data, options, parentItem ) {
                        console.log('test');
			return jQuery.tmpl( this[0], data, options, parentItem );
		}
	});
	jQuery.extend({
		tmpl: function( tmpl, data, options, parentItem ) {
			console.log(tmpl);
		}
	});
})( jQuery );
