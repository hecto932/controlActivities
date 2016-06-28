sap.ui.jsview("controlActivities.view.Weight", {

	/** Specifies the Controller belonging to this View. 
	 * In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	 * @memberOf controlActivities.view.Weight
	 */
	getControllerName: function() {
		return "controlActivities.controller.Weight";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	 * Since the Controller is given to this method, its event handlers can be attached right away. 
	 * @memberOf controlActivities.view.Weight
	 */
	createContent: function(oController) {

		var oSimpleForm = new sap.ui.layout.form.SimpleForm({
			editable: true,
			maxContainerCols: 2,
			layout: sap.ui.layout.form.SimpleFormLayout.ResponsiveGridLayout,
			labelSpanL: 4,
			labelSpanM: 4,
			emptySpanL: 4,
			columnsL: 4,
			columnsM: 4,
			title: "Cuantificacion de peso semanal",
			content: [
				new sap.m.Label({
					design: "Bold",
					text: "Cantidad de cuadriculas",
					required: true,
					textAlign: "Center"
				}),
				new sap.m.Input("inputCuadriculas", {
					type: "Number",
					enabled: true,
					placeholder: "Numero de mortalidad...",
					value: {
						path: "dummy>/input/squares",
						type: "sap.ui.model.type.Integer",
						constraints: {
							minimum: 1
						}
					},
					liveChange: function(oEvent){
						if(this.getValue() <= 0 || this.getValue() == ""){
							sap.ui.getCore().byId("btnCuadriculas").setEnabled(false);
						} else{
							sap.ui.getCore().byId("btnCuadriculas").setEnabled(true);
						}
					}
				}),
				new sap.m.Label(),
				new sap.m.Button("btnCuadriculas", {
					text : "Aceptar",
					type : "Accept",
					width : "100%",
					enabled: false,
					press: function(oEvent){
						oController.onWeight(oEvent);
					}
				})
			]
		});

		var oGridLayout = new sap.ui.layout.Grid({
			hSpacing: 0,
			defaultSpan: "XL10 L10 M10 S12",
			defaultIndent: "XL1 L1 M1 S0",
			content: [
				oSimpleForm
			]
		});

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

		return new sap.m.Page("weightPage", {
			title: "Control de Produccion",
			content: [
				oPanel,
				oGridLayout
			],
			enableScrolling : true,
			showNavButton : true,
			//footer: oBar,
			navButtonPress: function (oEvent){  
          		oController.onNavBack(oEvent);
          	}
		});
	}

});