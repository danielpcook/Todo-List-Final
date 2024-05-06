const express = require("express");
const db = require("./db.js");
const cors = require("cors");

const app = express();
const PORT = 4000;
app.use(cors());
app.use(express.json());

app.get("/task/:category", async (req, res) => {
    try {
    // Read id from frontend
    console.log(category)
    const category = req.params.category;
    const query = "SELECT * FROM task_collection WHERE category = ?";
    const [result] = await db.query(query, [category]); // Ensure to use array for parameters even if it's just one
    console.log("Success in Reading MySQL");
    res.status(200).send(result);
    } catch (err) {
    // If an error occurs, catch it and send an appropriate error response
    console.error("Error in Reading MySQL :", err);
    res.status(500).send({ error: 'An error occurred while fetching items.' });
    }
});

app.get("/task", async (req, res) => {
    try {
    const query = "SELECT * FROM task_collection ORDER BY duedate";
    const [result] = await db.query(query); // Ensure to use array for parameters even if it's just one
    console.log("Success in Reading MySQL");
    res.status(200).send(result);
    } catch (err) {
    console.error("Error in Reading MySQL :", err);
    res.status(500).send({ error: 'An error occurred while fetching items.' });
    }
});

app.get("/taskW", async (req, res) => {
    try {
    const query = "SELECT * FROM task_collection WHERE category = 'Work'";
    const [result] = await db.query(query); // Ensure to use array for parameters even if it's just one
    console.log("Success in Reading MySQL");
    res.status(200).send(result);
    } catch (err) {
    console.error("Error in Reading MySQL :", err);
    res.status(500).send({ error: 'An error occurred while fetching items.' });
    }
});

app.get("/taskL", async (req, res) => {
    try {
    const query = "SELECT * FROM task_collection WHERE category = 'Lifestyle'";
    const [result] = await db.query(query); // Ensure to use array for parameters even if it's just one
    console.log("Success in Reading MySQL");
    res.status(200).send(result);
    } catch (err) {
    console.error("Error in Reading MySQL :", err);
    res.status(500).send({ error: 'An error occurred while fetching items.' });
    }
});

app.get("/taskO", async (req, res) => {
    try {
    const query = "SELECT * FROM task_collection WHERE category = 'Other'";
    const [result] = await db.query(query); // Ensure to use array for parameters even if it's just one
    console.log("Success in Reading MySQL");
    res.status(200).send(result);
    } catch (err) {
    console.error("Error in Reading MySQL :", err);
    res.status(500).send({ error: 'An error occurred while fetching items.' });
    }
});

app.get("/taskS", async (req, res) => {
    try {
    const query = "SELECT * FROM task_collection WHERE category = 'School'";
    const [result] = await db.query(query); // Ensure to use array for parameters even if it's just one
    console.log("Success in Reading MySQL");
    res.status(200).send(result);
    } catch (err) {
    console.error("Error in Reading MySQL :", err);
    res.status(500).send({ error: 'An error occurred while fetching items.' });
    }
});

app.get("/taskLow", async (req, res) => {
    try {
    const query = "SELECT * FROM task_collection WHERE priority = 'Low'";
    const [result] = await db.query(query); // Ensure to use array for parameters even if it's just one
    console.log("Success in Reading MySQL");
    res.status(200).send(result);
    } catch (err) {
    console.error("Error in Reading MySQL :", err);
    res.status(500).send({ error: 'An error occurred while fetching items.' });
    }
});

app.get("/taskMed", async (req, res) => {
    try {
    const query = "SELECT * FROM task_collection WHERE priority = 'Medium'";
    const [result] = await db.query(query); // Ensure to use array for parameters even if it's just one
    console.log("Success in Reading MySQL");
    res.status(200).send(result);
    } catch (err) {
    console.error("Error in Reading MySQL :", err);
    res.status(500).send({ error: 'An error occurred while fetching items.' });
    }
});

