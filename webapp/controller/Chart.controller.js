sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(Controller) {
	"use strict";

	return Controller.extend("controlActivities.controller.Chart", {
		onInit: function() {
			var sPath = jQuery.sap.getModulePath("controlActivities.model", "/chart.json");
			var oModel = new sap.ui.model.json.JSONModel(sPath);
			console.log(oModel);
			//var oVizFrame = this.getView().byId("idoVizFrame");
			//oVizFrame.setModel(oModel);	
		}
	});

});