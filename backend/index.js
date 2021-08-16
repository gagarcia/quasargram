/*
    dependencies
*/

    const express = require('express')

/*
    config - express
*/

    const app = express()
    const port = 3000

/*
    endpoint
*/

    app.get('/posts', (request, response) => {
        posts = [
            {
                caption: 'Golden Gate',
                location: 'San Franciso'
            },
            {
                caption: 'Golden Gate',
                location: 'San Franciso'
            }

        ]
        response.send(posts)
    })

/*
    Listen
*/

    app.listen(port, () => {
        console.log(`Example app listening at http://localhost:${port}`)
    })