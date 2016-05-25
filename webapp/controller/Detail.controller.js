sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History"
], function(Controller, History) {
	"use strict";

	return Controller.extend("controlActivities.controller.Detail", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf controlActivities.view.Detail
		 */
		onInit: function () {
			
			var sPath = jQuery.sap.getModulePath("controlActivities.model", "/data.json");
			var oModel = new sap.ui.model.json.JSONModel(sPath);
			this.getView().setModel(oModel);
			
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.getRoute("detail").attachPatternMatched(this._onObjectMatched, this);
		},
		_onObjectMatched: function (oEvent) {
			this._oRouterArgs = oEvent.getParameter("arguments");
			console.log("/ShedsCollection/" + this._oRouterArgs.shedId + "/weeks/" + this._oRouterArgs.weekId);
			this.getView().bindElement({
				path: "/ShedsCollection/" + this._oRouterArgs.shedId + "/weeks/" + this._oRouterArgs.weekId
			});
		},
		onNavBack: function (oEvent) {
			var oHistory, sPreviousHash;
			oHistory = History.getInstance();
			sPreviousHash = oHistory.getPreviousHash();
			if (sPreviousHash !== undefined) {
				window.history.go(-1);
			} else {
				this.getRouter().navTo("master", {}, true /*no history*/);
			}
		}

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf controlActivities.view.Detail
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf controlActivities.view.Detail
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf controlActivities.view.Detail
		 */
		//	onExit: function() {
		//
		//	}

	});

});