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

  app.put('/explorers/:id', async (req, res) => {
	const id = parseInt(req.params.id);
	await prisma.explorer.update({
		where: {
			id: id
		},
		data: {
			mission: req.body.mission
		}
	})
	return res.json({message: "Actualizado correctamente"});
});

app.delete('/explorers/:id', async (request, response) => {
	const id = parseInt(request.params.id);
	await prisma.explorer.delete({where: {id: id}});
	return response.json({message: "Eliminado correctamente"});
});

// Modelo Students
app.get('/students', async (request, response) => {
    const allStudents = await prisma.student.findMany({})
    response.json(allStudents)
});

app.listen(port, () => {
    console.log(`Listening to request on port ${port}`);
});