import React from 'react';
import { Card } from 'react-bootstrap';
import { Pencil, Trash } from 'lucide-react';

const ProductCard = ({ product, onEdit, onDelete }) => {

  return (
    <Card style={{ width: '100%', minHeight: '400px' }}>
      <Card.Img
        variant="top"
        src={product.banner}
        alt={product.name}
        style={{ height: '200px', objectFit: 'cover' }}
      />
      <Card.Body>
        <Card.Title>{product.name}</Card.Title>
        <Card.Text>{product.description}</Card.Text>
        <h5 className="text-primary">${product.price}</h5>
        <div className="d-flex justify-content-end gap-2 mt-3">
  <Pencil
    size={16}
    style={{ cursor: 'pointer' }}
    onClick={onEdit}
  />
  <Trash
    size={16}
    color="red"
    style={{ cursor: 'pointer' }}
    onClick={onDelete}
  />
</div>

      </Card.Body>
    </Card>
  );
};

export default ProductCard;
