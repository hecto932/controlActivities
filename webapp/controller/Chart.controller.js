sap.ui.define([
    "sap/ui/core/mvc/Controller"
], function(Controller) {
    "use strict";

    return Controller.extend("controlActivities.controller.Chart", {
        onInit: function() {

            var sPath = jQuery.sap.getModulePath("controlActivities.model", "/chart.json");
            var oModel = new sap.ui.model.json.JSONModel(sPath);
            console.log(oModel);

            var oVizFrame = sap.ui.getCore().byId("oVizFrame");

            oVizFrame.setModel(oModel);

            var oDataset_bl = new sap.viz.ui5.data.FlattenedDataset({
                dimensions: [{
                    name: 'Dia',
                    value: "{Dia}"
                }],
                measures: [{
                    group: 1,
                    name: 'Teorico',
                    value: '{Teorico}'
                }, {
                    group: 1,
                    name: 'Peso',
                    value: '{Peso}'
                }],
                data: {
                    path: "/Datos"
                }
            });

            oVizFrame.setVizProperties({
                plotArea: {
                    showGap: true
                }
            });

            oVizFrame.setDataset(oDataset_bl);

            var feedPrimaryValues_bl7 = new sap.viz.ui5.controls.common.feeds.FeedItem({
                    'uid': "primaryValues",
                    'type': "Measure",
                    'values': ["Teorico", "Peso"]
                        //'values' : [ "Revenue" ]
                }),
                feedAxisLabels_bl7 = new sap.viz.ui5.controls.common.feeds.FeedItem({
                    'uid': "axisLabels",
                    'type': "Dimension",
                    'values': ["Dia"]
                }),
                feedTargetValues_bl7 = new sap.viz.ui5.controls.common.feeds.FeedItem({
                    'uid': "targetValues",
                    'type': "Measure",
                    'values': ["Peso"]
                });

            oVizFrame.addFeed(feedPrimaryValues_bl7);
            oVizFrame.addFeed(feedAxisLabels_bl7);
            oVizFrame.addFeed(feedTargetValues_bl7);
            oVizFrame.setVizType('line');
        }
    });

});
