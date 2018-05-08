const updateProfile = (req, res, db) => {
    const { id, newName, newEmail } = req.body;

    db('users')
        .where('id', '=', id)
        .update({name: newName, email: newEmail})
        .returning('name')
        .then(data => {
          res.json(data)
        })
        .catch(err => {
            console.log(err);
            res.status(400).json('Error updating user details');
        });
}

module.exports = {
    updateProfile: updateProfile
}