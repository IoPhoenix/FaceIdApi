const updateProfile = (req, res, db) => {
    const { id, newName, newEmail } = req.body;
    console.log(id, newName, newEmail);

    db('users')
        .where('id', '=', id)
        .update({name: newName})
        .update({email: newEmail})
        .then(data => {
            db('login')
                .where('id', '=', id)
                .update({email: newEmail})
                .returning('email')
                .then(data => {
                    res.json(data)
                })
                .catch(err => {
                    console.log(err);
                    res.status(400).json(err);
                });
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
}

module.exports = {
    updateProfile: updateProfile
}