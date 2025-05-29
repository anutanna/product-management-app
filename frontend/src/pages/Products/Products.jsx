import React, { useState } from 'react';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import ProductCard from '../../components/ProductCard';
import ProductModal from '../../components/ProductModel';
import { EmptyComponent } from '../../components/Empty';
import Header from '../../components/Header';

const Products = () => {
  const sampleProducts = [
    { id: 1, name: "Wireless Headphones", description: "Noise cancelling over-ear headphones", banner: "https://res.cloudinary.com/da3w329cx/image/upload/v1683056487/samples/landscapes/nature-mountains.jpg", price: 120 },
    { id: 2, name: "Smart Watch", description: "Smart wearable with health tracking", banner: "https://res.cloudinary.com/da3w329cx/image/upload/v1683056500/cld-sample-5.jpg", price: 80 },
    { id: 3, name: "Laptop", description: "14-inch Full HD display, 256GB SSD", banner: "https://res.cloudinary.com/da3w329cx/image/upload/v1683056499/cld-sample-3.jpg", price: 600 }
  ];

  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ name: '', banner: '', description: '', price: '' });

  const handleAddProduct = () => {
    setProducts([...products, { ...formData, id: Date.now() }]);
    setFormData({ name: '', banner: '', description: '', price: '' });
    setShowModal(false);
  };

  return (
    <section>
      <Header />
      <Container className="mt-4">
        <div className="d-flex justify-content-end mb-4">
          <Button variant="outline-primary" onClick={() => setShowModal(true)}>+ Add Product</Button>
        </div>

        {(sampleProducts.length + products.length) === 0 ? (
          <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '200px' }}>
            <EmptyComponent message="We're currently out of stock!" />
          </div>
        ) : (
          <Row className="g-4">
            {[...sampleProducts, ...products].map((product) => (
              <Col key={product.id} xs={12} sm={6} lg={3}>
                <ProductCard product={product} />
              </Col>
            ))}
          </Row>
        )}
      </Container>

      <ProductModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={handleAddProduct}
        title="Add New Product"
        submitLabel="Add"
      >
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Product Name</Form.Label>
            <Form.Control type="text" placeholder="Enter name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Banner URL</Form.Label>
            <Form.Control type="text" placeholder="Enter banner URL" value={formData.banner} onChange={(e) => setFormData({ ...formData, banner: e.target.value })} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control as="textarea" rows={3} placeholder="Enter description" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Price</Form.Label>
            <Form.Control type="number" placeholder="Enter price" value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} />
          </Form.Group>
        </Form>
      </ProductModal>
    </section>
  );
};

export default Products;
