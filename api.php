<?php
require_once('config.php');
function _iapi($request_vars, $output='json', $dataOnly = false, $multi = false) { # array, json
    //$request = $request_vars;
    $request['key'] = API_KEY;
    $request['token'] = ($_SESSION['api']['token'] ? $_SESSION['api']['token'] : '');
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
    //var_dump($request);
    $ch = curl_init(API_URL);
    curl_setopt($ch, CURLOPT_URL, API_URL);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_POST, 1);
    curl_setopt($ch, CURLOPT_POSTFIELDS, 'data='.json_encode($request));

    //var_dump($request);
    $response = curl_exec($ch);
    
    curl_close($ch);
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
            $_SESSION['user'] = $decoded['data'];
        }

        if(isset($_POST['module']) && $_POST['module'] == 'staff.logout'){
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

if(isset($_POST['module']) && $_POST['module']){
    # SPILL JSON FROM API
    header('Content-type: application/json');
    echo _iapi($_POST);
} else if(isset($_POST['multi']) && $_POST['multi']){
    # SPILL JSON FROM API
    header('Content-type: application/json');
    echo _iapi($_POST,'json',false,true);
} 
