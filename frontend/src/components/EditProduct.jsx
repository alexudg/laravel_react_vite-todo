import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'

const ENDPOINT = 'http://localhost:8000/api'

export default function EditProduct() {
  const params = useParams()
  const navigate = useNavigate()
  const [product, setProduct] = useState({
    description: '',
    price: 0,
    stock: 0
  })

  const onChange = (evt) => {
    console.log(evt.target)
    const { name, value } = evt.target
    console.log(name, value)
    setProduct({
      ...product, // same values
      [name]: value // only change value with same name
    })
  }

  const store = () => {
    fetch(`${ENDPOINT}/product`, {
      method: 'POST',  
      body: JSON.stringify(product),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(res => res.text())
    .then(txt => {
      console.log(txt);
      const product = JSON.parse(txt)
      navigate('/', {
        replace: true
      })
    })
  }

  const update = (id) => {
    fetch(`${ENDPOINT}/product/${id}`, {
      method: 'PUT',  
      body: JSON.stringify(product),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(res => res.text())
    .then(txt => {
      console.log(txt);
      const product = JSON.parse(txt)
      navigate('/')
    })
  }

  const onSubmit = (evt) => {
    evt.preventDefault()
    if (params['id'])
      update(params['id'])
    else
      store()
  }

  const loadProduct = (id) => {
    fetch(`${ENDPOINT}/product/${id}`)
      .then(res => res.text())
      .then(txt => {
        console.log(txt)
        const product = JSON.parse(txt)
        console.log(product)
        setProduct(product)
      })
  }

  useEffect(() => {
    console.log('EditProduct-userEffect')
    if (params['id'])
      loadProduct(params['id'])

    return () => { }
  }, [])

  return (
    // <div>{params['id'] ? 'Editar' : 'Crear'}</div>
    <div className='card mx-auto' style={{ width: '220px' }}>
      <div className='card-body'>
        <div className='card-header mb-2'>
          <p>{params['id'] ? 'Editar' : 'Crear'}</p>
        </div>
        <form className='form-group' onSubmit={onSubmit} >
          <input
            type="text"
            name="description"
            placeholder='Descripción'
            className='mb-2'
            required
            value={product.description}
            onChange={onChange}
          />
          <input
            type="number"
            name="price"
            placeholder='Precio'
            className='mb-2'
            required
            value={product.price}
            onChange={onChange}
          />
          <input
            type="number"
            name="stock"
            placeholder='Existencia'
            className='mb-2'
            required
            value={product.stock}
            onChange={onChange}
          />
          <input
            type="submit"
            value={params['id'] ? "Editar" : "Crear"}
            className='btn mx-2 btn-primary'            
          />
          <Link to='/'>
            <input
              type="button"
              value="Cancelar"
              className='btn btn-secondary'
            />
          </Link>
        </form>
      </div>
    </div>
  )
}
