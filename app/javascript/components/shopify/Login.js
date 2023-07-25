import React from "react"
import { Button } from "react-bootstrap";

class Login extends React.Component {
  render () {
    return (
      <div>
        <h1>Shopify Auth</h1>
        <Button variant="primary" size="lg" block onClick={() => {
          window.location.href = '/shopify/auth'
        }}>Login</Button>
      </div>
    );
  }
}

export default Login
