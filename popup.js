// Docs are here: https://developer.chrome.com/extensions/
// https://developer.chrome.com/extensions/bookmarks
// http://cryto.net/~joepie91/blog/2015/05/04/functional-programming-in-javascript-map-filter-reduce/

// Define calculations...

function count_children(nodes) {
	var count = 0;
	nodes.forEach(node => {
		if ("children" in node) {
			count += count_children(node.children)
		} else {
			count += 1;
		}
	});
	return count;
}

// Perform calculations and get the answer to the user...

function write_count(bookmarkTreeNodes) {
	var total = count_children(bookmarkTreeNodes);
	document.getElementById("node_count").innerText = total;
};

document.addEventListener('DOMContentLoaded', function () {
	// getTree passes on an array of folders
	chrome.bookmarks.getTree(write_count);
});