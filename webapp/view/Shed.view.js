sap.ui.jsview("controlActivities.view.Shed", {

	/** Specifies the Controller belonging to this View. 
	 * In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	 * @memberOf controller.Shed
	 */
	getControllerName: function() {
		return "controlActivities.controller.Shed";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	 * Since the Controller is given to this method, its event handlers can be attached right away.
	 * @memberOf controller.Shed
	 */
	createContent: function(oController) {
		var oTemplateTile = new sap.m.StandardTile({
			title: "{title}",
			info: "{info}",
			number: "{number}",
			numberUnit: "{numberUnit}",
			icon: "{icon}",
			press: function(oEvent){
				console.log(oEvent);
				oController.handlePress(oEvent);
			}
		});

		var oTileContainer = new sap.m.TileContainer();

		oTileContainer.bindAggregation("tiles", "/ShedsCollection", oTemplateTile);

		var oPage = new sap.m.Page({
			title: "{i18n>title}",
			enableScrolling: false,
			content: [
				oTileContainer
			]
		});

		return new sap.m.App("sheds", {
			pages: [
				oPage
			]
		});
	}

});