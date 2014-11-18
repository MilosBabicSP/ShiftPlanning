package com.ShiftPlanning.app.models;

import android.location.Location;

/**
 * Created by
 * Stevica Trajanovic
 * stevica@shiftplanning.com
 * on 12/13/13.
 */
public abstract class SLocationResult {
    public abstract void gotLocation(Location location, boolean isFromSatellite);
}
