import React from "react";
import styled from "styled-components"
import { Link } from "gatsby";

const HeaderMainStyled = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding-top: 20px;
`

const ShopName = styled.h3`
    logo: ${props => props.theme.colors.avatar};
    background: ${props => props.theme.colors.main};
    padding: 20px;
    width: 50%;
    text-align: center;
    color: ${props => props.theme.colors.primaryAccent};
    font-family: Heebo, sans-serif;
    font-size: 2.5em;
    font-weight: 900;
    @media (max-width: 600px) {
        width: 100%;
      }
`

const LinkStyled = styled(Link)`
    box-shadow: none;
    text-decoration: none;
    color: ${props => props.theme.colors.primaryAccent};
`

const headerMain = (props) => {
    return (
        <HeaderMainStyled>
          {props.avatar}
            <ShopName>
                <LinkStyled to='/'>
                    {props.shopName}
                </LinkStyled>
            </ShopName>
        </HeaderMainStyled>
    )
}

export default headerMain;
