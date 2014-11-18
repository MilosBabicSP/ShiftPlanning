package com.ShiftPlanning.app.models.responses;

/**
 * Created by Steewsc on 2.1.14..
 */
public class TimeClockResponse {
    public int status;
    public String token;
    public TimeclockData data;
    public boolean isClockedIn = false;

    public TimeClockResponse(){
        this.data = new TimeclockData();
    }
}
