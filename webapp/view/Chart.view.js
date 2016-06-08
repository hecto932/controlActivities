sap.ui.jsview("controlActivities.view.Chart", {

	/** Specifies the Controller belonging to this View. 
	 * In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	 * @memberOf controlActivities.view.Chart
	 */
	getControllerName: function() {
		return "controlActivities.controller.Chart";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	 * Since the Controller is given to this method, its event handlers can be attached right away. 
	 * @memberOf controlActivities.view.App
	 */
	createContent: function(oController) {

		jQuery.sap.require("sap.viz.ui5");

		var oVizFrame = new sap.viz.ui5.controls.VizFrame("vizFrame", {
			height: "700px",
			width: "100%",
			uiConfig: {applicationSet : 'Fiori'}
		});

		var oChartContainerContent = new sap.suite.ui.commons.ChartContainerContent({
			icon: "sap-icon://bubble-chart",
			title: "Bubble Chart",
			content: [
				oVizFrame
			]
		});

		var oChartContainer = new sap.suite.ui.commons.ChartContainer("chartContainer", {
			autoAdjustHeight: true,
			contentChange: "attachContentChange",
			personalizationPress: "attachPersonalizationPress",
			showFullScreen: true,
			showLegend: false,
			title: "Halo",
			content: [
				oChartContainerContent
			]	
		});

		return new sap.m.Page({
			title: "Grafica",
			content: [
				oChartContainer
			]
		});
	}

});