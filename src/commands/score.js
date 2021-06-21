import Command from "../Command.js";

class Score extends Command {
    constructor() {
        super({
            name: "score",
            description: "te7seb score Germany",
            usage: "[MATH] [PHY] [TECH] [AR] [FR] [ANG] [PH] [INF] [OPTION] [SPORT]",
            dm: true,
            argsRules: {
                notes: "array|required",
                "notes.*": "numeric|between:0,20",
            },
        });
    }

    treatArgs(args) {
        args = args.map((x) => parseFloat(x));
        return { notes: args };
    }

    async execute(message, args) {
        super.execute(message, args);
        this.args = this.args.notes;
        this.args = {
            MATH: this.args[0],
            PHY: this.args[1],
            TECH: this.args[2],
            AR: this.args[3],
            FR: this.args[4],
            ANG: this.args[5],
            PH: this.args[6],
            INF: this.args[7],
            OPTION: this.args[8],
            SPORT: this.args[9],
        };
        let MG =
            (3 * this.args.MATH +
                3 * this.args.PHY +
                3 * this.args.TECH +
                1 * this.args.INF +
                1 * this.args.AR +
                1 * this.args.FR +
                1 * this.args.ANG +
                1 * this.args.PH +
                1 * (this.args.OPTION - 10) +
                1 * this.args.SPORT) /
            15;
        MG = MG.toFixed(2);
        let score =
            5 * MG +
            2 * this.args.MATH +
            1 * this.args.PHY +
            1 * this.args.TECH +
            this.args.FR +
            (this.args.ANG - 12) / 3 +
            this.args.PH;
        score = score.toFixed(2);
        return message.channel.send(`MG: ${MG}\nYour score is : ${score}`);
    }
}

export default new Score();
