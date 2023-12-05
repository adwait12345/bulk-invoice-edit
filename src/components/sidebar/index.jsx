import React from "react";
import Logo from "../../assets/svg/Logo";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useInvoiceListData } from "../../redux/hooks";

export default function Sidebar() {
  const { invoiceList } = useInvoiceListData();

  return (
    <div
      style={{
        width: "250px",
        borderRight: "1px solid rgb(235, 235, 235)",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        padding: "20px 10px 20px 10px",
        justifyContent: "space-between",
        position: "sticky",
        top: 0,
      }}
    >
      <div className="d-flex flex-column ">
        <Logo />
        <p className="mt-0" style={{ fontSize: "10px" }}>
          Create Invoices, Purchases & Quotations in less than 10 seconds. Share
          on WhatsApp with payment links and get paid faster!
        </p>
      </div>
      <div className="d-flex flex-column gap-2">
        <Link to="/create" className="w-100">
          {" "}
          <Button className="btn btn-dark w-100">Create Invoice</Button>
        </Link>
        <Link to="/bulk" className="w-100">
          {" "}
          <Button
            disabled={invoiceList.length === 0}
            className="btn btn-light w-100"
          >
            Bulk Edit
          </Button>
        </Link>
      </div>
    </div>
  );
}
