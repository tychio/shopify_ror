import React from "react"
import { Button } from "react-bootstrap";

class Login extends React.Component {
  render () {
    return (
      <div className="flex">
        <h1>Shopify Auth</h1>
        <Button variant="primary" size="lg" onClick={() => {
          window.location.href = '/shopify/auth'
        }}>Login</Button>
      </div>
    );
  }
}

export default Login
