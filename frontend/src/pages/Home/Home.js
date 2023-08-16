import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

import Hero from "./Hero";
import Features from "./Features";
import Needs from "./Needs";
import Counter from "./Counter"
import Partners from './Partners'

export default function Home() {
    return (
      <>
        <Navbar />
        <Hero />
        <Features />
        <Needs />
        <Counter />
        <Partners />
        <Footer />
      </>
    );
  }