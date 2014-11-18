package com.ShiftPlanning.app;

import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Looper;

import com.ShiftPlanning.app.api.Responser;
import com.ShiftPlanning.app.handler.Message;
import com.ShiftPlanning.app.handler.SHandler;
import com.ShiftPlanning.app.models.GPSLocation;
import com.ShiftPlanning.app.utils.General;
import com.ShiftPlanning.app.utils.Utils;
import com.red_folder.phonegap.plugin.backgroundservice.BackgroundService;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.text.SimpleDateFormat;
import java.util.Date;

public class GPSService extends BackgroundService implements GPSController.GPSListeners {
	
	private final static String TAG = GPSService.class.getSimpleName();
	private GPSController mGPSController;
	private String mHelloTo = "SteewS.C.";
	private String mToken = "";
	private String mTimeClockID = "";

    public static final int INTERNET_ERROR = -1;
    public static final int GPS_ERROR = -2;
    public static final int GPS_DISABLED_ERROR = -3;

    private int mFailedRequestCounter = 0;
    public static JSONArray mPrevErrors;

    /** APP DATA */
    public static SharedPreferences settings;
    public static final String APP_PREFS = "SP_GPS_APP";
    public static final String APP_ERRS_KEY = "SP_GPS_ERRORS";
    public static final String APP_REQS_KEYS = "SP_GPS_DATA";

    final SHandler mHandler = new SHandler(){
        @Override
        public void _process(Message msg){
            JSONObject apiResponse = msg.obj;

            Log.p("TimeClock Update Event sent successfully => Response => " + apiResponse.toString() );
            String apiRStatus = getString(apiResponse, "status", "-1");
            if( apiRStatus.equals(String.valueOf( INTERNET_ERROR ) ) ){
                Log.p("Internet Connection Problem");
                /** Store request to DB and try to send later */
                storeFailedRequest(apiResponse);
            }else{
                if( !apiRStatus.equals("1") ){
                    mTimeClockID = "";
                    //mToken = "";
                    stopSelf();
                }else{
                    /** Error DATA has been sent
                     *  => Clean mPrevErrors array
                     */
                    errorsReset();
                }
            }
        }
    };
    public static Context mContext;

    @Override
	protected JSONObject doWork() {

        if( mGPSController == null ){
            mGPSController = new GPSController(getApplicationContext(), this);
        }
        mContext = getApplicationContext();

        new Thread(new Runnable() {
            @Override
            public void run() {
                Looper.prepare();
                mGPSController.getCurrentLocation();
                Looper.loop();
            }
        }).start();

		JSONObject result = new JSONObject();
		try {
			SimpleDateFormat df = new SimpleDateFormat("dd/MM/yyyy HH:mm:ss"); 
			String now = df.format(new Date(System.currentTimeMillis())); 

			String msg = "6666666663Hello " + this.mHelloTo + " AT " + now;
			result.put("Message", mTimeClockID);
//			Log.p(TAG + " => msg => " + msg);
//			Log.p(TAG + " => token => " + mToken );
//			Log.p(TAG + " => TimeClockID => " + mTimeClockID);
		} catch (JSONException e) {
		}

        settings = getSharedPreferences(APP_PREFS, 0);
        errorsGet();

		return result;	
	}

	@Override
	protected JSONObject getConfig() {
		JSONObject result = new JSONObject();
		
		try {
			result.put("sptoken", this.mToken);
			result.put("timeclockid", this.mTimeClockID);
			result.put("api_url", General.API_URL);
		} catch (JSONException e) {
		}
		
		return result;
	}

	@Override
	protected void setConfig(JSONObject config) {
        Log.p(TAG + " => setConfig => " + config.toString() );
        this.mToken = getString(config, "sptoken", "0");
        this.mTimeClockID = getString(config, "timeclockid", "0");
        String apiUrl = getString(config, "api_url", "0");
        if( !apiUrl.equals("0") ) {
            Log.p("API URL CHANGED TO => " + apiUrl );
            General.API_URL = apiUrl;
        }else{
            Log.p("API URL STAYS THE SAME");
        }
	}

	@Override
	protected JSONObject initialiseLatestResult() {
		return null;
	}

	@Override
	protected void onTimerEnabled() {
		Log.p("onTimerEnabled");
	}

	@Override
	protected void onTimerDisabled() {

	}

    private String getString(JSONObject mObj, String mKey, String mDefaultValue){
        String result = mDefaultValue;
        try{
            if( mObj.has(mKey) ){
                if( !mObj.isNull(mKey) ){
                    result = mObj.getString(mKey);
                }
            }
        }catch ( Exception e ){}
        return result;
    }

