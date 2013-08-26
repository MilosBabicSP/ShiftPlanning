<?php
require_once('config.php');
$site_url = substr(API_URL, 0, strpos(API_URL, 'api/'));

$url = $site_url . $_REQUEST['file'];

$ch = curl_init($url);
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);

$response = curl_exec($ch);


curl_close($ch);

echo $response;
	

