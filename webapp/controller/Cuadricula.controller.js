sap.ui.define([
	"sap/ui/core/mvc/Controller",
    "sap/ui/core/routing/History"
], function(Controller, History){

    //GLOBAL 
    var oArgs = {};
    var oAverage = 0;
	return Controller.extend("controlActivities.controller.Cuadricula", {
		onInit: function(){
			var sPath = jQuery.sap.getModulePath("controlActivities.model", "/data.json");
            var oModel = new sap.ui.model.json.JSONModel(sPath);
            this.getView().setModel(oModel);

            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.getRoute("cuadricula").attachPatternMatched(this._onObjectMatched, this);
        },
        _onObjectMatched: function (oEvent) {
            var oModel = this.getView().getModel();
            this._oRouterArgs = oEvent.getParameter("arguments");
            oArgs = this._oRouterArgs;
            //console.log("/ShedsCollection/" + this._oRouterArgs.shedId + "/weeks/" + this._oRouterArgs.weekId);

            this.getView().bindElement({
                path: "/ShedsCollection/" + this._oRouterArgs.shedId + "/weeks/" + this._oRouterArgs.weekId
            });

           	//sap.ui.getCore().byId("textItr").setText(this._oRouterArgs.cuadriculas);
        },
        onWeight: function(oEvent){

            var itr = parseInt(this.getView().getModel("dummy").getProperty("/input/squares"));
            itr--;
            this.getView().getModel("dummy").setProperty("/input/squares", itr);
            this.getView().getModel().refresh(true);
            console.log(sap.ui.getCore().byId("textItr").getText());
            this.getView().getModel("dummy").setProperty("/input/squares", itr);
            oAverage += sap.ui.getCore().byId("inputAverage").getValue();

            sap.ui.getCore().byId("inputAverage").setValue();
            sap.ui.getCore().byId("inputBirds").setValue();

        	if(this.getView().getModel("dummy").getProperty("/input/squares") == "0"){
                
                this.getView().getModel("dummy").setProperty("/input/weightAverage", 0);

                console.log(oArgs);

                var oModel = this.getView().getModel();
                oModel.setProperty("/ShedsCollection/" + oArgs.shedId + "/weeks/" + oArgs.weekId +"/number", String(oAverage/oArgs.cuadriculas));
                this.getView().setModel(oModel);
                console.log(oModel);

                var route = sap.ui.core.UIComponent.getRouterFor(this);
                sap.ui.getCore().byId("myList").getBinding("items").refresh();
                route.navTo("detail", {
                    shedId: oArgs.shedId,
                    weekId: oArgs.weekId
                });
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