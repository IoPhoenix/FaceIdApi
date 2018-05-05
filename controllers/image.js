const Clarifai = require('clarifai');

const app = new Clarifai.App({
    apiKey: process.env.CLARIFAI_API // key is saved on Heroku
});

const handleAPICall = ((req, res) => {
    app.models
        .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
        .then(data => res.json(data))
        .catch(err => res.status(400).json('Error detecting the face'));
})

const increaseNumberOfEntries = (req, res, db) => {
    const { id } = req.body;
    
    db('users')
        .where('id', '=', id)
        .increment('entries', 1)
        .returning('entries')
        .then(entries => {
            res.json(entries[0]);
        })
        .catch(err => res.status(400).json('Cannot get entries'))
  ;
}

module.exports = {
    increaseNumberOfEntries,
    handleAPICall
}