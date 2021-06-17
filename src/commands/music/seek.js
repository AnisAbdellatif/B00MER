import Command from "../../Command.js";
import execute from "./_execute.js";

class Seek extends Command {
    constructor() {
        super({
            name: "seek",
            description: "Seek ahead in a song.",
        });
    }

    execute(message, args) {
        super.execute(message, args);

        execute(message, args, this.args[0]);
    }
}

export default new Seek();
