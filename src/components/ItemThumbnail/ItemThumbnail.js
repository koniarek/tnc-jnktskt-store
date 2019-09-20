import React from "react";
import styled from "styled-components"
import { Link } from "gatsby";
import Img from "gatsby-image";


const ItemThumbnailStyled = styled.div`
    width: 350px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 20px;
    border: 4px solid ${props => props.theme.colors.secondaryAccent};
    background: ${props => props.theme.colors.main};

    @media (max-width: 930px) {
        width: 250px;
      } 
   
      @media (max-width: 710px) {
        width: 100%;
      }
`

const Heading = styled.h3`
    font-size: 1.3em;
    color: ${props => props.theme.colors.primaryAccent};
    padding: 10px;
    font-weight: 900;
    text-align: center;
    width: 100%;
    min-height: 85px;
    margin: auto;
    
`

const LinkStyled = styled(Link)`
    width: 100%;
    box-shadow: none;
    text-decoration: none;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`

const ImgStyled = styled(Img)`
    width: 100%;
    height: 350px;

    @media (max-width: 930px) {
        height: 250px;
      }
`

const Price = styled.h3`
    padding-top: 10px;
    padding-bottom: 20px;
    padding-left: 40px;
    padding-right: 40px;
`

const itemThumbnail = (props) => {
    return (
        <ItemThumbnailStyled>
            <LinkStyled to={props.link}>
                <ImgStyled fluid={props.image} />
                <Heading>{props.heading}</Heading>
            </LinkStyled>
            <Price>£{props.price.toFixed(2)}</Price>
        </ItemThumbnailStyled >
    )
}

export default itemThumbnail;
