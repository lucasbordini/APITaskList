module.exports = { 
    database: 'bootcamp',
    username: '',
    password: '', 
    params: { 
        dialect: 'sqlite',
        storage: 'bootcamp.sqlite',
        define: { 
            uderscored: true
        }
    },
    jwtSecret: 'B007C4MP-AP1',
    jwtSession: { 
        session: false
    }
};