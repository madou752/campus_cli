import slugify from 'slugify'

const name = process.argv[2]
const today = new Date().toLocaleDateString('fr-FR')
const identifiant = slugify(name ?? '', { lower: true, strict: true, locale: 'fr' })
console.log(`Bienvenue au campus ${name} !!!!!!`)
console.log(`Aujourd'hui, nous sommes le ${today}`)
console.log(`Ton identifiant : ${identifiant}`)
