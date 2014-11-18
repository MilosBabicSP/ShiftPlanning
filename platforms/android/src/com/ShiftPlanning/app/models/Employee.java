package com.ShiftPlanning.app.models;
import java.util.HashMap;

/**
 * Created by Steewsc on 2.1.14..
 */
public class Employee {
    public int id;
    public String username;
    public String name;
    public int group;
    public HashMap<String, String> mSchedules;

    public Employee(){
        this.mSchedules = new HashMap<String, String>();
        this.username = "";
        this.name = "";
    }
}




