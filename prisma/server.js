const express = require("express");
const app = express();
app.use(express.json());
const port = process.env.PORT || 3000;

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

app.get("/", (request, response) => {
    response.json({message: "alive"});
});

app.get("/explorers", async (request, response) => {
    const allExplorers = await prisma.explorer.findMany({});
    response.set("Access-Control-Allow-Origin", "*");
    response.json(allExplorers);
});

app.get("/explorers/:id", async (request, response) => {
    const id = request.params.id;
    const explorer = await prisma.explorer.findUnique({where: {id: parseInt(id)}});
    response.set("Access-Control-Allow-Origin", "*");
    response.json(explorer);
});

app.post("/explorers", async (request, response) => {
    const explorer = {
        name: request.body.name,
        username: request.body.username,
        mission: request.body.mission
    };
    const message = "Explorer creado.";
    await prisma.explorer.create({data: explorer});
    response.set("Access-Control-Allow-Origin", "*");
    return response.json({message});
});

app.put("/explorers/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    await prisma.explorer.update({
        where: {
            id: id
        },
        data: {
            mission: req.body.mission
        }
    });
    res.set("Access-Control-Allow-Origin", "*");
    return res.json({message: "Actualizado correctamente"});
});

app.delete("/explorers/:id", async (request, response) => {
    const id = parseInt(request.params.id);
    await prisma.explorer.delete({where: {id: id}});
    response.set("Access-Control-Allow-Origin", "*");
    return response.json({message: "Eliminado correctamente"});
});

// Modelo Students
app.get("/students", async (request, response) => {
    const allStudents = await prisma.student.findMany({});
    response.set("Access-Control-Allow-Origin", "*");
    response.json(allStudents);
});

app.get("/students/:id", async (request, response) => {
    const id = request.params.id;
    const student = await prisma.student.findUnique({where: {id: parseInt(id)}});
    response.set("Access-Control-Allow-Origin", "*");
    response.json(student);
});

app.post("/students", async (request, response) => {
    const student = {
        name: request.body.name,
        lang: request.body.lang,
        missionComander: request.body.missionComander,
        enrollments: request.body.enrollments,
        hasCertification: request.body.hasCertification
    };
    const message = "Student creado.";
    await prisma.student.create({data: student});
    response.set("Access-Control-Allow-Origin", "*");
    return response.json({message});
});

app.put("/students/:id", async (request, response) => {
    const id = parseInt(request.params.id);
    await prisma.student.update({
        where: {
            id: id
        },
        data: {
            lang: request.body.lang,
            missionComander: request.body.missionComander,
        }
    });
    return response.json({message: "Actualizado correctamente"});
});

app.delete("/students/:id", async (request, response) => {
    const id = parseInt(request.params.id);
    await prisma.student.delete({where: {id: id}});
    response.set("Access-Control-Allow-Origin", "*");
    return response.json({message: "Eliminado correctamente"});
});

// Modelo Fellows
app.get("/fellows", async (request, response) => {
    const allFellow = await prisma.fellow.findMany({});
    response.set("Access-Control-Allow-Origin", "*");
    response.json(allFellow);
});

app.get("/fellows/:id", async (request, response) => {
    const id = request.params.id;
    const fellows = await prisma.fellow.findUnique({where: {id: parseInt(id)}});
    response.set("Access-Control-Allow-Origin", "*");
    response.json(fellows);
});

app.post("/fellows", async (request, response) => {
    const fellow = {
        name: request.body.name,
        username: request.body.username,
        mainStack: request.body.mainStack,
        currentEnrollmend: request.body.currentEnrollmend,
        hasAzureCertification: request.body.hasAzureCertification
    };
    const message = "fellow creado.";
    await prisma.fellow.create({data: fellow});
    response.set("Access-Control-Allow-Origin", "*");
    return response.json({message});
});

app.put("/fellows/:id", async (request, response) => {
    const id = parseInt(request.params.id);
    await prisma.fellow.update({
        where: {
            id: id
        },
        data: {
            mainStack: request.body.mainStack,
        }
    });
    return response.json({message: "Actualizado correctamente"});
});

app.delete("/fellows/:id", async (request, response) => {
    const id = parseInt(request.params.id);
    await prisma.fellow.delete({where: {id: id}});
    response.set("Access-Control-Allow-Origin", "*");
    return response.json({message: "Eliminado correctamente"});
});

// Modelo missionCommanders
app.get("/missionCommanders", async (request, response) => {
    const allmissionCommanders = await prisma.missionCommander.findMany({});
    response.set("Access-Control-Allow-Origin", "*");
    response.json(allmissionCommanders);
});

app.get("/missionCommanders/:id", async (request, response) => {
    const id = request.params.id;
    const missionCommanders = await prisma.missionCommander.findUnique({where: {id: parseInt(id)}});
    response.set("Access-Control-Allow-Origin", "*");
    response.json(missionCommanders);
});

app.post("/missionCommanders", async (request, response) => {
    const missionCommander = {
        name: request.body.name,
        username: request.body.username,
        mainStack: request.body.mainStack,
        currentEnrollmend: request.body.currentEnrollmend,
        hasAzureCertification: request.body.hasAzureCertification
    };
    const message = "missionCommander creado.";
    await prisma.missionCommander.create({data: missionCommander});
    response.set("Access-Control-Allow-Origin", "*");
    return response.json({message});
});

app.put("/missionCommanders/:id", async (request, response) => {
    const id = parseInt(request.params.id);
    await prisma.missionCommander.update({
        where: {
            id: id
        },
        data: {
            mainStack: request.body.mainStack,
        }
    });
    return response.json({message: "Actualizado correctamente"});
});

app.delete("/missionCommanders/:id", async (request, response) => {
    const id = parseInt(request.params.id);
    await prisma.missionCommander.delete({where: {id: id}});
    response.set("Access-Control-Allow-Origin", "*");
    return response.json({message: "Eliminado correctamente"});
});
// Cors
const cors = require("cors");

const corsOptions = {
    origin: "http://localhost:8081",
};
app.use(cors(corsOptions));

app.listen(port, () => {
    console.log(`Listening to request on port ${port}`);
});