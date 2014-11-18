package com.ShiftPlanning.app.models;

import com.ShiftPlanning.app.GPSService;

import org.json.JSONObject;

/**
 * Created by
 * Stevica Trajanovic
 * stevica@shiftplanning.com
 * on 12/13/13.
 */
public class GPSLocation {
    public boolean isFromSatellite;
    public double mLatitude = 0;

    public double mLongitude = 0;
    public int mTimestamp;
    public double mAccuracy;
    public int mError = 0;

    public GPSLocation(){

    }

    public void setFromSatellite(boolean isFromSatellite) {
        this.isFromSatellite = isFromSatellite;
    }

    public void setLatitude(double mLatitude) {
        this.mLatitude = mLatitude;
    }

    public void setLongitude(double mLongitude) {
        this.mLongitude = mLongitude;
    }

    public void setTimestamp(int mTimestamp) {
        this.mTimestamp = mTimestamp;
    }

    public void setAccuracy(double mAccuracy) {
        this.mAccuracy = mAccuracy;
    }

    public JSONObject toJSONObject() {
        JSONObject result = new JSONObject();
        try{
            result.put("timestamp", mTimestamp );
            if( mError != 0 ) {
                result.put("is_invalid", 1);
                result.put("error_type", GPSService.GPS_ERROR);
            }else{
                result.put("latitude", mLatitude );
                result.put("longitude", mLongitude );
                result.put("accuracy", mAccuracy );
                result.put("isFromSatellite", isFromSatellite );
            }
        }catch (Exception e){}
        return result;
    }
}
