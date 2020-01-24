// Updates the camera by polling for the newest images
setInterval(() => {
	let rs = document.getElementsByClassName("robot_img");

	for (let i = 0; i < rs.length; ++i) {
		let r = rs[i];
		if (r) r.setAttribute("src", r.getAttribute("src").replace(/time=[0-9]+/, "time=" + Date.now()));
	}
}, 100);