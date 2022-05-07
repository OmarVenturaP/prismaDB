const express = require('express');
const app = express();
app.use(express.json());
const port = process.env.PORT || 3000;

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

app.get('/', (request, response) => {
    response.json({message: 'alive'});
});

app.listen(port, () => {
    console.log(`Listening to request on port ${port}`);
});