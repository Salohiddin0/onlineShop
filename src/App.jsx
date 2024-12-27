import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'

function App () {
  const [cart, setCart] = useState([])
  const [total, setTotal] = useState(0)

  const products = [
    { id: 1, name: 'Product 1', price: 50 },
    { id: 2, name: 'Product 2', price: 100 },
    { id: 3, name: 'Product 3', price: 80 }
  ]

  const addToCart = product => {
    const existingProduct = cart.find(item => item.id === product.id)
    if (existingProduct) {
      setCart(
        cart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      )
    } else {
      setCart([...cart, { ...product, quantity: 1 }])
    }
    setTotal(total + product.price)
  }

  const removeFromCart = product => {
    const existingProduct = cart.find(item => item.id === product.id)
    if (existingProduct.quantity > 1) {
      setCart(
        cart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
      )
    } else {
      setCart(cart.filter(item => item.id !== product.id))
    }
    setTotal(total - product.price)
  }

  const deleteFromCart = product => {
    const filteredCart = cart.filter(item => item.id !== product.id)
    setTotal(total - product.price * product.quantity)
    setCart(filteredCart)
  }

  const discount = total > 200 ? total * 0.1 : 0 // 10% chegirma, agar 200$ dan oshsa
  const finalTotal = total - discount // Chegirma qo'llangan jami narx

  return (
    <div style={{ display: 'flex', padding: '20px', background: '#f8f9fa' }}>
      {/* Products Section */}
      <div
        style={{
          flex: 1,
          padding: '20px',
          background: '#e9f7ff',
          borderRadius: '10px'
        }}
      >
        <h3 style={{ textAlign: 'center', color: '#007bff' }}>Products</h3>
        <div
          style={{
            display: 'flex',
            gap: '20px',
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}
        >
          {products.map(product => (
            <div
              key={product.id}
              style={{
                border: '1px solid #007bff',
                borderRadius: '10px',
                padding: '10px',
                background: '#ffffff',
                width: '120px',
                textAlign: 'center',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
              }}
            >
              <p style={{ fontWeight: 'bold' }}>{product.name}</p>
              <p style={{ color: '#28a745' }}>${product.price}</p>
              <button
                className='btn btn-primary btn-sm'
                onClick={() => addToCart(product)}
              >
                Add
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Cart Section */}
      <div
        style={{
          flex: 1,
          padding: '20px',
          background: '#e9ffee',
          marginLeft: '20px',
          borderRadius: '10px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
        }}
      >
        <h3 style={{ textAlign: 'center', color: '#28a745' }}>Shopping Cart</h3>
        {cart.length === 0 ? (
          <p
            style={{
              textAlign: 'center',
              fontStyle: 'italic',
              color: '#6c757d'
            }}
          >
            No products in the cart
          </p>
        ) : (
          <div>
            {cart.map(item => (
              <div
                key={item.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '10px',
                  marginBottom: '10px',
                  background: '#ffffff',
                  borderRadius: '5px',
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
                }}
              >
                <div>
                  <strong>{item.name}</strong>
                  <p style={{ margin: 0, color: '#6c757d' }}>
                    ${item.price} x {item.quantity}
                  </p>
                </div>
                <div>
                  <button
                    className='btn btn-danger btn-sm'
                    onClick={() => removeFromCart(item)}
                  >
                    -
                  </button>
                  <button
                    className='btn btn-success btn-sm mx-2'
                    onClick={() => addToCart(item)}
                  >
                    +
                  </button>
                  <button
                    className='btn btn-warning btn-sm'
                    onClick={() => deleteFromCart(item)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
        <h4
          style={{
            textAlign: 'center',
            marginTop: '20px',
            color: '#17a2b8'
          }}
        >
          Total Cost: ${finalTotal.toFixed(2)}
        </h4>
        {discount > 0 && (
          <h6
            style={{
              textAlign: 'center',
              marginTop: '10px',
              color: '#dc3545'
            }}
          >
            Discount Applied: -${discount.toFixed(2)}
          </h6>
        )}
      </div>
    </div>
  )
}

export default App
