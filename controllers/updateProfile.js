const updateProfile = (req, res, db) => {
    const { id, newName, newEmail } = req.body;
    console.log(id, newName, newEmail);

    db('users')
        .where('id', '=', id)
        .update({name: newName})
        .then(() => {
            db('login')
                .select('id')
                .where('email', '=', newEmail)
                .then((rows) => {
                    if (rows.length === 0) {
                        // no matching email found
                        return db('login').where('id', '=', id).update({email: newEmail})
                    } else {
                        // return or throw - duplicate name found
                        return 'Duplicate email found'
                    }
                })
                // .where('id', '=', id)
                // .update({email: newEmail})
                .returning('email')
                .then(data => {
                    res.json(data)
                })
                .catch(err => {
                    console.log(err);
                    res.status(400).json('Unable to update your email');
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