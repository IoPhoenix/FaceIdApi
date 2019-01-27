const getProfile =  (req, res, db) => {
    const { id } = req.params;

    db.select('*').from('users').where({id})
      .then(user => {
        if (user.length) {
          res.json(user[0])
        } else {
          res.status(400).json('User not found')
        }
      })
      .catch(err => res.status(400).json('Error getting user'))
}


const deleteProfile =  (req, res, db) => {
  const { id, email } = req.body;

  db.select('*').from('login')
  .where('email', '=', email)
  .del()
  .then(count => {
    if (count === 1) {
      db.select('*').from('users')
        .where('id', '=', id)
        .del()
        .then(count => {
          console.log('User information was deleted: ', count);
        })
        .catch(err => {
          console.log('Error is: ', err);
        });
    }
  })
  .then(data => {
    res.send({
      response: data,
      text: 'Success! Your profile was deleted'
  });
  })
  .catch(err => {
    console.log('Error is: ', err);
    res.status(400).json('Error deleting user');
  });
}


module.exports = {
    getProfile: getProfile,
    deleteProfile: deleteProfile
}