/* eslint no-tabs: ["error", { allowIndentationTabs: true }] */
import { useEffect, useState } from "react";

import { ThemeProvider, createGlobalStyle } from "styled-components";
import { Helmet } from "react-helmet";

import Layout from "../src/components/Layout";
import { lightTheme, darkTheme } from "../src/theme";
import Store, { themes } from "../src/store";

const GlobalStyle = createGlobalStyle`

@font-face {
  font-family: "Druk Wide Bold";
  src: url("static/fonts/Druk-Wide-Bold.ttf");
}

@font-face {
  font-family: "GT-America Extended-Bold";
  src: url("static/fonts/GT-America Extended-Bold.ttf");
}
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

  useEffect(() => {
    setTheme(localStorage.getItem("theme") ?? theme.DARK);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const changeTheme = (newTheme) => {
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  const title = "Riken Portfolio";
  return (
		<>
			<Helmet>
				<title>{title}</title>
				<link rel="shortcut icon" href="/static/favicon.ico" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<meta property="og:title" content={title} />
				<meta
					name="description"
					content="Hi, I am Riken Shah. A fullstack developer based out of India."
				/>

				{/* <!-- Google / Search Engine Tags --> */}
				<meta itemProp="name" content="Riken Portfolio" />
				<meta
					itemProp="description"
					content="Hi, I am Riken Shah. A fullstack developer based out of India."
				/>
				<meta itemProp="image" content="" />

				{/* <!-- Facebook Meta Tags --> */}
				<meta property="og:url" content="https://riken.me" />
				<meta property="og:type" content="website" />
				<meta property="og:title" content="Riken Portfolio" />
				<meta
					property="og:description"
					content="Hi, I am Riken Shah. A fullstack developer based out of India."
				/>
				<meta property="og:image" content="/static/riken.png" />

				{/* <!-- Twitter Meta Tags --> */}
				<meta name="twitter:card" content="summary_large_image" />
				<meta name="twitter:title" content="Riken Portfolio" />
				<meta
					name="twitter:description"
					content="Hi, I am Riken Shah. A fullstack developer based out of India."
				/>
				<meta name="twitter:image" content="/static/riken.png" />
			</Helmet>
			<ThemeProvider theme={theme === themes.LIGHT ? lightTheme : darkTheme}>
				<GlobalStyle />
				<Store>
					<Layout setTheme={changeTheme}>
						<Component {...pageProps} />
					</Layout>
				</Store>
			</ThemeProvider>
		</>
	);
}
