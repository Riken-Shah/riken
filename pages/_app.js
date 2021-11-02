/* eslint no-tabs: ["error", { allowIndentationTabs: true }] */

import { ThemeProvider, createGlobalStyle } from 'styled-components'
import { Helmet } from 'react-helmet'
import { Provider } from 'react-redux'

import { useStore } from 'store'
import Layout from 'components/Layout'
import theme from 'theme'

const GlobalStyle = createGlobalStyle`
* { 
  box-sizing: border-box; 
}
html, body {
	min-height: 100%;
	background: ${theme.background};
	color: ${theme.text.primary};
  font-family: "Montserrat";
  margin: 0;
  padding: 0;
}
a, a:visited, a:hover, a:active {
  color: inherit;
}
`

export default function MyApp (props) {
  const { Component, pageProps } = props
  const store = useStore(pageProps.state)
  const title = 'Hello next.js Real World!'
  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <meta property='og:title' content={title} />
      </Helmet>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Provider store={store}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </Provider>
      </ThemeProvider>
    </>
  )
}
