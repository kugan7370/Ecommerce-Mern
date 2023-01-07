import React, { useEffect } from "react";
import Categories from "../Components/Categories";
import Header from "../Components/Header";
import Mobiles from "../Components/Group_Product";
import Sliders from "../Components/Sliders";
// import { Additional_Categories, CategoriesData } from '../data/Categories'
import { banners } from "../data/banner";
import { useDispatch, useSelector } from "react-redux";
import {
  category_Failed,
  category_request,
  category_Success,
} from "../Redux/Admin/CategorySlicer";
import axios from "axios";
import {
  products_Failed,
  products_request,
  products_Success,
} from "../Redux/Admin/ProductSlicer";
import TopProducts from "../Components/TopProducts";
import { useState } from "react";
import styled from "styled-components";
import Advertisement from "../Components/Advertisement";

function Home() {
  const dispatch = useDispatch();
  const { loading, categories, error } = useSelector((state) => state.category);
  const { products } = useSelector((state) => state.product);
  const [TopProductsdata, setTopProductsdata] = useState();
  useEffect(() => {
    setTopProductsdata(products?.filter((item) => item.topProducts == true));
  }, [products]);

  useEffect(() => {
    const getCategory = async () => {
      try {
        dispatch(category_request());
        await axios
          .get("admin/getcategory")
          .then((result) => dispatch(category_Success(result.data)));
      } catch (error) {
        dispatch(category_Failed());
      }
    };
    getCategory();
  }, []);

  useEffect(() => {
    const getProducts = async () => {
      try {
        dispatch(products_request());
        await axios
          .get("admin/getproduct")
          .then((result) => dispatch(products_Success(result.data)));
      } catch (error) {
        dispatch(products_Failed());
      }
    };
    getProducts();
  }, []);

  return (
    <MainContainer>
      <FirstMaincontainer>
        {/* category */}
        <CategorySection>
          {categories && <Categories datas={categories} />}
        </CategorySection>

        {/* slider */}
        <SliderSection>
          <Sliders datas={banners} />
        </SliderSection>

        {/* adds */}
        <AddSection>
          <Advertisement />
        </AddSection>
      </FirstMaincontainer>

      {/* top products */}
      <TopProduct>
        <ProductTitle>Top Products</ProductTitle>
        <InnerContain>
          {TopProductsdata &&
            TopProductsdata.map((product) => <TopProducts product={product} />)}
        </InnerContain>
      </TopProduct>
    </MainContainer>
  );
}

export default Home;

const MainContainer = styled.div`
  width: 90vw;
  background-color: #f0f0f0;
  margin: auto;
`;
const FirstMaincontainer = styled.div`
  margin-top: 50px;
  /* width: 100vw; */
  /* height: 400px; */
  display: flex;
  width: 100%;
  gap: 20px;
`;
const CategorySection = styled.div`
  border: 1px solid lightgray;
  width: 100%;
  flex: 3;
  background-color: white;
`;
const SliderSection = styled.div`
  flex: 10;
  width: 50%;
  height: 100%;
`;
const AddSection = styled.div`
  width: 100%;
  flex: 3;
  height: 100%;
`;

const TopProduct = styled.div`
  margin-top: 50px;
`;
const ProductTitle = styled.h1`
  color: gray;
  padding: 10px;
`;
const InnerContain = styled.h1`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 20px;
`;
