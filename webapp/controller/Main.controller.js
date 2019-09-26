//sources: Slides from the lecture
//         sapui5.hana.ondemand.com (onSort)
//Author: Iurii Chernovalov

sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/UIComponent",
    "sap/ui/model/Sorter",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/model/json/JSONModel",
], function (Controller, UIComponent, Sorter, Filter, FilterOperator, JSONModel) {
    "use strict";

    return Controller.extend("de.nak.hausarbeit.controller.Main", {

        /**
         * Initializes the Main controller.
         * Sets the model in order to display the customer list.
         */
        onInit : function () {
            var oJSONData = {
                busy : false,
                order : 0
            };
            var oModel = new JSONModel(oJSONData);
            this.getView().setModel(oModel, "appView");
        },

        /**
         * Gets executed when the Add button is pressed.
         * Shows an empty Detail view to create a new customer entry.
         */
        onAdd : function () {
            sap.ui.core.UIComponent.getRouterFor(this).navTo("add");
        },

        /**
         * Gets executed when an item of the list is slected.
         * Shows the Detail view with the given customer data.
         * @param oEvent
         */
        onPressListItem : function (oEvent) {
            var oSelectedItem;

            oSelectedItem = oEvent.getSource();
            console.log(oSelectedItem);
            sap.ui.core.UIComponent.getRouterFor(this).navTo("detail",
                {entry: oSelectedItem.getBindingContext("customer").getPath().substr(1)});
        },

        /**
         * Gets executed when the search button or enter is pressed in the search box.
         * Applies a filter to the customer list filtering the Name1 parameter.
         * @param oEvent
         */
        onSearchName : function (oEvent) {
            var aFilter = [];
            var sQuery = oEvent.getParameter("query");

            if(sQuery){
                aFilter.push(new Filter("Name1",
                    FilterOperator.Contains, sQuery));
            }

            this.byId("customerTable").getBinding("items").filter(aFilter);
        },

        /**
         * Gets executed when the Sort button is pressed.
         * Sorts the customer list appending or descending regarding its Kunnr property.
         */
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