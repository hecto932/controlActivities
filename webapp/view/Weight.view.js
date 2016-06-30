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
			title: "{i18n>weight_formTitle}",
			content: [
				new sap.m.Text("textItr", {
					text: "{i18n>weight_text} {missing}"
				}).addStyleClass("itr"),
				new sap.m.Label({
					design: "Bold",
					text: "{i18n>weight_lblText}",
					required: true,
					textAlign: "Center"
				}),
				new sap.m.Input("inputWeight", {
					type: "Number",
					enabled: true,
					placeholder: "Peso del Ave",
					value: {
						path: "dummy>/input/average",
						type: "sap.ui.model.type.Float",
						constraints: {
							minimum: 1
						}
					},
					liveChange: function(oEvent){
						if(this.getValue() == "" || this.getValue() <= 0){
							sap.ui.getCore().byId("btnSave").setEnabled(false);
						} else{
							sap.ui.getCore().byId("btnSave").setEnabled(true);
						}
					}
				}),
				new sap.m.Label(),
				new sap.m.Button("btnSave", {
					text : "{i18n>weight_btnTextAccept}",
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
			intro: "{i18n>weight_objectHeaderText} {numberShed}",
			fullScreenOptimized: true,
			condensed: false,
			responsive: true,
			backgroundDesign: "Solid",
			statuses: [
				new sap.m.ObjectStatus({
					title: "{i18n>weight_objectStatusText1}",
					text: "{status_text1}",
					state: "None"
				}),
				new sap.m.ObjectStatus({
					title: "{i18n>weight_objectStatusText2}",
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

		return new sap.m.Page("weight", {
			title: "{i18n>weight_pageTitle}",
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