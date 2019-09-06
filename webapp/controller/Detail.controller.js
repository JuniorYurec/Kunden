sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/routing/History",
    "sap/ui/core/UIComponent",
    "sap/ui/model/json/JSONModel"
], function (Controller, History, UiComponent, JSONModel) {
    "use strict";

    return Controller.extend("de.nak.gbook.controller.Detail", {

        onInit: function (oEvent) {
            // Lokales JSON-Model
            var oViewModel = new JSONModel();
            this.getView().setModel(oViewModel, "viewModel");

            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.getRoute("detail").attachPatternMatched(this._onDetailRouteMatched, this);
            oRouter.getRoute("add").attachPatternMatched(this._onAddRouteMatched,
                this);
        },


        _onAddRouteMatched: function (oEvent) {
            var oModel = this.getView().getModel("hotel");
            var oContext = oModel.createEntry("/GuestBookEntrySet");
            this.getView().setBindingContext(oContext, "hotel");
            var oViewModel = this.getView().getModel("viewModel");
            oViewModel.setProperty('/enabled', true);
            oViewModel.setProperty('/saveActive', true);
        },


        _onDetailRouteMatched: function (oEvent) {
            var oArguments = oEvent.getParameter("arguments");
            console.log(oArguments.entry);
            var oView = this.getView();
            var oModel = oView.getModel("hotel");
            var oViewModel = oView.getModel("viewModel");
            oViewModel.setProperty('/enabled', false);
            oViewModel.setProperty('/saveActive', false);
            var oContext = oModel.createBindingContext("/" + oArguments.entry);
            oView.setBindingContext(oContext, "hotel");
        },

        onPressSave: function () {
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            var oModel = this.getView().getModel("hotel");
            var oBindingContext = this.getView().getBindingContext("hotel");
            var sPath = oBindingContext.getPath();
            var oEntity = oBindingContext.getObject();
            var oParameters = {
                success: function () {
                    MessageToast.show("Eintrag erfolgreich gespeichert", {closeOnBrowserNavigation: false});
                    oRouter.navTo("main", {}, true);
                },
                error: function (oError) {
                    oModel.refresh();
                    MessageBox.show("Eintrag konnte nicht gespeichert werden",
                        MessageBox.Icon.ERROR, "Fehler!");
                }
            };

            if (oEntity.Id !== undefined) {
                // Eintrag vorhanden (Update)
                oModel.update(sPath, oEntity, oParameters);
            } else {

                // Anlegen über eigene Entität (Create)
                var oCreate = {
                    Name: oEntity.Name,
                    Text: oEntity.Text
                };
                oModel.create("/GuestBookEntrySet", oCreate, oParameters);
            }
        },

        onPressCancel: function(){
            this.onNavButtonPress();
        },

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