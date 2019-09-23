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

        onInit: function (oEvent) {
            // Lokales JSON-Model
             var oViewModel = new JSONModel();
            this.getView().setModel(oViewModel, "viewModel");
             var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
             oRouter.getRoute("detail").attachPatternMatched(this._onDetailRouteMatched, this);
             oRouter.getRoute("add").attachPatternMatched(this._onAddRouteMatched, this);


        },


        _onAddRouteMatched: function (oEvent) {
            var oModel = this.getView().getModel("customer");
            var oContext = oModel.createEntry("/CustomerEntrySet");
            this.getView().setBindingContext(oContext, "customer");
            var oViewModel = this.getView().getModel("viewModel");
            oViewModel.setProperty('/enabled', true);
            oViewModel.setProperty('/saveActive', true);
        },


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

        onPressSave: function () {
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            var oModel = this.getView().getModel("customer");
            var oBindingContext = this.getView().getBindingContext("customer");
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
                console.log("update!!!");
            } else {
                // Anlegen über eigene Entität (Create)
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
                console.log("CREATE!!!");

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