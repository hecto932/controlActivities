sap.ui.define([
	"sap/ui/core/mvc/Controller",
    "sap/ui/core/routing/History"
], function(Controller, History){

	return Controller.extend("controlActivities.controller.Weight", {
		onInit: function(){
			var sPath = jQuery.sap.getModulePath("controlActivities.model", "/data.json");
            var oModel = new sap.ui.model.json.JSONModel(sPath);
            this.getView().setModel(oModel);

            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.getRoute("weight").attachPatternMatched(this._onObjectMatched, this);
        },
        _onObjectMatched: function (oEvent) {
            var oModel = this.getView().getModel();
            this._oRouterArgs = oEvent.getParameter("arguments");

            //console.log("/ShedsCollection/" + this._oRouterArgs.shedId + "/weeks/" + this._oRouterArgs.weekId);

            this.getView().bindElement({
                path: "/ShedsCollection/" + this._oRouterArgs.shedId + "/weeks/" + this._oRouterArgs.weekId
            });
        },
        onWeight: function(oEvent){
            var oItem = oEvent.getSource();
            var oRouter = oItem.getBindingContext().getPath();
            var splitPath = oItem.getBindingContext().getPath().split("/");

            console.log(splitPath);

            var route = sap.ui.core.UIComponent.getRouterFor(this);
            route.navTo("cuadricula", {
                shedId: splitPath[2],
                weekId: splitPath[4],
                cuadriculas: sap.ui.getCore().byId("inputCuadriculas").getValue()
            });
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