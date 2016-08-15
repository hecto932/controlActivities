sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(Controller) {
	"use strict";

	return Controller.extend("controlActivities.controller.Shed", {
		onInit: function() {
			
		},
		handlePress: function(oEvent){
			//this.getView().getModel().remove("/TXWEEKLYACTIVITIES(20)", null, null, null);
			var oModel = this.getView().getModel();
			var oItem = oEvent.getSource();
			var oRouter = oItem.getBindingContext().getPath();
			var splitPath = oItem.getBindingContext().getPath().split("/");
			var route = sap.ui.core.UIComponent.getRouterFor(this);
			
			console.log("SHEDID: " + oItem.getNumber());
			
			oModel.read('/OSSHED', {
				async: false,
				filters: [
					new sap.ui.model.Filter("SHEDID", sap.ui.model.FilterOperator.EQ, oItem.getNumber())
				],
				urlParameters: {
					$expand: "TO_TXBROILERSLOT"
				},
				success: function(oValue){
					console.log("LOTE: " + oValue.results[0].TO_TXBROILERSLOT.BROILERSLOTID);
					
					var LOTID = oValue.results[0].TO_TXBROILERSLOT.BROILERSLOTID;
		
					route.navTo("master", {
						lotId: LOTID,
						shedId: oItem.getNumber()
					});
				}
			});
		}
	});

});