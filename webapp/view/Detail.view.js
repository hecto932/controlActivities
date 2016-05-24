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
		
		var oObjectHeader = new sap.m.ObjectHeader("objectHeader", {

			title : "{lote}",
			icon: "{icon}",
			intro: "{intro}",
			fullScreenOptimized: false,
			condensed: false,
			responsive: true,
			backgroundDesign: "Solid",
			statuses: [
				new sap.m.ObjectStatus({
					title: "Peso del Lote",
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


		var oTable = new sap.m.Table();
		oTable.addStyleClass("tableSpace");

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
		var col4 = new sap.m.Column("col4", { 
			header: new sap.m.Label({ text: "Cant. Alimentación", textAlign: "Center", design: "Bold" }), 
			hAlign: "Center" 
		});
		
		oTable
		.addColumn(col1)
		.addColumn(col2)
		.addColumn(col3)
		.addColumn(col4);
		/*
		var oItem1 = new sap.m.ColumnListItem({
			cells: [
				new sap.m.ObjectNumber({
					number: "1",
					state: "None"
				}),
				new sap.m.ObjectNumber({
					number: "4",
					numberUnit: "Aves",
					state: "Success"
				}),
				new sap.m.ObjectNumber({
					number: "7",
					numberUnit: "Aves",
					state: "Success"
				}),
				new sap.m.ObjectNumber({
					number: "123",
					numberUnit: "Kg",
					state: "Success"
				})
			]
		});

		var oItem2 = new sap.m.ColumnListItem({
			cells: [
				new sap.m.ObjectNumber({
					number: "2",
					state: "None"
				}),
				new sap.m.ObjectNumber({
					number: "22",
					numberUnit: "Aves",
					state: "Warning"
				}),
				new sap.m.ObjectNumber({
					number: "3",
					numberUnit: "Aves",
					state: "Success"
				}),
				new sap.m.ObjectNumber({
					number: "4124",
					numberUnit: "Kg",
					state: "Success"
				})
			]
		});

		var oItem3 = new sap.m.ColumnListItem({
			cells: [
				new sap.m.ObjectNumber({
					number: "3",
					state: "None"
				}),
				new sap.m.ObjectNumber({
					number: "15",
					numberUnit: "Aves",
					state: "Success"
				}),
				new sap.m.ObjectNumber({
					number: "10",
					numberUnit: "Aves",
					state: "Warning"
				}),
				new sap.m.ObjectNumber({
					number: "122",
					numberUnit: "Kg",
					state: "Success"
				})
			]
		});

		var oItem4 = new sap.m.ColumnListItem({
			cells: [
				new sap.m.ObjectNumber({
					number: "4",
					state: "None"
				}),
				new sap.m.ObjectNumber({
					number: "12",
					numberUnit: "Aves",
					state: "Success"
				}),
				new sap.m.ObjectNumber({
					number: "5",
					numberUnit: "Aves",
					state: "Warning"
				}),
				new sap.m.ObjectNumber({
					number: "1234",
					numberUnit: "Kg",
					state: "Success"
				})
			]
		});

		var oItem5 = new sap.m.ColumnListItem({
			cells: [
				new sap.m.ObjectNumber({
					number: "5",
					state: "None"
				}),
				new sap.m.ObjectNumber({
					number: "50",
					numberUnit: "Aves",
					state: "Error"
				}),
				new sap.m.ObjectNumber({
					number: "18",
					numberUnit: "Aves",
					state: "Warning"
				}),
				new sap.m.ObjectNumber({
					number: "6786",
					numberUnit: "Kg",
					state: "Success"
				})			]
		});

		var oItem6 = new sap.m.ColumnListItem({
			cells: [
				new sap.m.ObjectNumber({
					number: "6",
					state: "None"
				}),
				new sap.m.ObjectNumber({
					number: "23",
					numberUnit: "Aves",
					state: "Warning"
				}),
				new sap.m.ObjectNumber({
					number: "6",
					numberUnit: "Aves",
					state: "Success"
				}),
				new sap.m.ObjectNumber({
					number: "6786",
					numberUnit: "Kg",
					state: "Success"
				})
			]
		});

		var oItem7 = new sap.m.ColumnListItem({
			cells: [
				new sap.m.ObjectNumber({
					number: "7",
					state: "None"
				}),
				new sap.m.ObjectNumber({
					number: "45",
					numberUnit: "Aves",
					state: "Error"
				}),
				new sap.m.ObjectNumber({
					number: "28",
					numberUnit: "Aves",
					state: "Error"
				}),
				new sap.m.ObjectNumber({
					number: "678",
					numberUnit: "Kg",
					state: "Success"
				})
			]
		});

		oTable.addItem(oItem1);
		oTable.addItem(oItem2);
		oTable.addItem(oItem3);
		oTable.addItem(oItem4);
		oTable.addItem(oItem5);
		oTable.addItem(oItem6);
		oTable.addItem(oItem7);
		*/
		var oGridLayout = new sap.ui.layout.Grid({
			hSpacing: 0,
			defaultSpan: "XL10 L10 M10 S12",
			defaultIndent: "XL1 L1 M1 S0",
			content: [
				oTable
			]
		});
		
		var oBar = new sap.m.Bar({
			contentLeft : [],
			contentMiddle : [],
			contentRight : [
				new sap.m.Button({
					text : "Agregar",
					type : "Default",
					icon : "sap-icon://add"
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
			title: "Galpón 1 - Control de Producción",
			content: [
				oPanel,
				oGridLayout
			],
			footer: oBar
		});
	}

});