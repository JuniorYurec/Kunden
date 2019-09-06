sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/UIComponent"
], function (Controller, UIComponent) {
    "use strict";

    return Controller.extend("de.nak.gbook.controller.Main", {

        onPressAdd : function () {
            sap.ui.core.UIComponent.getRouterFor(this).navTo("add");
        },

        onPressListItem : function (oEvent) {
            var oSelectedItem;
            oSelectedItem = oEvent.getSource();
            console.log(oSelectedItem);
            sap.ui.core.UIComponent.getRouterFor(this).navTo("detail",
                {entry: oSelectedItem.getBindingContext("hotel").getPath().substr(1)});
        }
    });
});