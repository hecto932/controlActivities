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

		var oVizFrame = new sap.viz.ui5.controls.VizFrame("oVizFrame", {
			width: "100%",
			uiConfig: { 
				applicationSet: "fiori"
			}
		});

		var oChartContainerContent = new sap.suite.ui.commons.ChartContainerContent({
			icon : "sap-icon://line-chart", 
			title : "Line Chart",
			content: oVizFrame
		});

		var oChartContainer = new sap.suite.ui.commons.ChartContainer("oChartContainer", {
			title: "Calidad del Galpon",
			showFullScreen: true,
			content: oChartContainerContent
		});

		return new sap.m.Page({
			title: "Control de Produccion",
			content: [
				oChartContainer
			],
			enableScrolling : true,
			showNavButton : true
		});
	}

});