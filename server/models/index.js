// @flow

const fs = require('fs')
const path = require('path')
const Sequelize = require('sequelize')
const basename = path.basename(module.filename)
const env = process.env.NODE_ENV || 'development'
const config = require('../config/config')[env]
const {classify} = require('inflection')

const db = {}

let sequelize = config.use_env_variable
? new Sequelize(process.env[config.use_env_variable], config)
: new Sequelize(config.database, config.username, config.password, config)

fs
.readdirSync(__dirname)
.filter((file:string)=>(file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
.forEach((file:string)=>{
  const model = sequelize.import(path.join(__dirname, file))
  const name = classify(model.name)
  db[name] = model
})

Object.keys(db).forEach((modelName:string)=>{
  if (db[modelName].associate) {
    db[modelName].associate(db)
  }
})

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db
