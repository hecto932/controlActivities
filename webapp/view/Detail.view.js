sap.ui.jsview("controlActivities.view.Detail", {

	/** Specifies the Controller belonging to this View. 
	 * In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	 * @memberOf controlActivities.view.Detail
	 */
	getControllerName: function() {
		return "controlActivities.controller.Detail";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	 * Since the Controller is given to this method, its event handlers can be attached right away. 
	 * @memberOf controlActivities.view.Detail
	 */
	createContent: function(oController) {
		
		var oObjectHeader = new sap.m.ObjectHeader({

			title : "{intro}",
			icon: "{icon}",
			intro: "{i18n>text_shed} {numberShed}",
			fullScreenOptimized: true,
			condensed: false,
			responsive: true,
			backgroundDesign: "Solid",
			statuses: [
				new sap.m.ObjectStatus({
					title: "Peso del galpon",
					text: "{status_text1}",
					state: "None"
				}),
				new sap.m.ObjectStatus({
					title: "Cantidad de Aves",
					text: "{status_text2}",
					state: "None"
				})
			]
		});


		var oTable = new sap.m.Table("tableContol");

		var col1 = new sap.m.Column("col1", { 
			header: new sap.m.Label({ text: "Día", textAlign: "Center", design: "Bold" }), 
			hAlign: "Center" 
		});
		var col2 = new sap.m.Column("col2", { 
			header: new sap.m.Label({ text: "Mortalidad", textAlign: "Center", design: "Bold" }), 
			hAlign: "Center" 
		});
		var col3 = new sap.m.Column("col3", { 
			header: new sap.m.Label({ text: "Descarte", textAlign: "Center", design: "Bold" }), 
			hAlign: "Center" 
		});
		
		oTable
		.addColumn(col1)
		.addColumn(col2)
		.addColumn(col3);

		var oColumnListItemTemplate = new sap.m.ColumnListItem({
			cells: [
				new sap.m.ObjectNumber({
					number: "{day}",
					state: "None"
				}),
				new sap.m.ObjectNumber({
					number: "{mortality}",
					numberUnit: "{numberUnit}",
					state: {
						parts: [
							{ path : "mortality" }
						],
						formatter: oController.formatter.verifyStatusMortality
					}
				}),
				new sap.m.ObjectNumber({
					number: "{discard}",
					numberUnit: "{numberUnit}",
					state: {
						parts: [
							{ path : "discard" }
						],
						formatter: oController.formatter.verifyStatusDiscard
					}
				})
			]
		});

		oTable.bindItems("days", oColumnListItemTemplate);

		var oGridLayout = new sap.ui.layout.Grid({
			hSpacing: 0,
			defaultSpan: "XL10 L10 M10 S12",
			defaultIndent: "XL1 L1 M1 S0",
			content: [
				oTable
			]
		});
		
		var oBar = new sap.m.Bar({
			contentLeft : [
				new sap.m.Button("btnWeight",{
					text : "Calcular peso",
					type : "Default",
					icon : "sap-icon://compare-2",
					press: function(oEvent){
						oController.onRegisterWeight(oEvent);
					}
				})
			],
			contentMiddle : [],
			contentRight : [
				new sap.m.Button("btnReport",{
					text : "Reportar",
					type : "Default",
					icon : "sap-icon://add",
					press: function(oEvent){
						oController.onDialogPress(oEvent);
					}
				})
			]
		});

		var oRatingIndicator = new sap.m.RatingIndicator({
			iconSize: "1.3em",
			enabled : false,
			maxValue : 5,
			value : "{shedRating}",
			visualMode: "Full"
		})

		var oFlexBox = new sap.m.FlexBox({
			alignItems:"Start",
			justifyContent:"Center",
			items: [
				oRatingIndicator
			]
		});

		var oPanel = new sap.m.Panel({
			backgroundDesign: "Solid",
			content: [
				oObjectHeader,
				oFlexBox
			]
		});

 		return new sap.m.Page("detail", {
			title: "{i18n>appTitle}",
			content: [
				oPanel,
				oGridLayout
			],
			footer: oBar,
			showNavButton: "{device>/system/phone}",
			navButtonPress: function (oEvent) {  
          		oController.onNavBack(oEvent);
          	}
		});
	}

});