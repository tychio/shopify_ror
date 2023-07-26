import moment from "moment";
import React, { useEffect, useState } from "react"
import { Button, Table } from "react-bootstrap";
import DateRangePicker from "react-bootstrap-daterangepicker";

const DATE_FORMAT = 'YYYY-MM-DD HH:mm:ss'

const DateSpan = ({ value }) => {
  return <span>{moment(value).format('YYYY, MMM DD')}</span>
}

const PaymentStatus = ({ value }) => {
  let status = ''
  if (value) {
    status = value
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
  }
  return <span>{status}</span>
}

const Tags = ({ value }) => {
  let status = ''
  if (value) {
    status = value.split(',').map(tag => (
      <span key={tag}>{tag.trim()}</span>
    ))
  }
  return status
}

const Shop = ({ orders, shop }) => {
  const {name} = shop

  const [ startDate, setStartDate ] = useState(null)
  const [ endDate, setEndDate ] = useState(null)

  const shopifyLogout = () => {
    window.location.href = '/logout'
  }

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
      {startDate && endDate && <div className="d-flex justify-content-between">
        <Button onClick={shopifyLogout}>Logout</Button>
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
              <th width="120">Date</th>
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
                <td>
                  <DateSpan value={order.processed_at}></DateSpan>
                </td>
                <td>{order.shipping_address?.company}</td>
                <td>{order.currency}{order.total_price}</td>
                <td>
                  <PaymentStatus value={order.financial_status}></PaymentStatus>
                </td>
                <td>{order.shipping_lines.length > 0 ? order.shipping_lines[0].title : ''}</td>
                <td>
                  <Tags value={order.tags}></Tags>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default Shop
