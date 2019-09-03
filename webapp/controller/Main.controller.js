sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/UIComponent"
], function (Controller, UIComponent) {
    "use strict";

    return Controller.extend("de.nak.gbook.controller.Main", {

        onPressNavigate: function () {
            var oRouter = UIComponent.getRouterFor(this); // Instead of full qualified name, I have imported the component
            oRouter.navTo("detail");
        }
    });
});