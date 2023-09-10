const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.gs9v16e.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();

    //   collection
    const teamsCollection = client.db("task-hub").collection("teams");
    const userCollection = client.db("task-hub").collection("users");

    //   Routes

    //   Team Routes
    //   Get all teams
    app.get("/teams", async (req, res) => {
      const cursor = teamsCollection.find({});
      const teams = await cursor.toArray();
      res.send(teams);
    });

    //   Get team by id
    app.get("/teamsById/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const team = await teamsCollection.findOne(query);
      res.send(team);
    });

    //   Add a new team
    app.post("/teams", async (req, res) => {
      const team = req.body;
      const result = await teamsCollection.insertOne(team);
      res.send(result);
    });

    //   Add Team Member
    app.patch("/teams/addMember/:id/:email", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const email = req.params.email;
      const userQuery = { email: email };
      const existingUser = await userCollection.findOne(userQuery);
      if (existingUser) {
        const team = await teamsCollection.findOne(query);
        const members = team.members;
        if (members.includes(email)) {
          res.send({ user: true });
        } else {
          const options = { upsert: true };
          const updateDoc = {
            $push: {
              members: email,
            },
          };
          const result = await teamsCollection.updateOne(
            query,
            updateDoc,
            options
          );
          res.send({ result: result, user: true });
        }
      } else {
        res.send({ user: false });
      }
    });

    //   Get teams by email
    app.get("/teamsByEmail/:email", async (req, res) => {
      const email = req.params.email;
      const query = { members: email };
      const cursor = teamsCollection.find(query);
      const teams = await cursor.toArray();
      res.send(teams);
    });

    //   Get Member by team id
    app.get("/membersById/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const team = await teamsCollection.findOne(query);
      const members = team.members;
      const cursor = userCollection.find({ email: { $in: members } });
      const users = await cursor.toArray();
      res.send(users);
    });

    //   Get team by id and email
    app.get("/teamsByIdAndEmail/:id/:email", async (req, res) => {
      const id = req.params.id;
      const email = req.params.email;
      const query = { _id: new ObjectId(id), members: email };
      const team = await teamsCollection.findOne(query);
      res.send(team);
    });

    //   Add Task
    app.patch("/teams/addTask/:id", async (req, res) => {
      const id = req.params.id;
      const newTask = req.body;

      const userEmail = newTask.userEmail;
      const userQuery = { email: userEmail };
      const user = await userCollection.findOne(userQuery);
      newTask.userName = user.name;
      newTask.status = "incomplete";
      const date = newTask.date;
      const dateArray = date.split("-");
      const newDate = `${dateArray[2]}/${dateArray[1]}/${dateArray[0]}`;
      newTask.date = newDate;
      newTask._id = new ObjectId();
      const options = { upsert: true };
      const query = { _id: new ObjectId(id) };
      const updateDoc = {
        $push: {
          tasks: newTask,
        },
      };
      const result = await teamsCollection.updateOne(query, updateDoc, options);
      res.send(result);
    });

    //   Get Task by team id and email
    app.get("/tasksByIdAndEmail/:id/:email", async (req, res) => {
      const id = req.params.id;
      const email = req.params.email;
      const priority = req.query.priority;
      const query = { _id: new ObjectId(id) };
      const team = await teamsCollection.findOne(query);
      const tasks = team.tasks.filter((task) => task.userEmail === email);
      if (priority === "all") {
        res.send(tasks);
      } else if (priority === "high") {
        const result = tasks.filter((task) => task.priority === "high");
        res.send(result);
      } else if (priority === "medium") {
        const result = tasks.filter((task) => task.priority === "medium");
        res.send(result);
      } else if (priority === "low") {
        const result = tasks.filter((task) => task.priority === "low");
        res.send(result);
      }
    });

    //   Update Task Status
    app.patch("/teams/updateStatus/:id/:taskId/:status", async (req, res) => {
      const id = req.params.id;
      const taskId = req.params.taskId;
      const status = req.params.status;
      const query = { _id: new ObjectId(id) };

      const team = await teamsCollection.findOne(query);
      if (!team) {
        return res.status(404).send("Team not found");
      }

      const tasks = team.tasks;

      const task = tasks.find((task) => {
        if (task._id instanceof ObjectId) {
          return task._id.toString() === taskId;
        }
        return false;
      });

      if (!task) {
        return res.status(404).send("Task not found");
      }

      task.status = status;

      const updateDoc = {
        $set: {
          tasks: tasks,
        },
      };

      try {
        const result = await teamsCollection.updateOne(query, updateDoc);
        res.send(result);
      } catch (error) {
        console.error(error);
        res.status(500).send("Error updating task status");
      }
    });

    //   Delete Task
    app.patch("/teams/deleteTask/:id/:taskId", async (req, res) => {
      const id = req.params.id;
      const taskId = req.params.taskId;
      const query = { _id: new ObjectId(id) };
      const team = await teamsCollection.findOne(query);
      const tasks = team.tasks;
      const newTasks = tasks.filter((task) => {
        if (task._id instanceof ObjectId) {
          return task._id.toString() !== taskId;
        }
        return false;
      });

      const options = { upsert: true };
      const updateDoc = {
        $set: {
          tasks: newTasks,
        },
      };
      const result = await teamsCollection.updateOne(query, updateDoc, options);
      res.send(result);
    });

    //   User Routes
    //   Get all users
    app.get("/users", async (req, res) => {
      const cursor = userCollection.find({});
      const users = await cursor.toArray();
      res.send(users);
    });

    //   Get user by email
    app.get("/usersByEmail/:email", async (req, res) => {
      const email = req.params.email;
      const query = { email: email };
      const user = await userCollection.findOne(query);
      res.send(user);
    });

    //   Add a new user
    app.post("/users", async (req, res) => {
      const user = req.body;
      //   check if user already exists
      const query = { email: user.email };
      const existingUser = await userCollection.findOne(query);
      if (existingUser) {
        res.send("User already exists");
      } else {
        const result = await userCollection.insertOne(user);
        res.send(result);
      }
    });

    //   Update user
    app.patch("/users/:email", async (req, res) => {
      const email = req.params.email;
      const query = { email: email };
      const user = req.body;
      const options = { upsert: true };
      const updateDoc = {
        $set: {
          name: user.name,
          photo: user.photo,
          bio: user.bio,
        },
      };
      const result = await userCollection.updateOne(query, updateDoc, options);
      res.send(result);
    });

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Task Hub Server");
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
