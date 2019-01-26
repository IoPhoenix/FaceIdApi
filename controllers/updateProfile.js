
const updateName = (req, res, db) => {
    const { id, newName } = req.body;

    db('users')
        .where('id', '=', id)
        .update({name: newName})
        .returning('name')
        .then(data => {
            res.send({
                response: data,
                target: 'name',
                message: 'Success! The name was updated'
            });
        })
        .catch(err => {
            console.log(err);
            res.status(400).json('Something went wrong. Please try again later.');
        });
}



const updateEmail = (req, res, db) => {
    // check that new email doesn't exist in the database
    const { id, oldEmail, newEmail } = req.body;

     // first check if email already exists
     db('users')
     .select()
     .where('email', '=', newEmail)
     .then(rows => {
         // if no such email found, update email in login database
         if (rows.length === 0) {
             return db('login').where('email', '=', oldEmail).update({email: newEmail});
         } else {
            return 'Email already exists';
         }
     })
     // then update email in users database
     .then(data => {
         return db('users')
             .where('id', '=', id)
             .update({email: newEmail})
             .returning('email')
     })
     .then(data => {
            res.send({
                response: data,
                target: 'email',
                message: 'Success! The email was updated'
            });
     })
     .catch(err => {
         console.log(err);
         res.status(400).json('Something went wrong. Please try again later.');
     });
}

module.exports = {
    updateName: updateName,
    updateEmail: updateEmail
}