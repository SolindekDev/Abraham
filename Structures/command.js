class Command {
    /**
     * @param {Object} options 
     */
	constructor(options) {
		this.name = options.name;
		this.description = options.description;
		this.category = options.category;
		this.run = options.run;
	}
}

module.exports = Command