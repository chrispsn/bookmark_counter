// Docs: https://developer.chrome.com/extensions/
// https://developer.chrome.com/extensions/bookmarks
// http://cryto.net/~joepie91/blog/2015/05/04/functional-programming-in-javascript-map-filter-reduce/

// Calculate the answer...

function count_children(node) {
    if (node.children) {
        var count = 0;
        node.children.forEach( function(child) {
            count += count_children(child);
        });
        count += node.children.filter(has_no_children).length;
        return count;
    }
    return 0;
}

function has_no_children(node) {
    return !("children" in node);
}

// Get the answer to the user...

function write_count(bookmarkTreeNodes) {
    // This is dangerous since we shouldn't assume
    // the array contains only a single folder
    var total = count_children(bookmarkTreeNodes[0]);
    document.getElementById("node_count").innerText = total;
};

document.addEventListener('DOMContentLoaded', function () {
    // getTree passes on an array of folders
    chrome.bookmarks.getTree(write_count);
});