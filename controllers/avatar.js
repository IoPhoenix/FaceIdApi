const updateAvatar = (req, res, db) => {
    const { id, avatar } = req.body;

    db('users')
        .where('id', '=', id)
        .update({avatar: avatar})
        .returning('avatar')
        .then(data => {
            res.send({
                response: data,
                target: 'avatar',
                message: 'Success! The avatar was updated'
            });
        })
        .catch(err => {
            console.log(err);
            res.status(400).json('Something went wrong. Please try again later.');
        });
}

module.exports = {
    updateAvatar: updateAvatar
}