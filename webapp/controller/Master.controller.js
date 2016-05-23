sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(Controller) {
	"use strict";

	return Controller.extend("controlActivities.controller.Master", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf controlActivities.view.Master
		 */
			onInit: function () {
			
				var sPath = jQuery.sap.getModulePath("controlActivities.model", "/data.json");
				var oModel = new sap.ui.model.json.JSONModel(sPath);
				this.getView().setModel(oModel);
				
				var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
				oRouter.getRoute("master").attachPatternMatched(this._onObjectMatched, this);
			},
			_onObjectMatched: function (oEvent) {
				this._oRouterArgs = oEvent.getParameter("arguments");
				console.log("/ShedsCollection/" + this._oRouterArgs.shedId);
				this.getView().bindElement({
					path: "/ShedsCollection/" + this._oRouterArgs.shedId
				});
			},
			handlePress: function(oEvent){

				var oItem = oEvent.getSource();
				var oRouter = oItem.getBindingContext().getPath();
				console.log(oRouter);
				var splitPath = oItem.getBindingContext().getPath().split("/");

				console.log(splitPath);

				var route = sap.ui.core.UIComponent.getRouterFor(this);
				route.navTo("detail", {
					shedId: splitPath[2],
					weekId: splitPath[4]
				});
			}

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf controlActivities.view.Master
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf controlActivities.view.Master
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf controlActivities.view.Master
		 */
		//	onExit: function() {
		//
		//	}

	});

});