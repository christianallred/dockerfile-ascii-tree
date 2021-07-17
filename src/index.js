"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(exports, "__esModule", { value: true });
var oo_ascii_tree_1 = require("oo-ascii-tree");
var stream = require('stream');
function listToTree(list) {
    var map = {}, node, roots = [], i;
    for (i = 0; i < list.length; i += 1) {
        map[list[i].id] = i;
        list[i].children = [];
    }
    for (i = 0; i < list.length; i += 1) {
        node = list[i];
        if (node.parentId) {
            list[map[node.parentId]].children.push(node);
        }
        else {
            roots.push(node);
        }
    }
    return roots;
}
var generateInitialDockerImage = function (string) {
    var splitString = string.split(" ");
    var newDockerImage = {
        id: splitString[1],
        parentId: splitString[1],
        from: splitString[1]
    };
    if (splitString[2] && splitString[2].toLocaleLowerCase() == "as") {
        newDockerImage.id = splitString[3];
    }
    return newDockerImage;
};
var images = [];
process.argv.forEach(function (val, index, array) {
    // the first two lines of process argv is bullshit
    if (index > 1) {
        images.push(generateInitialDockerImage(val));
    }
});
images.forEach(function (image) {
    if (!images.find(function (findimage) { return findimage.id === image.parentId; })) {
        image.parentId = null;
    }
});
var buildAsciiTree = function (treeOfImages) {
    treeOfImages.forEach(function (branch) {
        if (branch.children) {
            return buildAsciiTree(branch.children);
        }
    });
    return treeOfImages.map(function (branch) { return new (oo_ascii_tree_1.AsciiTree.bind.apply(oo_ascii_tree_1.AsciiTree, __spreadArray([void 0, branch.id], buildAsciiTree(branch.children))))(); });
};
var treeOfImages = listToTree(images);
var ascii = buildAsciiTree(treeOfImages);
console.log('');
console.log("#-----------------------------------------------------------#");
console.log('# Auto generated docker tree built from docker-tree-builder #');
console.log("#-----------------------------------------------------------#");
console.log('');
ascii.forEach(function (tree) { return tree.printTree(); });
