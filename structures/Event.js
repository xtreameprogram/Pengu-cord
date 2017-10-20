class Event {
    constructor(client, info = {}) {
        if (info.name === undefined) throw Error("No name property detected in Event.");
        this.client = client;
        this.name = info.name;
    }

    run() {
        // Defined in extension Classes
    }

}

module.exports = Event;