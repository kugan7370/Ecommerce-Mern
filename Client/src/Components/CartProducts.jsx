import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import {
  user_getbasket,
  user_multi_addbasket,
  user_removebasket,
} from "../Redux/User/UserSlicer";
import {
  HiOutlinePlusCircle,
  HiOutlineMinusCircle,
  HiOutlineXCircle,
} from "react-icons/hi";
import {
  getCartProducts_Failure,
  getCartProducts_Request,
  getCartProducts_Success,
} from "../Redux/User/CartSlicer";

function CartProducts({ cartdata }) {
  const [statechange, setstatechange] = useState(false);
  // const [stateAdd, setstateAdd] = useState(false)
  // const [stateRemove, setstateRemove] = useState(false)
  const [quantityCount, setQuantityCount] = useState(cartdata.quantity);
  const dispatch = useDispatch();

  const RemoveCart = async (prouduct_id) => {
    try {
      await axios
        .delete(`/user/removebasket/${prouduct_id}`)
        .then(() => setstatechange(!statechange));
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

  const handleQuantity = async (type, productId) => {
    if (type == "remove") {
      quantityCount > 1 && setQuantityCount(quantityCount - 1);
      try {
        quantityCount > 1 &&
          (await axios
            .put(`/user/addbasket/${productId}`, {
              quantityCount: quantityCount - 1,
            })
            .then(() => setstatechange(!statechange)));
      } catch (error) {
        console.log(error);
      }
    }
    if (type == "add") {
      setQuantityCount(quantityCount + 1);
      try {
        await axios
          .put(`/user/addbasket/${productId}`, {
            quantityCount: quantityCount + 1,
          })
          .then(() => setstatechange(!statechange));
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <>
      {cartdata && (
        <CardItem>
          <ImageContainer>
            <img src={cartdata.image} alt="" />
          </ImageContainer>

          <ItemNameContainer>
            <ItemName>{cartdata.name}</ItemName>
          </ItemNameContainer>

          <ItemPriceContainer>
            <ItemPrice>{`$ ${cartdata.price.toFixed(2)}`}</ItemPrice>
          </ItemPriceContainer>

          <ItemQuantityContainer>
            <HiOutlineMinusCircle
              onClick={() => handleQuantity("remove", cartdata._id)}
              className="minusicons"
              color="#3a3a3a"
            />
            <ItemQuantity>{quantityCount}</ItemQuantity>

            <HiOutlinePlusCircle
              onClick={() => handleQuantity("add", cartdata._id)}
              className="plus_icons"
              color="#3a3a3a"
            />
          </ItemQuantityContainer>

          <ItemTotalPriceContainer>
            <ItemTotalPrice>{`$ ${(cartdata.quantity * cartdata.price).toFixed(
              2
            )}`}</ItemTotalPrice>
          </ItemTotalPriceContainer>
          <ItemRemoveContainer>
            <HiOutlineXCircle
              onClick={() => RemoveCart(cartdata._id)}
              className="minusicons"
              color="#f02640"
            />
          </ItemRemoveContainer>
        </CardItem>
      )}
    </>
  );
}

export default CartProducts;

const CardItem = styled.div`
  /* padding: 10px; */
  border-bottom: 1px solid lightgray;
  display: flex;
  background-color: white;
  gap: 10px;
`;
const ImageContainer = styled.div`
  flex: 3;
  width: 100%;
  height: 150px;
  object-fit: cover;
  padding: 10px;

  img {
    height: 100%;
    width: 100%;
  }
`;

const ItemNameContainer = styled.div`
  display: flex;
  flex: 4;
  width: 100%;
  align-items: center;
  padding: 0 10px;
`;
const ItemPriceContainer = styled.div`
  display: flex;
  flex: 3;
  width: 100%;
  justify-content: center;
  align-items: center;
`;
const ItemTotalPriceContainer = styled.div`
  display: flex;
  flex: 3;
  width: 100%;
  justify-content: center;
  align-items: center;
`;
const ItemQuantityContainer = styled.div`
  display: flex;
  flex: 3;
  width: 100%;
  justify-content: center;
  align-items: center;
`;
const ItemRemoveContainer = styled.div`
  display: flex;
  flex: 3;
  width: 100%;
  justify-content: center;
  align-items: center;
`;
const ItemName = styled.h4``;
const ItemPrice = styled.h4``;
const ItemQuantity = styled.h4`
  margin: 0px 10px;
  color: #f02640;
`;
const ItemTotalPrice = styled.h4``;
//
// const CountContainer = styled.div`
//   display: flex;
//   align-items: center;
//
//   .minusicons {
//     margin-right: 20px;
//   }
//   .plus_icons {
//     margin-left: 20px;
//   }
// `
// const PriceContainer = styled.div`
//   display: flex;
//   align-self: flex-end;
//   margin-right: 10px;
// `
const TotalPrice = styled.h6``;
