package com.ShiftPlanning.app.models.responses;

import java.util.HashMap;

/**
 * Created by Steewsc on 2.1.14..
 */
public class TimeclockData {
    public int id;
    public int store;
    public int status;
    public String schedule;
    public String notes;
    public String start_timestamp;
    public String end_timestamp;
    public HashMap<String, String> in_time;
    public HashMap<String, String> current_length;

}
