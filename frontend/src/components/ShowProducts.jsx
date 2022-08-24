import React from 'react'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const ENDPOINT = 'http://localhost:8000/api'

export default function ShowProducts() {
  const [products, setProducts] = useState([])

  const getAllProducts = async () => {
    console.log('getAllProducts()')
    await fetch(ENDPOINT + '/products')
      .then(res => res.text())
      .then(txt => {
        console.log(txt)
        const json = JSON.parse(txt)
        console.log(json)
        setProducts(json)
      })
      .catch(err => console.log('ERROR:', err))
  }

  const deleteProduct = (id) => {
    fetch(`${ENDPOINT}/product/${id}`, {
      method: 'DELETE'
    })
      .then(res => res.text())
      .then(txt => {
        console.log(txt)
        const json = JSON.parse(txt)
        console.log(json)
        getAllProducts()
      })
      .catch(err => console.log('ERROR:', err))
  }

  useEffect(() => {
    console.log('ShowProducts-useEffect')
    getAllProducts()

    return () => { }
  }, [])

  return (
    <>
      {console.log('ShowProducts-RENDER')}
      <div className='d-grid gap-3'>
        <Link to='/store' className='btn btn-success btn-lg mt-2 mb-2'>Crear</Link>

        <table className='table table-striped'>
          <thead>
            <tr>
              <th>Descripción</th>
              <th>Precio</th>
              <th>Existencia</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            {
              products.map(product =>
                <tr key={product.id}>
                  <td>{product.description}</td>
                  <td>{product.price}</td>
                  <td>{product.stock}</td>
                  <td>
                    <Link to={`/update/${product.id}`}>
                      <button className='btn btn-warning mx-1'>Editar</button>
                    </Link>
                    <button className='btn btn-danger' onClick={() => deleteProduct(product.id)}>Eliminar</button>
                  </td>
                </tr>
              )
            }
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={5} className='bg-secondary text-white'>
                {products.length} {products.length === 1 ? 'Producto' : 'Productos'}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </>
  );
}
