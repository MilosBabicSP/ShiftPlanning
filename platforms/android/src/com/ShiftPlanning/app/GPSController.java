package com.ShiftPlanning.app;

import android.content.Context;
import android.location.Location;
import android.location.LocationManager;

import com.ShiftPlanning.app.handler.Message;
import com.ShiftPlanning.app.handler.SHandler;
import com.ShiftPlanning.app.models.GPSLocation;
import com.ShiftPlanning.app.models.SLocation;
import com.ShiftPlanning.app.models.SLocationResult;
import com.ShiftPlanning.app.utils.Utils;

import java.util.HashMap;

/**
 * Created by
 * Stevica Trajanovic
 * stevica@shiftplanning.com
 * on 12/13/13.
 */
public class GPSController {

    public interface GPSListeners{
        /**
         * This is called when GPS data is gathered.
         * @param location - GPSLocation Object
         */
        public void onDataCollected( GPSLocation location );

        /**
         * This is called when GPS data gathering has started
         */
        public void onStartCollecting();

        /**
         * This is called when GPS Services is not enabled
         */
        public void onGPSDisabled();
    }

    private LocationManager gpsManager;
    private boolean isGPSReady;

    private double mLatitude = 0;
    private double mLongitude = 0;
    private SLocation mLocation;
    public HashMap<Boolean, GPSLocation> mLocations;
    private GPSListeners mListener;

    private Context mContext;

    public final SHandler mHandler = new SHandler(){
        @Override
        public void _process(Message msg){

        }
    };

    SLocationResult locationResult = new SLocationResult(){
        @Override
        public void gotLocation(Location location, boolean isFromSatellite){
            GPSLocation gpsLocation = prepareGPSData(location);
            if( location != null ){
                int newLocTime = new Long(location.getTime()/1000).intValue();
                int preLocTime = mLocations.get(isFromSatellite).mTimestamp;

                Log.p("SP => GOT Location => " + newLocTime );
                Log.p("SP => GOT Location => " + preLocTime + " <= LAST SAVED " );
                if( newLocTime <= preLocTime ){
                    Log.p("SP => GOT Location => using the same OLD data");
                }else{
                    Log.p("SP => GOT Location => using the FRESH NEW DATA");
                }
                mLocations.put( isFromSatellite, gpsLocation );
            }
            if( mListener != null ){
                mListener.onDataCollected( gpsLocation );
            }
        }
    };

    public GPSController(Context ctx, GPSListeners gpsListener){
        mContext = ctx;
        mListener = gpsListener;
        gpsManager = (LocationManager) mContext.getSystemService(Context.LOCATION_SERVICE);
        mLocations = new HashMap<Boolean, GPSLocation>(2);
        mLocations.put( true, new GPSLocation() );
        mLocations.put( false, new GPSLocation() );
     }

    /**
     * Checks if GPS services are enabled.
     * @return Boolean - If GPS services are disabled it returns FALSE,<br>
     *     Otherwise, it returns TRUE.
     */
    public boolean isGPSOn(){
        boolean result = true;
        if ( gpsManager.isProviderEnabled( LocationManager.GPS_PROVIDER ) == false ) {
            result = false;
        }else{
            isGPSReady = true;
        }
        return result;
    }

    /**
     * Checks if GPS services are enabled and starts looking for current GPS location<br>
     * @return Boolean - If GPS services are disabled it returns FALSE,<br>
     *          and onGPSDisabled() will be called.<br>
     *          Otherwise, it will return TRUE<br>
     *          and it will continue to search for GPS Data,<br>
     *          which will be returned through onDataCollected().
     */
    public boolean getCurrentLocation(){
        boolean result;
        mLocation = new SLocation();
        isGPSReady = mLocation.getLocation(mContext, locationResult);
        result = isGPSReady;
        if( !isGPSReady ){
            if( mListener != null ){
                mListener.onGPSDisabled();
            }
        }else{
            if( mListener != null ){
                mListener.onStartCollecting();
            }
        }
        return result;
    }

    private GPSLocation prepareGPSData(Location location){
        GPSLocation gpsLocation = new GPSLocation();
        double mLng = 0;
        double mLtd = 0;
        double mAcc = 0;
        int mTimeStamp = Utils.getTime();

        if( location != null){
            mLatitude = location.getLatitude();
            mLongitude = location.getLongitude();
            mLng = location.getLongitude();
            mLtd = location.getLatitude();
            mAcc = location.getAccuracy();
            mTimeStamp = new Long(location.getTime() / 1000).intValue();
            gpsLocation.mError = 0;
        }else{
            gpsLocation.mError = GPSService.GPS_ERROR;
        }

        gpsLocation.setLatitude( mLtd );
        gpsLocation.setLongitude(mLng);
        gpsLocation.setAccuracy(mAcc);
        gpsLocation.setTimestamp(mTimeStamp);
        return gpsLocation;
    }

    /**
     * Alert Dialog that GPS is not Enabled
     *
     private void buildAlertMessageNoGps() {
         final AlertDialog.Builder builder = new AlertDialog.Builder(this);
         builder.setMessage("Your GPS seems to be disabled, do you want to enable it?")
         .setCancelable(false)
         .setPositiveButton("Yes", new DialogInterface.OnClickListener() {
         public void onClick(final DialogInterface dialog, final int id) {
         startActivity(new Intent(android.provider.Settings.ACTION_LOCATION_SOURCE_SETTINGS));
         }
         })
         .setNegativeButton("No", new DialogInterface.OnClickListener() {
         public void onClick(final DialogInterface dialog, final int id) {
         useGPS = false;
         dialog.cancel();
         }
         });
         final AlertDialog alert = builder.create();
         alert.show();
     }
     */
}
