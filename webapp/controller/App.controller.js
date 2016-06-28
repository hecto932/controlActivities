sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/routing/History",
], function(Controller, History) {
    "use strict";

    return Controller.extend("controlActivities.controller.App", {
        onInit: function() {
        	// apply content density mode to root view
			this.getView().addStyleClass(this.getOwnerComponent().getContentDensityClass());
        }
    });

});
