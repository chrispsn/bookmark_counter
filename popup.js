'use strict';

function count_bookmarks(nodes) {
    var count = 0;
    nodes.forEach(node => {
        if ('children' in node) {
            count += count_bookmarks(node.children);
            check_and_list_fatty(node, 10);
        } else {
            count++;
        }
    });
    return count;
}

function get_leaves(folder) {
    return folder.children.filter(n => !('children' in n));
}

function check_and_list_fatty(folder, max_leaves) {
    var leaves_count = get_leaves(folder).length;
    if (leaves_count > max_leaves) {
        write_fatty(folder.title, leaves_count);
    }
}

function write_fatty(title, count) {
    var text = document.createTextNode(title + ': ' + count);
    var li = document.createElement('li');
    li.appendChild(text);
    document.getElementById('fatty_list').appendChild(li);
}

function write_count(nodes) {
    var count = count_bookmarks(nodes);
    document.getElementById('node_count').textContent = count;
}

document.addEventListener('DOMContentLoaded', function () {
    // getTree passes on an array of folder nodes
    chrome.bookmarks.getTree(write_count);
});