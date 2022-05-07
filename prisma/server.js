const express = require('express');
const app = express();
app.use(express.json());
const port = process.env.PORT || 3000;

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

app.get('/', (request, response) => {
    response.json({message: 'alive'});
});

app.get('/explorers', async (request, response) => {
    const allExplorers = await prisma.explorer.findMany({})
    response.json(allExplorers)
});

app.get('/explorers/:id', async (request, response) => {
    const id = request.params.id
    const explorer = await prisma.explorer.findUnique({where: {id: parseInt(id)}});
    response.json(explorer);
});

app.post('/explorers', async (request, response) => {
    const explorer = {
      name: request.body.name,
      username: request.body.username,
      mission: request.body.mission
     };
    const message = 'Explorer creado.';
    await prisma.explorer.create({data: explorer});
    return response.json({message});
  });

app.listen(port, () => {
    console.log(`Listening to request on port ${port}`);
});