const Sequelize = require('sequelize')
const { STRING } = require('sequelize')
const db = new Sequelize('crud_table', 'seth.king', 'Poiop90lik8', {
    host: 'localhost',
    dialect: 'postgres'
})

const Prospect = db.define('prospect', {
    firstName: {
        type: STRING
    },
    lastName: {
        type: STRING
    }
})

const syncAndSeed = async() => {
    try {
        db.sync({ force: true })
        .then(async()=> {
            await Promise.all([
                Prospect.create({
                    firstName: 'seth',
                    lastName: 'king'
                }),
                Prospect.create({
                    firstName: 'ethan',
                    lastName: 'levine'
                }).then(()=> console.log('seeded data'))
            ])
        })
    }
    catch(err){
        console.log(err)
    }
}

module.exports = {
    syncAndSeed,
    Prospect
}
