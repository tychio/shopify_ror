import React, { useEffect, useState } from "react"
import { Button, Table } from "react-bootstrap";
import DateRangePicker from "react-bootstrap-daterangepicker";

const DATE_FORMAT = 'YYYY-MM-DD HH:mm:ss'

const Shop = ({ orders, shop }) => {
  const {name} = shop

  const [ startDate, setStartDate ] = useState(null)
  const [ endDate, setEndDate ] = useState(null)

  const onSelect = (e, picker) => {
    const start = picker.startDate.format(DATE_FORMAT)
    const end = picker.endDate.format(DATE_FORMAT)

    window.location.replace(`/shop?start=${start}&end=${end}`)
  }

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const start = urlParams.get('start')
    const end = urlParams.get('end')

    if (start && end) {
      setStartDate(new Date(start))
      setEndDate(new Date(end))
    } else{
      setStartDate(new Date())
      setEndDate(new Date())
    }
  }, [])

  return (
    <div className="container p-4">
      <h1 className="text-center mb-2">{ name }</h1>
      {startDate && endDate && <div className="d-flex justify-content-end">
        <DateRangePicker
          initialSettings={{ startDate, endDate }}
          onApply={onSelect}
        >
          <Button>Filter by Date</Button>
        </DateRangePicker>
      </div>}
      <div className="container-fluid">
        <Table>
          <thead>
            <tr>
              <th>ID</th>
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
