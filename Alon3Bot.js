const { Client } = require("tmi.js");

const { JsonDB } = require("node-json-db");
const { Config } = require("node-json-db/dist/lib/JsonDBConfig");

const CommandDB = new JsonDB("command-db", true, true, "/");

if(!CommandDB.exists("/commands")) CommandDB.push("/commands[]", {
    name: "!dice",
    message: "You rolled a $[count]"
});

const $8ballResp = [

];

const opts = {
    identity: {
        username: "Alon3Bot",
        password: "oauth:jg172xljcxq1pv5f1l3mnoe6plmqz3"
    },
    channels: [
        "igorpereira2718",
        "taosozinho",
        "Alon3Bot",
    ],
    logger: {
        error: (msg) => console.log(msg),
        info: (msg) => console.log(msg),
        warn: (msg) => console.log(msg)
    }
};

const client = new Client(opts);
const commands = [
    "!dice",
    "!instagram",
    "!discord",
    "nao",
    "sim",
    "!pack",
    "!paofilosofy",
    "!sr",
    "!musica",
    "!pés",
    "!daoban",
    "!shaco",
    "!fumaça",
    "!baderna",
    "!pingola",
    "!taloco",
    "!dantas",
    "!saddantas",
    "!tutorial",
    "!elo",
    "!pula (mod)",
    "!say (mod)",
];

client.on('message', onMessageHandler);
client.on('connected', onConnectedHandler);
client.on("raided", onRaidedHandler);
client.on('join', (channel, username, self) => {
    if(!self || true) return;
    
    client.say(channel, "/me BOT ONN TROPA 🤡🤡🤡🤡🤡🤡🤡🤡🤡🤡🤡😈😈😈😈😈😈😈😈😈!!!!!!!!!!");
});
client.on("whisper", async (from, us, msg, self) => {
    console.log(from);
    console.log(us);
    console.log(msg);
    console.log(self);
    try {
        let resp = await client.whisper(from, "yay");
        console.log(resp)
    } catch (e) {
        console.log(e);
    }
});

client.connect();

