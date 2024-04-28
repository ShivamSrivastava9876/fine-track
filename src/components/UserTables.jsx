"use client";

import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteUserAsync,
  selectUserData,
  updateUserAsync,
  userDetailsAsync,
} from "@/redux/slice/user/userSlice";
import DeleteOption from "./DeleteOption";
import { MdEdit, MdDelete } from "react-icons/md";
import { FaCheckSquare, FaSquare } from "react-icons/fa";
import EditFormCustomer from "@/components/EditFormCustomer";

const createData = (
  srNo,
  id,
  customerName,
  businessName,
  email,
  contactNo,
  alternateContactNo,
  address,
  shippingAddress,
  remark
) => {
  return {
    srNo,
    id,
    customerName,
    businessName,
    email,
    contactNo,
    alternateContactNo,
    address,
    shippingAddress,
    remark,
  };
};

const columns = [
  { id: "srNo", label: "Sr No", minWidth: 100 },
  { id: "customerName", label: "Customer name", minWidth: 200 },
  { id: "businessName", label: "Business name", minWidth: 200 },
  { id: "email", label: "Email", minWidth: 100 },
  { id: "contactNo", label: "Contact number", minWidth: 50 },
  { id: "alternateContactNo", label: "Alternate contact number", minWidth: 70 },
  { id: "address", label: "Address", minWidth: 150 },
  { id: "shippingAddress", label: "Shipping address", minWidth: 150 },
  { id: "actions", label: "", minWidth: 100 },
];

