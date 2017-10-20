class Command {
    constructor(client, info = {}) {
        if (info.name === undefined) throw Error("No name property detected in command.");
        if (info.guildOnly === undefined) info.guildOnly = false;
        if (!Array.isArray(info.aliases)) throw Error("Aliases must be an Array.");
        Object.defineProperty(this, "client", { value: client });
        this.name = info.name;
        this.ownerOnly = info.ownerOnly || false;
        this.guildOnly = info.guildOnly || false;
        this.description = info.description || "No description";
        this.aliases = info.aliases || [];
    }

    async run() {
        // In other files
    }

    async hasPermission(message) { //eslint-disable-line
        return true;
    }
}

module.exports = Command;