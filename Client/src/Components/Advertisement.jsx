import React from "react";
import styled from "styled-components";

function Advertisement() {
  return (
    <AddContainer>
      <Sections>
        <FirstAdd>
          <Title>EXCLUSIVE OFFER</Title>
          <SubTitle>Buy 1 Get 1 Free</SubTitle>
          <ButtonContainer>
            <ButtonText>Shop Now</ButtonText>
          </ButtonContainer>
        </FirstAdd>
        <FirstAdd>
          <Title>OFFER</Title>
          <SubTitle>Buy 1 Get 1 Free</SubTitle>
          <ButtonContainer>
            <ButtonText>Shop Now</ButtonText>
          </ButtonContainer>
        </FirstAdd>
      </Sections>
    </AddContainer>
  );
}

export default Advertisement;

const AddContainer = styled.div`
  width: 100%;
`;
const Sections = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 410px;
`;
const FirstAdd = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  text-align: center;
  background-color: white;
  padding: 20px;
  box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px,
    rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;
`;
const Title = styled.h2`
  /* text-align: center; */
`;
const SubTitle = styled.h3`
  margin-top: 20px;
  color: gray;
`;
const ButtonContainer = styled.div`
  margin-top: 20px;

  padding: 10px;
  border: 1px solid #f02640;
  width: 120px;
`;
const ButtonText = styled.h5`
  color: #f02640;
`;
const SecoundAdd = styled.div``;
