"use strict";

// Docs: https://developer.chrome.com/extensions/bookmarks

function count_children(nodes) {
    var count = 0;
    nodes.forEach(node => {
        if ("children" in node) {
            count += count_children(node.children)
        } else {
            count++;
        }
    });
    return count;
};

function write_count(bookmarkTreeNodes) {
    var total = count_children(bookmarkTreeNodes);
    document.getElementById("node_count").innerText = total;
};

document.addEventListener('DOMContentLoaded', function () {
    // getTree passes on an array of folder nodes
    chrome.bookmarks.getTree(write_count);
});