export default function UserTables() {
  const dispatch = useDispatch();

  const [customerName, setCustomerName] = React.useState("");
  const [businessName, setBusinessName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [contactNo, setContactNo] = React.useState("");
  const [alternateContactNo, setAlternateContactNo] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [shippingAddress, setShippingAddress] = React.useState("");
  const [remark, setRemark] = React.useState("");

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [editedRow, setEditedRow] = React.useState(null);
  const [rows, setRows] = React.useState([]);
  const [selectedRowToDelete, setSelectedRowToDelete] = React.useState(null);
  const [updateSuccess, setUpdateSuccess] = React.useState(false);

  const handleUpdateCustomer = (
    e,
    rowId,
    rowCustomerName,
    rowBusinessName,
    rowEmail,
    rowContactNo,
    rowAlternateContactNo,
    rowAddress,
    rowShippingAddress,
    rowRemark
  ) => {
    e.preventDefault();
    const updatedCustomerName =
      customerName !== "" ? customerName : rowCustomerName;
    const updatedBusinessName =
      businessName !== "" ? businessName : rowBusinessName;
    const updatedEmail = email !== "" ? email : rowEmail;
    const updatedContactNo = contactNo !== "" ? contactNo : rowContactNo;
    const updatedAlternateContactNo =
      alternateContactNo !== "" ? alternateContactNo : rowAlternateContactNo;
    const updatedAddress = address !== "" ? address : rowAddress;
    const updatedShippingAddress =
      shippingAddress !== "" ? shippingAddress : rowShippingAddress;
    const updatedRemark = remark !== "" ? remark : rowRemark;

    dispatch(
      updateUserAsync({
        id: editedRow,
        full_name: updatedCustomerName,
        bussiness_name: updatedBusinessName,
        email: updatedEmail,
        contact_no: updatedContactNo,
        alternate_no: updatedAlternateContactNo,
        address: updatedAddress,
        shipping_address: updatedShippingAddress,
        remark: updatedRemark,
      })
    ).then((result) => {
      if (updateUserAsync.fulfilled.match(result)) {
        dispatch(userDetailsAsync());
        setCustomerName("");
        setBusinessName("");
        setEmail("");
        setContactNo("");
        setAlternateContactNo("");
        setAddress("");
        setShippingAddress("");
        setRemark("");
        setEditedRow(null);

        setUpdateSuccess(true);
        setTimeout(() => {
          setUpdateSuccess(false);
        }, 3000);
      }
    });
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleDelete = (selectedRowId) => {
    const userId = selectedRowId;
    dispatch(deleteUserAsync(userId)).then((result) => {
      if (deleteUserAsync.fulfilled.match(result)) {
        dispatch(userDetailsAsync());
      }
    });
  };

  const handleDeleteCancel = () => {
    setSelectedRowToDelete(null);
  };

  const handleDeletePopup = (selectedRowId) => {
    setSelectedRowToDelete(selectedRowId);
  };

  const hideUpdateSuccess = () => {
    setUpdateSuccess(false);
  };

  const handleEdit = (selectedRow) => {
    setEditedRow(selectedRow.id);
    setCustomerName(selectedRow.customerName);
    setBusinessName(selectedRow.businessName);
    setEmail(selectedRow.email);
    setContactNo(selectedRow.contactNo);
    setAlternateContactNo(selectedRow.alternateContactNo);
    setAddress(selectedRow.address);
    setShippingAddress(selectedRow.shippingAddress);
  };

  const handleCancel = () => {
    setEditedRow(null);
    setCustomerName("");
    setBusinessName("");
    setEmail("");
    setContactNo("");
    setAlternateContactNo("");
    setAddress("");
    setShippingAddress("");
  };

  React.useEffect(() => {
    dispatch(userDetailsAsync());
  }, [dispatch]);

  const userData = useSelector(selectUserData)[0];

  React.useEffect(() => {
    if (userData && Array.isArray(userData)) {
      let srNo = 1;
      const newRows = userData.map((data) => {
        const newRow = createData(
          srNo,
          data.id,
          data.full_name || "",
          data.bussiness_name || "",
          data.email || "",
          data.contact_no || "",
          data.alternate_no || "",
          data.address || "",
          data.shipping_address || "",
          data.remark || ""
        );
        srNo = srNo + 1;
        return newRow;
      });
      setRows(newRows);
    }
  }, [userData]);

  return (
    <>
      {updateSuccess && (
        <div
          // className="bg-red-100 flex justify-between items-center border border-red-400 text-red-700 px-4 py-3 rounded relative"
          className="bg-blue-100 flex justify-between items-center border border-blue-400 text-blue-700 px-4 py-3 rounded fixed top-0 left-0 right-0"
          role="success"
          style={{ zIndex: 1001 }}
        >
          <strong className="font-bold">Customer details updated successfully</strong>
          <button
            onClick={hideUpdateSuccess}
            className="relative top-0.5 bottom-0 left-1"
          >
            <span className="text-blue-500 text-2xl">×</span>
          </button>
        </div>
      )}
      <Paper sx={{ width: "100%", overflow: "hidden" }} className="w-full">
        <TableContainer sx={{ maxHeight: 440 }} className="font-Poppins">
          <Table
            stickyHeader
            aria-label="sticky table"
            className="font-Poppins"
          >
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{
                      minWidth: column.minWidth,
                      backgroundColor: "#F8F8F8",
                      color: "#4D586A",
                    }}
                    className=" font-poppins font-semibold"
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.srNo}
                    >
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell
                            key={column.id}
                            align={column.align}
                            className=" font-poppins"
                          >
                            {column.id === "actions" ? (
                              // Render Edit and Delete buttons
                              <div className="space-x-2">
                                {editedRow === row.id ? (
                                  <div className="space-x-2">
                                    <EditFormCustomer
                                      isOpen={true}
                                      row={row}
                                      handleCancel={handleCancel}
                                      customerName={customerName}
                                      setCustomerName={setCustomerName}
                                      businessName={businessName}
                                      setBusinessName={setBusinessName}
                                      email={email}
                                      setEmail={setEmail}
                                      contactNo={contactNo}
                                      setContactNo={setContactNo}
                                      alternateContactNo={alternateContactNo}
                                      setAlternateContactNo={
                                        setAlternateContactNo
                                      }
                                      address={address}
                                      setAddress={setAddress}
                                      shippingAddress={shippingAddress}
                                      setShippingAddress={setShippingAddress}
                                      remark={remark}
                                      setRemark={setRemark}
                                      handleUpdateCustomer={
                                        handleUpdateCustomer
                                      }
                                    />
                                  </div>
                                ) : (
                                  <div className="space-x-7 flex">
                                    <MdEdit
                                      onClick={() => handleEdit(row)}
                                      size={24}
                                      style={{
                                        cursor: "pointer",
                                        color: "black",
                                      }}
                                    />

                                    <MdDelete
                                      onClick={() => handleDeletePopup(row.id)}
                                      size={24}
                                      style={{
                                        cursor: "pointer",
                                        color: "red",
                                      }}
                                    />
                                    {selectedRowToDelete === row.id && (
                                      <DeleteOption
                                        deleteDetails={{ title: "customer" }}
                                        rowId={row.id}
                                        isOpen={true}
                                        handleDelete={handleDelete}
                                        handleDeleteCancel={handleDeleteCancel}
                                      />
                                    )}
                                  </div>
                                )}
                              </div>
                            ) : // Render other columns
                            column.format && typeof value === "number" ? (
                              column.format(value)
                            ) : (
                              value
                            )}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />

        {/* <div className="space-x-4">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onPageChange={handleChangePage}
        >
          Next
        </button>

        <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
          Previous
        </button>
      </div> */}
      </Paper>
    </>
  );
}
