import React from "react";
import styled, { ThemeProvider } from 'styled-components';
import { theme } from '../styles/theme';
import { GlobalStyle } from '../styles/globalStyle';
import HeaderMain from './Headers/HeaderMain';
import HeaderMinor from './Headers/HeaderMinor';


const PageWrapper = styled.div`
  background: ${props => props.theme.colors.main};
  width: 100%;
`

const MainSection = styled.main`
  background: ${props => props.theme.colors.main};
  width: 100%;
`

const FooterStyled = styled.footer`
  background: ${props => props.theme.colors.main};
  color: ${props => props.theme.colors.primaryAccent};
  display: block;
  line-height: 1.5;
  width: 100%;
  text-align: center;
  padding-top: 70px;
  padding-bottom: 70px;
  }
`

const ExternalLink = styled.a`
  color: #882221;
`


class Layout extends React.Component {

  componentDidMount() {
    if (window.Snipcart) {
      window.Snipcart.api.configure('show_continue_shopping', true);
    }
  }


  render() {
    const { location, children } = this.props
    const rootPath = `${__PATH_PREFIX__}/`
    const siteName = "Junkietosekta.pl"
    let header

    if (location.pathname === rootPath) {
      header = (
        <HeaderMain shopName={siteName}>
        </HeaderMain>
      )
    } else {
      header = (
        <HeaderMinor shopName={siteName}>
        </HeaderMinor>
      )
    }

    return (
      <ThemeProvider theme={theme}>
        <>
          <GlobalStyle />
          <PageWrapper>
            {header}
            <MainSection>{children}</MainSection>
            <FooterStyled>
              <span>| millennium | 51 1160 2202 0000 0002 6070 5913 | tedoendoce | junkierap | sekta |</span>
              <strong>
           - Made by <ExternalLink href="https://www.skwebarchitecture.com/" target="_blank" rel="noopener noreferrer">Szymon Koniarek</ExternalLink>
              </strong>
            </FooterStyled>
          </PageWrapper>
        </>
      </ThemeProvider>
    )
  }
}

export default Layout
