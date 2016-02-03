'use strict';

function walk_tree(nodes) {
    return nodes.map(node => {
        if ('children' in node) {
            return walk_tree(node.children);
        } else {
            return 1;
        }
    });
}

function flatten(arr) {
    // http://stackoverflow.com/a/15030117
    return arr.reduce(function (flat, toFlatten) {
        return flat.concat(Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten);
        }, []);
}

function write_count(nodes) {
    var count = flatten(walk_tree(nodes)).length;
    document.getElementById('node_count').textContent = count;
}

document.addEventListener('DOMContentLoaded', function () {
    // getTree passes on an array of folders
    chrome.bookmarks.getTree(write_count);
});