export const calculateScrollPercenatage = (elm) => {
  const parent = elm.parentNode
  const scrollTop = parent.scrollTop || elm.scrollTop
  return (scrollTop / (parent.scrollHeight - parent.clientHeight)) * 100
}

const screenSize = {
  mobileS: '320px',
  mobileM: '375px',
  mobileL: '425px',
  tabletS: '550px',
  tablet: '768px',
  laptop: '1024px',
  laptopL: '1440px',
  desktop: '2560px'
}

export const device = {
  mobileS: `(max-width: ${screenSize.mobileS})`,
  mobileM: `(max-width: ${screenSize.mobileM})`,
  mobileL: `(max-width: ${screenSize.mobileL})`,
  tabletS: `(max-width: ${screenSize.tabletS})`,
  tablet: `(max-width: ${screenSize.tablet})`,
  laptop: `(max-width: ${screenSize.laptop})`,
  laptopL: `(max-width: ${screenSize.laptopL})`,
  desktop: `(max-width: ${screenSize.desktop})`,
  desktopL: `(max-width: ${screenSize.desktop})`
}
