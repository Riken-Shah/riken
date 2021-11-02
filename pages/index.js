import { createStore } from 'store'
import { LandingComponent } from '../src/components/Landing'

const IndexPage = () => {
  return <LandingComponent />
}

export async function getStaticProps () {
  const store = createStore()

  return {
    props: {
      state: store.getState()
    }
  }
}

export default IndexPage
