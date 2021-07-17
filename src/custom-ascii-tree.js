"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomAsciiTree = void 0;
var oo_ascii_tree_1 = require("oo-ascii-tree");
var CustomAsciiTree = /** @class */ (function (_super) {
    __extends(CustomAsciiTree, _super);
    function CustomAsciiTree(text) {
        var children = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            children[_i - 1] = arguments[_i];
        }
        var _this = _super.apply(this, __spreadArray([text], children)) || this;
        _this._customchildren = new Array();
        for (var _a = 0, children_1 = children; _a < children_1.length; _a++) {
            var child = children_1[_a];
            _this.add(child);
        }
        return _this;
    }
    CustomAsciiTree.prototype.printTree = function (output) {
        if (output === void 0) { output = process.stdout; }
        var ancestorsPrefix = '';
        for (var _i = 0, _a = this.ancestors; _i < _a.length; _i++) {
            var parent_1 = _a[_i];
            // -1 represents a "hidden" root, and so it's children
            // will all appear as roots (level 0).
            if (parent_1.level <= 0) {
                continue;
            }
            if (parent_1.last) {
                ancestorsPrefix += '  ';
            }
            else {
                ancestorsPrefix += ' │';
            }
        }
        var myPrefix = '';
        var multilinePrefix = '';
        if (this.level > 0) {
            if (this.last) {
                if (!this.empty) {
                    myPrefix += ' └─┬ ';
                    multilinePrefix += ' └─┬ ';
                }
                else {
                    myPrefix += ' └── ';
                    multilinePrefix = '     ';
                }
            }
            else {
                if (!this.empty) {
                    myPrefix += ' ├─┬ ';
                    multilinePrefix += ' │ │ ';
                }
                else {
                    myPrefix += ' ├── ';
                    multilinePrefix += ' │   ';
                }
            }
        }
        if (this.text) {
            output.write('#');
            output.write(ancestorsPrefix);
            output.write(myPrefix);
            var lines = this.text.split('\n');
            output.write(lines[0]);
            output.write('\n');
            for (var _b = 0, _c = lines.splice(1); _b < _c.length; _b++) {
                var line = _c[_b];
                output.write('#');
                output.write(ancestorsPrefix);
                output.write(multilinePrefix);
                output.write(line);
                output.write('\n');
            }
        }
        for (var _d = 0, _e = this._customchildren; _d < _e.length; _d++) {
            var child = _e[_d];
            child.printTree(output);
        }
    };
    CustomAsciiTree.prototype.add = function () {
        var children = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            children[_i] = arguments[_i];
        }
        for (var _a = 0, children_2 = children; _a < children_2.length; _a++) {
            var child = children_2[_a];
            child.parent = this;
            this._customchildren.push(child);
        }
    };
    return CustomAsciiTree;
}(oo_ascii_tree_1.AsciiTree));
exports.CustomAsciiTree = CustomAsciiTree;
