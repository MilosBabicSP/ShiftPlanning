<?php
require_once('config.php');
require_once(_root_.'api/api.php');
require_once(_root_.'api/config.php');

function _iapi($request, $output='json', $dataOnly = false) { # array, json
    global $api_status, $api_config;

    # SETUP/FORMAT REQUEST
    
    # CALL API
    ob_start();
    $api = new api(json_encode($request), true);
    $error = ob_get_contents();
    ob_end_clean();
    
    

    # CATCH PERMISSIONS ERROR
    $api->response = $api->response ? $api->response : $error;
    
    //Set token, maybe there is some more efficient way to do this
    return $api->response;
    

    
    
}
if($_POST['module'] && $_POST['module'] == 'vtoken'){
    $api = new api(null, null, true);
    
    echo intval($api->_vtoken($_POST['token']));
    die();
}
# CALL API
if($_POST['module']){
    # SPILL JSON FROM API
    header('Content-type: application/json');
    echo _iapi($_POST);
} else if($_POST['multi']){
    # SPILL JSON FROM API
    header('Content-type: application/json');
    echo _iapi(json_decode(stripslashes($_POST['data']),true));
}