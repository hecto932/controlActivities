sap.ui.jsview("controlActivities.view.Master", {

	/** Specifies the Controller belonging to this View. 
	 * In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	 * @memberOf controlActivities.view.Master
	 */
	getControllerName: function() {
		return "controlActivities.controller.Master";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	 * Since the Controller is given to this method, its event handlers can be attached right away. 
	 * @memberOf controlActivities.view.Master
	 */
	createContent: function(oController) {

		var oList = new sap.m.List("myList");

		var oObjectListItem = new sap.m.ObjectListItem({
			title: "{i18n>objectWeek} {id}",
			number: "{number}",
			numberUnit: "{numberUnit}",
			type: "Active",
			numberState: "Success",
			attributes: [
				new sap.m.ObjectAttribute({
					text : "{initDate} - {lastDate}",
					active : false
				})
			],
			press: function(oEvent){
				oController.handlePress(oEvent);
			}
		});

		oList.bindAggregation("items", "weeks", oObjectListItem);
		//oList.setMode("SingleSelectMaster");

		var oBar = new sap.m.Bar({
			contentLeft : [],
			contentMiddle : [],
			contentRight : [
				new sap.m.Button({
					text : "Ver grafica",
					type : "Default",
					icon : "sap-icon://crossed-line-chart",
					press: function(oEvent){
						oController.OnShowGraphic(oEvent);
					}
				})
			]
		});
	
		return new sap.m.Page("master", {
			title: "{i18n>masterTitle}",
			content: [
				oList
			],
			enableScrolling : true,
			showNavButton : true,
			footer: oBar,
			navButtonPress: function (oEvent){  
          		oController.onNavBack(oEvent);
          	}
		});
	}

});