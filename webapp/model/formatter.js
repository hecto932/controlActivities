sap.ui.define([], function(){
	"use strict";

	return {
		verifyStatusMortality: function(mortality){

			var status = "";

			if(mortality >= 0 && mortality < 20){
				status = "Success";
			}else if(mortality >= 20 && mortality < 36){
				status = "Warning";
			}else {
				status = "Error";
			}
			
			return status;
		},
		verifyStatusDiscard: function(discard){

			var status = "";

			if(discard >= 0 && discard < 10){
				status = "Success";
			}else if(discard >= 10 && discard < 20){
				status = "Warning";
			}else {
				status = "Error";
			}
			
			return status;
		},
		formatWeight: function(n){
			if(n < 1000){
				return parseFloat(n / 1000);
			}
			return parseFloat(n);
		},
		getId: function productCount(oValue) {
		    //return the number of products linked to Category // sync call only to get $count
		    if (oValue) {
		        var sPath = this.getBindingContext().getPath() + '/Products';
		        var oBindings = this.getModel().bindList(sPath);
		        return oBindings.getLength();
		    }
		}
	};
});