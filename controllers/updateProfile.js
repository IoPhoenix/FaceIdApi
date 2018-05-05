const updateProfile = (req, res, db) => {
    const { id, newName } = req.body;

    db('users')
        .where('id', '=', id)
        .update({name: newName})
        .returning('name')
        .then(data => {
          res.json('success')
        })
        .catch(err => {
            console.log(err);
            res.status(400).json('Error updating user name');
        });
}

module.exports = {
    updateProfile: updateProfile
}