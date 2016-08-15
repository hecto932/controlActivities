sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History",
	"controlActivities/model/formatter"
], function(Controller, History, formatter) {
	"use strict";
	
	//GLOBAL VALUES
	var oArgs = {};
	
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
				var oModel = this.getView().getModel();
				oArgs = oEvent.getParameter("arguments");
				console.log(oArgs);
				var that = this; 
				oModel.read('/TXFOODPLAN', {
					async: false,
					urlParameters: {
						$expand: 'TO_TXFOODPLANDETAIL'
					},
					filters: [
						new sap.ui.model.Filter("TXBROILERSLOT.BROILERSLOTID", "EQ", oArgs.lotId)
					],
					success: function(oValue){
						console.log("FOODPLANID: " + oValue.results[0].FOODPLANID);
						console.log("/TXFOODPLAN('"+ oValue.results[0].FOODPLANID +"')");
						oView.bindElement({
							path : "/TXFOODPLAN('"+ oValue.results[0].FOODPLANID +"')",
							events : {
								change: that._onBindingChange.bind(that)
							}
						});
					},
					error: function(err){
						console.log(err);
					}
				});
			},
			getRouter: function(){
				return this.getOwnerComponent().getRouter();
			},
			handlePress: function(oEvent){
				var oItem = oEvent.getSource();
				console.log(oItem);
				var oRouter = oItem.getBindingContext().getPath();
				var splitPath = oItem.getBindingContext().getPath().split("/");
				var route = sap.ui.core.UIComponent.getRouterFor(this);

				/*route.navTo("detail", {
					shedId: splitPath[2],
					weekId: splitPath[4]
				}, true);
				*/
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
				var oItem = oEvent.getSource();
				var sPath = oEvent.getParameter("listItem").getBindingContext().getPath();
				var bindingContext = oEvent.getParameter("listItem").getBindingContext().getObject();
				oArgs.weekId = bindingContext.WEEKNUMBER;
				console.log(sPath);
				console.log(oArgs);
				
				var route = this.getRouter();
				route.navTo("detail", oArgs, true);
				
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