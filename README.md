# campus-cli

Petit outil en ligne de commande qui accueille une personne, affiche la date du jour et génère son identifiant.
Dépendance : [`slugify`](https://www.npmjs.com/package/slugify), qui transforme un nom en identifiant (`Madou Élève-Test` → `madou-eleve-test`).

```bash
npm install
node campus.js "Prénom Nom"
```

---

## Exercice 01.1 : Choisir et figer une dépendance

### Question 2 : plages de versions `^1.6.9` et `~1.6.9`

- `^1.6.9` accepte toutes les versions `>= 1.6.9` et `< 2.0.0`. On autorise les mises à jour mineures et les correctifs, mais pas une nouvelle version majeure.
- `~1.6.9` accepte toutes les versions `>= 1.6.9` et `< 1.7.0`. On n'autorise que les correctifs.

| Version  | `^1.6.9` | `~1.6.9` | Pourquoi |
|----------|:--------:|:--------:|----------|
| `1.6.12` | ✅ | ✅ | Correctif plus récent que 1.6.9 (12 > 9 : on compare des nombres, pas du texte) |
| `1.7.0`  | ✅ | ❌ | Nouvelle version mineure : refusée par `~` |
| `1.10.0` | ✅ | ❌ | Version mineure 10 > 6, toujours en 1.x |
| `2.0.0`  | ❌ | ❌ | Nouvelle version majeure : changements potentiellement cassants |
| `1.6.2`  | ❌ | ❌ | Plus ancienne que la version minimale 1.6.9 |

**Résultat :** `^1.6.9` accepte 1.6.12, 1.7.0 et 1.10.0. `~1.6.9` n'accepte que 1.6.12.

> Rappel : la plage dans `package.json` dit ce qui est *autorisé*. C'est `package-lock.json` qui *fige* la version exacte installée. C'est pour ça qu'on commite les deux fichiers.

### Question 3 : faut-il un paquet ?

**Identifiant aléatoire : non.** Node fournit `crypto.randomUUID()` (module `node:crypto`, disponible aussi en global dans les versions récentes de Node et dans les navigateurs, voir MDN `Crypto.randomUUID()`).

```js
import { randomUUID } from 'node:crypto';
console.log(randomUUID()); // ex. '3b241101-e2bb-4255-8caf-4136c566a962'
```

**Date en français : non.** L'API `Intl` est intégrée à JavaScript (Node embarque les données de locale complètes, voir MDN `Intl.DateTimeFormat`).

```js
const date = new Date();
console.log(date.toLocaleDateString('fr-FR', { dateStyle: 'full' }));
// ex. 'vendredi 20 novembre 2026'
console.log(new Intl.DateTimeFormat('fr-FR', { dateStyle: 'long', timeStyle: 'short' }).format(date));
```

**Conclusion :** avant d'installer un paquet, vérifier la doc de Node et MDN. Chaque dépendance ajoute du poids, une surface d'attaque (chaîne d'approvisionnement) et de la maintenance.

### Question 4 : un paquet pour afficher « il y a 3 jours » ?

**Noms proposés par une IA** (à vérifier un par un) : `moment`, `dayjs` (plugin `relativeTime`), `date-fns` (`formatDistanceToNow`), `timeago.js`, `javascript-time-ago`.

**Comment vérifier :**

```bash
npm view <nom> name version time.modified repository.url
```

- Si la commande renvoie `404`, **le paquet n'existe pas**. Les IA inventent parfois des noms plausibles. Un attaquant peut publier un paquet malveillant sous ce nom (« slopsquatting »).
- `time.modified` et la date de la dernière version indiquent si le paquet est **maintenu**. On regarde aussi le dépôt GitHub (issues ouvertes, derniers commits).
- Exemple : `moment` existe mais est officiellement en mode maintenance depuis 2020. Ses auteurs recommandent d'utiliser autre chose pour un nouveau projet.

Résultats obtenus le 20/11/2026 :

| Paquet proposé | Existe ? | Dernière version | Maintenu ? |
|----------------|----------|------------------|------------|
| `moment` | ✅ | 2.31.0 (15/09/2026) | Correctifs seulement, projet en mode maintenance |
| `dayjs` | ✅ | 1.11.23 (17/08/2026) | ✅ |
| `date-fns` | ✅ | 4.4.0 (29/05/2026) | ✅ |
| `timeago.js` | ✅ | 4.3.1 (12/11/2026) | ✅ |
| `javascript-time-ago` | ✅ | 2.6.4 (28/02/2026) | ✅ |
| `time-ago-format` | ❌ `E404` | — | Nom inventé |
| `relative-time-fr` | ❌ `E404` | — | Nom inventé |

**Un paquet est-il vraiment utile ? Non.** `Intl.RelativeTimeFormat` est intégré à JavaScript (voir MDN) :

```js
const rtf = new Intl.RelativeTimeFormat('fr', { numeric: 'auto' });
console.log(rtf.format(-3, 'day'));  // 'il y a 3 jours'
console.log(rtf.format(-1, 'day'));  // 'hier'
```

La seule chose à écrire soi-même : calculer l'écart entre deux dates et choisir l'unité (secondes, minutes, jours…). Ça tient en quelques lignes, donc on n'a pas besoin d'une dépendance.
