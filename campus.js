const name = process.argv[2]
const today = new Date().toLocaleDateString('fr-FR')
console.log(`Bienvenue au campus ${name} !!!!!!`)
console.log(`Aujourd'hui, nous sommes le ${today}`)