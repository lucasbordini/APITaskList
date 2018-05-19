module.exports = app => { 
    app.listen(app.get('port'), () => { 
        console.log(`Server is running in port ${port}`);
    });
}