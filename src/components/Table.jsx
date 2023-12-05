import React from "react";
import { useInvoiceListData } from "../redux/hooks";
import { InvoiceRow } from "./InvoiceRow";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { IoAddSharp } from "react-icons/io5";

export default function Table() {
  const { invoiceList, getOneInvoice } = useInvoiceListData();
  const navigate = useNavigate();

  return (
    <div className="w-100 ">
      {invoiceList.length === 0 ? (
        <div
          className="d-flex w-100 flex-column align-items-center"
          style={{ paddingTop: "200px" }}
        >
          <img
            src="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
            style={{ objectFit: "contain", filter: "grayScale(1)" }}
            width={500}
            height={200}
            alt=""
          />
          <Link to="/create" style={{ textDecoration: "none" }}>
            {" "}
            <Button className="btn btn-light w-100 d-flex flex-row align-items-center gap-1">
              {" "}
              <IoAddSharp /> Create Invoice
            </Button>
          </Link>
        </div>
      ) : (
        <table class="table table-bordered">
          <thead>
            <tr>
              <th scope="col" className="p-3" style={{ width: "100px" }}>
                Invoice No.
              </th>
              <th scope="col" className="p-3">
                Bill To
              </th>
              <th scope="col" className="p-3" style={{ width: "200px" }}>
                Due Date
              </th>
              <th scope="col" className="p-3">
                Total Amount
              </th>
              <th scope="col" className="p-3" style={{ width: "150px" }}>
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {invoiceList?.map((invoice) => (
              <InvoiceRow
                key={invoice.id}
                invoice={invoice}
                navigate={navigate}
              />
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
