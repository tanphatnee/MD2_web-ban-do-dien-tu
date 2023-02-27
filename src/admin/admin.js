import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import axios from 'axios';
import { TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@material-ui/core';

function App() {
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState({ name: '', price: '' });

  useEffect(() => {
    axios.get('http://localhost:3000/products')
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const handleChange = (event) => {
    setProduct({ ...product, [event.target.name]: event.target.value });
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    axios.post('http://localhost:3000/products', product)
      .then(response => {
        setProducts([...products, response.data]);
        setProduct({ name: '', price: '' });
      })
      .catch(error => {
        console.log(error);
      });
  }

  const handleDelete = (id) => {
    axios.delete(`http://localhost:3000/products/${id}`)
      .then(response => {
        setProducts(products.filter(product => product.id !== id));
      })
      .catch(error => {
        console.log(error);
      });
  }

  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/add-product">Add Product</Link>
            </li>
          </ul>
        </nav>

        <Route exact path="/">
          <h1>Product List</h1>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {products.map(product => (
                  <TableRow key={product.id}>
                    <TableCell>{product.name}</TableCell>
                    <TableCell>{product.price}</TableCell>
                    <TableCell>
                      <Button variant="contained" color="primary" href={`/edit-product/${product.id}`}>Edit</Button>
                      <Button variant="contained" color="secondary" onClick={() => handleDelete(product.id)}>Delete</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Route>

        <Route path="/add-product">
          <h1>Add Product</h1>
          <form onSubmit={handleSubmit}>
            <TextField name="name" label="Name" value={product.name} onChange={handleChange} /><br />
            <TextField name="price" label="Price" value={product.price} onChange={handleChange} /><br />
            <Button variant="contained" color="primary" type="submit">Add Product</Button>
          </form>
        </Route>

      <Route path="/edit-product/:id">
        <h1>Edit Product</h1>
        <form onSubmit={handleUpdate}>
          <TextField name="name" label="Name" value={product.name} onChange={handleChange} /><br />
          <TextField name="price" label="Price" value={product.price} onChange={handleChange} /><br />
          <Button variant="contained" color="primary" type="submit">Update Product</Button>
        </form>
      </Route>
    </div>
  </Router>
);
                }

