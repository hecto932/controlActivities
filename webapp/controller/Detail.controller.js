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
			var oModel = this.getView().getModel();
			
			this._oRouterArgs = oEvent.getParameter("arguments");

			console.log("/ShedsCollection/" + this._oRouterArgs.shedId + "/weeks/" + this._oRouterArgs.weekId);

			this.getView().bindElement({
				path: "/ShedsCollection/" + this._oRouterArgs.shedId + "/weeks/" + this._oRouterArgs.weekId
			});

			var galponNumber = oModel.getProperty("/ShedsCollection/" + this._oRouterArgs.shedId + "/number");
			oModel.setProperty("/ShedsCollection/" + this._oRouterArgs.shedId + "/galponNumber", galponNumber);

		},
		getRouter: function(){
			return this.getOwnerComponent().getRouter();
		},
		onNavBack: function (oEvent) {
			var oHistory, sPreviousHash;
			oHistory = History.getInstance();
			sPreviousHash = oHistory.getPreviousHash();
			if (sPreviousHash !== undefined) {
				window.history.go(-1);
			} else {
				this.getRouter().navTo("home", {}, true /*no history*/);
			}
		},
		showErrorReport: function(oEvent) {
			sap.m.MessageToast.show("Ya se han cargado todos los dias de la semana.", {
			    duration: 3000,                  // default
			    width: "13em",                   // default
			    my: "center center",             // default
			    at: "center center",             // default
			    of: window,                      // default
			    offset: "0 0",                   // default
			    collision: "fit fit",            // default
			    onClose: null,                   // default
			    autoClose: true,                 // default
			    animationTimingFunction: "ease", // default
			    animationDuration: 1000,         // default
			    closeOnBrowserNavigation: true   // default
			});
		},
		reportingDailyData: function (){
			var oTableControl = sap.ui.getCore().byId("tableContol");
			var oTableControlLength = oTableControl.getItems().length;
			var dailyData = {
				"day": oTableControlLength + 1,
				"mortality": sap.ui.getCore().byId("inputMortality").getValue(),
				"discard": sap.ui.getCore().byId("inputDiscard").getValue(),
				"food": sap.ui.getCore().byId("inputFood").getValue()
			};

			console.log(dailyData);

			var oColumnListItem = new sap.m.ColumnListItem({
				cells: [
					new sap.m.ObjectNumber({
						number: dailyData.day,
						state: "None"
					}),
					new sap.m.ObjectNumber({
						number: dailyData.mortality,
						numberUnit: "Aves",
						state: "{mortalityState}"
					}),
					new sap.m.ObjectNumber({
						number: dailyData.discard,
						numberUnit: "Aves",
						state: "{discardState}"
					}),
					new sap.m.ObjectNumber({
						number: dailyData.food,
						numberUnit: "Kg",
						state: "{foodState}"
					})
				]
			});
			oTableControl.addItem(oColumnListItem);
		},
		onDialogPress: function (oEvent) {
			var oTableControl = sap.ui.getCore().byId("tableContol");
			var oTableControlLength = oTableControl.getItems().length;

			if(oTableControlLength < 7){
				var that = this;
				var dialog = new sap.m.Dialog({
					title: 'Reporte',
					content: [
						new sap.ui.layout.form.SimpleForm({
							editable: true,
							maxContainerCols: 2,
							layout: sap.ui.layout.form.SimpleFormLayout.ResponsiveGridLayout,
							labelSpanL: 4,
							labelSpanM: 4,
							emptySpanL: 4,
							columnsL: 4,
							columnsM: 4,
							content: [
								new sap.m.Label({
									design: "Bold",
									text: "Mortalidad"
								}),
								new sap.m.Input("inputMortality", {
									type: "Number",
									enabled: true,
									placeholder: "Numero de mortalidad..."
								}),
								new sap.m.Label({
									design: "Bold",
									text: "Descarte"
								}),
								new sap.m.Input("inputDiscard", {
									type: "Number",
									enabled: true,
									placeholder: "Numero de descarte..."
								}),
								new sap.m.Label({
									design: "Bold",
									text: "Cantidad de alimento"
								}),
								new sap.m.Input("inputFood", {
									type: "Number",
									enabled: true,
									placeholder: "Cantidad de alimento en silo..."
								})
							]
						})
					],
					beginButton: new sap.m.Button({
						text: 'Agregar',
						type: "Accept",
						press: function (){
							that.reportingDailyData();
							dialog.close()
						} 
					}),
					endButton: new sap.m.Button({
						text: 'Cancelar',
						type: "Reject",
						press: function () {
							dialog.close();
						}
					}),
					afterClose: function() {
						dialog.destroy();
					}
				});
	 
				//to get access to the global model
				this.getView().addDependent(dialog);
				dialog.open();
			}
			else{
				this.showErrorReport(oEvent);
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