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
var objects;
(function (objects) {
    var Button = /** @class */ (function (_super) {
        __extends(Button, _super);
        function Button(imagePath, x, y, isCentered) {
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            if (isCentered === void 0) { isCentered = false; }
            var _this = _super.call(this, imagePath) || this;
            _this.image.addEventListener("load", function () {
                if (isCentered) {
                    _this.regX = _this.getBounds().width * 0.5;
                    _this.regY = _this.getBounds().height * 0.5;
                }
                _this.x = x;
                _this.y = y;
            });
            _this.on("mouseover", _this.MouseOver);
            _this.on("mouseout", _this.MouseOut);
            return _this;
        }
        Button.prototype.MouseOver = function () {
            console.log("mouse over");
            this.alpha = 0.7;
        };
        Button.prototype.MouseOut = function () {
            console.log("mouse out");
            this.alpha = 1.0;
        };
        return Button;
    }(createjs.Bitmap));
    objects.Button = Button;
})(objects || (objects = {}));
//# sourceMappingURL=Button.js.map