    public void sendData(GPSLocation location){
        try {
            JSONObject js1 = new JSONObject();
            JSONObject jsonObject = new JSONObject();
            JSONObject gpsData = location.toJSONObject();
            if( location.mError != 0 ) {
                mPrevErrors.put(gpsData);
            }
            if( mPrevErrors != null && mPrevErrors.length() > 0 ){
                gpsData.put("error", mPrevErrors);
            }

            try {
                js1.put("module", "timeclock.event");
                js1.put("method", "UPDATE");
                js1.put("timeclock", mTimeClockID );
                js1.put("type", "gps" );
                js1.put("gps", gpsData.toString());

                jsonObject.put("token", mToken );
                jsonObject.put("request", js1);
                jsonObject.put("output", "json");
            } catch(Exception err){
                Log.p("###ERR => TimeClock -> Create Event object: " + err.getMessage());
            }
            Log.p("sendData => " + jsonObject.toString() );
            new Responser( mHandler, jsonObject, 1 ).start();
        } catch (Exception e) {
            Log.p("###ERR => TimeClock -> Create Event: " + e.getMessage());
            e.printStackTrace();
        }
    }

    /**
     * This is called when GPS data is gathered.
     *
     * @param location - GPSLocation Object
     */
    @Override
    public void onDataCollected(final GPSLocation location) {
        Log.p("BG Service => onDataCollected => " + location.toJSONObject().toString() );
        requestsPut(location.toJSONObject().toString());
        new Thread(new Runnable() {
            @Override
            public void run() {
                Looper.prepare();

                if( !mToken.equals("") && !mTimeClockID.equals("") ){
                    sendData(location);
                }else{
                    Log.p(TAG + " => Token => " + mToken + ", tcID => " + mTimeClockID );
                }

//                Toast toaster = Toast.makeText(getApplicationContext(), "GPS Collected => " + location.toJSONObject().toString(), 3000);
//                toaster.setGravity(Gravity.CENTER_VERTICAL, 0, 0);
//                toaster.show();

                Looper.loop();
            }
        }).start();
    }

    /**
     * This is called when GPS data gathering has started
     */
    @Override
    public void onStartCollecting() {
        Log.p("BG Service => onStartCollecting" );
    }

    /**
     * This is called when GPS Services is not enabled
     */
    @Override
    public void onGPSDisabled() {
        Log.p("BG Service => onGPSDisabled !!!!" );
        storeGSPDisabledRequest();
        buildAlertMessageNoGps();
    }

    private void buildAlertMessageNoGps() {
        Intent i = new Intent(getApplicationContext(), TurnGPSOn.class);
        i.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
        startActivity(i);
    }

    private void storeFailedRequest(JSONObject req){
        try {
            errorsGet();
            mPrevErrors.put(req.getJSONObject("error"));
            errorsPut(mPrevErrors.toString());
            requestsPut(req.toString());
        }catch (Exception e){

        }
    }

    private void storeGSPDisabledRequest(){
        try {
            errorsGet();
            JSONObject req = new JSONObject();
            req.put("timestamp", Utils.getTime() );
            req.put("error_type", GPS_DISABLED_ERROR );
            mPrevErrors.put(req);
            errorsPut(mPrevErrors.toString());
            requestsPut(req.toString());
        }catch (Exception e){

        }
    }

    public static void errorsReset(){
        Log.p("SP => errorsReset => ");
        settings.edit().remove(APP_ERRS_KEY).commit();
//        settings.edit().clear().commit();
        mPrevErrors = new JSONArray();
    }

    public static String errorsGet(){
        if( mPrevErrors == null ){
            try {
                String tmpPrev = settings.getString(APP_ERRS_KEY, "");
                if(!tmpPrev.equals("") ) {
                    mPrevErrors = new JSONArray(tmpPrev);
                }else{
                    mPrevErrors = new JSONArray();
                }
            } catch (JSONException e) {
                mPrevErrors = new JSONArray();
                e.printStackTrace();
            }
        }
        return settings.getString(APP_ERRS_KEY, "");
    }

    public static void errorsPut(String errArray){
        Log.p("errorsPut => newErrors => " + errArray );
        settings.edit().putString(APP_ERRS_KEY, errArray ).commit();
    }

    public static void requestsPut(String nRequest){
        /*
        settings = mContext.getSharedPreferences(APP_PREFS, 0);
        String prevReqs = settings.getString(APP_REQS_KEYS, "");
        Log.p("SP => ENTER REQ PUT nReq => " + nRequest );
        Log.p("SP => ENTER REQ PUT PrevReqs => " + prevReqs );
        JSONArray allReqs = new JSONArray();
        if( !prevReqs.equals("") ){
            try {
                allReqs = new JSONArray(prevReqs);
            } catch (JSONException e) {
                e.printStackTrace();
            }
        }
        allReqs.put(nRequest);
        settings.edit().putString(APP_REQS_KEYS, allReqs.toString() ).commit();
        Log.p("SP => ALL REQUESTS => " + allReqs.toString() );
        */
    }


}
