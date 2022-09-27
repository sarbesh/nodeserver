const request = require('request'),
models = require('../models');

exports.read_comments = (req, res) => {
    models.comments.findAll({
        where: {
            is_active: true
        }
    }).then(comments => {
        res.json(comments);
    }
    ).catch(err => {
        res.json(err);
    }
    );
};

exports.create_comments = async(req, res) => {
    const transaction = await models.sequelize.transaction();
    try{
        let insert_obj = req.body;
        console.log("insert_obj: ", insert_obj);
        let ids = await models.comments.create(insert_obj, { transaction: transaction });
        console.log("ids: ", ids);
        let data = await models.comments.findOne({
            attributes: ['id', 'comment', 'user_id'],
            where: {
                id: ids.id
            },
            transaction: transaction
        })
        console.log("data: ", data);
        if((!data) || data.comment!=req.body.comment || data.user_id!=req.body.user_id){
            throw new Error("data mismatch");   
        }
        res.json({message: "success"});
        await transaction.commit();
    } catch (err) {
        console.log("err: ", err);
        await transaction.rollback();
        res.json({message: "failed"});
    }
};
