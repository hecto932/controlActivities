sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History",
	"controlActivities/model/formatter"
], function(Controller, History, formatter) {
	"use strict";

	return Controller.extend("controlActivities.controller.Master", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf controlActivities.view.Master
		 */
		 	formatter: formatter,
			onInit: function () {
				var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
				oRouter.getRoute("master").attachPatternMatched(this._onObjectMatched, this);
			},
			_onObjectMatched: function (oEvent) {
				var oView = this.getView();
				this._oRouterArgs = oEvent.getParameter("arguments");

				if(oView.getModel().getProperty('/ShedsCollection') !== undefined){
					if(oView.getModel().getProperty('/ShedsCollection')[this._oRouterArgs.shedId] !== undefined){
						this.getView().bindElement({
							path: "/ShedsCollection/" + this._oRouterArgs.shedId
						});	
					}
					else{
						this.getRouter().getTargets().display("notFound");
					}
				}
				else{
					this.getRouter().getTargets().display("notFound");
				}
				
				console.log(this.getView().getModel().getProperty("/ShedsCollection/" + this._oRouterArgs.shedId));

			},
			getRouter: function(){
				return this.getOwnerComponent().getRouter();
			},
			handlePress: function(oEvent){
				var oItem = oEvent.getSource();
				var oRouter = oItem.getBindingContext().getPath();
				var splitPath = oItem.getBindingContext().getPath().split("/");
				var route = sap.ui.core.UIComponent.getRouterFor(this);

				route.navTo("detail", {
					shedId: splitPath[2],
					weekId: splitPath[4]
				}, true);
			},
			onNavBack: function (oEvent) {
				//this.getRouter().navTo("home", {}, true /*no history*/);
				var oHistory, sPreviousHash;
				oHistory = History.getInstance();
				sPreviousHash = oHistory.getPreviousHash();
				if (sPreviousHash !== undefined) {
					window.history.go(-1);
				} else {
					this.getRouter().navTo("home", {}, true /*no history*/);
				}
			},
			addWeek : function(oEvent){
				console.log("Adding week!");
			},
			OnShowGraphic: function(oEvent){
				var route = sap.ui.core.UIComponent.getRouterFor(this);
				route.navTo("graphic");
			},
			onSelectionChange: function(oEvent){
				var sPath = oEvent.getParameter("listItem").getBindingContext().getPath();
				var splitPath = sPath.split('/');
				var route = this.getRouter();

				route.navTo("detail", {
					shedId: splitPath[2],
					weekId: splitPath[4]
				}, true);
			},
			_onBindingChange : function (oEvent) {
				if (!this.getView().getBindingContext()) {
					this.getRouter().getTargets().display("notFound");
				}
			},
			formatWeight: function(n){
				if(n < 1000){
					return parseFloat(n / 1000);
				}
				return parseFloat(n);
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