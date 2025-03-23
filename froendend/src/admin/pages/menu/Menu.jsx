import React, { useState, useEffect } from "react";
import axios from "axios";
import { 
  Box, TextField, Button, Table, TableBody, TableCell, 
  TableContainer, TableHead, TableRow, Paper, Modal, Typography 
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import styles from "./Menu.module.css";

const Menu = () => {
  const [formData, setFormData] = useState({ type: "", designation: "" });
  const [typeDesignations, setTypeDesignations] = useState([]); 
  const [editData, setEditData] = useState(null);
  const [open, setOpen] = useState(false);

  // Fetch Data on Component Mount
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:4500/typeDesignations"); 
  
      console.log("API Status:", response.status);
      console.log("API Response Data:", response.data);
  
      if (response.status === 200 && Array.isArray(response.data)) {
        setTypeDesignations(response.data);
      } else {
        console.error("API did not return an array:", response.data);
        setTypeDesignations([]); 
      }
    } catch (error) {
      console.error("Error fetching data:", error);
  
      if (error.response) {
        console.error("Error Response Data:", error.response.data);
        console.error("Error Status:", error.response.status);
      }
  
      setTypeDesignations([]); 
    }
  };

  // Handle Input Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle Form Submit (Add)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:4500/typeDesignation", formData);
      fetchData();
      setFormData({ type: "", designation: "" });
    } catch (error) {
      console.error("Error adding entry:", error);
    }
  };

  // Handle Delete
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:4500/typeDesignation/${id}`);
      fetchData();
    } catch (error) {
      console.error("Error deleting entry:", error);
    }
  };

  // Handle Edit Click
  const handleEditClick = (entry) => {
    setEditData(entry);
    setOpen(true);
  };

  // Handle Edit Change
  const handleEditChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  // Handle Edit Submit
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:4500/typeDesignation/${editData._id}`, editData);
      setOpen(false);
      fetchData();
    } catch (error) {
      console.error("Error updating entry:", error);
    }
  };

  return (
    <div className={styles.container}>
      <h1>MENU</h1>*The button will only work if "FOOD," "DRINK," and "BRUNCH" are entered in all capital letters.
      {/* Form to Add Type & Designation */}
      <Box component="form" sx={{ "& > :not(style)": { m: 1, width: "25ch" } }} onSubmit={handleSubmit}>
      *The button will only work if "FOOD," "DRINK," and "BRUNCH" are entered in all capital letters.
        <TextField name="type" label="Type" variant="outlined" value={formData.type} onChange={handleChange} required />
        <TextField name="designation" label="Designation" variant="outlined" value={formData.designation} onChange={handleChange} required />
        <Button type="submit" variant="contained">SUBMIT</Button>
      </Box>

      {/* Type-Designation Table */}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="type-designation table">
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell align="center">Type</TableCell>
              <TableCell align="center">Designation</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.isArray(typeDesignations) && typeDesignations.length > 0 ? (
              typeDesignations.map((entry, index) => (
                <TableRow key={entry._id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell align="center">{entry.type}</TableCell>
                  <TableCell align="center">{entry.designation}</TableCell>
                  <TableCell align="center">
                    <EditIcon style={{ cursor: "pointer", marginRight: "10px" }} onClick={() => handleEditClick(entry)} />
                    <DeleteIcon style={{ cursor: "pointer", color: "red" }} onClick={() => handleDelete(entry._id)} />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} align="center">No data available</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Edit Modal */}
      <Modal open={open} onClose={() => setOpen(false)} aria-labelledby="modal-title">
        <Box sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: 400, bgcolor: "background.paper", p: 4, boxShadow: 24 }}>
          <Typography id="modal-title" variant="h6" component="h2">Edit Type & Designation</Typography>
          {editData && (
            <Box component="form" onSubmit={handleEditSubmit}>
              <TextField fullWidth name="type" label="Type" value={editData.type} onChange={handleEditChange} margin="normal" required />
              <TextField fullWidth name="designation" label="Designation" value={editData.designation} onChange={handleEditChange} margin="normal" required />
              <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>Update</Button>
            </Box>
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default Menu;
