import { Button } from "react-bootstrap";
import { BiSolidPencil, BiTrash } from "react-icons/bi";
import { BsEyeFill } from "react-icons/bs";
import InvoiceModal from "./InvoiceModal";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteInvoice } from "../redux/invoicesSlice";

export const InvoiceRow = ({ invoice, navigate }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dispatch = useDispatch();

    const handleDeleteClick = (invoiceId) => {
        dispatch(deleteInvoice(invoiceId));
    };

    const handleEditClick = () => {
        navigate(`/edit/${invoice.id}`);
    };

    const openModal = (event) => {
        event.preventDefault();
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
    };

    return (
        <tr>
            <td className="p-3">{invoice.invoiceNumber}</td>
            <td className="fw-normal p-3">{invoice.billTo}</td>
            <td className="fw-normal p-3">{invoice.dateOfIssue}</td>
            <td className="fw-normal p-3">
                {invoice.currency}
                {invoice.total}
            </td>
            <td  >
                <div className="w-100 d-flex gap-2 ">
                    <Button variant="outline-primary" onClick={handleEditClick}>
                        <div className="d-flex align-items-center justify-content-center gap-2">
                            <BiSolidPencil />
                        </div>
                    </Button>
                    <Button variant="danger" onClick={() => handleDeleteClick(invoice.id)}>
                        <div className="d-flex align-items-center justify-content-center gap-2">
                            <BiTrash />
                        </div>
                    </Button>
                    <Button variant="secondary" onClick={openModal}>
                        <div className="d-flex align-items-center justify-content-center gap-2">
                            <BsEyeFill />
                        </div>
                    </Button>
                    <InvoiceModal
                        showModal={isOpen}
                        closeModal={closeModal}
                        info={{
                            isOpen,
                            id: invoice.id,
                            currency: invoice.currency,
                            currentDate: invoice.currentDate,
                            invoiceNumber: invoice.invoiceNumber,
                            dateOfIssue: invoice.dateOfIssue,
                            billTo: invoice.billTo,
                            billToEmail: invoice.billToEmail,
                            billToAddress: invoice.billToAddress,
                            billFrom: invoice.billFrom,
                            billFromEmail: invoice.billFromEmail,
                            billFromAddress: invoice.billFromAddress,
                            notes: invoice.notes,
                            total: invoice.total,
                            subTotal: invoice.subTotal,
                            taxRate: invoice.taxRate,
                            taxAmount: invoice.taxAmount,
                            discountRate: invoice.discountRate,
                            discountAmount: invoice.discountAmount,
                        }}
                        items={invoice.items}
                        currency={invoice.currency}
                        subTotal={invoice.subTotal}
                        taxAmount={invoice.taxAmount}
                        discountAmount={invoice.discountAmount}
                        total={invoice.total}
                    />
                </div>

            </td>
   

  
        </tr>
    );
};