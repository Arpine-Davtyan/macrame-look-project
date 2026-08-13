import Hero from "./hero/page";
import Information from "./information/page";
import ProductsByCategory from "./category/page";
import Steps from "./steps/page";
import About from "./about/page";

const Home = () => {
  return (
    <main>
      <Hero />
      <Information />
      <ProductsByCategory />
      <Steps />
      <About />
    </main>
  )
}

export default Home
