const updateAvatar = (req, res, db) => {
    const { id, avatarUrl } = req.body;

    db('users')
        .where('id', '=', id)
        .update({avatar: avatarUrl})
        .returning('avatar')
        .then(url => {
          res.json('success')
        })
        .catch(err => {
            console.log(err);
            res.status(400).json('Error getting avatar');
        });
}

module.exports = {
    updateAvatar: updateAvatar
}