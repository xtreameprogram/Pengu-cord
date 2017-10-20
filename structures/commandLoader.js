const fs = require("fs-nextra");
class commandLoader {
    async loadCommands(client) {
        console.log(1, `Loading commands...`);
        try {
            const folders = await fs.readdir(`${process.cwd()}/commands`);
            console.log(2, `Loading commands...`);
            if (folders.length < 1) throw Error("No folders found in /commands directory...");
            for (const folder of folders) {
                console.log(3, `Loading commands...`);
                const files = await fs.readdir(`${process.cwd()}/commands/${folder}/`);
                console.log(4, `Loading commands...`);
                for (const file of files) {
                    const Command = require(`${process.cwd()}/commands/${folder}/${file}`);
                    const cmd = new Command(client);
                    cmd.category = this.toTitleCase(folder);
                    console.log(`Loading commands...`);
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

    toTitleCase(str) {
        return str.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
    }
}

module.exports = commandLoader;

