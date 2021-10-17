import { Navbar } from "@/components/Navigation/Navbar";
import PropTypes from "prop-types";
import { useState } from "react";
import Footer from "../Footer";

export default function Layout({ children }) {
  const [isDarken, setIsDarken] = useState(false)
  const setIsDarkenHandle = () => {
      setIsDarken(!isDarken)
  } 
  return (
    <div className={'is-home ' + (isDarken ? 'is-dark' : '')}>
      <Navbar  isDarken={isDarken} setIsDarkenHandle={setIsDarkenHandle} />
      {children}
      <Footer />
    </div>
  )
}
Layout.propTypes = {
    children: PropTypes.func
};

