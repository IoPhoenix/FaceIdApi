const handleSignin = (req, res, db, bcrypt) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json('Incorrect user credentials');
    }

    db.select('email', 'hash').from('login')
    .where('email', '=', email)
    .then(data => {
      // compare entered password with hashed password in database 
      const isValid = bcrypt.compareSync(password, data[0].hash);

      if (isValid) {
        return db.select('*').from('users')
          .where('email', '=', email)
          .then(user => {
            res.json(user[0])
          })
      }
    })
    .catch(err => res.status(400).json('Sign in failed'));
}

module.exports = {
    handleSignin
}