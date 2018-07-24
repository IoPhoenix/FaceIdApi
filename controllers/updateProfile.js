
const updateName = (req, res, db) => {
    const { id, newName } = req.body;

    db('users')
        .where('id', '=', id)
        .update({name: newName})
        .then(data => {
            console.log('data after name change: ', data);
            res.json('success');
        })
        .catch(err => {
            console.log(err);
            res.status(400).json('Unable to update name');
        });
}



const updateEmail= (req, res, db) => {
    // check that new email doesn't exist in the database
}

module.exports = {
    updateName: updateName,
    updateEmail: updateEmail
}