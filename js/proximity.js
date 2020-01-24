
var id=1;
var x= document.getElementsByTagName('td');

for(i=0;i<x.length;i++){
	x[i].innerHTML=i.toString();


}


var ros = new ROSLIB.Ros({
    url : 'ws://192.168.43.80:9090/'
  });

  ros.on('connection', function() {
    console.log('Connected to websocket server.');
  });

  ros.on('error', function(error) {
    console.log('Error connecting to websocket server: ', error);
  });

  ros.on('close', function() {
    console.log('Connection to websocket server closed.');
  });
var listener = new ROSLIB.Topic({
    ros : ros,
    name : '/scan',
    messageType : 'sensor_msgs/LaserScan'
  });

  listener.subscribe(function(message) {
    console.log('Received message on ' + listener.name + ': ' + message.ranges); 
	var p = 0;
 	for(i=0;i<12;i++){
		//update color top
		var val=0;
		for(j=0;j<8;j++){
		if(message.ranges[p]>val) val=message.ranges[p];
		 p++;
		
		}
		
		x[i+(id-1)*45].style.backgroundColor = "rgba("+255+","+0+","+0+","+(0.2/val)+")";
	}
	for(i=14;i<34;i+=2){
		//update color right
		var val=0;
		for(j=0;j<8;j++){
		if(message.ranges[p]>val) val=message.ranges[p];
		 p++;
		}
		x[i+(id-1)*45].style.backgroundColor = "rgba("+255+","+0+","+0+","+(0.2/val)+")";
	}
	for(i=44; i>32;i--){
		//update color bottom
		var val=0;
		for(j=0;j<8;j++){
		if(message.ranges[p]>val) val=message.ranges[p];
		 p++;
		}
		x[i+(id-1)*45].style.backgroundColor = "rgba("+255+","+0+","+0+","+(0.2/val)+")";
	}
	for(i=31;i>13;i-=2){
		//update color left
		var val=0;
		for(j=0;j<8;j++){
		if(message.ranges[p]>val) val=message.ranges[p];
		 p++;
		}
		x[i+(id-1)*45].style.backgroundColor = "rgba("+255+","+0+","+0+","+(0.2/val)+")";
	}
	//update cell 12

 	console.log(p);

  });

