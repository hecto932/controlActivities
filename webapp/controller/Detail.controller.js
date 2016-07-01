sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History",
	"controlActivities/model/formatter"
], function(Controller, History, formatter) {
	"use strict";
	var oArgs = {};
	return Controller.extend("controlActivities.controller.Detail", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf controlActivities.view.Detail
		 */
		formatter: formatter,
		onInit: function () {
			
			/*var sPath = jQuery.sap.getModulePath("controlActivities.model", "/data.json");
			var oModel = new sap.ui.model.json.JSONModel(sPath);
			this.getView().setModel(oModel);*/
			
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.getRoute("detail").attachPatternMatched(this._onObjectMatched, this);
		},
		_onObjectMatched: function (oEvent) {
			var oView = this.getView();
			var oModel = this.getView().getModel();
			this._oRouterArgs = oEvent.getParameter("arguments");

			this.getView().bindElement({
				path: "/ShedsCollection/" + this._oRouterArgs.shedId + "/weeks/" + this._oRouterArgs.weekId,
				events : {
					change: this._onBindingChange.bind(this),
					dataRequested: function (oEvent) {
						oView.setBusy(true);
					},
					dataReceived: function (oEvent) {
						oView.setBusy(false);
					}
				}
			});
			oArgs = this._oRouterArgs;
			var oTable = sap.ui.getCore().byId("tableContol");
			var oTableLength = oTable.getItems().length;
			//console.log(oTableLength);
			if(oTableLength == 7){
				sap.ui.getCore().byId("btnReport").setVisible(false);
				sap.ui.getCore().byId("btnWeight").setVisible(true);
			}
			else{
				sap.ui.getCore().byId("btnReport").setVisible(true);
				sap.ui.getCore().byId("btnWeight").setVisible(false);
			}
			//console.log(oModel.getProperty("/ShedsCollection/" + this._oRouterArgs.shedId + "/number"));
			if(oModel.getProperty("/ShedsCollection/" + this._oRouterArgs.shedId + "/weeks/" + this._oRouterArgs.weekId + "/number") == "0" && oTableLength == 7)
			{
				sap.ui.getCore().byId("btnWeight").setVisible(true);
			}else{
				sap.ui.getCore().byId("btnWeight").setVisible(false);
			}
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
			    width: "18em",                   // default
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
			var oModel = this.getView().getModel();
			var oTableControl = sap.ui.getCore().byId("tableContol");
			var oTableControlLength = oTableControl.getItems().length;
			var dailyData = {
				"day": oTableControlLength + 1,
				"mortality": sap.ui.getCore().byId("inputMortality").getValue(),
				"discard": sap.ui.getCore().byId("inputDiscard").getValue()
			};

			var oColumnListItem = new sap.m.ColumnListItem({
				cells: [
					new sap.m.ObjectNumber({
						number: dailyData.day
					}),
					new sap.m.ObjectNumber({
						number: dailyData.mortality,
						//numberUnit: "Aves",
						state: formatter.verifyStatusMortality(dailyData.mortality)
					}),
					new sap.m.ObjectNumber({
						number: dailyData.discard,
						//numberUnit: "Aves",
						state: formatter.verifyStatusDiscard(dailyData.discard)
					})
				]
			});
			oTableControl.addItem(oColumnListItem);

			if(oTableControl.getItems().length == 7){
				var btnReport = sap.ui.getCore().byId("btnReport");
				var btnWeight = sap.ui.getCore().byId("btnWeight");
				btnReport.setVisible(false);
				btnWeight.setVisible(true);
			}

			sap.ui.getCore().byId("inputMortality").setValue("0");
			sap.ui.getCore().byId("inputDiscard").setValue("0");

			var days = oModel.getProperty("/ShedsCollection/" + oArgs.shedId + "/weeks/" + oArgs.weekId + "/days");
			days.push(dailyData);
			oModel.setProperty("/ShedsCollection/" + oArgs.shedId + "/weeks/" + oArgs.weekId + "/days", days);

		},
		onDialogPress: function (oEvent) {
			var oTableControl = sap.ui.getCore().byId("tableContol");
			var oTableControlLength = oTableControl.getItems().length;

			var oInputMortality = new sap.m.Input("inputMortality", {
				type: "Number",
				enabled: true,
				placeholder: "Numero de mortalidad...",
				value: {
					path: "dummy>/input/mortality",
					type: "sap.ui.model.type.Integer",
					constraints: {
						minimum: 0
					}
				},
				liveChange: function(oEvent){
					var valueDiscard = sap.ui.getCore().byId("inputDiscard").getValue();
					if(this.getValue() == "" || this.getValue() < 0 || valueDiscard == "" || valueDiscard < 0){
						sap.ui.getCore().byId("btnAdd").setEnabled(false);
					} else{
						sap.ui.getCore().byId("btnAdd").setEnabled(true);
					}
				}
			});

			var oInputDiscard = new sap.m.Input("inputDiscard", {
				type: "Number",
				enabled: true,
				placeholder: "Numero de descarte...",
				value: {
					path: "dummy>/input/discard",
					type: "sap.ui.model.type.Integer",
					constraints: {
						minimum: 0
					}
				},
				liveChange: function(oEvent){
					var valueMortality = sap.ui.getCore().byId("inputMortality").getValue();
					if(this.getValue() == "" || this.getValue() < 0 || valueMortality == "" || valueMortality < 0){
						sap.ui.getCore().byId("btnAdd").setEnabled(false);
					} else{
						sap.ui.getCore().byId("btnAdd").setEnabled(true);
					}
				}
			})

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
									text: "Mortalidad",
									required: true
								}),
								oInputMortality
								,
								new sap.m.Label({
									design: "Bold",
									text: "Descarte",
									required: true
								}),
								oInputDiscard
							]
						})
					],
					beginButton: new sap.m.Button("btnAdd",{
						text: 'Guardar',
						type: "Accept",
						press: function (){
							that.reportingDailyData();
							dialog.close();
							dialog.destroy();
						} 
					}),
					endButton: new sap.m.Button({
						text: 'Cancelar',
						type: "Reject",
						press: function () {
							dialog.close();
							dialog.destroy();
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
			
		},
		onRegisterWeight: function(oEvent){
			var oItem = oEvent.getSource();
			var oRouter = oItem.getBindingContext().getPath();
			console.log(oRouter);
			var splitPath = oItem.getBindingContext().getPath().split("/");

			console.log(splitPath);

			var route = sap.ui.core.UIComponent.getRouterFor(this);
			route.navTo("weight", {
				shedId: splitPath[2],
				weekId: splitPath[4]
			});
		},
		_onBindingChange : function (oEvent) {
			// No data for the binding
			if (!this.getView().getBindingContext()) {
				this.getRouter().getTargets().display("notFound");
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