app.get("/taskHigh", async (req, res) => {
    try {
    const query = "SELECT * FROM task_collection WHERE priority = 'High'";
    const [result] = await db.query(query); // Ensure to use array for parameters even if it's just one
    console.log("Success in Reading MySQL");
    res.status(200).send(result);
    } catch (err) {
    console.error("Error in Reading MySQL :", err);
    res.status(500).send({ error: 'An error occurred while fetching items.' });
    }
});

app.post("/task", async (req, res) => {
    try {
    // Validate if body contains data
    if (!req.body || Object.keys(req.body).length === 0) {
        const msg = "POST:Bad request: No data provided.";
        console.log(msg);
        return res.status(400).send({ error: msg});
        }
    // Check if the table exists
    const [tableExists] = await db.query("SHOW TABLES LIKE 'task_collection'");
if (tableExists.length === 0) {
const msg = "POST:Table does not exist";
console.log(msg);
return res.status(404).send({error:msg});
}
    // Check if the 'product' exists
    const itemId = req.body.tid;
    const [productExists] = await db.query("SELECT * FROM task_collection WHERE tid = ?", [itemId]);
    if (productExists.length > 0) {
// Item exists
    const msg = "POST:Item already exists";
    console.log(msg);
    return res.status(409).send({error:msg});
    }
    // Proceed to add new item
    const { tid, name, duedate, category, priority} = req.body;
const insertSql = "INSERT INTO task_collection (tid, name, duedate, category, priority) VALUES (?, ?, ?, ?, ?)";
const insertResult = await db.query(insertSql, [tid, name, duedate, category, priority]);
    // success
    const msg = "POST:Success in Posting MySQL"+insertResult;
    console.log(msg);
    return res.status(200).send({success:msg});
    } catch (err) {
    // Handle any error
    const msg = "POST: An ERROR occurred in Post"+err;
    console.error(msg);
    res.status(500).send({error:msg});
    }
});

//delete single task from list
app.delete("/task/:tid", async (req, res) => {
    try{
    // Read id from frontend
    const item = req.params.tid;
    // Verify if item already exists
    console.log("DELETE DELETE DELETE ",item);
    const [taskExists] = await db.query("SELECT * FROM task_collection WHERE tid = ?", [item]);
    if (taskExists.length <= 0) {
    // Item does NOT exist
    const msg = "DELETE:Item "+item+" does NOT exist";
    console.log(msg);
    return res.status(409).send({error:msg});
    }
    // Item does NOT exist
    // Proceed to delete it
    const name = req.params.name;
    const deleteResult = await db.query("DELETE FROM task_collection WHERE name= ?", [name]);
    // success
    const msg = "Success in DELETE item :"+deleteResult;
    console.log(msg);
    return res.status(200).send({success:msg});
    } catch (err){
    // Handle any error
    const msg = "DELETE: An ERROR occurred in Delete"+err;
    console.error(msg);
    res.status(500).send({error:msg});
    }
});

//delete everything from task collection
app.delete("/task", async (req, res) => {
    try{
    // Item does NOT exist
    // Proceed to delete it
    const deleteResult = await db.query("DELETE FROM task_collection");
    // success
    const msg = "Success in DELETE item :"+deleteResult;
    console.log(msg);
    return res.status(200).send({success:msg});
    } catch (err){
    // Handle any error
    const msg = "DELETE: An ERROR occurred in Delete"+err;
    console.error(msg);
    res.status(500).send({error:msg});
    }
});

app.put("/task/:tid", async (req, res) => {
    try{
        const { tid, duedate} = req.body;
        console.log(tid);
        const [taskExists] = await db.query("SELECT * FROM task_collection WHERE tid = ?", [tid]);
        if (taskExists.length <= 0) {
            // Item does NOT exist
            const msg = "Item does NOT exist";
            console.log(msg);
            return res.status(409).send({error:msg});
        }
        console.log("step1");

        const updateResult = await db.query("UPDATE task_collection SET duedate = ? WHERE tid= ?", [duedate, tid]);
        
        const msg = "Success in UPDATE item :"+ updateResult;
        console.log(msg);
        return res.status(200).send({success:msg});
        } catch (err){
        // Handle any error
        const msg = "PUT: An ERROR occurred in update"+err;
        console.error(msg);
        res.status(500).send({error:msg});
        }
});

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});