// Docs are here: https://developer.chrome.com/extensions/
// https://developer.chrome.com/extensions/bookmarks
// http://cryto.net/~joepie91/blog/2015/05/04/functional-programming-in-javascript-map-filter-reduce/

// Define calculations...

function count_children(nodes) {
	var count = 0;
	nodes.forEach(node => {
		if (has_children(node)) {
			count += count_children(node.children)
			count += node.children.filter(node => !has_children(node)).length;
		};
	});
	return count;
}

function has_children(node) {
	return ("children" in node);
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