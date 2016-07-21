sap.ui.define([
	"sap/ui/core/mvc/Controller",
    "sap/ui/core/routing/History"
], function(Controller, History){

    //GLOBAL VALUES
    var oArgs = {};
    var weights = [];

	return Controller.extend("controlActivities.controller.Weight", {
		onInit: function(){
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.getRoute("weight").attachPatternMatched(this._onObjectMatched, this);
        },
        _onObjectMatched: function (oEvent) {
            var oModel = this.getView().getModel();
            oArgs = oEvent.getParameter("arguments");
            var oView = this.getView();

            this.getView().bindElement({
                path: "/ShedsCollection/" + oArgs.shedId + "/weeks/" + oArgs.weekId,
                events : {
                    change: this._onBindingChange.bind(this),
                    dataRequested: function (oEvent) {
                        oView.setBusy(true);
                    },
                    dataReceived: function (oEvent) {
                        oView.setBusy(false);
                    }
                }
            });

            var SamplingRate = oModel.getProperty("/SamplingRate");
            var population = oModel.getProperty("/ShedsCollection/" + oArgs.shedId + "/weeks/" + oArgs.weekId + "/status_text2");
            var result = parseInt(population * (SamplingRate / 100));
            oModel.setProperty("/ShedsCollection/" + oArgs.shedId + "/weeks/" + oArgs.weekId + "/missing", result);
        },
        onWeight: function(oEvent){
            var oView = this.getView();
            var oModel = this.getView().getModel();
            var populationMissing = oModel.getProperty("/ShedsCollection/" + oArgs.shedId + "/weeks/" + oArgs.weekId + "/missing");

            oModel.setProperty("/ShedsCollection/" + oArgs.shedId + "/weeks/" + oArgs.weekId + "/missing", --populationMissing);
            var inputWeight = oView.byId("inputWeight").getValue();
            //sap.ui.getCore().byId("inputWeight").setValue();
            weights.push(parseFloat(parseFloat(inputWeight).toFixed(3)));
            console.log(weights);

            if(populationMissing <= 0){
                console.log("Termine");
                var sum = weights.reduce(function(a, b) { return parseFloat(a + b); });
                var avg = parseFloat(sum / weights.length);
                console.log("Resultdo: " + avg);
                weights = [];
            
                oModel.setProperty("/ShedsCollection/" + oArgs.shedId + "/weeks/" + oArgs.weekId + "/number", parseFloat(avg));
                
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
        },
        _onBindingChange : function (oEvent) {
            // No data for the binding
            if (!this.getView().getBindingContext()) {
                this.getRouter().getTargets().display("notFound");
            }
        },
        handleLiveChange: function(oEvent){
            var value = oEvent.getParameter("value");
            var btnSave = this.getView().byId('btnSave');
            var inputWeight = this.getView().byId('inputWeight');
            console.log(inputWeight);
            if(inputWeight.getValue() == "" || inputWeight.getValue() <= 0){
                btnSave.setEnabled(false);
            } else{
                btnSave.setEnabled(true);
            }
            
        }
	})
})