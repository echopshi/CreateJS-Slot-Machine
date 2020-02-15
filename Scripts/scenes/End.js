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
    var End = /** @class */ (function (_super) {
        __extends(End, _super);
        // PUBLIC PROPERTIES
        // CONTRUCTOR
        function End() {
            var _this = _super.call(this) || this;
            _this._endBackground = new objects.Button("./Assets/images/start-background.png", 0, 0, false);
            _this._thankyouLabel = new objects.Label("Thank You for playing!", "42px", "Consolas", "Red", 380, 230, true);
            _this._restartButton = new objects.Button("./Assets/images/buttons/restart-button.png", 380, 450, true);
            _this.Start();
            return _this;
        }
        // PUBLIC METHODS
        End.prototype.Start = function () {
            this.addChild(this._endBackground);
            this.addChild(this._thankyouLabel);
            this.addChild(this._restartButton);
            this.Main();
        };
        End.prototype.Update = function () { };
        End.prototype.Main = function () {
            this._restartButton.HoverOn();
            this._restartButton.on("click", function () {
                config.GameConfig.SCENE_STATE = scenes.State.PLAY;
            });
        };
        return End;
    }(objects.Scene));
    scenes.End = End;
})(scenes || (scenes = {}));
//# sourceMappingURL=End.js.map