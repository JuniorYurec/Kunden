sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/routing/History",
    "sap/ui/core/UIComponent"
], function (Controller, History, UIComponent) {
    "use strict";

    return Controller.extend("de.nak.gbook.controller.Detail", {

        onNavButtonPress: function () {

            // Check if there is a UI5 history
            var history = History.getInstance();
            var previousHash = history.getPreviousHash();

            // If UI5 recorded previous pages, simply go back in history...
            if(previousHash !== undefined){
                window.history.go(-1);
            } else {
                var oRouter = UIComponent.getRouterFor(this); // Instead of full qualified name, I have imported the component
                oRouter.navTo("main", {}, true);
            }

        }
    });
});