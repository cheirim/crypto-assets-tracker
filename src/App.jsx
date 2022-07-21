import React from "react";
import DrawerAppBar from "./components/DrawerAppBar";
import Hero from "./components/Hero";
import StickyHeadTable from "./components/StickyHeadTable";

import CoinData from "./components/CoinData";
const App = () => {
  return (
    <>
      <DrawerAppBar />
      <Hero />
      {/* <StickyHeadTable /> */}
      <CoinData />
    </>
  );
};

export default App;
