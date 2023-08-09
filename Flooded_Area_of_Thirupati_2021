// Load Sentinel-1 images to map Tirupati, Andhra Pradesh flooding, Sep-Nov 2021.


// Default location
var pt = ee.Geometry.Point(79.38,13.64);
//Near Tirupati

// Load Sentinel-1 C-band SAR Ground Range collection (log scaling, VV co-polar)
var collection = ee.ImageCollection('COPERNICUS/S1_GRD')
.filterBounds(pt)
.filter(ee.Filter.listContains('transmitterReceiverPolarisation', 'VV'))
.select('VV');

// Filter by date
var before = collection.filterDate('2021-09-01', '2021-09-30').mosaic();
var after = collection.filterDate('2021-11-01', '2021-11-19').mosaic();

// Threshold smoothed radar intensities to identify "flooded" areas.
var SMOOTHING_RADIUS = 100; 
var DIFF_UPPER_THRESHOLD = -3;
var diff_smoothed = after.focal_median(SMOOTHING_RADIUS, 'circle', 'meters')
.subtract(before.focal_median(SMOOTHING_RADIUS, 'circle', 'meters'));
var diff_thresholded = diff_smoothed.lt(DIFF_UPPER_THRESHOLD);

// Display map

Map.centerObject(pt, 13);
Map.addLayer(before, {min:-30,max:0}, 'Before flood');
Map.addLayer(after, {min:-30,max:0}, 'After flood');
Map.addLayer(after.subtract(before), {min:-10,max:10}, 'After - before', 0);
Map.addLayer(diff_smoothed, {min:-10,max:10}, 'diff smoothed', 0);


