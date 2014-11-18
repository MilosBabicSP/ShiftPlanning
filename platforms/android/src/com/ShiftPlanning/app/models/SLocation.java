package com.ShiftPlanning.app.models;

import android.content.Context;
import android.location.Location;
import android.location.LocationListener;
import android.location.LocationManager;
import android.os.Bundle;

import com.ShiftPlanning.app.Log;

import java.util.Timer;
import java.util.TimerTask;

/**
 * Created by
 * Stevica Trajanovic
 * stevica@shiftplanning.com
 * on 12/13/13.
 */
public class SLocation {
//    Timer timer1;
    LocationManager lm;
    SLocationResult locationResult;
    boolean gps_enabled=false;
    boolean network_enabled=false;
    private Location mLastLocation;
    private int mLocationCounter = 0;

    final int GPS_TIMER = 20000;

    LocationListener locationListenerGps = new LocationListener() {
        public void onLocationChanged(Location location) {
            Log.p("SP => locListenerGps => acc => " + location.getAccuracy() + ", timestamp => " + location.getTime() );
            if( mLastLocation == null ){
                mLastLocation = location;
                locationResult.gotLocation(location, true);
                lm.removeUpdates(this);
            }else {
                Log.p("SP => locListenerGps => acc => " + location.getAccuracy() + ", timestamp => " + location.getTime() + " - LAST LOCATION ");
                if( mLastLocation.getTime() < location.getTime()  ) {
//            timer1.cancel();
                    locationResult.gotLocation(location, true);
                    lm.removeUpdates(this);
                }else{
                    if( mLocationCounter <= 0 ){
                        /** FAILED to get Fresh Coordinates */
                        locationResult.gotLocation(null, false);
                        lm.removeUpdates(this);
                    }else{
                        mLocationCounter--;
                    }
                }
                //lm.removeUpdates(locationListenerNetwork);
            }
        }
        public void onProviderDisabled(String provider) {}
        public void onProviderEnabled(String provider) {}
        public void onStatusChanged(String provider, int status, Bundle extras) {}
    };

    LocationListener locationListenerNetwork = new LocationListener() {
        public void onLocationChanged(Location location) {
            Log.p("SP => locationListenerNetwork => acc => " + location.getAccuracy() + ", timestamp => " + location.getTime() );
//            timer1.cancel();
            locationResult.gotLocation(location, false);
            lm.removeUpdates(this);
            lm.removeUpdates(locationListenerGps);
        }
        public void onProviderDisabled(String provider) {}
        public void onProviderEnabled(String provider) {}
        public void onStatusChanged(String provider, int status, Bundle extras) {}
    };

    public boolean getLocation(Context context, SLocationResult result)
    {
        //I use LocationResult callback class to pass location value from SLocation to user code.
        locationResult=result;
        mLocationCounter = 5;
        if(lm==null){
            lm = (LocationManager) context.getSystemService(Context.LOCATION_SERVICE);
        }

        //exceptions will be thrown if provider is not permitted.
        try{
            gps_enabled=lm.isProviderEnabled(LocationManager.GPS_PROVIDER);
        }catch(Exception ex){
            ex.printStackTrace();
        }
//
//        try{
//            network_enabled=lm.isProviderEnabled(LocationManager.NETWORK_PROVIDER);
//        }catch(Exception ex){
//            ex.printStackTrace();
//        }

        //don't start listeners if no provider is enabled
        if(!gps_enabled){
            return false;
        }

        if(gps_enabled){
            lm.requestLocationUpdates(LocationManager.GPS_PROVIDER, 0, 1, locationListenerGps);
        }
//        else {
//            if (network_enabled) {
//                lm.requestLocationUpdates(LocationManager.NETWORK_PROVIDER, 500, 0, locationListenerNetwork);
//            }
//        }

//        timer1=new Timer();
//        timer1.schedule( new GetLastLocation(), GPS_TIMER );
        return true;
    }
//
//
//    class GetLastLocation extends TimerTask {
//        @Override
//        public void run() {
//            Log.p("SP => GetLastLocation => gps_enabled => " + gps_enabled + ", network_enabled => " + network_enabled );
//            lm.removeUpdates(locationListenerGps);
//            //lm.removeUpdates(locationListenerNetwork);
//
//            Location net_loc=null, gps_loc=null;
//            if(gps_enabled)
//                gps_loc=lm.getLastKnownLocation(LocationManager.GPS_PROVIDER);
//            if(network_enabled)
//                net_loc=lm.getLastKnownLocation(LocationManager.NETWORK_PROVIDER);
//
//            //if there are both values use the latest one
//            if(gps_loc!=null && net_loc!=null){
//                Log.p("SP => GetLastLocation BOTH AVAILABLE => gps_loc.time => " + gps_loc.getTime() );
//                Log.p("SP => GetLastLocation BOTH AVAILABLE => net_loc.time => " + net_loc.getTime() );
//
//                if(gps_loc.getTime()>net_loc.getTime())
//                    locationResult.gotLocation( gps_loc, true );
//                else
//                    locationResult.gotLocation( net_loc, false );
//                return;
//            }
//
//            if(gps_loc!=null){
//                Log.p("SP => GetLastLocation => gps_loc.time => " + gps_loc.getTime() );
//                locationResult.gotLocation( gps_loc, true );
//                return;
//            }
//            if(net_loc!=null){
//                Log.p("SP => GetLastLocation => net_loc.time => " + net_loc.getTime() );
//                locationResult.gotLocation( net_loc, false );
//                return;
//            }
//            locationResult.gotLocation(null, false);
//        }
//    }
}
