import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./Item.module.css";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Modal,
  Typography
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const Item = () => {
  const [formData, setFormData] = useState({
    menu: "",
    itemName: "",
    designation: "",
    price: "",
  });

  const [items, setItems] = useState([]);
  const [typeOptions, setTypeOptions] = useState([]); // Store menu types
  const [editData, setEditData] = useState(null);
  const [open, setOpen] = useState(false);

  // Fetch items and type designations from API on mount
  useEffect(() => {
    fetchData();
    fetchTypeDesignations();
  }, []);

  // Fetch all items
  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:4500/Items");
      setItems(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Fetch menu types from the backend
  const fetchTypeDesignations = async () => {
    try {
      const response = await axios.get("http://localhost:4500/typeDesignation");
      setTypeOptions(response.data);
    } catch (error) {
      console.error("Error fetching menu types:", error);
    }
  };

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle submit (Add new item)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:4500/Items", formData);
      fetchData();
      setFormData({ menu: "", itemName: "", designation: "", price: "" });
    } catch (error) {
      console.error("Error adding item:", error);
    }
  };

  // Handle delete
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:4500/Items/${id}`);
      fetchData();
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  // Handle edit click
  const handleEditClick = (entry) => {
    setEditData(entry);
    setOpen(true);
  };

  // Handle edit change
  const handleEditChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  // Handle edit submit
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:4500/Items/${editData._id}`, editData);
      setOpen(false);
      fetchData();
    } catch (error) {
      console.error("Error updating item:", error);
    }
  };

  return (
    <div className={styles.container}>
      {/* Form to Add Menu Item */}
      <h1>Add Items</h1>
      <Box component="form" sx={{ "& > :not(style)": { m: 1, width: "25ch" } }} onSubmit={handleSubmit}>
        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <InputLabel>Menu</InputLabel>
          <Select name="menu" value={formData.menu} onChange={handleChange} required>
            <MenuItem value=""><em>None</em></MenuItem>
            {typeOptions.map((option, index) => (
              <MenuItem key={index} value={option.type}>{option.type}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField name="itemName" label="Item Name" variant="outlined" value={formData.itemName} onChange={handleChange} required />
        <TextField name="designation" label="Designations" multiline rows={2} variant="standard" value={formData.designation} onChange={handleChange} required />
        <TextField name="price" label="Price" variant="outlined" type="number" value={formData.price} onChange={handleChange} required />
        <Button type="submit" variant="contained">SUBMIT</Button>
      </Box>

      {/* Menu Items Table */}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="menu-items table">
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell align="center">Menu</TableCell>
              <TableCell align="center">Item Name</TableCell>
              <TableCell align="center">Designations</TableCell>
              <TableCell align="center">Price</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.isArray(items) && items.length > 0 ? (
              items.map((entry, index) => (
                <TableRow key={entry._id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell align="center">{entry.menu}</TableCell>
                  <TableCell align="center">{entry.itemName}</TableCell>
                  <TableCell align="center">{entry.designation}</TableCell>
                  <TableCell align="center">{entry.price}</TableCell>
                  <TableCell align="center">
                    <EditIcon style={{ cursor: "pointer", marginRight: "10px" }} onClick={() => handleEditClick(entry)} />
                    <DeleteIcon style={{ cursor: "pointer", color: "red" }} onClick={() => handleDelete(entry._id)} />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} align="center">No data available</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Edit Modal */}
      <Modal open={open} onClose={() => setOpen(false)} aria-labelledby="modal-title">
        <Box sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: 400, bgcolor: "background.paper", p: 4, boxShadow: 24 }}>
          <Typography id="modal-title" variant="h6" component="h2">Edit Item</Typography>
          {editData && (
            <Box component="form" onSubmit={handleEditSubmit}>
              <FormControl sx={{ m: 1, minWidth: 120 }} fullWidth>
                <InputLabel>Menu</InputLabel>
                <Select name="menu" value={editData.menu} onChange={handleEditChange} required>
                  {typeOptions.map((option, index) => (
                    <MenuItem key={index} value={option.type}>{option.type}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              <TextField fullWidth name="itemName" label="Item Name" value={editData.itemName} onChange={handleEditChange} margin="normal" required />
              <TextField fullWidth name="designation" label="Designations" value={editData.designation} onChange={handleEditChange} margin="normal" required />
              <TextField fullWidth name="price" label="Price" type="number" value={editData.price} onChange={handleEditChange} margin="normal" required />
              <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>Update</Button>
            </Box>
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default Item;

