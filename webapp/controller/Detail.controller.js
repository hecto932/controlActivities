sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History",
	"controlActivities/model/formatter"
], function(Controller, History, formatter) {
	"use strict";

	//GLOBAL VALUES
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
			var that = this;
			oArgs = oEvent.getParameter("arguments");
			console.log(oArgs);
			oModel.read('/TXWEEKLYACTIVITIES', {
				async: false,
				urlParameters: {
					$expand: 'TO_TXDAILYACTIVITIES,TO_TXBROILERSLOT,TO_TXDAILYACTIVITIES/TO_DMMESSUREUNIT_AGEUNIT'
				},
				filters: [
					new sap.ui.model.Filter("TXBROILERSLOT.BROILERSLOTID", "EQ", oArgs.lotId),
					new sap.ui.model.Filter("WEEKNUMBER", "EQ", oArgs.weekId)
				],
				success: function (oValue){
					console.log(oValue);
					var WEEKLYACTIVITIESID = oValue.results[0].WEEKLYACTIVITIESID;
					oArgs.weeklyactivityId = WEEKLYACTIVITIESID;
					console.log("/TXWEEKLYACTIVITIES("+ WEEKLYACTIVITIESID +")");
					oView.bindElement({
						path : "/TXWEEKLYACTIVITIES("+ WEEKLYACTIVITIESID +")"
					});
					var dailyRegisterNumber = oValue.results[0].TO_TXDAILYACTIVITIES.results.length;
					oArgs.dailyRegistersNumber = dailyRegisterNumber;
					if(dailyRegisterNumber == 7){
						oView.byId("btnReport").setVisible(false);
						oView.byId("btnWeight").setVisible(true);
					}else{
						oView.byId("btnReport").setVisible(true);
						oView.byId("btnWeight").setVisible(false);
					}
				},
				error: function (error) {
					console.log(error);
				}
			});
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
			var _i18n = this.getI18n();
			sap.m.MessageToast.show(_i18n.getText("detail_messageToast"), {
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
			var oView = this.getView();
			var oModel = this.getView().getModel();
			var oTableControl = oView.byId("tableContol");
			var oTableControlLength = oTableControl.getItems().length;
			var dailyData = {
				"day": oTableControlLength + 1,
				"mortality": sap.ui.getCore().byId("inputMortality").getValue(),
				"discard": sap.ui.getCore().byId("inputDiscard").getValue()
			};
			var inputMortalityValue = sap.ui.getCore().byId("inputMortality").getValue();
			var inputDiscardValue = sap.ui.getCore().byId("inputDiscard").getValue();
			oModel.read('/TXDAILYACTIVITIES/$count', {
				async: false,
				success: (number) => {
					var dailyActivityId = parseInt(number) + 1;
					oArgs.dailyRegistersNumber = parseInt(oArgs.dailyRegistersNumber) + 1
					var dailyActivity = {
						"DAILYACTIVITIESID": dailyActivityId,
						"TXWEEKLYACTIVITIES.WEEKLYACTIVITIESID": oArgs.weeklyactivityId,
						"DMAGEUNIT.MESSUREUNITID": 30,
						"REPORTDATE": new Date(),
						"DEADQUANTITY": inputMortalityValue,
						"DISCARDEDQUANTITY": inputDiscardValue,
						"AGE": oArgs.dailyRegistersNumber,
						"CREATEBY": "SYSTEM",
						"CREATEDATE": new Date()
					};
					console.log("object dailyActivity");
					console.log(dailyActivity);
					
					oModel.create("/TXDAILYACTIVITIES", dailyActivity, {
						async: false,
						success: (objResult) => {
							console.log(objResult);
						},
						error: (error) => {
							console.log(error);
						}
					});
					
					if(oArgs.dailyRegistersNumber == 7){
						oModel.read("/TXWEEKLYACTIVITIES/$count", {
							async: false,
							success: (number) => {
								console.log(number);
								var WEEKLYACTIVITIESID = parseInt(number);
								
								var oWeeklyActivity = {
									"WEEKLYACTIVITIESID": WEEKLYACTIVITIESID + 1,
									"TXBROILERSLOT.BROILERSLOTID": oArgs.lotId,
									"DMWEIGHTUNIT.MESSUREUNITID": 24,
									"REPORTDATE": new Date(),
									"WEEKNUMBER": parseInt(oArgs.weekId) + 1,
									"CHICKENSAVGWEIGHT": "0",
									"SAMPLINGQUANTITY": 0,
									"CREATEBY": "SYSTEM",
									"CREATEDATE": new Date() 	
								};
								console.log("SEMANA A CREAR");
								console.log(oWeeklyActivity);
								
								oModel.create('/TXWEEKLYACTIVITIES', oWeeklyActivity, {
									async: false,
									success: (objSuccess) => {
										console.log(objSuccess);
											var btnReport = oView.byId("btnReport");
											var btnWeight = oView.byId("btnWeight");
											console.log(btnReport);
											console.log(btnReport);
											btnReport.setVisible(false);
											btnWeight.setVisible(true);
									},
									error: (error) => {
										console.log(error);
									}
								});
							}
						}) 
					}
				},
				error: (error) => {
					console.log(error);
				}
			})
			/*
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
				var btnReport = oView.byId("btnReport");
				var btnWeight = oView.byId("btnWeight");
				console.log(btnReport);
				console.log(btnReport);
				btnReport.setVisible(false);
				btnWeight.setVisible(true);
			}

			sap.ui.getCore().byId("inputMortality").setValue("0");
			sap.ui.getCore().byId("inputDiscard").setValue("0");

			var days = oModel.getProperty("/ShedsCollection/" + oArgs.shedId + "/weeks/" + oArgs.weekId + "/days");
			days.push(dailyData);
			oModel.setProperty("/ShedsCollection/" + oArgs.shedId + "/weeks/" + oArgs.weekId + "/days", days);
			*/
		},
		onDialogPress: function (oEvent) {
			var _i18n = this.getI18n();
			var oView = this.getView();
			var oTableControl = oView.byId("tableContol");
			var oTableControlLength = oTableControl.getItems().length;

			var oInputMortality = new sap.m.Input("inputMortality", {
				type: "Number",
				enabled: true,
				placeholder: _i18n.getText("detail_placeholderMortality"),
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
				placeholder: _i18n.getText("detail_placeholderDiscard"),
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
									text: _i18n.getText("detail_simpleFormLabel1"),
									required: true
								}),
								oInputMortality
								,
								new sap.m.Label({
									design: "Bold",
									text: _i18n.getText("detail_simpleFormLabel2"),
									required: true
								}),
								oInputDiscard
							]
						})
					],
					beginButton: new sap.m.Button("btnAdd",{
						text: _i18n.getText("detail_simpleFormBtn1"),
						type: "Accept",
						press: function (){
							that.reportingDailyData();
							dialog.close();
							dialog.destroy();
						} 
					}),
					endButton: new sap.m.Button({
						text: _i18n.getText("detail_simpleFormBtn2"),
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
		},
		getI18n: function() {
            return this.getOwnerComponent().getModel("i18n").getResourceBundle();
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