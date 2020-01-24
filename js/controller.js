var Controller = function(IP){
	this.ros = new ROSLIB.Ros({
		url: 'ws://'+IP+'/' // url of ROS BRIDGE_SERVER Websocket. Different port from ROS Master.
	});

	this.linear_speed = 0.1;
	this.anular_speed = 0.5;


	this.twist = new ROSLIB.Message({
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

	this.robotID = 1;
	this.topics = [];
	this.toggleArray = [0, 0, 0, 0];
	this.autoElement = [null, null, null, null]
}

Controller.prototype.connect = function(){
	this.ros.on('connection', function () {
		console.log('Connected to websocket server.');

	});

	this.ros.on('error', function (error) {
		console.log('Error connecting to websocket server: ', error);
	});

	this.ros.on('close', function () {
		console.log('Connection to websocket server closed.');
	});	
}

Controller.prototype.getTopics = function(ids){
	var topics = []

	for(i in ids) {
		var robotID = ids[i]
		var cmdVel = new ROSLIB.Topic({
			ros: this.ros,
			name: '/tb3_' + robotID + '/user_vel',
			messageType: 'geometry_msgs/Twist'
		});

		topics.push(cmdVel)
	}	
	
	return topics;
}

Controller.prototype.init = function(ids){
	this.topics = this.getTopics(ids);
	this.connect();
}

Controller.prototype.autoOn = function(){
	let id = this.getRobotID();
	this.toggleArray[id] = 1
}

Controller.prototype.autoOff = function(){
	let id = this.getRobotID();
	this.toggleArray[id] = 0
}

Controller.prototype.toggleCurrentAuto = function(){
	let id = this.getRobotID()
	if(this.toggleArray[id]) {
		this.toggleArray[id] = 0 // off
	}
	else {
		this.toggleArray[id] = 1 // on
	}

	controller.updateAutoColor(id);
	controller.publishAutonomy(id);
}

Controller.prototype.updateAutoColor = function(id){
	let handles = document.getElementsByClassName("navFeedback");
	let e = handles[id];
	if (e.classList.contains("selected"))
		e.classList.remove("selected");
	else
		e.classList.add("selected");
}

Controller.prototype.toggleAuto = function(id, element){
	this.autoElement = element;
	if(this.toggleArray[id]) {
		this.toggleArray[id] = 0 // off
	}
	else {
		this.toggleArray[id] = 1 // on
	}

	controller.publishAutonomy(id);
}

Controller.prototype.publishAutonomy = function(id){
	this.twist.linear.z = this.toggleArray[id]
	this.twist.linear.x = 0
	this.twist.angular.z = 0
	this.setRobotID(id);
	this.topics[id].publish(this.twist);
	controller.updateSelectedFeedback();
}

// Motion Control
Controller.prototype.back = function(){
	this.twist.linear.x = this.linear_speed;
	this.twist.angular.z = 0;
	this.twist.linear.z = 0 // auto off
	this.topics[this.robotID].publish(this.twist)
}

Controller.prototype.forward = function(){
	this.twist.linear.x = this.linear_speed * -1;
	this.twist.angular.z = 0;
	this.twist.linear.z = 0 // auto off
	this.topics[this.robotID].publish(this.twist)
}

Controller.prototype.turnLeft = function(){
	this.twist.linear.x = 0;
	this.twist.angular.z = this.anular_speed;
	this.twist.linear.z = 0 // auto off
	this.topics[this.robotID].publish(this.twist)
}

Controller.prototype.turnRight = function(){
	this.twist.linear.x = 0;
	this.twist.angular.z = this.anular_speed * -1;
	this.twist.linear.z = 0 // auto off
	this.topics[this.robotID].publish(this.twist)
}

Controller.prototype.stop = function(id){
	this.twist.linear.x = 0;
	this.twist.angular.z = 0;
	this.twist.linear.z = 0 // auto off
	this.topics[id].publish(this.twist)
}

Controller.prototype.setRobotID = function(id){
	this.robotID = id;
	console.log("Robot ID: " + this.robotID);
}

Controller.prototype.getRobotID = function() {
	return this.robotID;
}

Controller.prototype.clearAutonomyFeedback = function() {
	let handles = document.getElementsByClassName("navFeedback");
	let id = this.getRobotID()
	let handle = handles[id];
	handle.classList.remove("selected");
}

Controller.prototype.updateSelectedFeedback = function() {
	// Update the floating handles for the currently selected view
	let handles = document.getElementsByClassName("floating-label");
	tag = controller.robotID;
	for (let i = 0; i < handles.length; ++i) {
		let handle = handles[i];

		if (tag == i)
			handle.classList.add("selected");
		else
			handle.classList.remove("selected");
	}
}

Controller.prototype.panic = function(){
	this.stop(0)
	this.stop(1)
	this.stop(2)
	this.stop(3)
}

controller = new Controller("10.123.177.166:9090");
controller.init([1,2,3,4]);

document.addEventListener('keydown', function (event) {
	console.log(event.code)
	switch(event.code) { 
		case "Escape":
			controller.panic();
			break;
		case "KeyA":
			controller.toggleCurrentAuto();
			break;
		case "Digit1":
			controller.setRobotID(0);
			break;
		case "Digit2":
			controller.setRobotID(1);
			break;
		case "Digit3":
			controller.setRobotID(2);
			break;
		case "Digit4":
			controller.setRobotID(3);
			break;
		case "ArrowUp":
			controller.forward();
			controller.clearAutonomyFeedback()
			controller.autoOff()
			break;
		case "ArrowDown":
			controller.back();
			controller.clearAutonomyFeedback();
			controller.autoOff()
			break;
		case "ArrowRight":
			controller.turnRight();
			controller.clearAutonomyFeedback();
			controller.autoOff()
			break;
		case "ArrowLeft":
			controller.turnLeft();
			controller.clearAutonomyFeedback();
			controller.autoOff()
			break;
		case "Space":
			let id = controller.getRobotID()
			controller.stop(id);
			controller.clearAutonomyFeedback();
			controller.autoOff();
			break;
		default:
			return 0;
	}

	controller.updateSelectedFeedback();

})


