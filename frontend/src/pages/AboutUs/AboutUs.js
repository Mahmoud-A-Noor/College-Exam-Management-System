import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

import Hero from "./Hero"
import Who from "./Who"
import Where from "./Where"
import What from "./What"
import How from "./How"

export default function AboutUs(){
    return (
        <>
            <Navbar />
            <Hero />
            <Who />
            <What />
            <How />
            <Where />
            <Footer />
        </>
    )
}