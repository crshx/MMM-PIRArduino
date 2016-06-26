
Module.register('MMM-PIRArduino',{
	
	
	defaults: {
		sensorPIN: 26,
		relayPIN: false,
		powerSaving: true,
		relayOnState: 1,
		pressed: false,
		brightness: 0,
		timeout: 60,
	},
	
	
	notificationReceived: function(notification, payload, sender) {
		console.log('Received notification: ' + notification +', payload: ' + payload);
		if (notification == "BRIGHTNESS") {
			this.config.brightness = payload;
			Log.info(this.name + " received " + notification + " and set brightness to " + this.config.brightness);
			this.sendSocketNotification("BRIGHTNESS", payload);
			//Log.log(this.name + " received a module notification: " + notification + " from sender: " + sender.name);
		} 
	},
	
	start: function() {
		//this.pressed = false;
		if (this.config.relayOnState == 1){
			this.config.relayOffState = 0
		}
		else if (this.config.relayOnState == 0){
			this.config.relayOffState = 1
		}
		this.sendSocketNotification('CONFIG', this.config);
		Log.info('Starting module: ' + this.name);
	}
});