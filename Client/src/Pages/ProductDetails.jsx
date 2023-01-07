import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { Rating } from "@mui/material";
import {
  AddBoxOutlined,
  AddCircleOutline,
  RemoveCircleOutline,
} from "@material-ui/icons";

import axios from "axios";
import {
  addCartProducts,
  getCartProducts_Failure,
  getCartProducts_Request,
  getCartProducts_Success,
} from "../Redux/User/CartSlicer";
import Header from "../Components/Header";
import Categories from "../Components/Categories";

function ProductDetails() {
  const dispatch = useDispatch();

  const { id } = useParams();
  const { loading, products, error } = useSelector((state) => state.product);
  const [productDetails, setproductDetails] = useState();
  const [quantityCount, setQuantityCount] = useState(1);
  const [statechange, setstatechange] = useState(false);
  const { cartProducts } = useSelector((state) => state.cart);
  const { categories } = useSelector((state) => state.category);

  useEffect(() => {
    if (id && products) {
      let product = [];
      products
        .filter((product) => product._id == id)
        .map((data) => setproductDetails({ ...data }));
    }
  }, [id, products]);

  const handleQuantity = (type) => {
    if (type == "remove") {
      quantityCount > 1 && setQuantityCount(quantityCount - 1);
    } else {
      setQuantityCount(quantityCount + 1);
    }
  };

  const AddCard = async () => {
    try {
      await axios
        .put(`/user/addbasket/${productDetails._id}`, {
          quantityCount,
        })
        .then(() => setstatechange(!statechange))
        .then(() => {
          if (cartProducts && productDetails) {
            let cart_ids = [];
            cartProducts.map((item) => {
              cart_ids.push(item.productId);
            });
            cart_ids.includes(productDetails._id) && alert("Already Added");
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const getCartProducts = async () => {
      try {
        dispatch(getCartProducts_Request());
        await axios
          .get("/user/getcartproduct")
          .then((res) => dispatch(getCartProducts_Success(res.data)));
      } catch (error) {
        dispatch(getCartProducts_Failure());
      }
    };
    getCartProducts();
  }, [statechange]);

  return (
    <>
      {productDetails && (
        <MainDetailSection>
          <DetailConatiner>
            {productDetails && (
              <ProductInnerContainer>
                <CategorySection>
                  {categories && <Categories datas={categories} />}
                </CategorySection>
                <DetailSection>
                  <ImageSection>
                    <Image src={productDetails.image} />
                  </ImageSection>
                  <ProductDetailSecion>
                    <ProductTitle>{productDetails.name}</ProductTitle>
                    <ProductPrice>$ {productDetails.price}</ProductPrice>
                    <ProductReview>
                      {" "}
                      <Rating
                        name="half-rating-read"
                        defaultValue={productDetails.rating}
                        precision={0.5}
                        readOnly
                      />
                    </ProductReview>
                    <CartContainer>
                      <ProductQuantity>Quantity :</ProductQuantity>
                      <IconContainer>
                        <Icon onClick={() => handleQuantity("remove")}>
                          <RemoveCircleOutline />
                        </Icon>
                        <Icon>{quantityCount}</Icon>
                        <Icon onClick={() => handleQuantity("add")}>
                          <AddCircleOutline />
                        </Icon>
                      </IconContainer>
                      <AddCardButton onClick={AddCard}>
                        <ButtonTitle>Add Card</ButtonTitle>
                      </AddCardButton>
                    </CartContainer>
                  </ProductDetailSecion>
                </DetailSection>
              </ProductInnerContainer>
            )}
          </DetailConatiner>

          <ProductDescContainer>
            <ProductDescTitle>Description</ProductDescTitle>
            <ProductDesc>{productDetails.desc}</ProductDesc>
          </ProductDescContainer>
        </MainDetailSection>
      )}
    </>
  );
}

const MainDetailSection = styled.div`
  width: 90vw;
  margin: auto;
  margin-top: 50px;
`;
const DetailConatiner = styled.div`
  display: flex;
`;
const CategorySection = styled.div`
  border: 1px solid lightgray;
  width: 100%;
  flex: 2;
  background-color: white;
  height: 100%;
`;
const ProductInnerContainer = styled.div`
  display: flex;
  width: 100%;
  gap: 50px;
`;
const DetailSection = styled.div`
  flex: 8;
  width: 100%;
  display: flex;
  gap: 50px;
`;
const ImageSection = styled.div`
  flex: 3;
  width: 100%;
  height: 400px;
  padding: 40px;
  background-color: white;
  border: 1px solid lightgray;
`;
const ProductDetailSecion = styled.div`
  flex: 5;
  width: 100%;
  height: 400px;
`;
const Image = styled.img`
  height: 100%;
  width: 100%;
  object-fit: contain;
`;

// const ProductRight = styled.div`
//   flex: 1;
//   padding: 50px;
// `
// const ProductLeft = styled.div`
//   flex: 1;
//   width: 100%;
//   display: flex;
//   padding: 50px;
// `
//
// const Image = styled.img`
//   height: 80vh;
//   width: 100%;
//   object-fit: cover;
//   cursor: pointer;
// `
const ProductTitle = styled.h1`
  font-size: 20px;
  font-weight: 600;
`;
const ProductQuantity = styled.h1`
  font-size: 20px;
  font-weight: 600;
  margin: 20px 0px;
  color: #050505;
`;
const ProductDescContainer = styled.h6`
  text-align: justify;
  margin-top: 50px;
  padding: 50px;
  width: 50%;
`;
const ProductDesc = styled.h5`
  font-size: 15px;
  font-weight: 300;
  margin: 10px 0px;
`;
const ProductDescTitle = styled.h1`
  font-weight: 300;
  font-size: 36px;
  margin: 30px 0px;
  color: #f02640;
`;
const ProductReview = styled.div`
  margin: 40px 0px;
`;
const ProductPrice = styled.h4`
  font-size: 20px;
  font-weight: 600;
  margin: 40px 0px;
`;
const CartContainer = styled.div`
  margin: 90px 0px;
`;
const IconContainer = styled.div`
  display: flex;
`;

const Icon = styled.div`
  margin-right: 20px;
`;
const ButtonTitle = styled.h4``;
const AddCardButton = styled.div`
  background-color: #f02640;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50%;
  height: 40px;
  margin-top: 40px;
  border-radius: 5px;
  color: white;
  cursor: pointer;
`;

export default ProductDetails;
