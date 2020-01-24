  // -----------------
document.getElementById("frame2_none").style.display ="none";
  var change = 1;
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
    name : '/chatter',
    messageType : 'std_msgs/String'
  });

  listener.subscribe(function(message) {
    console.log('Received message on ' + listener.name + ': ' + message.data);
 var yes =document.getElementById("frame2_yes");
 var no = document.getElementById("frame2_none");
if(message.data == "False"){
document.getElementById("frame2_none").style.display ="block";
document.getElementById("frame2_yes").style.display ="none";


}
else{
document.getElementById("frame2_yes").style.display ="block";
document.getElementById("frame2_none").style.display ="none";



}

  });

