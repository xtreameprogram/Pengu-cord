const fs = require("fs-nextra");
class commandLoader {
    async loadCommands(client) {
        try {
            if (!fs.existsSync(`${process.cwd()}/commands`)) {
                await fs.mkdir("./commands");
                console.log("Initializing commands directory.");
            }
            const folders = await fs.readdir(`${process.cwd()}/commands`);
            for (const folder of folders) {
                const files = await fs.readdir(`${process.cwd()}/commands/${folder}/`);
                for (const file of files) {
                    const Command = require(`${process.cwd()}/commands/${folder}/${file}`);
                    const cmd = new Command(client);
                    cmd.category = this.toLowerCase(folder);
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

    static toTitleCase(str) {
        return str.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
    }
}

module.exports = commandLoader;

