module.exports = app => {
    app.db.sequelize.sync().done(() => { 
        app.listen(app.get('port'), () => { 
            console.log(`Server is running in port ${app.get('port')}`);
        });
    });
};