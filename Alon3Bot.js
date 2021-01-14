const { Client } = require("tmi.js");

const opts = {
    identity: {
        username: "Alon3Bot",
        password: "oauth:jg172xljcxq1pv5f1l3mnoe6plmqz3"
    },
    channels: [
        "igorpereira2718",
        "taosozinho",
        "Alon3Bot"
    ],
    logger: {
        error: (msg) => console.log(msg),
        info: (msg) => console.log(msg),
        warn: (msg) => console.log(msg)
    }
};

const client = new Client(opts);


client.on('message', onMessageHandler);
client.on('connected', onConnectedHandler);
client.on("raided", onRaidedHandler);

client.connect();

function onMessageHandler(target, context, msg, self) {
    if(self) { return; }
    console.log(target);
    if(context.username === 'nightbot' && (msg === 'nao' || msg === 'sim')) {
        client.say(target, "Para de ser do contra nightbot DarkMode DarkMode");
    }
    if(context.username === 'nightbot') { return; }

    let args = msg.split(/ +/g);

    const commandName = args.splice(0, 1)[0];
    console.log(commandName)
    let userVar = context.username;


    if(commandName === "!dice") {
        const num = rollDice();
        client.say(target, `You rolled a ${num}`);
        console.log(`* Executed ${commandName} command`);
    } else if(commandName === "!pack") {
        let chance = Math.round((Math.random() + Number.EPSILON) * 1000) / 10 
        client.say(target, `@${userVar}, sua chance de receber um pack do pé do Ademir é de ${chance}%`)
    } else if(commandName === "!pingola") {
        let arg1 = ""
        let random = Math.round((Math.random() + Number.EPSILON) * 190) / 10;
        random++;
        if(args !== undefined && arg1 !== commandName) { arg1 = args.join(" ") + " "; } else { arg1 = ""; }
        client.say(target, `@${userVar}, o tamanho da sua pingola ${arg1}é de ${random}cm`)
    } else if(commandName === "!daoban") {
        let arg = "";
        console.log(args);
        if(args[0] !== undefined ) {arg = `@${args[0]} `};
        if(args[0].toLowerCase && args[0].toLowerCase() === "alon3bot") {
            
            console.log("s");
            return client.say(target, "Não vai me banir >:)");
        }
        client.say(target, `${arg}VOCÊ ACABA DE SER  B A N I D O >:)`);
    } else { }
}

function rollDice () {
    const sides = 6;
    return Math.floor(Math.random() * sides) + 1;
}
// Called every time the bot connects to Twitch chat
function onConnectedHandler (addr, port) {
    console.log(`* Connected to ${addr}:${port}`);
}

function onRaidedHandler(channel, username, viewers) {
    client.say(channel, ` GlitchCat GlitchCat @${username}, Valeu pela raid com ${views} espectadores meu mano, espero que a live tenha sido braba! Sejam Todos Bem Vindos! GlitchCat GlitchCat `)
}