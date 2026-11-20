# catalogue

Premier programme TypeScript. Zéro `any`.

```bash
npm install
npm start -- 2    # produit 2
npm run errors    # erreurs volontaires
```

## Erreurs (étape 6)

Fichier : `errors/index_error.ts`

| Erreur | Code | Pourquoi |
|---|---|---|
| Faute de frappe `product.nme` | TS2551 | champ existe pas dans `Product` |
| `price: '12.5'` | TS2322 | string au lieu de number |
| `product.price` sans `if` | TS18048 | `findById` peut renvoyer `undefined` |
