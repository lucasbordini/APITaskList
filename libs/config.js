module.exports = { 
    database: 'bootcamp',
    username: '',
    password: '', 
    params: { 
        dialect: 'sqlite',
        storage: 'bootcamp.sqlite',
        define: { 
            underscored: false
        }
    },
    jwtSecret: 'B007C4MP-AP1',
    jwtSession: { 
        session: false
    }
};