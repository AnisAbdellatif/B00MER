import Command from "../../Command.js";
import notifySong from "./_notifySong.js";

class Np extends Command {
    constructor() {
        super({
            name: "np",
            description: "Show the current song.",
        });
    }

    execute(message, args) {
        let res = super.execute(message, args);
        if (res) return;

        notifySong(message, "Now Playing:");
    }
}

export default new Np();
