const handleRegister = (req, res, db, bcrypt) => {
    const { email, password, name} = req.body;

    if (!email || !password || !name) {
        return res.status(400).json('Incorrect user credentials');
    }

    const hash = bcrypt.hashSync(password);

    /* All queries within a transaction are executed 
    on the same database connection, and run the entire 
    set of queries as a single unit of work. Any failure 
    will mean the database will rollback any queries executed 
    on that connection to the pre-transaction state.*/

    // store user email and hashed password into login table
    db.transaction(trx => {
        trx.insert({
          hash: hash,
          email: email
        })
        .into('login')
        .returning('email')

        // then store other user details into users table
        .then(loginEmail => {
            return trx('users')
              .returning('*')
              .insert({
                email: loginEmail[0],
                name: name,
                joined: new Date()
              })
              // return user info
              .then(user => {
                res.json(user[0]);
              })
          })
          // if everyting went well, send this transaction through
          .then(trx.commit)
          //rollback will return a rejected Promise
          .catch(trx.rollback)
        })
        .catch(err => res.status(400).json('Cannot register a new user'));
}

module.exports = {
    handleRegister: handleRegister
}