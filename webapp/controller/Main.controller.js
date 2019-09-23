sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/UIComponent",
    "sap/ui/model/Sorter",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/model/json/JSONModel",
    "sap/ui/table/library"
], function (Controller, UIComponent, Sorter, Filter, FilterOperator, JSONModel, library) {
    "use strict";

    return Controller.extend("de.nak.hausarbeit.controller.Main", {
        onInit : function () {
            var oJSONData = {
                busy : false,
                order : 0
            };
            var oModel = new JSONModel(oJSONData);
            this.getView().setModel(oModel, "appView");
        },

        onPressAdd : function () {
            sap.ui.core.UIComponent.getRouterFor(this).navTo("add");
        },

        onListItemPress : function (oEvent) {
            var oSelectedItem;
            oSelectedItem = oEvent.getSource();
            console.log(oSelectedItem);
            sap.ui.core.UIComponent.getRouterFor(this).navTo("detail",
                {entry: oSelectedItem.getBindingContext("customer").getPath().substr(1)});
        }
    });
});