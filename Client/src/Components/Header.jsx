import React, { useEffect } from "react";
import styled from "styled-components";
import { BsSearch } from "react-icons/bs";
import { CgShoppingCart } from "react-icons/cg";
import { useDispatch, useSelector } from "react-redux";
import { user_logout } from "../Redux/User/UserSlicer";
import { Link, Navigate, NavLink, useNavigate } from "react-router-dom";
import {
  getCartProducts_Failure,
  getCartProducts_Request,
  getCartProducts_Success,
} from "../Redux/User/CartSlicer";
import axios from "axios";
const logoImg =
  "https://cdn11.bigcommerce.com/s-b2a52/images/stencil/original/logo_23ee9fe1-08bb-41a3-88a7-2a61d986d9c5_1494476368__53289.original.png";

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { current_user } = useSelector((state) => state.user);
  const { cartProducts } = useSelector((state) => state.cart);
  const logout = () => {
    dispatch(user_logout());
    navigate("/signin");
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
  }, []);

  return (
    <Container>
      <InnerContainer>
        <Link to={"/"}>
          <Logo>
            <img src={logoImg} alt="logo" />
          </Logo>
        </Link>
        <Search>
          <input type="text" placeholder="Search" />
          <IconContainer>
            <BsSearch className="search-icon" />
          </IconContainer>
        </Search>
        <Auth>
          <h3>Hello, Guest</h3>
          {current_user ? (
            <h3 onClick={logout}>{current_user.user.username}</h3>
          ) : (
            <h3>Sign In</h3>
          )}

          <Cart>
            <Link to={"/cartItems"}>
              <CgShoppingCart className="card-icon" />
            </Link>

            <CartCount_Container>
              <CartCount>{cartProducts?.length || 0}</CartCount>
            </CartCount_Container>
          </Cart>
        </Auth>
      </InnerContainer>
      <MobileSearch>
        <input type="text" placeholder="Search" />
        <IconContainer>
          <BsSearch className="search-icon" />
        </IconContainer>
      </MobileSearch>
    </Container>
  );
}

const Container = styled.div`
  height: 60px;
  background-color: #131921;
  color: white;
  width: 100vw;
  position: sticky;
  top: 0;
  display: flex;
  align-items: center;
  padding: 10px 0px;
  z-index: 999;

  @media only screen and (max-width: 767px) {
    flex-direction: column;
    justify-content: space-around;
    height: 150px;
    padding: 10px 0px;
  }
`;
const Logo = styled.div`
  width: 100px;
  height: 50px;
  object-fit: cover;
  margin-top: 20px;
  padding: 10px;
  cursor: pointer;
  margin-left: 20px;

  img {
    width: 100%;
    height: 100%;
  }
`;
const InnerContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;

  @media only screen and (max-width: 767px) {
    justify-content: space-between;
  }
`;

const Search = styled.div`
  overflow: hidden;
  border-radius: 5px;
  width: 60%;
  margin: auto;
  background-color: white;
  display: flex;
  align-items: center;

  input {
    outline: none;
    width: 100%;
    padding: 10px;
    flex: 1;
    border: none;
  }
  @media only screen and (max-width: 767px) {
    display: none;
  }
`;

const IconContainer = styled.div`
  background-color: #f02640;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;

  .search-icon {
    width: 25px;
    height: 25px;
    color: black;
  }
`;
const Auth = styled.div`
  margin: 0 10px;
  display: flex;
  align-items: center;
  h3 {
    color: white;
    font-weight: bold;
    padding: 10px;
    cursor: pointer;
  }
  &:nth-child(1) {
    margin-right: 10px;
  }
`;
const Cart = styled.div`
  margin-right: 20px;
  padding: 10px;
  margin-top: 10px;

  .card-icon {
    width: 40px;
    height: 40px;
    position: relative;
    color: white;
  }
`;
const MobileSearch = styled.div`
  overflow: hidden;
  border-radius: 5px;
  width: 80%;
  margin: auto;
  background-color: white;
  display: flex;
  align-items: center;
  margin-bottom: 10px;

  input {
    outline: none;
    width: 100%;
    padding: 10px;
    flex: 1;
    border: none;
  }
  @media only screen and (min-width: 768px) {
    display: none;
  }
`;
const CartCount_Container = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 10px;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f02640;
  top: 10px;
  right: 30px;
  text-align: center;

  @media only screen and (max-width: 767px) {
    top: 20px;
  }
`;

const CartCount = styled.h5`
  color: white;
`;

export default Header;
