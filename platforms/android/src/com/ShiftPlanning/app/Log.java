package com.ShiftPlanning.app;

import java.util.HashMap;

/**
 * Created by
 * Stevica Trajanovic
 * stevica@shiftplanning.com
 * on 9/26/13.
 */
public class Log {
    public static String TAG = "SP => ";
    public static String TAG_ERR = "ERR => SP => ";
    public static HashMap<String, Long> timers = new HashMap<String, Long>();

    public static void p(String msg){
        System.out.println( TAG + msg );
    }

    public static void p(String tag, String msg){
        System.out.println( TAG + msg );
    }

    public static void e(String eMsg){
        System.out.println( TAG_ERR + eMsg );
    }

    public static void e(String eMsg, Exception ex){
        System.out.println( TAG_ERR + eMsg );
        ex.printStackTrace();
    }

}
