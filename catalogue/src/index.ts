interface Product {
  id: number
  name: string
  price: number
  description?: string
}

const products: Product[] = [
  { id: 1, name: 'Clavier mécanique', price: 89.9, description: 'Switches rouges, rétroéclairé' },
  { id: 2, name: 'Souris sans fil', price: 29.99, description: 'Autonomie 3 mois' },
  { id: 3, name: 'Tapis de souris', price: 12.5 },
  { id: 4, name: 'Écran 27 pouces', price: 249, description: 'QHD 165 Hz' },
  { id: 5, name: 'Casque audio', price: 59, description: 'Réduction de bruit' },
]

function findById(products: Product[], id: number): Product | undefined {
  return products.find((p) => p.id === id)
}

function cheaperThan(products: Product[], max: number): Product[] {
  return products.filter((p) => p.price < max)
}

const id = Number(process.argv[2])

const product = findById(products, id)

if (product === undefined) {
  console.log(`Produit ${id} introuvable`)
} else {
  console.log(product.name)
  console.log(`${product.price} €`)
  console.log(product.description ?? 'Pas de description')
}

const cheap = cheaperThan(products, 50)
const names = cheap.map((p) => p.name)

console.log(`Produits à moins de 50 € : ${names.join(', ')}`)