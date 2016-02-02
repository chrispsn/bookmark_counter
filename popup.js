'use strict';

function count_bookmarks(nodes) {
    var count = 0;
    nodes.forEach(node => {
        if ('children' in node) {
            count += count_bookmarks(node.children);
        } else {
            count++;
        }
    });
    return count;
}

function write_count(nodes) {
    var count = count_bookmarks(nodes);
    document.getElementById('node_count').textContent = count;
}

document.addEventListener('DOMContentLoaded', function () {
    // getTree passes on an array of folder nodes
    chrome.bookmarks.getTree(write_count);
});