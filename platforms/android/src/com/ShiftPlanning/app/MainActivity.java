/*
       Licensed to the Apache Software Foundation (ASF) under one
       or more contributor license agreements.  See the NOTICE file
       distributed with this work for additional information
       regarding copyright ownership.  The ASF licenses this file
       to you under the Apache License, Version 2.0 (the
       "License"); you may not use this file except in compliance
       with the License.  You may obtain a copy of the License at

         http://www.apache.org/licenses/LICENSE-2.0

       Unless required by applicable law or agreed to in writing,
       software distributed under the License is distributed on an
       "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
       KIND, either express or implied.  See the License for the
       specific language governing permissions and limitations
       under the License.
 */

package com.ShiftPlanning.app;

import android.app.AlertDialog;
import android.content.Context;
import android.content.DialogInterface;
import android.content.Intent;
import android.net.ConnectivityManager;
import android.net.NetworkInfo;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.view.Menu;
import android.view.MenuItem;
import android.webkit.JavascriptInterface;
import android.webkit.WebSettings;

import org.apache.cordova.*;

public class MainActivity extends CordovaActivity
{
	boolean checkingConnection = false;
	boolean onMsgHandled = false;
	boolean firstStart = true;
    @Override
    public void onCreate(Bundle savedInstanceState)
    {
        super.onCreate(savedInstanceState);
        // Set by <content src="index.html" /> in config.xml
        
        setIntegerProperty("loadUrlTimeoutValue", 260000);
    	setStringProperty("loadingDialog", "ShiftPlanning,Loading...");
        //super.setIntegerProperty("splashscreen", R.drawable.splash);

        //System.out.println("onCreate: firstStart == " + firstStart );
        if(firstStart == true ){
        	firstStart = false;
        }

        if( isNetworkAvailable() == false ){
            buildAlertMessageNoInternet();
        }else{
            continueLoading();
        }
        //loadUrl(launchUrl);
    }
    @Override
    public void onResume(){
    	firstStart = false;
    	super.onResume();
    }
    
    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        getMenuInflater().inflate(R.menu.activity_main, menu);
        return true;
    }
    
    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
		finish();
    	return true;
    }

    @Override
    public DroidGap onMessage(String arg0, Object arg1){
    	firstStart = false;
    	try{
            super.onMessage(arg0, arg1);
//            Log.p("onMessage => ARG0 => " + arg0);
//            Log.p("onMessage => ARG1 => " + arg1.toString());
            if( arg1.toString().contains("__token=") && arg0.equals("onPageStarted") ){
                //Log.p("arg1 => " + arg1);
                String tokenAndUID = arg1.toString().substring(arg1.toString().indexOf("token="));
                //Log.p("arg1 => tokenAndUID => " + tokenAndUID );
                loadUrl("file:///android_asset/www/index.html#" + tokenAndUID);

            }else {
                if (arg0.toString().equals("networkconnection") && arg1.toString().equals("none")) {
                    checkingConnection = true;
                    //System.out.println("OnMsg NoNet firstStart == " + firstStart );
                    //super.setStringProperty("loadingDialog", null);
                    //super.loadUrl("javascript:internetNo()");
                } else if (arg0.toString().equals("networkconnection") && !arg1.toString().equals("none")) {
                    if (checkingConnection == true) {
                        checkingConnection = false;
                        //System.out.println("OnMsg Net firstStart == " + firstStart );
                        //super.loadUrl("javascript:internetYeah()");
                    }
                }
            }
    	} catch(Exception e){

    	}
		return null;
    }

    private boolean isNetworkAvailable() {
        ConnectivityManager connectivityManager
                = (ConnectivityManager) getSystemService(Context.CONNECTIVITY_SERVICE);
        NetworkInfo activeNetworkInfo = connectivityManager.getActiveNetworkInfo();
        return activeNetworkInfo != null && activeNetworkInfo.isConnected();
    }

    public void continueLoading(){
        loadUrl(launchUrl);
        if( appView != null ){
            JsInterface jsInterface = new JsInterface();
            appView.addJavascriptInterface(jsInterface, "nativeInterface");
            super.appView.addJavascriptInterface(this, "nativeInterface");
            this.appView.addJavascriptInterface(this, "nativeInterface");

	        if(Build.VERSION.SDK_INT >= Build.VERSION_CODES.KITKAT) {
		        appView.setWebContentsDebuggingEnabled(true);
	        }
            appView.getSettings().setBuiltInZoomControls( false );
            appView.getSettings().setBuiltInZoomControls( false );
            appView.getSettings().setSupportZoom( false );
            appView.getSettings().setGeolocationEnabled( true );
            appView.getSettings().setLightTouchEnabled( true );
            appView.getSettings().setRenderPriority( WebSettings.RenderPriority.HIGH );
            appView.getSettings().setUserAgentString( appView.getSettings().getUserAgentString() + "; Android; PhoneGap" );
        }else{
            System.out.println("################ appView is NULL ");
        }
    }
//
//    @Override
//    public void onReceivedError(int errN, String desc, String errUrl){
//        System.out.print("onReceivedError => " + errN + " - " + desc + ", while loading => " + errUrl );
//    }

    private void buildAlertMessageNoInternet() {
        final AlertDialog.Builder builder = new AlertDialog.Builder(getContext());
        builder.setMessage("Your internet connection seem to be stalled. " +
                "If You are connected, but this dialog appears, please re-enable your internet, " +
                "close this ShiftPlanning application and run it again.")
                .setCancelable(false)
                .setPositiveButton("Check Again", new DialogInterface.OnClickListener() {
                    public void onClick(final DialogInterface dialog, final int id) {
                        if( isNetworkAvailable() == false ){
                            buildAlertMessageNoInternet();
                        }else{
                            continueLoading();
                        }
                    }
                })
                .setNegativeButton("Exit", new DialogInterface.OnClickListener() {
                    public void onClick(final DialogInterface dialog, final int id) {
                        finish();
                    }
                });
        final AlertDialog alert = builder.create();
        alert.show();
    }

    private class JsInterface{
        @JavascriptInterface
        public void openInDeviceBrowser(String url){
            Intent i = new Intent(Intent.ACTION_VIEW, Uri.parse(url));
            startActivity(i);
        }
    }
}
