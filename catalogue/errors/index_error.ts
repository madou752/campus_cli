// Fichier volontairement faux : il sert à montrer les erreurs de l'étape 6.
// Il est en dehors de src/ pour ne pas casser `npm start`.
// Pour voir les erreurs : npm run errors

interface Product {
  id: number
  name: string
  price: number
  description?: string
}

function findById(products: Product[], id: number): Product | undefined {
  return products.find((p) => p.id === id)
}

// Erreur 2 : mauvais type -> TS2322
// price doit être un number, ici c'est une string
const products: Product[] = [
  { id: 1, name: 'Clavier mécanique', price: 89.9 },
  { id: 2, name: 'Tapis de souris', price: '12.5' },
]

const product = findById(products, 1)

// Erreur 3 : absence non traitée -> TS18048
// findById peut renvoyer undefined et on ne le vérifie pas
console.log(product.price)

if (product !== undefined) {
  // Erreur 1 : faute de frappe -> TS2551
  // nme au lieu de name
  console.log(product.nme)
}
