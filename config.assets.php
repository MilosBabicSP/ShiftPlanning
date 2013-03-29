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
		'js/jquery/jquery-1.6.4.min.js',
		'js/jquery/jquery-ui.js',
		'js/jquery/jquery.ba-hashchange.min.js',
		'js/jquery/jquery.contains.js',
		'js/jquery/jquery.mobile-1.0.js',
		'js/jquery/jquery.timeago.js',
		'js/jquery/jquery.tmpl.js',
		'js/jquery/jquery.toggleText.js',
		'js/plugins/add2home.js',
		'js/plugins/cookie.js',
		'js/plugins/date.js',
		'js/plugins/hammer.js',
		'js/plugins/hash.js',
		'js/plugins/jquery.hammer.js',
		'js/plugins/jquery.specialevent.hammer.js',
		'js/plugins/mobiscroll.js',
		'js/plugins/objSort.js',
		'js/plugins/outerClick.js',
		'js/plugins/shorten.js',
		'js/plugins/sp.cache.js',
	),
	
	'mobile' => array(
		'js/models/sp.admin.model.js',
		'js/models/sp.location.model.js',
		'js/models/sp.messaging.model.js',
		'js/models/sp.payroll.model.js',
		'js/models/sp.requests.model.js',
		'js/models/sp.schedule.model.js',
		'js/models/sp.staff.model.js',
		'js/models/sp.timeclock.model.js',
		'js/models/sp.training.model.js',
		'js/schedule/date.extras.js',
		'js/schedule/date.js',
		'js/sp.admin.js',
		'js/sp.common.js',
		'js/sp.common.mobile.js',
		'js/sp.common.mobile.gap.js',
		'js/sp.dashboard.js',
		'js/sp.dashboard.mobile.js',
		'js/sp.location.js',
		'js/sp.logout.js',
		'js/sp.messaging.js',
		'js/sp.modal.js',
		'js/sp.model.js',
		'js/sp.permissions.js',
		'js/sp.permissions.mobile.js',
		'js/sp.ranges.js',
		'js/sp.reports.js',
		'js/sp.reports.mobile.js',
		'js/sp.requests.js',
		'js/sp.requests.mobile.js',
		'js/sp.schedule.js',
		'js/sp.schedule.mobile.js',
		'js/sp.settings.js',
		'js/sp.settings.mobile.js',
		'js/sp.shift.js',
		'js/sp.staff.js',
		'js/sp.staff.mobile.js',
		'js/sp.timeclock.js',
		'js/sp.timeclock.mobile.js',
		'js/sp.training.js',
		'js/sp.training.mobile.js',
		'js/sp.user.js',
		'js/sp.view.js'
	)
	
	
);
//var_dump($packer);
$GLOBALS['packer_sets'] = $packer;