sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/routing/History",
    "sap/ui/core/UIComponent",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageBox",
    "sap/m/MessageToast"
], function (Controller, History, UiComponent, JSONModel, MessageBox, MessageToast) {
    "use strict";

    return Controller.extend("de.nak.hausarbeit.controller.Detail", {

        /**
         * Initalizes the Detail Controller and sets routing.
         * @param oEvent
         */
        onInit: function (oEvent) {
             var oViewModel = new JSONModel();
             this.getView().setModel(oViewModel, "viewModel");
             var oRouter = sap.ui.core.UIComponent.getRouterFor(this);

             oRouter.getRoute("detail").attachPatternMatched(this._onDetailRouteMatched, this);
             oRouter.getRoute("add").attachPatternMatched(this._onAddRouteMatched, this);
        },

        /**
         *
         * @param oEvent
         * @private
         */
        _onAddRouteMatched: function (oEvent) {
            var oModel = this.getView().getModel("customer");
            var oContext = oModel.createEntry("/CustomerEntrySet");
            this.getView().setBindingContext(oContext, "customer");
            var oViewModel = this.getView().getModel("viewModel");
            oViewModel.setProperty('/enabled', true);
            oViewModel.setProperty('/saveActive', true);
        },

        /**
         * Binds the customer object for displaying / editing its data.
         * @param oEvent
         * @private
         */
        _onDetailRouteMatched: function (oEvent) {
            var oArguments = oEvent.getParameter("arguments");
            console.log(oArguments.entry);
            var oView = this.getView();
            var oViewModel = oView.getModel("viewModel");
            var oModel = oView.getModel("customer");
            oViewModel.setProperty('/enabled', true);
            oViewModel.setProperty('/saveActive', true);
            var oContext = oModel.createBindingContext("/" + oArguments.entry);
            oView.setBindingContext(oContext, "customer");
        },

        /**
         * Will be executed when user presses the save button.
         * Saves all changes to the given customer object and returns a status message.
         */
        onPressSave: function () {
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            var oModel = this.getView().getModel("customer");
            var oBindingContext = this.getView().getBindingContext("customer");
            var sPath = oBindingContext.getPath();
            var oEntity = oBindingContext.getObject();

            var oParameters = {
                success: function () {
                    MessageToast.show("Eintrag gespeichert", {closeOnBrowserNavigation: false});
                    oRouter.navTo("main", {}, true);
                },
                error: function (oError) {
                    oModel.refresh();
                    MessageToast.show("Eintrag nicht gespeichert", {closeOnBrowserNavigation: false});
                }
            };

            if (oEntity.Kunnr !== undefined) {
                var oUpdate = {
                    Kunnr: oEntity.Kunnr,
                    Anred: oEntity.Anred,
                    Name1: oEntity.Name1,
                    Name2: oEntity.Name2,
                    Stras: oEntity.Stras,
                    Pstlz: oEntity.Pstlz,
                    Ort01: oEntity.Ort01,
                    Land1: oEntity.Land1
                //    Telf1: oEntity.Telf1
                };
                oModel.update(sPath, oUpdate, oParameters);
            } else {
                var oCreate = {
                    Anred: oEntity.Anred,
                    Name1: oEntity.Name1,
                    Name2: oEntity.Name2,
                    Stras: oEntity.Stras,
                    Pstlz: oEntity.Pstlz,
                    Ort01: oEntity.Ort01,
                    Land1: oEntity.Land1
                //   Telf1: oEntity.Telf1

                };
                oModel.create("/CustomerEntrySet", oCreate, oParameters);
            }
        },

        /**
         * Gets executed when the user presses the cancel button.
         * Navigates back to the Main View.
         */
        onPressCancel: function(){
            this.onNavButtonPress();
        },

        /**
         * Gets executed when the back button is pressed.
         * Navigates back to the prvious view.
         */
        onNavButtonPress: function () {
            // Check if there is a UI5 history
            var history = History.getInstance();
            var previousHash = history.getPreviousHash();

            // If UI5 recorded previous pages, simply go back in history...
            if (previousHash !== undefined) {
                window.history.go(-1);
            } else {
                var oRouter = UIComponent.getRouterFor(this); // Instead of full qualified name, I have imported the component
                oRouter.navTo("main", {}, true);
            }
        }
    });
});