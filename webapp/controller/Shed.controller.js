sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(Controller) {
	"use strict";

	return Controller.extend("controlActivities.controller.Shed", {
		onInit: function() {
			
		},
		handlePress: function(oEvent){
			var oItem = oEvent.getSource();
			var oRouter = oItem.getBindingContext().getPath();
			var splitPath = oItem.getBindingContext().getPath().split("/");

			console.log(oRouter);

			var route = sap.ui.core.UIComponent.getRouterFor(this);
			route.navTo("master", {
				shedId: splitPath[2]
			});
		}
	});

});