import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Card from "./components/card";
import Slider from "./components/slider";
import Form from "./components/contactform";

function App() {
  return (
    <div className="App">
      <Header />
      <Slider />
      <Card />
      <Form />
      <Footer />
    </div>
  );
}

export default App;
