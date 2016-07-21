sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/routing/History",
], function(Controller, History) {
    "use strict";

    return Controller.extend("controlActivities.controller.Chart", {
        onInit: function() {
            var oView = this.getView();
            var _i18n = this.getI18n();
            var sPath = jQuery.sap.getModulePath("controlActivities.model", "/chart.json");
            var oModel = new sap.ui.model.json.JSONModel(sPath);
            console.log(oModel);
            
            var oVizFrame = oView.byId("oVizFrame");
            console.log(oVizFrame);
            oVizFrame.setModel(oModel);

            var oDataset_bl = new sap.viz.ui5.data.FlattenedDataset({
                dimensions: [{
                    name: _i18n.getText('chart_text1'),
                    value: "{Dia}"
                }],
                measures: [{
                    group: 1,
                    name: _i18n.getText('chart_text2'),
                    value: '{Teorico}'
                }, {
                    group: 1,
                    name: _i18n.getText('chart_text3'),
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
                    'values': [_i18n.getText('chart_feedValue1'), _i18n.getText('chart_feedValue2')]
                        //'values' : [ "Revenue" ]
                }),
                feedAxisLabels_bl7 = new sap.viz.ui5.controls.common.feeds.FeedItem({
                    'uid': "axisLabels",
                    'type': "Dimension",
                    'values': [_i18n.getText("chart_feedAxisValue1")]
                }),
                feedTargetValues_bl7 = new sap.viz.ui5.controls.common.feeds.FeedItem({
                    'uid': "targetValues",
                    'type': "Measure",
                    'values': [_i18n.getText("chart_feedTargetValue1")]
                });

            oVizFrame.addFeed(feedPrimaryValues_bl7);
            oVizFrame.addFeed(feedAxisLabels_bl7);
            oVizFrame.addFeed(feedTargetValues_bl7);
            oVizFrame.setVizType('line');
            
        },
        getRouter: function() {
            return this.getOwnerComponent().getRouter();
        },
        onNavBack: function(oEvent) {
            var oHistory, sPreviousHash;
            oHistory = History.getInstance();
            sPreviousHash = oHistory.getPreviousHash();
            if (sPreviousHash !== undefined) {
                window.history.go(-1);
            } else {
                this.getRouter().navTo("home", {}, true /*no history*/);
            }
        },
        getI18n: function() {
            return this.getOwnerComponent().getModel("i18n").getResourceBundle();
        }
    });

});
