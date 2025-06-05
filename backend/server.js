import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

let products = [
  { _id: '1', name: 'Sample Product', banner: 'https://via.placeholder.com/150', description: 'Test item', price: 100 },
];

// GET all products
app.get('/api/products', (req, res) => {
  res.json(products);
});

// GET one product
app.get('/api/products/:id', (req, res) => {
  const product = products.find(p => p._id === req.params.id);
  if (product) {
    res.status(200).json(product);
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
});

// POST a new product
app.post('/api/products', (req, res) => {
  const newProduct = { ...req.body, _id: Date.now().toString() };
  products.push(newProduct);
  res.status(201).json(newProduct);
});

// PUT update product
app.put('/api/products/:id', (req, res) => {
  const index = products.findIndex(p => p._id === req.params.id);
  if (index !== -1) {
    products[index] = { ...products[index], ...req.body };
    res.status(200).json({ message: 'Product updated' });
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
});

// DELETE a product
app.delete('/api/products/:id', (req, res) => {
  const exists = products.some(p => p._id === req.params.id);
  if (exists) {
    products = products.filter(p => p._id !== req.params.id);
    res.status(200).json({ message: 'Product deleted' });
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
});

app.listen(5000, () => console.log('Server running on port 5000'));
