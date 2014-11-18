package com.ShiftPlanning.app.handler;

import android.content.Context;
import android.widget.RemoteViews;

import org.json.JSONObject;

public class SHandler {
	public JSONObject jobj = new JSONObject();
	public int arg0 = 0;
	public int arg1 = 0;
	public String arg2 = "";
    public Context context;
    public RemoteViews remoteViews;
	
	public SHandler(){
		jobj = new JSONObject();
		arg0 = 0;
		arg1 = 0;
		arg2 = "";
	}
	
	public void _process(Message result){
		
	}
}
