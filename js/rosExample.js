

// Initialize the ROS connection
var ros = new ROSLIB.Ros({
	url: 'ws://10.123.177.166:9090/' // url of ROS BRIDGE_SERVER Websocket. Different port from ROS Master.
});

// Set up ROS callbacks
ros.on('connection', function () {
	console.log('Connected to websocket server.');
});

ros.on('error', function (error) {
	console.log('Error connecting to websocket server: ', error);
});

ros.on('close', function () {
	console.log('Connection to websocket server closed.');
});


// Publishing a Topic
// ------------------
var cmdVel_1 = new ROSLIB.Topic({
	ros: ros,
	name: '/tb3_1/user_vel',
	messageType: 'geometry_msgs/Twist'
});

var cmdVel_2 = new ROSLIB.Topic({
	ros: ros,
	name: '/tb3_2/user_vel',
	messageType: 'geometry_msgs/Twist'
});

var cmdVel_3 = new ROSLIB.Topic({
	ros: ros,
	name: '/tb3_3/user_vel',
	messageType: 'geometry_msgs/Twist'
});

var cmdVel_4 = new ROSLIB.Topic({
	ros: ros,
	name: '/tb3_4/user_vel',
	messageType: 'geometry_msgs/Twist'
});


rosRobotCommands = [cmdVel_1, cmdVel_2, cmdVel_3, cmdVel_4]

//////////////////////////////////////////////

// Autonomy starts here
var r1AutoCmd = new ROSLIB.Topic({
	ros: ros,
	name: '/r1',
	messageType: 'std_msgs/String'
});

var r2AutoCmd = new ROSLIB.Topic({
	ros: ros,
	name: '/r2',
	messageType: 'std_msgs/String'
});

var r3AutoCmd = new ROSLIB.Topic({
	ros: ros,
	name: '/r3',
	messageType: 'std_msgs/String'
});

var r4AutoCmd = new ROSLIB.Topic({
	ros: ros,
	name: '/r4',
	messageType: 'std_msgs/String'
});

var autoBehaviorMsg = new ROSLIB.Message({
	data: "auto"
});

var manualBehaviorMsg = new ROSLIB.Message({
	data: "manual"
});


// Function to launch a behavior
//   Example launchBehavior(r1AutoCmd, manualBehaviorMsg)
function launchBehavior(robotTopic, behavior) {
	robotTopic.publish(behavior)
}
// Autonomy end here

// Example ROS message
var twist = new ROSLIB.Message({
	linear: {
		x: 2,
		y: 0,
		z: 1
	},
	angular: {
		x: 0,
		y: 0,
		z: 0
	}
});

cmdVel_1.publish(twist);
cmdVel_2.publish(twist);
cmdVel_3.publish(twist);
cmdVel_4.publish(twist);


// Key listener
var status = 0;
var target_linear_vel = 0;
var target_angular_vel = 0;
var control_linear_vel = 0;
var control_angular_vel = 0;
var tag = 0;

document.addEventListener('keydown', function (event) {
	console.log("Key down. ", event.code);
	
	// code below is for controlling or braking the robot
	if (event.code == "ArrowLeft") {
		target_angular_vel = target_angular_vel + 0.1;
		status = status + 1;
	}
	else if (event.code == "ArrowDown") {
		target_linear_vel = target_linear_vel + 0.01;
		status = status + 1;
	}
	else if (event.code == "ArrowRight") {
		target_angular_vel = target_angular_vel - 0.1;
		status = status + 1;
	}
	else if (event.code == "ArrowUp") {
		target_linear_vel = target_linear_vel - 0.01;
		status = status + 1;
	}
	else if (event.code == "Space") {
		status = status + 1;
		target_linear_vel = 0;
		control_linear_vel = 0;
		target_angular_vel = 0;
		control_angular_vel = 0;
	}

	// Code below is for changing the tag( ID ). Switches to robot ID that needs to be controlled. 
	//   0 controls all robots. It brakes the robot whenever control is switched to it.
	else if (event.code == "Digit0") {
		tag = 0;
		status = status + 1;
		target_linear_vel = 0;
		control_linear_vel = 0;
		target_angular_vel = 0;
		control_angular_vel = 0;
	}
	else if (event.code == "Digit1") {
		tag = 1;
		status = status + 1;
		target_linear_vel = 0;
		control_linear_vel = 0;
		target_angular_vel = 0;
		control_angular_vel = 0;
	}
	else if (event.code == "Digit2") {
		tag = 2
		status = status + 1;
		target_linear_vel = 0;
		control_linear_vel = 0;
		target_angular_vel = 0;
		control_angular_vel = 0;
	}
	else if (event.code == "Digit3") {
		tag = 3;
		status = status + 1;
		target_linear_vel = 0;
		control_linear_vel = 0;
		target_angular_vel = 0;
		control_angular_vel = 0;
	}
	else if (event.code == "Digit4") {
		tag = 4;
		status = status + 1;
		target_linear_vel = 0;
		control_linear_vel = 0;
		target_angular_vel = 0;
		control_angular_vel = 0;
	}


	// TODO: Fitting comment
	if (target_linear_vel > control_linear_vel) {
		control_linear_vel = Math.min(target_linear_vel, control_linear_vel + (0.01 / 4.0));
	}
	else {
		control_linear_vel = target_linear_vel;
	}

	// TODO: Fitting comment
	if (target_angular_vel > control_angular_vel) {
		control_angular_vel = Math.min(target_angular_vel, control_angular_vel + (0.1 / 4.0));
	}
	else {
		control_angular_vel = target_angular_vel;
	}


	// Updates control and publishes. I put the ID tag on the linear velocity in y direction as y
	//   velocity is never used on the turtlebot. Was too lazy to edit the message definition.
	var twist = new ROSLIB.Message({
		linear: {
			x: control_linear_vel,
			y: tag,
			z: 0
		},
		angular: {
			x: 0,
			y: 0,
			z: control_angular_vel
		}
	});

	cmdVel.publish(twist);

	// Update the floating handles for the currently selected view
	let handles = document.getElementsByClassName("floating-label");
	for (let i = 0; i < handles.length; ++i) {
		let handle = handles[i];

		if ((tag == 0) || (tag == (i + 1)))
			handle.classList.add("selected");
		else
			handle.classList.remove("selected");
	}
});

// Stop all robots on click of the panic button
function panic() {
	let clear = new ROSLIB.Message({
		linear: {
			x: 0,
			y: 0,
			z: 0
		},
		angular: {
			x: 0,
			y: 0,
			z: 0
		}
	});

	cmdVel.publish(clear);
}
