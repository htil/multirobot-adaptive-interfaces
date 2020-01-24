// Updates the viewport when a message is received over a websocket
// A typical message will consist of an array of x viewports, with each element
// specifying the viewport size. Valid options are:
// - 0 -> Hide the viewport
// - 1 -> Small (320 x 240)
// - 2 -> Medium (640 x 480)
// - 3 -> Large (800 x 600)

// Create new socket to listen for window changes
let socket = new WebSocket('ws://localhost:3000');
socket.binaryType = "arraybuffer";

socket.onopen = () => {
	console.log("waiting for viewport messages...");
};

cache = [];
socket.onmessage = (data) => {
	let s = new Uint8Array(data.data);

	if (s === cache) return;
	cache = s;

	let views = document.getElementsByClassName("robot_img");
	let classes = ["hidden", "small", "medium", "large"];
	let labels = document.getElementsByClassName("floating-label");

	for (let i = 0; i < views.length; ++i) {
		if (views[i].classList.contains(classes[s[i]]))
			continue;

		for (j = 0; j < classes.length; ++j)
			if (classes[j] != classes[s[i]]) views[i].classList.remove(classes[j]);
		
		views[i].classList.add(classes[s[i]]);

		if (s[i] == 0)
			labels[i].classList.add("hidden");
		else
			labels[i].classList.remove("hidden");
	}
};

socket.onerror = (error) => {
	console.error(error);
}

function viewport_focus(e) {
	let tag = e.children[0].innerHTML;

	document.dispatchEvent(new KeyboardEvent('keydown', {code: "Digit" + tag}));
	viewport_toggle_size(e.children[3], null, "fullscreen");
}

function viewport_toggle_size(e, event, set) {
	let image = (e.tagName == "IMG" ? e : e.parentNode.parentNode.children[3]);
	let tag = (e.tagName == "IMG" ? e.parentNode.children[1].children[0] : e);
	set = (set ? set : e.innerHTML);

	if (set == "fullscreen") {
		tag.innerHTML = "fullscreen_exit";
		image.classList.remove("medium");
		image.classList.remove("small");

		image.classList.add("large");
	} else {
		tag.innerHTML = "fullscreen";
		image.classList.remove("medium");
		image.classList.remove("large");

		image.classList.add("small");
	}

	if (event) event.stopPropagation();
}

function viewport_toggle_autonomous(e, index, event) {
	controller.toggleAuto(index);

	// Update color
	if (e.classList.contains("selected"))
		e.classList.remove("selected");
	else
		e.classList.add("selected");
	
	// Stop the event from propegating
	if (event) event.stopPropagation();
}