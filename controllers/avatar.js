const updateAvatar = (req, res, db) => {
    const { id, avatar } = req.body;

    db('users')
        .where('id', '=', id)
        .update({avatar: avatar})
        .returning('avatar')
        .then(res.json('success'))
        .catch(err => {
            console.log(err);
            res.status(400).json('Error getting avatar');
        });
}

module.exports = {
    updateAvatar: updateAvatar
}