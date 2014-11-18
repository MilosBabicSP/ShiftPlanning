package com.ShiftPlanning.app.utils;

public class General {

	/**
	 * API URL settings
	 */
    // TODO: REPLACE API endpoint to LIVE
	public static String API_URL = "http://www.shiftplanning.com/api/";
//	public static String API_URL = "http://www.sp1012-s.dev.shiftplanning.com/api/";
	public static String API_KEY = "1b1933e7e0a9fdeca1be7801ada2e04ad1719454";
	
	/**
	 * RESPONSE TYPES
	 */
	public static final int RS_TYPE_LOGIN = 0;
	public static final int RS_TYPE_LOGOUT = 1;
	public static final int RS_TYPE_NETWORKS_NOTIFS = 3;

	public static final int RS_TYPE_TIMECLOCK_STATUS = 30;
	public static final int RS_TYPE_TIMECLOCK_CLOCK_IN = 31;
	public static final int RS_TYPE_TIMECLOCK_CLOCK_OUT = 32;

	public static final int TIME_FORMAT_12 = 0;
	public static final int TIME_FORMAT_24 = 1;

}
