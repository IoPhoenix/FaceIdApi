const Clarifai = require('clarifai');

const app = new Clarifai.App({
    apiKey: process.env.CLARIFAI_API
});

const handleAPICall = ((req, res) => {
    let input = req.body.input;

    if (input.startsWith('data:image')) {
        input = input.substr(input.indexOf(',') + 1);

         // send the bytes of an image:
        app.models
            .predict(Clarifai.FACE_DETECT_MODEL, { base64: input} )
            .then(data => res.json(data))
            .catch(err => res.status(400).json('error'));
    } else {
        app.models
            .predict(Clarifai.FACE_DETECT_MODEL, input )
            .then(data => res.json(data))
            .catch(err => res.status(400).json('error'));
    }
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