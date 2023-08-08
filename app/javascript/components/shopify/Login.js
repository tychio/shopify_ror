import React, { useState } from "react"
import { Button, FormControl, InputGroup } from "react-bootstrap"

const Login = () => {
  const [shopName, setShopName] = useState('TestTychio')

  const shopifyLogin = () => {
    window.location.href = `/shopify/auth/${shopName}`
  }

  return (
    <div className="container p-4">
      <h1 className="text-center mb-2">Shopify Auth</h1>
      <div className="d-flex flex-column justify-content-center login-wrapper"> 
        <InputGroup className="my-3">
          <FormControl
            value={shopName}
            onChange={e => setShopName(e.target.value)}
            placeholder="Please input your shop name"
          />
          <InputGroup.Text id="domain_suffix">.myshopify.com</InputGroup.Text>
        </InputGroup>
        <Button variant="primary" size="lg" onClick={shopifyLogin}>Login</Button>
      </div>
    </div>
  )
}

export default Login
