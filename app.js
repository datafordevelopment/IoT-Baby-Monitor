var five     = require("johnny-five");
var Particle = require("particle-io");
var Parse    = require("parse/node");

Parse.initialize("4vgh4jKPecEkJ21tzJ0DbQVmvpc3o7aSckAKv3JJ", "bpQu2ijlZxriI1r4XrRtLandJ3mXqUV2rDWtHUsK");

var board = new five.Board({
  io: new Particle({
    token: 'a2e6ecc21a92fbeb22c212b3f068b1a482374f13',
    deviceId: '3b0040000447343339373536'
  })
});

board.on("ready", function() {
  var motion = new five.Sensor.Digital("D0");
  var mic    = new five.Sensor("A0");
  var flame  = new five.Sensor.Digital("D1");

  motion.on("change", function() {
    if (this.value == 0) {
      console.log("motion detected");
      var MotionObject = Parse.Object.extend("MotionObject");
      var motionObject = new MotionObject();
      motionObject.save({motion: true});
    }
  });

  mic.on("change", function() {
    if (this.value < 500) {
      console.log("sound detected");
      var NoiseObject = Parse.Object.extend("NoiseObject");
      var noiseObject = new NoiseObject();
      noiseObject.save({noise: true});
    }
  });

  flame.on("change", function() {
    if (this.value == 1) {
      console.log("fire detected");
      var FlameObject = Parse.Object.extend("FlameObject");
      var flameObject = new FlameObject();
      flameObject.save({flame: true});
    }
  });
});
