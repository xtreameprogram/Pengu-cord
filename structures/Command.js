class Command {
    constructor(client, info = {}) {
        if (info.name === undefined) throw Error("No name property detected in command.");
        this.client = client;
        this.enabled = "enabled" in info ? info.enabled : true;
        this.name = info.name;
        this.ownerOnly = !!info.ownerOnly || false;
        this.guildOnly = !!info.guildOnly || false;
        this.description = info.description || "No description";
        this.details = info.details || null;
        this.examples = info.examples || null;
        this.clientPermissions = info.clientPermissions || null;
        this.userPermissions = info.userPermissions || null;
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