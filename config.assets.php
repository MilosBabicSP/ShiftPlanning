<?php


// const _version_

$packer = array();

$packer['css'] = array(
	"mobile" => array(
		'css/add2home.css',
		'css/style.mobile.css',
		'css/style_12.mobile.css',
		'css/mobiscroll.css'
	)
);

$packer['js'] = array(
	'external' => array(
		'js/json2.js',
		'js/jquery/jquery-1.6.4.min.js',
		'js/jquery/jquery.timeago.js',
		'js/jquery/jquery.tmpl.js',
		'js/jquery/jquery.ba-hashchange.min.js',
		'js/jquery/jquery.contains.js',
		
		//for mobile device
		'js/plugins/mobiscroll.min.js',
		
		//plugins
		'js/schedule/date.js',
		'js/plugins/cookie.js',
		'js/plugins/sp.cache.js',
		'js/plugins/date.js',
		'js/schedule/date.extras.js',
		'js/plugins/objSort.js',
		'js/plugins/outerClick.js',
		'js/plugins/hammer.js',
		'js/plugins/jquery.hammer.js',
		'js/plugins/jquery.specialevent.hammer.js',
		'js/plugins/shorten.js'
	),
	
	'mobile' => array(
		//models
		'js/models/sp.schedule.model.js',
		'js/models/sp.requests.model.js',
		'js/models/sp.admin.model.js',
		'js/models/sp.messaging.model.js',
		'js/models/sp.timeclock.model.js',
		'js/models/sp.staff.model.js',
		'js/models/sp.payroll.model.js',
		'js/models/sp.location.model.js',
		'js/models/sp.training.model.js',
		
		
		//system
		'js/sp.common.js',
		'js/sp.model.js',
		'js/sp.view.js',
		'js/sp.ranges.js',
		
		//base
		'js/sp.staff.js',
		'js/sp.schedule.js',
		'js/sp.dashboard.js',
		'js/sp.timeclock.js',
		'js/sp.reports.js',
		'js/sp.requests.js',
		'js/sp.location.js',
		'js/sp.permissions.js',
		'js/sp.training.js',
		'js/sp.settings.js',
		
		//extension
		'js/sp.staff.mobile.js',
		'js/sp.dashboard.mobile.js',
		'js/sp.timeclock.mobile.js',
		'js/sp.reports.mobile.js',
		'js/sp.requests.mobile.js',
		'js/sp.schedule.mobile.js',
		'js/sp.permissions.mobile.js',
		'js/sp.training.mobile.js',
		'js/sp.settings.mobile.js',
		
		//loader
		'js/sp.common.mobile.js',
	)
	
	
);
//var_dump($packer);
$GLOBALS['packer_sets'] = $packer;