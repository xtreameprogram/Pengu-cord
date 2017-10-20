class Event {
    constructor(client, info = {}) {
        if (info.name === undefined) throw Error("No name property detected in Event.");
        this.client = client;
        this.name = info.name;
    }

    _run(...args) {
        this.run(...args);
    }

    /**
	 * The run method to be overwritten in actual event handlers
	 * @param {any} param The event parameters emited
	 * @abstract
	 * @returns {void}
	 */
    async run() {
        // Defined in extension Classes
    }

}

module.exports = Event;