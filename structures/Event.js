class Event {
    constructor(client, file, info = {}) {
        if (info.name === undefined) throw Error("No name property detected in Event.");
        Object.defineProperty(this, "client", { value: client });
        this.name = info.name || file.split(".")[0];
        this.enabled = info.enabled || true;
    }

    _run(...args) {
        if (this.enabled) this.run(...args);
    }

    /**
	 * The run method to be overwritten in actual event handlers
	 * @param {any} param The event parameters emited
	 * @abstract
	 * @returns {void}
	 */
    run() {
        // Defined in extension Classes
    }

}

module.exports = Event;