import React from "react"
import { Card, CardGroup, Row } from "react-bootstrap"

const Product = ({ product }) => {
  const { title, body_html, image } = product
  return (
    <div className="product">
      <Card>
        {image && <Card.Img variant="top" src={image.src} alt={image.alt} />}
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Text>{body_html}
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  )
}

const Shop = ({ products }) => {
  return (
    <div className="container p-4">
      <h1 className="text-center mb-2">Shopify Shop</h1>
      <div className="container-fluid">
        <CardGroup>
          {products && products.map(product => (
            <Product key={product.id} product={product}></Product>
          ))}
        </CardGroup>
      </div>
    </div>
  );
}

export default Shop
