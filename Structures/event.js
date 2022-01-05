class Event {
	/**
     * @param {Object} options 
     */
	constructor(options) {
		this.name = options.name;
		this.run = options.run;
	}
}

module.exports = Event