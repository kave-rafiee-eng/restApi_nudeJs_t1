const express = require('express');
const app = express();
const PORT = 8080;

app.use( express.json() )

app.listen(
    PORT ,
    ()=> console.log( `its alive on http://localhost:${PORT}`)
)

app.get('/user', (req,res)=>{

    res.status(200).send({
        name : "kave",
        lastname : 'raf'
    })
});

app.post('/user/:id', (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    if (!name) {
        return res.status(418).send({ message: 'need name' });
    }

    res.status(200).send({ 
        message: `name ${name} and id ${id}`
    });
});