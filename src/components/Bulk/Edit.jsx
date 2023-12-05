import React, { useState } from "react";
import { ReactGrid } from "@silevis/reactgrid";
import "@silevis/reactgrid/styles.css";
import { updateBulkInvoice } from "../../redux/invoicesSlice";

import { useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";
import { useInvoiceListData } from "../../redux/hooks";

export default function Edit() {
  const { invoiceList, getOneInvoice } = useInvoiceListData();
  const [BulkData, setBulkData] = useState([]);
  const [active, setActive] = useState(false);
  const [highlight, sethighlight] = useState([]);

  const navigate = useNavigate();

  console.log(BulkData);
  const dispatch = useDispatch();

  const nonEditable = (cell) => ({
    ...cell,
    nonEditable: true,
  });

  const handleSave = () => {
    try {
      const allRowsValid = BulkData.every((person, index) => {
        const isValid = validateRow(person);

        if (!isValid) {
          console.log(person);
          sethighlight([
            { columnId: "invoiceNumber", rowId: index, borderColor: "#ff0000" },
          ]);

          alert(`Validation error at row ${index + 1} for person:`);
        }

        return isValid;
      });
      if (allRowsValid) {
        dispatch(updateBulkInvoice(BulkData));
        alert("Invoices updated successfully");
        navigate("/");
      }
    } catch (error) {
      alert("Invalid Input");
    }
  };

  const Total = (subtotal, taxRate, discountRate) => {
    const taxAmount = parseFloat(
      Number(subtotal) * (Number(taxRate) / 100)
    ).toFixed(2);
    const discountAmount = parseFloat(
      Number(subtotal) * (Number(discountRate) / 100)
    ).toFixed(2);

    const total =
      Number(subtotal) - parseFloat(discountAmount) + parseFloat(taxAmount);
    return total;
  };

  const getPeople = () => {
    return invoiceList.map((invoice, idx) => ({
      id: invoice.id,
      currentDate: invoice.currentDate,
      invoiceNumber: invoice.invoiceNumber,
      dateOfIssue: invoice.dateOfIssue,
      billTo: invoice.billTo,
      billToAddress: invoice.billToAddress,
      billToEmail: invoice.billToEmail,
      billFrom: invoice.billFrom,
      billFromEmail: invoice.billFromEmail,
      billFromAddress: invoice.billFromAddress,
      notes: invoice.notes,
      taxAmount: invoice.taxAmount,
      subTotal: invoice.subTotal,
      taxRate: invoice.taxRate,
      items: invoice.items,
      discountRate: invoice.discountRate,
      total: `${Total(
        invoice.subTotal,
        invoice.taxRate,
        invoice.discountRate
      )}`,
      currency: invoice.currency,
    }));
  };

  const getColumns = () => [
    { columnId: "invoiceNumber", width: 100 },
    { columnId: "dateOfIssue", width: 100 },
    { columnId: "billTo", width: 150 },
    { columnId: "billToEmail", width: 150 },
    { columnId: "billToAddress", width: 150 },
    { columnId: "billFrom", width: 150 },
    { columnId: "billFromEmail", width: 150 },
    { columnId: "billFromAddress", width: 150 },
    { columnId: "notes", width: 150 },
    { columnId: "taxRate", width: 100 },
    { columnId: "discountRate", width: 100 },
    { columnId: "total", width: 100 },
  ];

  const headerRow = {
    rowId: "header",
    cells: [
      { type: "header", text: "Invoice No." },
      { type: "header", text: "dateOfIssue" },
      { type: "header", text: "billTo" },
      { type: "header", text: "billToEmail" },
      { type: "header", text: "billToAddress" },
      { type: "header", text: "billFrom" },
      { type: "header", text: "billFromEmail" },
      { type: "header", text: "billFromAddress" },
      { type: "header", text: "notes" },
      { type: "header", text: "Tax rate" },
      { type: "header", text: "Discount rate" },
      { type: "header", text: "Total" },
    ],
  };

  const getRows = (people) => [
    headerRow,

    ...people.map((person, idx) => ({
      rowId: idx,
      cells: [
        nonEditable({ type: "number", value: person.invoiceNumber }),
        { type: "text", text: person.dateOfIssue },
        { type: "text", text: person.billTo },
        { type: "email", text: person.billToEmail },
        { type: "text", text: person.billToAddress },
        { type: "text", text: person.billFrom },
        { type: "text", text: person.billFromEmail },
        { type: "text", text: person.billFromAddress },
        { type: "text", text: person.notes },
        { type: "text", text: person.taxRate },
        { type: "text", text: person.discountRate },
        nonEditable({
          type: "number",
          value: Total(person.subTotal, person.taxRate, person.discountRate),
        }),
      ],
    })),
  ];

  // Validation functions
  const isValidDate = (date) => {
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    return dateRegex.test(date);
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isValidNumber = (value) => {
    return !isNaN(Number(value));
  };

  const validateRow = (person) => {
    const isValidRow =
      // person.billTo.trim() !== "" &&
      isValidEmail(person.billToEmail) &&
      // person.billToAddress.trim() !== "" &&
      // person.billFrom.trim() !== "" &&
      isValidEmail(person.billFromEmail) &&
      // person.billFromAddress.trim() !== "" &&
      isValidNumber(person.taxRate) &&
      isValidNumber(person.discountRate) &&
      isValidDate(person.dateOfIssue);

    return isValidRow;
  };

  const applyChangesToPeople = (changes, prevPeople) => {
    const updatedPeople = [...prevPeople];

    changes.forEach((change) => {
      const personIndex = change.rowId;
      const fieldName = change.columnId;

      updatedPeople[personIndex][fieldName] = change.newCell.text;
    });

    const updatedBulkData = updatedPeople.map((person) => {
      const updatedPerson = {
        ...person,
        total: `${Total(person.subTotal, person.taxRate, person.discountRate)}`,
      };
      return updatedPerson;
    });

    setBulkData(updatedBulkData);
    setActive(true);

    return updatedPeople;
  };

  const [people, setPeople] = React.useState(getPeople());

  const rows = getRows(people);
  const columns = getColumns();

  const handleChanges = (changes) => {
    setPeople((prevPeople) => applyChangesToPeople(changes, prevPeople));
  };

  console.log(BulkData);

  return (
    <div className="w-100 ">
      <div className="d-flex  justify-content-end">
        <button
          type="button"
          disabled={!active}
          class="btn btn-success px-4"
          onClick={handleSave}
        >
          Update
        </button>
      </div>
      <div className="w-100 overflow-x-scroll mt-3">
        <ReactGrid
          rows={rows}
          columns={columns}
          onCellsChanged={handleChanges}
          enableFillHandle
          enableRowSelection
          enableColumnSelection
          enableRangeSelection
          stickyLeftColumns={1}
          highlights={highlight}
        />
      </div>
    </div>
  );
}
