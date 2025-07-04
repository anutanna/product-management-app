import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import ProductCard from '../../components/ProductCard';
import ProductModal from '../../components/ProductModel'; 
import { EmptyComponent } from '../../components/Empty';
import Header from '../../components/Header';
import { useDispatch, useSelector } from 'react-redux';
import { readProducts, createProduct, updateProduct } from '../../redux/actions/productActions';
import Spinner from 'react-bootstrap/Spinner';
import { useNavigate } from 'react-router-dom';

const Products = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { products, loading, error } = useSelector((state) => state.products);

  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    banner: '',
    description: '',
    price: '',
  });

  const handleEditProduct = (product) => {
    setFormData({
      name: product.name,
      banner: product.banner,
      description: product.description,
      price: product.price,
    });
    setEditingProduct(product);
    setShowModal(true);
  };

  const handleAddOrUpdateProduct = () => {
    if (editingProduct) {
      dispatch(updateProduct(editingProduct._id, formData));
    } else {
      dispatch(createProduct(formData));
    }
    setFormData({ name: '', banner: '', description: '', price: '' });
    setEditingProduct(null);
    setShowModal(false);
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login'); // redirect if not logged in
    } else {
      dispatch(readProducts());
    }
  }, [dispatch, navigate]);

  return (
    <section>
      <Header />
      <Container className="mt-4">
        <div className="d-flex justify-content-end mb-4">
          <Button variant="outline-primary" onClick={() => setShowModal(true)}>
            + Add Product
          </Button>
        </div>

        {loading ? (
          <div className="d-flex justify-content-center">
            <Spinner animation="border" variant="primary" />
          </div>
        ) : products.length === 0 ? (
          <div
            className="d-flex justify-content-center align-items-center"
            style={{ minHeight: '200px' }}
          >
            <EmptyComponent message="We're currently out of stock!" />
          </div>
        ) : (
          <Row className="g-4">
            {products.map((product) => (
              <Col key={product._id} xs={12} sm={6} lg={3}>
                <ProductCard
                  product={product}
                  onEdit={() => handleEditProduct(product)}
                />
              </Col>
            ))}
          </Row>
        )}

        {error && (
          <div className="alert alert-danger text-center mt-3">{error}</div>
        )}
      </Container>

      <ProductModal
        show={showModal}
        onClose={() => {
          setShowModal(false);
          setEditingProduct(null);
        }}
        onSubmit={handleAddOrUpdateProduct}
        title={editingProduct ? "Edit Product" : "Add New Product"}
        submitLabel={editingProduct ? "Update" : "Add"}
      >
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Product Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Banner URL</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter banner URL"
              value={formData.banner}
              onChange={(e) =>
                setFormData({ ...formData, banner: e.target.value })
              }
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter price"
              value={formData.price}
              onChange={(e) =>
                setFormData({ ...formData, price: e.target.value })
              }
            />
          </Form.Group>
        </Form>
      </ProductModal>
    </section>
  );
};

export default Products;
