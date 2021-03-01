require('linq4js');
const { Client } = require("tmi.js");

const { JsonDB } = require("node-json-db");
const { Config } = require("node-json-db/dist/lib/JsonDBConfig");

const CommandDB = new JsonDB("command-db", true, true, "/");
CommandDB.load();
CommandDB.save();
if(!CommandDB.exists("/commands")) CommandDB.push("/commands[]", {
    name: "!dice",
    message: "You rolled a $[count]"
});

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

client.on('message', onMessageHandler);
client.on('connected', onConnectedHandler);
client.on("raided", onRaidedHandler);
client.on('join', (channel, username, self) => {
    clearInterval();
    CommandDB.reload()
    if(!self) return;
    function InitInterval() {
        client.say(channel, "/me Me sigam ai nas redes sociais ✌. Instagram: https://www.instagram.com/taosozinho1/. Twitter: https://twitter.com/taosozinho1. Entrem lá no Discord, as vezes rola uns papos com a galera por lá: https://discord.gg/6H4wKg2rU4")
        setTimeout(() => client.say(channel, "/me Para adicionar músicas na song request, digite ai !sr e o nome da música ou um link do YouTube/SoundCloud, só lembra de ser sem copyright😢👌"), 200000);
        setTimeout(() => client.say(channel, "/me Acessem os comandos disponéveis com !comandos"), 400000);
        setInterval(() => client.say(channel, "/me Me sigam ai nas redes sociais ✌. Instagram: https://www.instagram.com/taosozinho1/. Twitter: https://twitter.com/taosozinho1. Entrem lá no Discord, as vezes rola uns papos com a galera por lá: https://discord.gg/6H4wKg2rU4"), 600000);
        setTimeout(() => setInterval(() => client.say(channel, "/me Para adicionar músicas na song request, digite ai !sr e o nome da música ou um link do YouTube/SoundCloud, só lembra de ser sem copyright😢👌"), 600000), 200000);
        setTimeout(() => setInterval(() => client.say(channel, "/me Acessem os comandos disponéveis com !comandos"), 600000), 400000);
    }
    InitInterval();
    if(1) return;
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
    if(context.username === 'taosozinho') {
        context['user-type'] = 'admin';
    }

    if(context.username === 'nightbot' && (msg === 'nao' || msg === 'sim')) {
        return client.say(target, "Para de ser do contra nightbot DarkMode DarkMode");
    }

    let args = msg.split(/ +/g);

    const commandName = args.shift();
    console.log(commandName)
    let userVar = context.username;
    if((self || context.username === 'alon3bot')&& commandName !== "!daoban") { return; }
    if(msg.startsWith('😳') && msg.endsWith('😳')) {
        return client.say(target, msg);
    }

    if(commandName === "!comandos") {
        let comandos = CommandDB.getData("/commands");
        let msgcomandos = comandos.map(c => {
            if(c.exclude) {}

            else if(c.displayName) {
                return c.displayName;
            } else {
                return c.name;
            }
        }).join(",  ");
        return client.say(target, msgcomandos);
    }

    if(context.username === 'nightbot') { return; }
    let command = {};
    if(commandName === "!addcomando" && context['user-type'] !== '') {
        command.name = args.shift();
        console.log(args);
        let splitmsg = args.join(' ').split('--init');
        console.log(splitmsg);
        command.message = splitmsg[0];
        let init = (splitmsg[1] || [''])
        const AddFunction = new Function('_$', 'CommandDB', `${init !== '' ? init + ';' : ''}` + 'CommandDB.push(\'/commands[]\', _$);');
        AddFunction(command, CommandDB);
        client.say(target, `O comando '${command.name}' foi adicionado com sucesso!`);
        return;        
    } else if(commandName === '!editcomando' && context['user-type'] !== '') {
        try {
            if(args.length < 2) return;
            let cmdDel = args.shift();
            let i = CommandDB.getIndex('/commands', cmdDel, 'name');
            if(i === -1) return;
            command = CommandDB.getData(`/commands[${i}]`);
            let edit = new Function("_$", "args", "context", "self", "commandName", "client", "target", "msg", args.join(' ') + ";return _$;");
            let updCommand = edit(command, args, context, self, commandName, client, target, msg);
            if(updCommand && updCommand.message) {
                CommandDB.push(`/commands[${i}]`, updCommand, true);
                client.say(target, `O comando '${cmdDel}' foi editado com sucesso!`)
            }
        } catch(e) {
            console.log(e);
        }
    } else if(commandName === "!delcomando" && context['user-type'] !== '') {
        try {
            console.log("dsda")
            console.log(args);
            if(!args.length) return;
            let cmdDel = args.shift();
            let i = CommandDB.getIndex("/commands", cmdDel, "name");
            console.log(i)
            if(i === -1) return;
            CommandDB.delete(`/commands[${i}]`);
            client.say(target, `O comando '${cmdDel}' foi deletado com sucesso!`)
        } catch (e) {
            console.log(e);
        }
    } else {
        console.log(context);
        ExeCommand(target, commandName, args, context, self, client, msg);
    }
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

function ExeCommand(target, commandName, args, context, self, client, msg) {  
    try {
        console.log(commandName);
        let i = CommandDB.getIndex("/commands", commandName, "name");
        if(i === -1) return;
        console.log(i);
        let command = CommandDB.getData(`/commands[${i}]`);
        console.log('cooldown??????',command.cooldown && command.cooldowns && command.cooldowns.includes(context.username));
        if(command.stopSpam || (command.blacklist && command.blacklist.includes(context.username)) || (command.cooldown && command.cooldowns && command.cooldowns.includes(context.username))) { return;}
        console.log(command);
        let exec = new Function("_$", "args", "context", "self", "commandName", "client", "target", "msg", "CommandDB", "cmdIndex", command.message);
        let resp = exec(command, args, context, self, commandName, client, target, msg, CommandDB, i);
        if(command.cooldown && command.cooldown > 0) {
            if(command.cooldowns === undefined) command.cooldowns = [];
            command.cooldowns.push(context.username);
            setTimeout(() => {
                let cbI = i;
                let cbCommand = command;
                cbCommand.cooldowns.Remove(context.username);
                CommandDB.push(`/commands[${cbI}]`, cbCommand, true);
            }, Number(command.cooldown) * 1000);
        }

        CommandDB.push(`/commands[${i}]`, command, true);
        if(resp === undefined || resp === null) return;
        let message = resp.toString();
        console.log(message);
        client.say(target ,message);
    } catch(e) {
        console.log("err",e);
    }
}