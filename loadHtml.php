<?php
require_once('config.php');
	
$url = API_URL.$_REQUEST['file'];

$ch = curl_init($url);
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);

$response = curl_exec($ch);


curl_close($ch);

echo $response;
	

