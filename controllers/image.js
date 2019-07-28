const Clarifai = require('clarifai');

const app = new Clarifai.App({
    apiKey: process.env.CLARIFAI_API
});

const handleAPICall = ((req, res) => {
    let input = req.body.input;

    console.log('Received image url: ', input);


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

    console.log('Increasing number of entries...');
    
    db('users')
        .where('id', '=', id)
        .increment('entries', 1)
        .returning('entries')
        .then(data => {
            res.send({
                response: data,
                target: 'entries',
                text: 'Success! The # of entries was updated'
            });
        })
        .catch(err => {
            console.log(err);
            res.status(400).json('Cannot get entries.');
        });
}

module.exports = {
    increaseNumberOfEntries,
    handleAPICall
}