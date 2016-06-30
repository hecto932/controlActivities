sap.ui.define([
	"sap/ui/core/mvc/Controller",
    "sap/ui/core/routing/History"
], function(Controller, History){

    //GLOBAL VARIABLES
    var oArgs = {};     //THIS VARIABLE CONTAIN GET PARAMETERS
    var weights = [];

	return Controller.extend("controlActivities.controller.Weight", {
		onInit: function(){
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.getRoute("weight").attachPatternMatched(this._onObjectMatched, this);
        },
        _onObjectMatched: function (oEvent) {
            var oModel = this.getView().getModel();
            oArgs = oEvent.getParameter("arguments");

            this.getView().bindElement({
                path: "/ShedsCollection/" + oArgs.shedId + "/weeks/" + oArgs.weekId
            });

            var SamplingRate = oModel.getProperty("/SamplingRate");
            var population = oModel.getProperty("/ShedsCollection/" + oArgs.shedId + "/weeks/" + oArgs.weekId + "/status_text2");
            var result = parseInt(population * (SamplingRate / 100));
            oModel.setProperty("/ShedsCollection/" + oArgs.shedId + "/weeks/" + oArgs.weekId + "/missing", result);
        },
        onWeight: function(oEvent){
            var oModel = this.getView().getModel();
            var populationMissing = oModel.getProperty("/ShedsCollection/" + oArgs.shedId + "/weeks/" + oArgs.weekId + "/missing");

            oModel.setProperty("/ShedsCollection/" + oArgs.shedId + "/weeks/" + oArgs.weekId + "/missing", --populationMissing);
            var inputWeight = sap.ui.getCore().byId("inputWeight").getValue();
            weights.push(parseFloat(inputWeight));
            console.log(weights);

            if(populationMissing <= 0){
                console.log("Termine");
                var sum = weights.reduce(function(a, b) { return a + b; });
                var avg = sum / weights.length;
                console.log("Resultdo: " + avg);
                weights = [];
                oModel.setProperty("/ShedsCollection/" + oArgs.shedId + "/number", parseFloat(avg));
                console.log(oModel);
                this.getRouter().navTo("detail", {
                    shedId: oArgs.shedId,
                    weekId: oArgs.weekId
                }, true /*no history*/);
            }
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
        }
	})
})