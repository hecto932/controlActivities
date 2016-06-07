sap.ui.define([], function(){
	"use strict";

	return {
		verifyStatusMortality: function(mortality){

			var status = "";
			if(mortality == 0){
				status = "None";
			}else if(mortality > 0 && mortality < 20){
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
			if(discard == 0){
				status = "None";
			}else if(discard > 0 && discard < 10){
				status = "Success";
			}else if(discard >= 10 && discard < 20){
				status = "Warning";
			}else {
				status = "Error";
			}
			
			return status;
		}
	};
});