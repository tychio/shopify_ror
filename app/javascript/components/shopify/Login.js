import React from "react"
import { Button } from "react-bootstrap";

const Login = () => {
  const shopifyLogin = () => {
    window.location.href = '/shopify/auth'
  }

  return (
    <div className="container p-4">
      <h1 className="text-center mb-2">Shopify Auth</h1>
      <div className="d-flex justify-content-center">
        <Button variant="primary" size="lg" onClick={shopifyLogin}>Login</Button>
      </div>
    </div>
  );
}

export default Login
