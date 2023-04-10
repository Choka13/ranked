const { Client } = require('discord.js')
const config = require('./config.json')

const client = new Client({
    partials: ['GUILD_MEMBER', 'CHANNEL', 'USER', 'REACTION']
})

client.on('ready', () => {
    console.log('Le bot est connecté !')

    client.user.setActivity('Cum Production', {
        type: 'STREAMING'
    })
})

client.login(config.token)

client.on('guildMemberAdd', member => {
    member.roles.add('1094831976424407040'); // Rôle par défaut "Unranked" pour tous les utilisateurs
});

const points = {}; // Créer un objet pour stocker les points des utilisateurs
const roles = ['Unranked', 'Bronze', 'Silver', 'Gold', 'Platinium', 'Diamond', 'Master', 'Challenger']; // Liste des noms de rôles à attribuer en fonction des paliers atteints
let roleIndex = 0; // Indice du rôle actuel dans la liste des rôles

client.on('message', (message) => {
  if (message.channel.id === '1094800215871082517' && (message.content === '+1' || message.content === '+2' || message.content === '+3')) { // Vérifie que le message a été envoyé dans le bon channel et qu'il contient un des points autorisés
    const userId = message.author.id;
    if (!points[userId]) {
      points[userId] = 0;
    }
    points[userId] += parseInt(message.content.slice(1)); // Ajoute les points du message à l'utilisateur
    if (points[userId] >= 10 && roleIndex < roles.length) { // Vérifie si le palier a été atteint et qu'il reste des rôles à attribuer
      const role = message.guild.roles.cache.find(r => r.name === roles[roleIndex]); // Trouve le rôle correspondant dans la liste des rôles
      if (role) {
        message.member.roles.add(role); // Ajoute le rôle à l'utilisateur
        message.reply(`tu as atteint le palier ${points[userId]} et tu as reçu le rôle ${role.name} !`);
        roleIndex++; // Passe au rôle suivant dans la liste des rôles
      }
    }
  }
});

client.on('message', (message) => {
    if (message.content === '!scores') { // Vérifie si la commande !scores a été envoyée
      const leaderboard = Object.entries(points) // Transforme l'objet points en tableau de tuples [userId, points, RoleIndex]
        .sort((a, b) => b[1] - a[1]) // Trie les tuples par ordre décroissant de points
    }
});
