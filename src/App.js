import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Container from "react-bootstrap/Container";
import { Route, Routes } from "react-router-dom";
import Invoice from "./pages/Invoice";
import Table from "./components/Table";
import Home from "./layout/Home";
import Edit from "./components/Bulk/Edit";
import { useInvoiceListData } from "./redux/hooks";
import Notfound from "./components/404/Notfound";

const App = () => {
  const { invoiceList, getOneInvoice } = useInvoiceListData();

  return (
    <Container style={{maxWidth:"1500px"}}>
     <Routes>
      <Route path="/" element={<Home />}>
        {invoiceList.length === 0 ? (
          <></>
        ) : (
          <Route path="/bulk" element={<Edit />} />
        )}
        <Route path="/" element={<Table />} />
      </Route>

      <Route path="/create" element={<Invoice />} />
      <Route path="/create/:id" element={<Invoice />} />
      <Route path="/edit/:id" element={<Invoice />} />
      <Route path="/*" element={<Notfound />} />
    </Routes>     
    </Container>

  );
};

export default App;
