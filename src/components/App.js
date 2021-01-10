import React, { useState } from "react";
import Header from "./landing-page/Header";
import LoadNetworks from "./landing-page/LoadNetworks";
import Layout from "./Layout";


export default function App() {
  const [state, setState] = useState({ networks: [] });

  if (state.networks.length === 0) {
    return <>
      <Header/>
      <LoadNetworks onSubmit={setState}/>
    </>;
  }

  return <Layout {...state}/>;
}
