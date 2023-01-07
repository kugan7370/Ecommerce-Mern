import React, { useEffect, useState } from "react";

import styled from "styled-components";
import CartProducts from "../Components/CartProducts";
import CurrencyFormat from "react-currency-format";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

import {
  getCartProducts_Failure,
  getCartProducts_Request,
  getCartProducts_Success,
} from "../Redux/User/CartSlicer";

function Cart_Items() {
  const dispatch = useDispatch();
  const { current_user } = useSelector((state) => state.user);
  const { cartProducts } = useSelector((state) => state.cart);
  const { products } = useSelector((state) => state.product);
  const [finalcartProducts, setFinalcartProducts] = useState();
  const [totalPrice, setTotalPrice] = useState();
  const [totalQuantity, settotalQuantity] = useState();

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
  }, []);

  useEffect(() => {
    if (cartProducts && products) {
      let cat = [];
      let data1 = [];
      let priceArray = [];
      cartProducts.map((item) => {
        const datat = products.filter(
          (product) => product._id == item.productId
        );

        // to add quantity
        datat.map((items) => {
          data1.push({ ...items, quantity: item.quantity });
        });

        cat.push(...datat);
      });

      setFinalcartProducts(data1);

      //totalprice
      data1.map((item) => {
        priceArray.push(item.price * item.quantity);
      });

      setTotalPrice(priceArray.reduce((a, b) => a + b, 0));
    }
  }, [cartProducts, products]);

  useEffect(() => {
    // console.log(finalcartProducts);
    if (finalcartProducts) {
      let totalQuantity = [];
      finalcartProducts.map((item) => {
        totalQuantity.push(item.quantity);
      });
      settotalQuantity(totalQuantity.reduce((a, b) => a + b));
    }
  }, [finalcartProducts, cartProducts]);

  return (
    <Container>
      <CardContainer>
        {finalcartProducts &&
          finalcartProducts.map((item) => (
            <CartProducts key={item._id} cartdata={item} />
          ))}
      </CardContainer>
      <PriceListContainer>
        <PriceList>
          {/* totalcount */}
          <PriceSubContainer>
            <PriceTitle>Total Count</PriceTitle>
            <PriceData>
              {" "}
              <CurrencyFormat
                value={totalPrice ? totalPrice : 0}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"$"}
                // renderText={(value) => <h4>Total Price: {value}</h4>}
              />{" "}
            </PriceData>
          </PriceSubContainer>

          {/* subtotal */}
          <PriceSubContainer>
            <PriceTitle>Sub Total</PriceTitle>
            <PriceData>{totalQuantity ? totalQuantity : 0}</PriceData>
          </PriceSubContainer>

          {/* discount */}
          <PriceSubContainer>
            <PriceTitle>Discount</PriceTitle>
            <PriceData>0.00</PriceData>
          </PriceSubContainer>

          {/* shipping */}
          <PriceSubContainer>
            <PriceTitle>Shipping</PriceTitle>
            <PriceData>0.00</PriceData>
          </PriceSubContainer>

          {/* Grandtotal */}
          <PriceSubContainer>
            <GrandPriceTitle>Grand Total</GrandPriceTitle>
            <PriceData>
              <GrandPriceTitle>
                <CurrencyFormat
                  value={totalPrice ? totalPrice : 0}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"$"}
                />
              </GrandPriceTitle>
            </PriceData>
          </PriceSubContainer>
        </PriceList>
      </PriceListContainer>
    </Container>
  );
}

export default Cart_Items;

const Container = styled.div`
  display: flex;
  padding: 30px;
`;
const CardContainer = styled.div`
  flex: 7;
`;
const PriceListContainer = styled.div`
  flex: 4;
`;
const PriceList = styled.div`
  padding: 30px;
  border: 1px solid lightgray;
  width: 80%;
  margin: auto;
  position: sticky;
  top: 90px;
  display: flex;
  flex-direction: column;
  height: 300px;
  justify-content: space-between;
`;
const PriceSubContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const PriceTitle = styled.h4``;
const GrandPriceTitle = styled.h2`
  color: #f02640;
`;
const PriceData = styled.h4``;

const ProductCount = styled.h4``;
