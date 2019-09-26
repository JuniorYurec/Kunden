//source: Slides from the lecture
//Author: Niklas von Weihe

sap.ui.define([
    "sap/ui/core/UIComponent"
], function (UIComponent) {
    "use strict";
    return UIComponent.extend("de.nak.hausarbeit.Component", {
        metadata: {
            manifest: "json"
        },
        init: function () {
            // call the init function of the parent
            UIComponent.prototype.init.apply(this, arguments);
            // Router Initialisieren
            this.getRouter().initialize();
        }
    });
});