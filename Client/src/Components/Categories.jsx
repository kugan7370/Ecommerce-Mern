import React from "react";
import styled from "styled-components";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Link } from "react-router-dom";

import { CategoriesData } from "../data/Categories";
const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

function Categories({ datas }) {
  return (
    <Container>
      <CatTitle>
        <h2>CATEGORIES</h2>
      </CatTitle>
      {datas.map((cat, i) => (
        <InnerContainer key={cat._id}>
          <Link
            style={{ textDecoration: "none", color: "black" }}
            to={`/category/${cat._id}`}
          >
            <Title>
              <h2>{cat.category}</h2>
            </Title>
          </Link>
        </InnerContainer>
      ))}
    </Container>
  );
}

const Container = styled.div`
  width: 100%;

  /* margin-top: 50px; */
`;
const InnerContainer = styled.div`
  border-radius: 10px;
  display: flex;
  flex-direction: column;
`;

const CatTitle = styled.div`
  font-weight: bold;
  text-transform: capitalize;
  padding: 15px 15px;
  background-color: #f02640;
  h2 {
    font-size: 16px;
    color: white;
  }
`;
const Title = styled.div`
  font-weight: bold;
  text-transform: capitalize;
  padding: 20px 20px;
  border-bottom: 1px solid lightgray;
  &:hover {
    background-color: #e6e1e1;
  }

  h2 {
    font-size: 16px;
  }
`;

export default Categories;
