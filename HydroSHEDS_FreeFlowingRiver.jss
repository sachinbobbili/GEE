var imageVisParam = {"opacity":0.99,"bands":["constant"],"min":1,"max":10,"palette":["0d80f7","57a0ef","8cd7ef"]};
var table = ee.FeatureCollection("users/sachinbobbili/TS");

var dataset = ee.FeatureCollection('WWF/HydroSHEDS/v1/FreeFlowingRivers')
                                                  .filterBounds(table);

// Paint "RIV_ORD" (river order) value to an image for visualization.
var datasetVis = ee.Image().byte().paint(dataset, 'RIV_ORD', 2);
Map.setCenter(78.5,17.5, 6);
Map.addLayer(table, {}, 'table');
Map.addLayer(datasetVis, imageVisParam, 'Free flowing rivers');
Map.setOptions('SATELLITE');
// Export.table.toFeatureView(dataset)
Export.table.toDrive({
                      collection:dataset,
                      description:'Free_flowing_rivers' , 
                      folder :'Earth_Engine', 
                      fileFormat:"SHP"
                    });