function onMessageHandler(target, context, msg, self) {
    if(context.username === 'nightbot' && (msg === 'nao' || msg === 'sim')) {
        client.say(target, "Para de ser do contra nightbot DarkMode DarkMode");
    }

    let args = msg.split(/ +/g);

    const commandName = args.shift();
    console.log(commandName)
    let userVar = context.username;
    if(self && commandName !== "!daoban") { return; }
    console.log(target);
    if(context.username === 'nightbot') { return; }

    if(commandName === "!addcomando" && context['user-type'] !== '') {
        var command = {};
        command.name = args.shift();
        console.log(args);
        let splitmsg = args.join(' ').split('--init');
        console.log(splitmsg);
        command.message = splitmsg[0];
        command.init = (splitmsg[1] || ['']).join(' ');
        const AddFunction = new Function('_$', 'CommandDB', `${command.init !== '' ? command.init + ';' : ''}` + 'CommandDB.push(\'/commands[]\', _$);console.log(\'hello\')');
        AddFunction(command, CommandDB);
        return;        
    } else if(commandName === "!foo") {
        ExeCommand(target, commandName);
    }

    if(commandName === '!addcomando') { 

    } else if(commandName.toLowerCase() === 'its' || commandName.toLowerCase() === 'it\'s') { 
        if(args[0].toLowerCase() === "grongos") client.say(target, "/me ITS GRONGOS POHA 😎😎😎😎😎😎😎")
    }else if(commandName === "!comandos") { 
        client.say(target, "/me "+commands.join(", "))
    } else if(commandName === "!pack") {
        let chance = Math.round((Math.random() + Number.EPSILON) * 1000) / 10 
        client.say(target, `@${userVar}, sua chance de receber um pack do pé do Ademir é de ${chance}%`)
        "let chance = Math.round((Math.random() + Number.EPSILON) * 1000) / 10 return `@${userVar}, sua chance de receber um pack do pé do Ademir é de ${chance}%`)"
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
        if(args[0] && args[0].toLowerCase && args[0].toLowerCase() === "alon3bot") {
            
            console.log("s");
            return client.say(target, "Não vai me banir >:)");
        }
        client.say(target, `${arg}VOCÊ ACABA DE SER  B A N I D O >:)`);
    } else if(commandName === "!taloco") {
        client.say(target, "Pois é... Ademiro ta loco DarkMode")
    } else if (commandName === "!fumaça") { 
        client.say(target, "É Umidificador só 😳");
    } else if (commandName === "!shaco") {
        client.say(target, "Basicamente mono shaco, mas agora que vou começar a jogar mais competitivamente to treinando alguns outros tipo gragas pq vao banir shaco")
    } else if (commandName === "!saddantas") {
        client.say(target, "PERA O DANTAS TEM XERECÃO?");
    } else if (commandName === "!musica") {
        client.say(target, "Para adicionar músicas na song request, digite ai !sr e o nome da música ou um link do YouTube/SoundCloud, só lembra de ser BR, musica gringa pode dar copyright 😢👌")
    } else if (commandName === "!tutorial") {
        client.say(target, "Segue o Link -> https://nightbot.tv/login e entra com sua conta twitch, se não for logo em seguida vai pra https://nightbot.tv/dashboard e clica em Join Channel, no seu canal da twitch, conceda Permissões de moderador digitando /mod Nightbot")  
    } else if (commandName === "!baderna") {
        client.say(target, "O ADM ESTÁ ON!!! PODE BADERNAR 👺👺")
    } else if(commandName.toLowerCase() === "ja" || commandName.toLowerCase() === "já") { 
        if(args[0].toLowerCase() === 'volto') client.say(target, "/me O MOD TA OFF, CABO A IGREJA 👺👺👺👺👺")
    } else if(commandName === "!say") { 
        if((args[0] === "" || args[0] === undefined || args[0] === null) || context['user-type'] === "" || (args[1] === "" || args[1] === undefined || args[1] === null)) return;
        let name = args.shift();
        client.say(`${name === 'self' ? target : '#' + name}`, args.join(" "));
    } else if(commandName === "!vick") { 

    } else if(commandName.toLowerCase() === "pog") { 
        client.say(target, '/me DMSSS 🤩🤩🤩');
    } else if(commandName.toLowerCase() === "na" || commandName.toLowerCase() === "n/a") { 
        if(args[0].toLowerCase() === "mod") {
            client.say(target, "/me OLHA LA O MOD FAZENDO CAGADA 👌👌👌🤡🤡🤡");
        } else if(args[0].toLowerCase() === "bot") { 
            client.say(target, "/me SUPREMACIA @Alon3Bot O MELHOR DE TODOS 😎😎😎😎😎😎😎");
        }
    } else if(commandName === "!8ball") { 
        client.say
    } else if(commandName === "!so") { 
        client.say(target, `www.twitch.tv/${args[0].toLowerCase()} PowerUpL GlitchCat PowerUpR PowerUpL GlitchCat PowerUpR Passem lá na live do/a mano/a @${args[0]}`)
    } else if(commandName === "!whisper" && context["user-type"] !== "") { 
        let name = args.shift();
        console.log(name)
        console.log(args.join(" "))
        client.whisper("#"+name, args.join(" "));
    } else if(commandName === "!addcommand") { 
        client.say(target, (new Function())())
    } else if(commandName === '!paofilosofy') { 
        if(args[0] === undefined || args[0] === "") {
            return client.say(target, "Se dissermos que 1 pão estraga em 1 dia, cada dia da sua vida você poderia ter visto 1 pão envelhecer pra cada dia que você viveu 😳👌")
        }
        client.say(target, `Você já é velho suficiente pra ter visto ${Math.round(Number(args[0]) * 365.25)} pães velhos`);
    } else if(commandName === "matriz?") { 
        client.say(target, "/me MATRIZ? KKKJ")
    } else if(commandName.startsWith("😳")) { 
        client.say(target, commandName)
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
    client.say(channel, ` GlitchCat GlitchCat @${username}, Valeu pela raid com ${viewers} espectadores meu mano, espero que a live tenha sido braba! Sejam Todos Bem Vindos! GlitchCat GlitchCat `)
}

function ExeCommand(target, commandName) {  
    try {
        console.log(commandName);
        let i = CommandDB.getIndex("/commands", commandName, "name");
        let command = CommandDB.getData(`/commands[${i}]`);
        console.log(command);
        let exec = new Function("_$", command.message);
        console.log(exec().toString());
        client.say(target ,exec().toString());
    } catch(e) {
        console.log(e);
    }
}