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

        onAdd : function () {
            sap.ui.core.UIComponent.getRouterFor(this).navTo("add");
        },

        onPressListItem : function (oEvent) {
            var oSelectedItem;

            oSelectedItem = oEvent.getSource();
            console.log(oSelectedItem);
            sap.ui.core.UIComponent.getRouterFor(this).navTo("detail",
                {entry: oSelectedItem.getBindingContext("customer").getPath().substr(1)});
        },

        onSearchName : function (oEvent) {
            var aFilter = [];
            var sQuery = oEvent.getParameter("query");

            if(sQuery){
                aFilter.push(new Filter("Name1",
                    FilterOperator.Contains, sQuery));
            }

            this.byId("customerTable").getBinding("items").filter(aFilter);
        },
        onSort: function () {
            var oView = this.getView(),
                aStates = [undefined, "asc", "desc"],

                iOrder = oView.getModel("appView").getProperty("/order");

            iOrder = (iOrder + 1) % aStates.length;
            var sOrder = aStates[iOrder];

            oView.getModel("appView").setProperty("/order", iOrder);

            oView.byId("customerTable").getBinding("items").sort(sOrder && new Sorter("Kunnr", sOrder === "desc"));

        }
    });
});