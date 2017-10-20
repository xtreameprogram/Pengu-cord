const Discord = require("discord.js");
const now = require("performance-now");
const Loader = require("./Loader");

class PenguClient extends Discord.Client {
    constructor(config = {}) {
        super(config.clientOptions);
        this.config = config;

        this.commands = new Discord.Collection();
        this.aliases = new Discord.Collection();
        this.events = new Discord.Collection();

        this.ready = false;

        this.once("ready", this._ready.bind(this));
    }


    async _ready() {
        this.config.prefixMention = new RegExp(`^<@!?${this.user.id}>`);
        if (!this.config.prefix) this.config.prefix = "p!";
        if (this.user.bot) this.application = await super.fetchApplication();
        if (this.config.owner) {
            if (this.config.owner instanceof Array) {
                for (const owner of this.config.owner) {
                    this.users.fetch(owner).catch(err => {
                        this.emit("warn", `Unable to fetch owner ${owner}.`);
                        this.emit("error", err);
                    });
                }
            } else {
                this.users.fetch(this.config.owner).catch(err => {
                    this.emit("warn", `Unable to fetch owner ${this.config.owner}.`);
                    this.emit("error", err);
                });
            }
        }
        this.ready = true;
        const loader = new Loader();
        await loader.loadCommands(this);
        await loader.loadEvents(this);
        this.emit("PenguReady");
    }

    async login(token) {
        const start = now();
        console.log(`Loaded in ${(now() - start).toFixed(2)}ms.`);
        return super.login(token);
    }

    get owners() {
        if (!this.config.owner) return null;
        if (typeof this.config.owner === "string") return [this.users.get(this.config.owner)];
        const owners = [];
        for (const owner of this.config.owner) owners.push(this.users.get(owner));
        return owners;
    }

    isOwner(user) {
        if (!this.config.owner) return false;
        user = this.users.resolve(user);
        if (!user) throw new RangeError("Unable to resolve user.");
        if (typeof this.config.owner === "string") return user.id === this.config.owner;
        if (this.config.owner instanceof Array) return this.config.owner.includes(user.id);
        throw new RangeError('The client\'s "owner" option is an unknown value.');
    }
}

module.exports = PenguClient;