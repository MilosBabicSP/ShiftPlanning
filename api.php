<?php
require_once('config.php');
function getip(){

	if (isset($_SERVER["HTTP_X_FORWARDED_FOR"])) {
		$ip = $_SERVER["HTTP_X_FORWARDED_FOR"];
	} else {
		if (isset($_SERVER["HTTP_CLIENT_IP"])) {
			$ip = $_SERVER["HTTP_CLIENT_IP"];
		} else {
			$ip = $_SERVER["REMOTE_ADDR"];
		}
	}
	$tmp = explode(',', $ip);
	if(_http_ == 'https'){
		array_pop($tmp);
	}
	return array_pop($tmp);

	#return isset($_SERVER['HTTP_X_FORWARDED_FOR']) ? $_SERVER['HTTP_X_FORWARDED_FOR'] : $_SERVER['REMOTE_ADDR'];

}
function _iapi($request_vars, $output='json', $dataOnly = false, $multi = false) { # array, json
    //$request = $request_vars;
    $request['key'] = API_KEY;
    $request['token'] = ($_SESSION['api']['token'] ? $_SESSION['api']['token'] : '');

    // Fix for this issue - https://shiftplanning.atlassian.net/browse/TAB-4
    if(isset($request['token']) && is_array($request['token']) && isset($request['token']['token'])){
        $request['token'] = $request['token']['token'];
    }
    
    if( ( isset( $request_vars['data']['token'] ) || isset( $request_vars['token'] ) ) && $request['token'] == '' ){
        //die('uso je');
        $request['token'] = ( isset( $request_vars['data']['token'] ) ) ? $request_vars['data']['token'] : $request_vars['token'];
        $_SESSION['api']['token'] = $request['token'];
        //unset($request_vars['data']['token']);
        //unset($request_vars['token']);
    }
    
    $request['output'] = 'json';
    if($multi){
        if (get_magic_quotes_gpc()) {
            $request_vars['data'] = stripslashes($request_vars['data']);
        }
        $request['request'] = json_decode($request_vars['data'],true);
    } else {
        $request['request'] = $request_vars;
        $request['module'] = $request_vars['module'];
    }

    $ch = curl_init(API_URL);
    curl_setopt($ch, CURLOPT_URL, API_URL);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
	curl_setopt($ch, CURLOPT_HTTPHEADER, array('REMOTE_ADDR: '.getip(), 'X_FORWARDED_FOR: '.getip()));
    curl_setopt($ch, CURLOPT_POST, 1);
    curl_setopt($ch, CURLOPT_POSTFIELDS, 'data='.urlencode(json_encode($request)));

    //var_dump($request);
    $response = curl_exec($ch);
    
    
    curl_close($ch);
    
    
//    if ($request['request']['mode'] == 'openapproval') {
//        print_r($request);
//        print $response;
//    }
        
    
    //Set token, maybe there is some more efficient way to do this
    $decoded = json_decode($response,true);
    
    if (DEBUGGER){
        if ($decoded == null){
            header('HTTP/1.1 500 Internal Server Error');
            var_dump($response);
            die('error');
        }
    }
    if(!$multi){
        if(isset($decoded['token']) && $_POST['module'] == 'staff.login'){
            $_SESSION['api']['token'] = $decoded['token'];
			$_SESSION['user']['employee']['id'] = $decoded['data']['employee']['id'];
			$_SESSION['user']['employee']['name'] = $decoded['data']['employee']['name'];
			$_SESSION['user']['business']['name'] = $decoded['data']['business']['name'];
			$_SESSION['user']['business']['phone'] = $decoded['data']['business']['phone'];
        }

        if($_POST['module'] == 'staff.logout' || $request_vars['module'] == 'staff.logout'){
            session_destroy();
        }
    } else {
        foreach($decoded as $key => $value){
            $decoded[$key]['module'] = $request['request'][$key]['module'];
            $decoded[$key]['method'] = $request['request'][$key]['method'];
        }
        //loop here and take only data
        $dataOnly = false;
    }
    
# OUTPUT
    if ($output == 'array') {
        if($dataOnly){
            return $decoded['data'];
        } else {
            return $decoded;
        }
    } else {
        if($dataOnly){
            return json_encode($decoded['data']);
        } else {
            return json_encode($decoded);
        }
    }
}

if($_POST['module']){
    # SPILL JSON FROM API
    header('Content-type: application/json');
    echo _iapi($_POST);
} else if($_POST['multi']){
    # SPILL JSON FROM API
    header('Content-type: application/json');
    echo _iapi($_POST,'json',false,true);
} else if(!empty($_GET) && $_GET['module'] == 'admin.file'){
	if($_GET['content']=='1'){
		$data = json_decode(_iapi($_GET),true);
		$return = base64_decode($data['data']['content']);
		if(!$return){
			echo 'failed to retrieve content ';
			return false;
		}
		$file = str_replace($data['data']['extension'],  strtoupper($data['data']['extension']), $data['data']['filename']);  
                header("Pragma: public");
                header("Expires: 0");
                header("Cache-Control: must-revalidate, post-check=0, pre-check=0");
                header("Cache-Control: public");
                header("Content-Description: File Transfer");
                header('Content-Type: application/octet-stream');
                header('Content-Disposition: attachment; filename="'.$file.'"');
                header("Content-Length: " . $data['data']['file_size']);

		echo $return;
	}else{
		header('Content-type: application/json');
		echo _iapi($_GET);	
	}
}
