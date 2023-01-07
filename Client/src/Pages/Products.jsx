import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import Group_Product from '../Components/Group_Product'
import Sliders from '../Components/Sliders'
import { banners } from '../data/banner'
import { mobiledata } from '../data/Categories'

function Products() {
  const { loading, products, error } = useSelector((state) => state.product)
  const { categories } = useSelector((state) => state.category)

  const [product_data, setProduct_data] = useState()
  const { id } = useParams()

  useEffect(() => {
    if (products.length) {
      setProduct_data(products.filter((product) => product.category_id == id))
    }
  }, [id, products])

  return (
    <>
      {/* <Sliders datas={banners} /> */}
      {product_data && <Group_Product datas={product_data} />}
    </>
  )
}

export default Products
