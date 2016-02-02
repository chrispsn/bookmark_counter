'use strict';

function count_bookmarks(nodes) {
    var folders = nodes.filter(n => 'children' in n);
    var count_below_this_folder = folders.map(n => n.children)
                                         .map(count_bookmarks)
                                         .reduce(sum, 0);
    return count_below_this_folder + (nodes.length - folders.length);
}

function sum(a, b) {
    return a + b;
}

function write_count(nodes) {
    var count = count_bookmarks(nodes);
    document.getElementById('node_count').textContent = count;
}

document.addEventListener('DOMContentLoaded', function () {
    // getTree passes on an array of folders
    chrome.bookmarks.getTree(write_count);
});