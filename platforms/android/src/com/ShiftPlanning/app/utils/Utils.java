package com.ShiftPlanning.app.utils;

/**
 * Created by steewsc on 20.5.14..
 */
public class Utils {
    public static int getTime(){
        return new Long( System.currentTimeMillis()/1000 ).intValue();
    }
}
