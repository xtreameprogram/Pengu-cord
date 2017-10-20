const fs = require("fs-nextra");
class commandLoader {
    async loadCommands(client) {
        try {
            const folders = await fs.readdir(`${process.cwd()}/commands`);
            if (folders.length < 1) throw Error("No folders found in /commands directory...");
            for (const folder of folders) {
                const files = await fs.readdir(`${process.cwd()}/commands/${folder}/`);
                for (const file of files) {
                    if (!file.endsWith(".js")) throw Error("Command file extension must end with .js");
                    const Command = require(`${process.cwd()}/commands/${folder}/${file}`);
                    const cmd = new Command(client);
                    cmd.category = this.toTitleCase(folder);
                    console.log(`${cmd.name} Loaded`);
                    client.commands.set(cmd.name, cmd);
                    if (cmd.aliases && cmd.aliases.length) {
                        cmd.aliases.forEach(a => {
                            client.aliases.set(a, cmd.name);
                        });
                    }
                }
            }
        } catch (e) {
            throw e;
        }

    }

    async loadEvents(client) {
        try {
            const files = await fs.readdir(`${process.cwd()}/events`);
            if (files.length < 1) throw Error("No files found in /events directory...");
            for (const file of files) {
                if (!file.endsWith(".js")) throw Error("Event file extension must end with .js");
                const Event = require(`${process.cwd()}/events/${file}`);
                const event = new Event(client);
                console.log(`${event.name} Loaded`);
                client.events.set(event.name, event);
                client.on(event.name, event.run.bind(null, client));
                delete require.cache[require.resolve(`${process.cwd()}/events/${file}`)];
            }
        } catch (e) {
            throw e;
        }
    }

    toTitleCase(str) {
        return str.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
    }
}

module.exports = commandLoader;

