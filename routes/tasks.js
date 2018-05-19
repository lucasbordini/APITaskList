const {
    body,
    validationResult
} = require('express-validator/check');
const {
    matchedData
} = require('express-validator/filter');

module.exports = app => {

    const Tasks = app.db.models.Tasks;

    app.route('/tasks')
        .all(app.auth.authenticate())
        .get((req, res) => {
            Tasks.findAll({
                where: { 
                    userId: req.user.id
                }
            })
                .then(result => {
                    res.json(result);
                })
                .catch(error => {
                    res.status(500).json({
                        msg: error.message
                    });
                });
        })
        .post([
            body('title', 'Required field').exists(),
            body('title', 'Invalid lenght').trim().isLength({
                min: 1,
                max: 255
            })
        ], (req, res) => {
            const errors = validationResult(req);
            if (errors.isEmpty()) {
                const task = matchedData(req);
                task.userId = req.user.id;
                Tasks.create(task)
                    .then(result => {
                        res.json(result);
                    })
                    .catch(error => {
                        res.status(500).json({
                            msg: error.message
                        });
                    });
            } else {
                res.status(400).json({ 
                    msg: errors.array()
                });
            }

        });

    app.route('/tasks/:id')
        .all(app.auth.authenticate())
        .get((req, res) => {
            Tasks.findOne({ 
                where: { 
                    id: req.params.id,
                    userId: req.user.id
                }
            })
                .then(reslt => {
                    res.json(result);
                })
                .catch(error => {
                    res.status(500).json({
                        msg: error.message
                    });
                });
        })
        .put([
            body('title', 'Required field').exists(),
            body('title', 'Invalid lenght').trim().isLength({
                min: 1,
                max: 255
            }),
            body('done', 'Reqired Field').exists(),
            body('done', 'Not a boolean').isBoolean()
        ], (req, res) => {
            const errors = validationResult(req);
            if (errors.isEmpty) {
                Tasks.update(matchedData(req), {
                        where: {
                            id: req.params.id,
                            userId: req.user.id
                        }
                    })
                    .then(() => {
                        res.sendStatus(204);
                    })
                    .catch(error => {
                        res.status(500).json({
                            msg: error.message
                        });
                    });
            } else {
                res.status(400).json({
                    msg: error.message
                });
            }
        })
        .delete((req, res) => {
            Tasks.destroy({
                    where: {
                        id: req.params.id,
                        userId: req.user.id
                    }
                })
                .then(() => {
                    res.sendStatus(200);
                })
                .catch(error => {
                    res.status(500).json({
                        msg: error.message
                    });
                });
        });


};