import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

function TopProducts({ product }) {
  const [addborder, setaddborder] = useState(false);
  return (
    <InnrProductsContainer onMouseMove={() => setaddborder(true)}>
      <Link
        key={product._id}
        style={{ textDecoration: "none", color: "black" }}
        to={`/product/${product._id}`}
      >
        <ImageContainer>
          <Image src={product.image} />
        </ImageContainer>
      </Link>
      <ProductDetail>
        <ProductName>{product.name}</ProductName>
        <Price>{`$ ${product.price}`}</Price>
      </ProductDetail>
    </InnrProductsContainer>
  );
}

export default TopProducts;

const InnrProductsContainer = styled.div`
  background-color: white;
  margin: 50px 0px;
`;
const ImageContainer = styled.div`
  display: flex;
  height: 300px;
  justify-content: center;
  align-items: center;
  padding: 10px;
  box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px,
    rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;
`;
const Image = styled.img`
  height: 100%;
  width: 100%;
  object-fit: contain;
  transition: all 250ms;
  &:hover {
    transform: scale(120%);
  }
`;
const ProductDetail = styled.div`
  padding: 20px;
`;
const ProductName = styled.h6`
  font-size: 16px;
  font-weight: 400;
`;
const Price = styled.h6`
  margin-top: 10px;
  font-size: 16px;
  font-weight: 200;
`;
