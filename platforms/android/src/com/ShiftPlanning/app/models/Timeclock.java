package com.ShiftPlanning.app.models;

import com.ShiftPlanning.app.Log;

import org.json.JSONObject;

/**
 * Created by Steewsc on 26.5.13..
 */
public class Timeclock {
    public JSONObject lastResponse;
    public final int IN_TIMESTAMP = 0;
    public final int IN_TIMESTAMP_HUMAN = 1;
    public final int IN_TIME = 2;
    public final int IN_DATE = 3;

    private boolean timeClockStatus = false;
    public String[] in_timestamp = new String[4];
    public String currentLength = "";

    public Timeclock(){
        lastResponse = new JSONObject();
        timeClockStatus = false;
    }

    public void init(JSONObject newState){
        try{
            this.lastResponse = newState.getJSONObject("data");
            Log.p("**********TIME CLOCK ***************");
            Log.p(this.lastResponse.toString());
            Log.p("**********TIME CLOCK ***************");

            if( this.lastResponse.isNull("end_timestamp") ){
                this.timeClockStatus = true;
                this.in_timestamp[IN_TIMESTAMP] = this.lastResponse.getString("in_timestamp");
                this.in_timestamp[IN_TIMESTAMP_HUMAN] = this.lastResponse.getJSONObject("in_time").getString("timestamp");
                this.in_timestamp[IN_TIME] = this.lastResponse.getJSONObject("in_time").getString("time");
                this.in_timestamp[IN_DATE] = this.lastResponse.getJSONObject("in_time").getString("day");
                this.currentLength = this.lastResponse.getJSONObject("current_length").getString("hours") + "h " + this.lastResponse.getJSONObject("current_length").getString("mins") + "mins";
            }else{
                this.timeClockStatus = false;
            }

        }catch (Exception e){
            this.timeClockStatus = false;
        }
    }

    public boolean isClockedIn(){
        return this.timeClockStatus;
    }

    /**
     * @param whatTime - (int) Use some of that timeclock constants like IN_TIMESTAMP, IN_TIMESTAMP_HUMAN, IN_TIMESTAMP_TIME or IN_TIMESTAMP_DATE
     * @return String
     */
    public String getInTime(int whatTime){
        return this.in_timestamp[whatTime];
    }
}
