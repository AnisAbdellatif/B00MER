import Command from "../Command.js";

class Test extends Command {
    constructor() {
        super({
            name: "test",
            description: "test cmd",
        });
    }

    execute(message, args) {
        let res = super.execute(message, args);
        if (res) return;
        console.log(`Executing ${this.name}`);
    }
}

export default new Test();
