const Sequelize = require('sequelize');
const fs = require('fs');
const path = require('path');
let db = null;

module.exports = app => { 
    if (!db) { 
        const sequelize = new Sequelize(
            app.libs.config.database, 
            app.libs.config.username, 
            app.libs.config.password, 
            app.libs.config.params
        );
        db = { 
            sequelize,
            Sequelize,
            models: {}
        };

        const dir = path.join(__dirname, 'models');
        
        fs.readdirSync(dir).forEach( file => { 
            const modelDir = path.join(dir, file);
            const model = sequelize.import(modelDir);
            db.models[model.name] = model;
        });
        
        Object.keys(db.models).forEach( key => { 
            if (db.models[key].hasOwnProperty('associete')) { 
                db.models[key].associate(db.models)
            }
        });
    }
    return db;
} 