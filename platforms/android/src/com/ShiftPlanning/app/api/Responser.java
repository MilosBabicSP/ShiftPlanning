package com.ShiftPlanning.app.api;

import com.ShiftPlanning.app.GPSService;
import com.ShiftPlanning.app.Log;
import com.ShiftPlanning.app.handler.Message;
import com.ShiftPlanning.app.handler.SHandler;
import com.ShiftPlanning.app.utils.General;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.DataOutputStream;
import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLConnection;
import java.util.Hashtable;

public class Responser extends Thread{
	SHandler mHandler;
	Message msg;
	public JSONObject requestData = new JSONObject();
	private int ConnectionTryTimes = 0;

	public Responser(SHandler h, JSONObject data, int funcID) {
		this.msg = new Message();
		this.mHandler = h;
		this.msg.arg1 = funcID;
		this.requestData = data;
		ConnectionTryTimes = 5;
	}
	
	public void run(){
		try{
	        JSONObject obj = new JSONObject();
			Hashtable<String, String> ht = new Hashtable<String, String>();

	    	if( this.requestData.has( "request" ) ){
	    		ht.put( "data", this.requestData.toString() );
	    	}else{
				obj.put( "request", this.requestData );
	            ht.put( "data", obj.toString() );
	    	}
			
			String temp = ht.toString();
	        temp = temp.substring( 1, temp.length() - 1 );
			Log.p("SP => Sending Data to => " + General.API_URL);
			URL url = new URL( General.API_URL );
	        URLConnection connection = url.openConnection();
	        HttpURLConnection httppost = ( HttpURLConnection ) connection;
		        httppost.setDoInput(true);
		        httppost.setDoOutput(true);
		        httppost.setRequestMethod( "POST" );
		        httppost.setRequestProperty( "User-Agent", "Tranz-Version-t1.914" );
		        httppost.setRequestProperty( "Accept_Language", "en-US" );
		        httppost.setRequestProperty( "Content-Type", "application/x-www-form-urlencoded" );
	        DataOutputStream dos = new DataOutputStream( httppost.getOutputStream() );
	        dos.write( temp.getBytes() );

	        String reply;
	        InputStream in = httppost.getInputStream();
	        StringBuffer sb = new StringBuffer();
	        try {
	            int chr;
	            while ((chr = in.read()) != -1) {
	                sb.append((char) chr);
	            }
	            reply = sb.toString();
	        } finally {
	            in.close();
	        }
            Log.p("reply -> " + reply );
			try {
				this.msg.obj = new JSONObject(reply);
			} catch (Exception e) {
				JSONObject arr = new JSONObject();
				try {
					arr.put("data", new JSONArray(reply) );
				} catch (JSONException e1) {
					try {
						arr.put("data", new JSONArray() );
					} catch (JSONException e2) {
						e2.printStackTrace();
					}
				}
				this.msg.obj = arr;
			}
	        mHandler._process( this.msg );
		} catch(Exception nErr){
			Log.p("Responser: run(): " + nErr.getMessage());
			ConnectionTryTimes--;
			Log.p(" Connection problem: Trying again for " + ConnectionTryTimes + " times more.");

            /** Wait for a half a second a try again */
            try {
                Thread.currentThread().sleep(2000);
            } catch (Exception ie) {

            }
            if( ConnectionTryTimes >= 0 ){
			    this.run();
            }else{
                JSONObject result = new JSONObject();
                try {
                    JSONObject errData = new JSONObject();
                    errData.put("timestamp", System.currentTimeMillis()/1000 );
                    errData.put("error_type", GPSService.INTERNET_ERROR );

                    result.put("status", GPSService.INTERNET_ERROR );
                    result.put("error", errData);
                } catch (JSONException e) {
                    e.printStackTrace();
                }
                this.msg.obj = result;
                mHandler._process( this.msg );
            }
		}
	}
}
