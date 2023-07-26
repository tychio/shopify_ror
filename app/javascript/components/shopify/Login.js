import React, { useState } from "react"
import { Button, FormControl } from "react-bootstrap";

const Login = () => {
  const [shop, setShop] = useState('')
  const shopifyLogin = () => {
    window.location.href = '/shopify/auth?s=' + shop + '.myshopify.com'
  }

  return (
    <div className="container p-4">
      <h1 className="text-center mb-2">Shopify Auth</h1>
      <div className="d-flex flex-column justify-content-center login-wrapper"> 
        <FormControl
          className="mb-3" defaultValue={shop} 
          placeholder="Please fill shop name"
          onChange={e => setShop(e.target.value)}
        />
        <Button variant="primary" size="lg" onClick={shopifyLogin}>Login</Button>
      </div>
    </div>
  );
}

export default Login
