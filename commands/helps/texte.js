const fs = require('fs')

module.exports = {
    name: "texte",
    descriptionfr: "Affiche des commandes pour modifier votre texte",
    descriptionen: "Displays commands to edit your text",
    premium: true,
    invisible: true,
    run: async (client, message, args) => {
        let cc = 0
        const commands = []
        const commandFiles = fs.readdirSync(`./commands/texte`).filter(file => file.endsWith('.js'));
        
        for (const file of commandFiles) {
            const command = require(`../texte/${file}`);
            if (!cc || cc < " » ".length + client.db.prefix.length + command.name.length + (command.usage?.length || 0)) cc =  " » ".length + client.db.prefix.length + command.name.length + (command.usage?.length || 0)
        }
        for (const file of commandFiles) {
            const command = require(`../texte/${file}`);
            if (command.owner) continue;
            if (command.premium && !client.premium && command.invisible) continue;
            client.db.theme === "speed" ? commands.push(`\`${client.db.prefix}${command.name}\` ➜ **${!client.trad(command.descriptionen, command.descriptionfr) ? client.trad('No description.', 'Aucune description.') : client.trad(command.descriptionen, command.descriptionfr)}**${command.premium && !command.invisible ? ` |「Premium ${client.trad("Required", "Requis")}」` : ""}`) :
            client.db.theme === "codeblock" ? commands.push(`${client.db.prefix}${command.name} ${command.usage ? command.usage : ""}`+" ".repeat(cc- " » ".length - client.db.prefix.length - command.name.length - (command.usage?.length || 0))+` » ${!client.trad(command.descriptionen, command.descriptionfr) ? client.trad('No description.', 'Aucune description.') : client.trad(command.descriptionen, command.descriptionfr)}${command.premium && !command.invisible ? ` |「Premium ${client.trad("Required", "Requis")}」` : ""}`) : 
            client.db.theme === "nighty" ? commands.push(`[ ${client.db.prefix}${command.name} ${command.usage || " "}] ${!client.trad(command.descriptionen, command.descriptionfr) ? client.trad('No description.', 'Aucune description.') : client.trad(command.descriptionen, command.descriptionfr)}${command.premium && !command.invisible ? ` |「Premium ${client.trad("Required", "Requis")}」` : ""}`) : 
            client.db.theme === "k3s" ? commands.push(`\`${client.db.prefix}${command.name}\`\n ▸  ***${!client.trad(command.descriptionen, command.descriptionfr) ? client.trad('No description.', 'Aucune description.') : client.trad(command.descriptionen, command.descriptionfr)}${command.premium && !command.invisible ? ` |「Premium ${client.trad("Required", "Requis")}」` : ""}***`) :
            client.db.theme === "ryz" ? commands.push(`- **${client.db.prefix}${command.name}** ${!client.trad(command.descriptionen, command.descriptionfr) ? client.trad('No description.', 'Aucune description.') : client.trad(command.descriptionen, command.descriptionfr)}${command.premium && !command.invisible ? ` |「Premium ${client.trad("Required", "Requis")}」` : ""}`) : 
            client.db.theme === "ethone" ? commands.push(`${client.db.prefix}${command.name} » ${!client.trad(command.descriptionen, command.descriptionfr) ? client.trad('No description.', 'Aucune description.') : client.trad(command.descriptionen, command.descriptionfr)}${command.premium && !command.invisible ? ` |「Premium ${client.trad("Required", "Requis")}」` : ""}`) :
            ""
        }
  
        client.db.theme === "speed" ? message.edit(`⛧ __**${client.db.name}**__ ⛧\n` + commands.map(c => c).join('\n')) :
        client.db.theme === "codeblock" ? message.edit(">>> "+`⛧ __**${client.db.name}**__ ⛧\`\`\`ansi\n <> = ${client.trad("Required", "Obligatoire")} | [] = ${client.trad("Optional", "Optionnel")}\`\`\`\`\`\`ansi\n${commands.map(c => c).join('\n')}\`\`\``.replaceAll(" <", " [2;31m<").replaceAll("> ", ">[0m ").replaceAll(" [", " [2;34m[").replaceAll("] ", "][0m ")) : 
        client.db.theme === "nighty" ? message.edit(`\`\`\`ini\n${commands.map(c => c).join('\n')}\`\`\``) : 
        client.db.theme === "k3s" ? message.edit(`⛧ __**${client.db.name}**__ ⛧\n` + commands.map(c => c).join('\n')) :
        client.db.theme === "ryz" ? message.edit(`# texte\n## ${client.trad(`texte commands`, `Commandes texte`)}\n${commands.map(c => c).join('\n')}`) :
        client.db.theme === "ethone" ? message.edit(`\`\`\`${client.db.name}\`\`\`\`\`\`texte\`\`\`\`\`\`${commands.map(c => c).join('\n')}\`\`\``) :
        ""
  
    }
}