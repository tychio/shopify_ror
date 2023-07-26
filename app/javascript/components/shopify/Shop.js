import React from "react"
import { Table } from "react-bootstrap";

const Shop = ({ orders, shop }) => {
  const {name} = shop

  return (
    <div className="container p-4">
      <h1 className="text-center mb-2">{ name }</h1>
      <div className="container-fluid">
        <Table>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Date</th>
              <th>Customer</th>
              <th>Amount</th>
              <th>Payment</th>
              <th>Shipping</th>
              <th>Tags</th>
            </tr>
          </thead>
          <tbody>
            {orders && orders.map(order => (
              <tr key={order.id}>
                <td>{order.name}</td>
                <td>{order.processed_at}</td>
                <td>{order.shipping_address?.company}</td>
                <td>{order.currency}{order.total_price}</td>
                <td>{order.financial_status}</td>
                <td>{order.shipping_lines.length > 0 ? order.shipping_lines[0].title : ''}</td>
                <td>{order.tags.split(',').map(tag => (
                  <span key={tag}>{tag.trim()}</span>
                ))}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default Shop
