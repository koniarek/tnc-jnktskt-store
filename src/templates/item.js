// This is the template for each programmatically generated item in the shop. It will be populated with data from markdown files in the content folder.

import React from "react";
import { graphql } from "gatsby";
import Img from "gatsby-image";
import styled from "styled-components"

import Layout from "../components/layout";

const Heading = styled.h1`
  font-weight: 900;
  font-size: 1.5em;
  margin: 20px 0;
`

const ImgStyled = styled(Img)`
  width: 100%;
  height: 400px;
`

const Description = styled.h3`
    width: 350px;
    flex-direction: column;
    display: block;
    line-height: 1.5;
    width: 100%;
    text-align: center;
    padding-top: 70px;
    padding-bottom: 70px;
    color:  ${props => props.theme.colors.primaryAccent};

`
  const Price = styled.h3`                            
      width: 350px;                                         
      flex-direction: column;                               
      display: block;                                       
      line-height: 1.5;                                     
      width: 100%;                                          
      text-align: center;                                        
      padding-top: 70px;                                    
      padding-bottom: 70px;                                 
      color:  ${props => props.theme.colors.primaryAccent};
                                                                                       
`
const Dropdown = styled.select`
    width: 350px;                                         
    display: row;                                       
    line-height: 1.5;                                     
    text-align: center; 
    item-align: center;
    margin-left:100px;
    margin-right: 100 px;  
    margin-bottom: 100 px;                               
    background: ${props => props.theme.colors.primaryAccent};
    outline: ${props => props.theme.colors.thirdAccent};  
                               
`
const DropdownOption = styled.option`
flex-direction: columm;
line-height: 1.5;   
background: ${props => props.theme.colors.primaryAccent};
font-weight: 700;
text-align: right;  
outline: ${props => props.theme.colors.secondaryAccent};
`

const BuyButton = styled.button`
    flex-direction: columm;
    display: flex;
    justify-content: space-between;  
    font-weight: 700;
    align-items: center;  
    text-align: center  
    margin: 80px 20px;
    padding: 20px;
    margin-top: 100px;
    margin-bottom: 100px;
    margin-left: 100px;
    padding-right: 80px;
    padding-left: 80px;    
  background: ${props => props.theme.colors.primaryAccent};
  border: ${props => props.theme.colors.secondaryAccent};
  outline:${props => props.theme.colors.secondaryAccent};
  font-weight: 700;
`

class Item extends React.Component {
  state = {
    selected: this.props.data.markdownRemark.frontmatter.customField.values[0].name
  }

  setSelected = (value) => {
    this.setState({ selected: value })
  }

  // create the string required by snipcart to allow price changes based on option chosen
  createString = (values) => {
    return values.map(option => {
      const price = option.priceChange >= 0 ? `[+${option.priceChange}]` : `[${option.priceChange}]`
      return `${option.name}${price}`
    }).join('|')
  }

   // calculate price based on option selected for display on item page
  updatePrice = (basePrice, values) => {
    const selectedOption = values.find(option => option.name === this.state.selected)
    return (basePrice + selectedOption.priceChange).toFixed(2)

  }

  render() {
    const item = this.props.data.markdownRemark
    const siteTitle = this.props.data.site.siteMetadata.title

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <Heading>{item.frontmatter.title}</Heading>

        <ImgStyled fluid={item.frontmatter.image.childImageSharp.fluid} />
        <Price>£{this.updatePrice(item.frontmatter.price, item.frontmatter.customField.values)}</Price>
        <Description>{item.frontmatter.description}</Description>
        <Dropdown
          id={item.frontmatter.customField.name}
          onChange={(e) => this.setSelected(e.target.value)}
          value={this.state.selected}>
          {item.frontmatter.customField.values.map((option) => (<DropdownOption key={option.name}>{option.name}</DropdownOption>))}
        </Dropdown>

        <BuyButton
          className='snipcart-add-item'
          data-item-id={item.frontmatter.id}
          data-item-price={item.frontmatter.price}
          data-item-name={item.frontmatter.title}
          data-item-description={item.frontmatter.description}
          data-item-image={item.frontmatter.image.childImageSharp.fluid.src}
          data-item-url={"https://gatsby-snipcart-starter.netlify.com" + item.fields.slug} //REPLACE WITH OWN URL
          data-item-custom1-name={item.frontmatter.customField ? item.frontmatter.customField.name : null}
          data-item-custom1-options={this.createString(item.frontmatter.customField.values)}
          data-item-custom1-value={this.state.selected}>
          Dodaj do koszyka
        </BuyButton>

      </Layout>
    )
  }
}

export default Item;

export const pageQuery = graphql`
  query ItemBySlug($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      fields {
        slug
      }
      frontmatter {
        title
        description
        price
        id
        image {
          childImageSharp {
            fluid {
              src
              ...GatsbyImageSharpFluid
            }
          }
        }
        customField {
          name
          values {
            name
            priceChange
          }   
        }
      }
    }
  }
`
