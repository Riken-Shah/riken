/* eslint no-tabs: ["error", { allowIndentationTabs: true }] */
import { useState } from "react";

import { ThemeProvider, createGlobalStyle } from "styled-components";
import { Helmet } from "react-helmet";

import Layout from "../src/components/Layout";
import { lightTheme, darkTheme } from "../src/theme";
import Store, { themes } from "../src/store";

const GlobalStyle = createGlobalStyle`
* { 
  box-sizing: border-box; 
}
html, body {
	min-height: 100%;
	background: ${({ theme }) => theme.background};
	color: ${({ theme }) => theme.text.primary};
  font-family: "Montserrat";
  margin: 0;
  padding: 0;
  cursor: default;

  .scrollbar-track{
    display: none !important;
  }
}
a, a:visited, a:hover, a:active {
  color: inherit;
}

// Avoid Safari Auto Zoom to Input Elements
@media screen and (-webkit-min-device-pixel-ratio:0) { 
  select,
  textarea,
  input {
    font-size: 16px;
  }
}
`;

export default function MyApp(props) {
  const { Component, pageProps } = props;
  const [theme, setTheme] = useState(themes.DARK);
  const title = "Riken Portfolio";
  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content={title} />
      </Helmet>
      <ThemeProvider theme={theme === themes.LIGHT ? lightTheme : darkTheme}>
        <GlobalStyle />
        <Store>
          <Layout setTheme={setTheme}>
            <Component {...pageProps} />
          </Layout>
        </Store>
      </ThemeProvider>
    </>
  );
}
