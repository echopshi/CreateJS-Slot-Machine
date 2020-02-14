"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * Author: Hang Li
 * Student Number: 300993981
 * Creation Date: Feb 14, 2020
 * Game App Description: CreateJS Slot Machine
 * Revision History: available in GitHub
 */
var scenes;
(function (scenes) {
    var Start = /** @class */ (function (_super) {
        __extends(Start, _super);
        // PUBLIC PROPERTIES
        // CONTRUCTOR
        function Start() {
            var _this = _super.call(this) || this;
            _this.startBackground = new objects.Button("./Assets/images/start-background.png", 0, 0, false);
            _this.slotMachineGraphic = new objects.Button("./Assets/images/slotMachineHolder.png", 280, 200, false);
            _this.startButton = new objects.Button("./Assets/images/buttons/start-button.png", 380, 450, true);
            _this.Start();
            return _this;
        }
        // PUBLIC METHODS
        Start.prototype.Start = function () {
            this.addChild(this.startBackground);
            this.addChild(this.slotMachineGraphic);
            this.addChild(this.startButton);
            this.Main();
        };
        Start.prototype.Update = function () { };
        Start.prototype.Main = function () {
            this.startButton.HoverOn();
            this.startButton.on("click", function () {
                config.GameConfig.SCENE_STATE = scenes.State.PLAY;
            });
        };
        return Start;
    }(objects.Scene));
    scenes.Start = Start;
})(scenes || (scenes = {}));
//# sourceMappingURL=Start.js.map