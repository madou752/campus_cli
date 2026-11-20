# campus-cli

Petit CLI en Node qui dit bonjour, affiche la date du jour et génère un identifiant à partir du nom.

```bash
npm install
node campus.js "Prénom Nom"
```

## Exercice 01.1

### Question 2

`^1.6.9` accepte tout ce qui est entre 1.6.9 et 2.0.0 (exclu), donc les mises à jour mineures et les patchs.
`~1.6.9` accepte seulement les patchs, donc entre 1.6.9 et 1.7.0 (exclu).

- 1.6.12 : acceptée par les deux (12 > 9, on compare des nombres)
- 1.7.0 : acceptée par `^` mais pas par `~`
- 1.10.0 : acceptée par `^` mais pas par `~`
- 2.0.0 : refusée par les deux (nouvelle version majeure)
- 1.6.2 : refusée par les deux (plus ancienne que 1.6.9)

Donc `^1.6.9` accepte 1.6.12, 1.7.0 et 1.10.0, et `~1.6.9` accepte seulement 1.6.12.

### Question 3

Non, pas besoin de paquet pour les deux.

Pour un identifiant aléatoire, Node a déjà `crypto.randomUUID()` :

```js
import { randomUUID } from 'node:crypto'
console.log(randomUUID())
```

Pour une date en français, on peut utiliser `toLocaleDateString` (c'est déjà ce que je fais dans `campus.js`) :

```js
new Date().toLocaleDateString('fr-FR')
```

### Question 4

J'ai demandé à une IA un paquet pour afficher « il y a 3 jours ». Elle m'a proposé : moment, dayjs, date-fns, timeago.js, javascript-time-ago, time-ago-format et relative-time-fr.

J'ai vérifié chaque nom avec `npm view <nom>` :

- moment, dayjs, date-fns, timeago.js et javascript-time-ago existent et ont eu une version en 2026. Par contre moment est en mode maintenance, ils déconseillent de l'utiliser sur un nouveau projet.
- time-ago-format et relative-time-fr n'existent pas (erreur 404). L'IA les a inventés, donc il faut toujours vérifier avant d'installer.

Au final un paquet n'est pas vraiment utile, JavaScript a déjà `Intl.RelativeTimeFormat` :

```js
const rtf = new Intl.RelativeTimeFormat('fr')
console.log(rtf.format(-3, 'day')) // il y a 3 jours
```
