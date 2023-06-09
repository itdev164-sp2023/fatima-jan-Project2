import React from 'react'
import styled from 'styled-components'
import { graphql, useStaticQuery } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { Button } from '../components/Button'
import { ImLocation } from "react-icons/im"
import { Link } from "gatsby"

const getTrips = (data) => {
  const tripsArray = []
  data.allTripsJson.edges.forEach((item, index) => {
    const image = getImage(item.node.img)
    tripsArray.push(
      <ProductCard key={index}>
        <GatsbyImage 
        image={image} 
        alt={item.node.alt} 
        />
        <ProductInfo>
        <TextWrap>
        <ImLocation />
        <ProductTitle>{item.node.name}</ProductTitle>
        </TextWrap>
      <Button as={Link} to="/destinations" round="true"
        css={`
        position: absolute; 
        top: 230px;
        font-size: 12px;
        `}>{item.node.button}</Button>
        </ProductInfo>
      </ProductCard>
    )
  })
  return tripsArray
}

const Trips = () => {
  const data = useStaticQuery(graphql`
    query {
      allTripsJson {
        edges {
          node {
            alt
            button
            name
            img {
              childImageSharp {
                gatsbyImageData(layout: CONSTRAINED, width: 200, height: 200)
              }
            }
          }
        }
      }
    }
  `)

  return (
    <ProductsContainer>
      <ProductsHeading>Our Favorite Destinations</ProductsHeading>
      <ProductWrapper>{getTrips(data)}</ProductWrapper>
    </ProductsContainer>
  )
}

export default Trips

const ProductsContainer = styled.div`
  min-height: 100vh;
  padding: 5rem calc((100vw - 1300px)/2);
  background: white;
  color: #fff;
`

const ProductsHeading = styled.div`
  font-size: clamp(1.2rem, 5vw, 3rem);
  text-align: center;
  margin-bottom: 5rem;
  color: #000;
`

const ProductWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 10px;
  justify-items: center;
  padding: 0 2rem;

  @media screen and (max-width: 1200px) {
    grid-template-columns: 1fr 1fr;
  }

  @media screen and (max-width: 868px) {
    grid-template-columns: 1fr;
  }
`
const ProductCard = styled.div`
line-height: 2;
width: 100%;
height: 500px;
position: relative;
border-radius: 10px;
transition: 0.2s ease;
`

const ProductInfo = styled.div`
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0 2rem;

@media screen and (max-width: 280px) {
    padding: 0 1rem;
  }
`

const TextWrap = styled.div`
display: flex;
align-items: center;
position: absolute;
top: 375px;
`

const ProductTitle = styled.div`
font-weight: 400;
font-size: 1rem;
margin-left: 0.5rem;
`

