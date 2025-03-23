import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./AdminPage.module.css";
import TextField from "@mui/material/TextField";
import { Box, Button, Modal, Typography } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const AdminPage = () => {
  const [admins, setAdmins] = useState([]);
  const [formData, setFormData] = useState({
    adminName: "",
    adminEmail: "",
    adminPassword: "",
  });
  const [editData, setEditData] = useState(null);
  const [open, setOpen] = useState(false); // Modal state

  // Fetch Admins
  useEffect(() => {
    fetchAdmins();
  }, []);

  const fetchAdmins = async () => {
    try {
      const response = await axios.get("http://localhost:4500/Admins");
      setAdmins(response.data);
    } catch (error) {
      console.error("Error fetching admins:", error);
    }
  };

  // Handle Form Input
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Submit Form (Add Admin)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:4500/Admin", formData);
      fetchAdmins();
      setFormData({ adminName: "", adminEmail: "", adminPassword: "" });
    } catch (error) {
      console.error("Error adding admin:", error);
    }
  };

  // Delete Admin
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:4500/Admin/${id}`);
      fetchAdmins();
    } catch (error) {
      console.error("Error deleting admin:", error);
    }
  };

  // Open Edit Modal
  const handleEditClick = (admin) => {
    setEditData(admin);
    setOpen(true);
  };

  // Handle Edit Form Input
  const handleEditChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  // Submit Edited Admin
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:4500/Admin/${editData._id}`, editData);
      fetchAdmins();
      setOpen(false);
    } catch (error) {
      console.error("Error updating admin:", error);
    }
  };

  return (
    <div className={styles.container}>
      <h1>Add New Admin</h1>
      {/* Add Admin Form */}
      <Box component="form" sx={{ "& > :not(style)": { m: 1, width: "25ch" } }} onSubmit={handleSubmit}>
        <TextField name="adminName" label="Name" variant="outlined" value={formData.adminName} onChange={handleChange} required />
        <TextField name="adminEmail" label="Email" variant="outlined" value={formData.adminEmail} onChange={handleChange} required />
        <TextField name="adminPassword" label="Password" variant="standard" value={formData.adminPassword} onChange={handleChange} required />
        <Button type="submit" variant="contained">SUBMIT</Button>
      </Box>

      {/* Admin Table */}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="admin table">
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell align="center">Name</TableCell>
              <TableCell align="center">Email</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {admins.map((admin, index) => (
              <TableRow key={admin._id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell align="center">{admin.adminName}</TableCell>
                <TableCell align="center">{admin.adminEmail}</TableCell>
                <TableCell align="center">
                  <EditIcon style={{ cursor: "pointer", marginRight: "10px" }} onClick={() => handleEditClick(admin)} />
                  <DeleteIcon style={{ cursor: "pointer", color: "red" }} onClick={() => handleDelete(admin._id)} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Edit Admin Modal */}
      <Modal open={open} onClose={() => setOpen(false)} aria-labelledby="modal-title">
        <Box sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: 400, bgcolor: "background.paper", p: 4, boxShadow: 24 }}>
          <Typography id="modal-title" variant="h6" component="h2">Edit Admin</Typography>
          {editData && (
            <Box component="form" onSubmit={handleEditSubmit}>
              <TextField fullWidth name="adminName" label="Name" value={editData.adminName} onChange={handleEditChange} margin="normal" required />
              <TextField fullWidth name="adminEmail" label="Email" value={editData.adminEmail} onChange={handleEditChange} margin="normal" required />
              <TextField fullWidth name="adminPassword" label="Password" value={editData.adminPassword} onChange={handleEditChange} margin="normal" required />
              <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>Update</Button>
            </Box>
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default AdminPage;
