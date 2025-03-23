const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const port = 4500;


//use express static folder
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("./public"));
const multer = require('multer');
app.use("/uploads", express.static("uploads"));


app.listen(port, async () => { // 👈 Changed to async function
  try {
    console.log(`Server is running ${port}`);

    // 🚨 MISTAKE 2: Missing await for connection
    await mongoose.connect("mongodb+srv://albin2364:albin2364@cluster0.sc5gv.mongodb.net/soft");
    console.log("db connection established");
  } catch (err) {
    console.error("Database connection error:", err.message);
  }
});

//   ********************************************************************************************************************Schema
const adminSchema = new mongoose.Schema({
  adminName: { type: String, required: true },
  adminEmail: { type: String, required: true, unique: true },
  adminPassword: { type: String, required: true },
});

const Admin = mongoose.model("Admin", adminSchema);

// Add Admin (POST)
app.post("/Admin", async (req, res) => {
  try {
    const { adminName, adminEmail, adminPassword } = req.body;
    let admin = await Admin.findOne({ adminEmail });

    if (admin) {
      return res.status(400).json({ error: "Admin already exists" });
    }

    admin = new Admin({ adminName, adminEmail, adminPassword });
    await admin.save();
    res.json({ message: "Admin inserted successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Admin Login (POST)
app.post("/AdminLogin", async (req, res) => {
  try {
    const { adminEmail, adminPassword } = req.body;

    const admin = await Admin.findOne({ adminEmail });
    if (!admin) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    if (admin.adminPassword !== adminPassword) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    res.json({ message: "Login successful" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Get All Admins (GET)
app.get("/Admins", async (req, res) => {
  try {
    const admins = await Admin.find();
    res.json(admins);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Delete Admin (DELETE)
app.delete("/Admin/:id", async (req, res) => {
  try {
    await Admin.findByIdAndDelete(req.params.id);
    res.json({ message: "Admin deleted successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Update Admin (PUT)
app.put("/Admin/:id", async (req, res) => {
  try {
    const { adminName, adminEmail, adminPassword } = req.body;

    const updatedAdmin = await Admin.findByIdAndUpdate(
      req.params.id,
      { adminName, adminEmail, adminPassword },
      { new: true } // Returns the updated document
    );

    if (!updatedAdmin) {
      return res.status(404).json({ error: "Admin not found" });
    }

    res.json({ message: "Admin updated successfully", updatedAdmin });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});






// *****************************************************************************************************************Menu
const typeDesignationSchema = new mongoose.Schema({
  type: { type: String, required: true },
  designation: { type: String, required: true }
});

const TypeDesignation = mongoose.model("TypeDesignation", typeDesignationSchema);
app.post("/typeDesignation", async (req, res) => {
  try {
    const { type, designation } = req.body;

    // Check if it already exists
    let existingEntry = await TypeDesignation.findOne({ type, designation });
    if (existingEntry) {
      return res.status(400).json({ msg: "Type and Designation already exist" });
    }

    const newEntry = new TypeDesignation({ type, designation });
    await newEntry.save();
    res.status(201).json({ message: "Type-Designation added successfully", newEntry });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// ➤ Get all Type-Designations (GET)
app.get("/typeDesignations", async (req, res) => {
  try {
    const typeDesignations = await TypeDesignation.find();
    res.json(typeDesignations);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// ➤ Get a Single Type-Designation by ID (GET)
app.get("/typeDesignation/:id", async (req, res) => {
  try {
    const typeDesignation = await TypeDesignation.findById(req.params.id);
    if (!typeDesignation) {
      return res.status(404).json({ msg: "Type-Designation not found" });
    }
    res.json(typeDesignation);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// ➤ Update a Type-Designation by ID (PUT)
app.put("/typeDesignation/:id", async (req, res) => {
  try {
    const { type, designation } = req.body;

    const updatedEntry = await TypeDesignation.findByIdAndUpdate(
      req.params.id,
      { type, designation },
      { new: true } // Return the updated document
    );

    if (!updatedEntry) {
      return res.status(404).json({ msg: "Type-Designation not found" });
    }

    res.json({ message: "Type-Designation updated successfully", updatedEntry });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// ➤ Delete a Type-Designation by ID (DELETE)
app.delete("/typeDesignation/:id", async (req, res) => {
  try {
    const deletedEntry = await TypeDesignation.findByIdAndDelete(req.params.id);
    if (!deletedEntry) {
      return res.status(404).json({ msg: "Type-Designation not found" });
    }
    res.json({ message: "Type-Designation deleted successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});
// ****************************************************************************************************************Items
const ItemSchema = new mongoose.Schema({
  menu: { type: String, required: true }, // Breakfast, Lunch, Dinner
  itemName: { type: String, required: true },
  designation: { type: String, required: true }, // Description or category
  price: { type: Number, required: true }
});

const Item = mongoose.model("Item", ItemSchema);

// ➤ CREATE Item
app.post("/items", async (req, res) => {
  try {
    const newItem = new Item(req.body);
    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ➤ READ All Items
app.get("/items", async (req, res) => {
  try {
    const items = await Item.find();
    res.status(200).json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ➤ UPDATE Item
app.put("/items/:id", async (req, res) => {
  try {
    const updatedItem = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedItem) return res.status(404).json({ message: "Item not found" });
    res.status(200).json(updatedItem);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ➤ DELETE Item
app.delete("/items/:id", async (req, res) => {
  try {
    const deletedItem = await Item.findByIdAndDelete(req.params.id);
    if (!deletedItem) return res.status(404).json({ message: "Item not found" });
    res.status(200).json({ message: "Item deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


app.get("/typeDesignation", async (req, res) => {
  try {
    const typeDesignations = await TypeDesignation.find({}, "type"); // Fetch only 'type'
    res.status(200).json(typeDesignations);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});