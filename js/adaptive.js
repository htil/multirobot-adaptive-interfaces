function adapt(num, id = [1, 2, 3, 4]) {
	if (num == 1) {
		//display id alone full size. Set display: none for all other
		for (i = 1; i <= 4; i++) {

			document.getElementById("video" + i).style.width = "0%";

			document.getElementById("video" + i).style.height = "0%";
			document.getElementById("video" + i).style.border = "0 solid #0000FF";

		};

		document.getElementById("video" + id[0]).style.border = "5px solid #000000";
		$("#video" + id[0]).animate({
			width: "100%", height: "100%"
		}, {
				duration: 200,
				specialEasing: {
					width: 'linear'
				}
			});

	}

	if (num == 2) {
		//  Set display: none for other two
		for (i = 1; i <= 4; i++) {

			document.getElementById("video" + i).style.width = "0%";

			document.getElementById("video" + i).style.height = "0%";
			document.getElementById("video" + i).style.border = "0 solid #0000FF";

		};

		document.getElementById("video" + id[0]).style.border = "5px solid #000000";
		$("#video" + id[0]).animate({
			width: "100%", height: "50%"
		}, {
				duration: 200,
				specialEasing: {
					width: 'linear'
				}
			});
		document.getElementById("video" + id[1]).style.border = "5px solid #000000";
		$("#video" + id[1]).animate({
			width: "100%", height: "50%"
		}, {
				duration: 200,
				specialEasing: {
					width: 'linear'
				}
			});


	};

	if (num == 3) {

		/*
		for(i=1;i<=4;i++){
				var x= 0;
			for(j=0;j<num;j++){
				if(id[j]==i)x=1;
			};
			if(x==0){

				document.getElementById("video"+i).style.display = "none"; 
				 // $( "#video"+i ).animate({width: 'toggle'}, 300);
  
			}
		}; 

		*/

		for (i = 1; i <= 4; i++) {

			document.getElementById("video" + i).style.width = "0%";

			document.getElementById("video" + i).style.height = "0%";
			document.getElementById("video" + i).style.border = "0 solid #0000FF";

		};

		// if id[1] is < 3, display id[0] and id[1] on top row. Display id[2] on bottom row. 
		if (id[1] < 3) {
			/*
			document.getElementById("video"+id[0]).style.height = "50%";
			document.getElementById("video"+id[0]).style.width = "50%";
			document.getElementById("video"+ id[0]).style.display = "inline";

			
			
			
			document.getElementById("video"+id[1]).style.height = "50%";
			document.getElementById("video"+id[1]).style.width = "50%";
			document.getElementById("video"+ id[1]).style.display = "inline"; 
			
			
			document.getElementById("video"+id[2]).style.height = "50%";
			document.getElementById("video"+id[2]).style.width = "100%";
			document.getElementById("video"+ id[2]).style.display = "inline"; */

			document.getElementById("video" + id[0]).style.border = "5px solid #000000";
			$("#video" + id[0]).animate({
				width: "50%", height: "50%"
			}, {
					duration: 200,
					specialEasing: {
						width: 'linear'
					}
				});
			document.getElementById("video" + id[1]).style.border = "5px solid #000000";
			$("#video" + id[1]).animate({
				width: "50%", height: "50%"
			}, {
					duration: 200,
					specialEasing: {
						width: 'linear'
					}
				});

			document.getElementById("video" + id[2]).style.border = "5px solid #000000";
			$("#video" + id[2]).animate({
				width: "100%", height: "50%"
			}, {
					duration: 200,
					specialEasing: {
						width: 'linear'
					}
				});

		}


		// else, display id[0] on top row. Display id[1] and id[2] on bottom row.

		else {

			/*
			document.getElementById("video"+id[0]).style.height = "50%";
			document.getElementById("video"+id[0]).style.width = "100%";
			document.getElementById("video"+ id[0]).style.display = "inline"; */

			document.getElementById("video" + id[0]).style.border = "5px solid #000000";
			$("#video" + id[0]).animate({
				width: "100%", height: "50%"
			}, {
					duration: 200,
					specialEasing: {
						width: 'linear'
					}
				});
			document.getElementById("video" + id[1]).style.border = "5px solid #000000";
			$("#video" + id[1]).animate({
				width: "50%", height: "50%"
			}, {
					duration: 200,
					specialEasing: {
						width: 'linear'
					}
				});

			document.getElementById("video" + id[2]).style.border = "5px solid #000000";
			$("#video" + id[2]).animate({
				width: "50%", height: "50%"
			}, {
					duration: 200,
					specialEasing: {
						width: 'linear'
					}
				});
		}
	}


	if (num == 4) {
		for (i = 1; i <= 4; i++) {

			document.getElementById("video" + i).style.width = "0%";

			document.getElementById("video" + i).style.height = "0%";
			document.getElementById("video" + i).style.border = "0 solid #0000FF";

		};
		// display all
		document.getElementById("video" + id[0]).style.border = "5px solid #000000";
		$("#video" + id[0]).animate({
			width: "50%", height: "50%"
		}, {
				duration: 200,
				specialEasing: {
					width: 'linear'
				}
			});
		document.getElementById("video" + id[1]).style.border = "5px solid #000000";
		$("#video" + id[1]).animate({
			width: "50%", height: "50%"
		}, {
				duration: 200,
				specialEasing: {
					width: 'linear'
				}
			});

		document.getElementById("video" + id[2]).style.border = "5px solid #000000";
		$("#video" + id[2]).animate({
			width: "50%", height: "50%"
		}, {
				duration: 200,
				specialEasing: {
					width: 'linear'
				}
			});

		document.getElementById("video" + id[3]).style.border = "5px solid #000000";
		$("#video" + id[3]).animate({
			width: "50%", height: "50%"
		}, {
				duration: 200,
				specialEasing: {
					width: 'linear'
				}
			});

	}


};

/*
function resize(id,adj, height, width){

	var el = document.getElementById("video"+id);

	if(el.style.width == "100%" && el.style.height == "100%"){
		//currently occupying entire window. Just minimize to 50x50% and show other elements


	}

	else{ 



	}



} */
//adapt(4);

adapt(4, [1, 2, 3, 4]);
