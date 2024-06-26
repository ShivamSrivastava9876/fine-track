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
import { MdEdit, MdDelete, MdNote } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProductAsync,
  getProductAsync,
  getProductList,
  updateProductAsync,
} from "@/redux/slice/product/productSlice";
import {
  getManufacturingOrderListAsync,
  getManufacturingOrderData,
} from "@/redux/slice/manufacturing/manufacturingSlice";
import DeleteOption from "./DeleteOption";
import EditFormManufacturingOrder from "./EditFormManufacturingOrder";
import {
  deleteManufacturingOrderAsync,
  updateManugfacturingOrderAsync,
} from "../redux/slice/manufacturing/manufacturingSlice";

const columns = [
  { id: "id", label: "आईडी", minWidth: 50 },
  { id: "customer", label: "ग्राहक", minWidth: 100 },
  { id: "product", label: "प्रोडक्ट", minWidth: 150 },
  { id: "workerName", label: "कामगारचा नाव", minWidth: 100 },
  { id: "workerContact", label: "कामगारचा संपर्क क्रमांक", minWidth: 100 },
  { id: "startDate", label: "प्रारंभची तारीख", minWidth: 120 },
  { id: "endDate", label: "शेवटची तारीख", minWidth: 120 },
  { id: "weight", label: "दीलेला वजन (ग्राम)", minWidth: 100 },
  { id: "actions", label: "", minWidth: 100 },
];

const createData = (
  id,
  customer,
  product,
  workerName,
  workerContact,
  startDate,
  endDate,
  weight,
  description,
  billNo,
  status,
  ornamentName,
  wastageWeight,
  returnWeight,
  balance,
  productWeight
) => {
  return {
    id,
    customer,
    product,
    workerName,
    workerContact,
    startDate,
    endDate,
    weight,
    description,
    billNo,
    status,
    ornamentName,
    wastageWeight,
    returnWeight,
    balance,
    productWeight,
  };
};

export default function ManufacturingOrderTable() {
  const dispatch = useDispatch();

  const [id, setId] = React.useState("");
  const [customer, setCustomer] = React.useState("");
  const [product, setProduct] = React.useState("");
  const [workerName, setWorkerName] = React.useState("");
  const [workerContact, setWorkerContact] = React.useState("");
  const [startDate, setStartDate] = React.useState("");
  const [endDate, setEndDate] = React.useState("");
  const [weight, setWeight] = React.useState("");
  const [productWeight, setProductWeight] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [billNo, setBillNo] = React.useState("");
  const [ornamentName, setOrnamentName] = React.useState("");
  const [wastageWeight, setWastageWeight] = React.useState("");
  const [returnWeight, setReturnWeight] = React.useState("");
  const [balance, setBalance] = React.useState("");
  const [orderStatus, setOrderStatus] = React.useState("");

  const [openCategory, setOpenCategory] = React.useState(false);
  const [openProductType, setOpenProductType] = React.useState(false);
  const [editedRow, setEditedRow] = React.useState(null);
  const [selectedRowToDelete, setSelectedRowToDelete] = React.useState(null);
  const [error, setError] = React.useState(false);
  const [updateSuccess, setUpdateSuccess] = React.useState(false);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [rows, setRows] = React.useState([]);
  const orderList = useSelector(getManufacturingOrderData);

  const handleUpdateManufacturingOrder = (
    e,
    rowId,
    rowCustomer,
    rowProduct,
    rowWorkerName,
    rowWorkerContact,
    rowStartDate,
    rowEndDate,
    rowWeight,
    rowDescription
  ) => {
    e.preventDefault();
    const updatedCustomer = customer !== "" ? customer : rowCustomer;
    const updatedProduct = product !== "" ? product : rowProduct;
    const updatedWorkerName = workerName !== "" ? workerName : rowWorkerName;
    const updatedWorkerContact =
      workerContact !== "" ? workerContact : rowWorkerContact;
    const updatedStartDate = startDate !== "" ? startDate : rowStartDate;
    const updatedEndDate = endDate !== "" ? endDate : rowEndDate;
    const updatedWeight = weight !== "" ? weight : rowWeight;
    const updatedDescription =
      description !== "" ? description : rowDescription;

    if (
      (productWeight !== "" &&
        wastageWeight !== "" &&
        returnWeight !== "" &&
        balance !== "" &&
        orderStatus === "completed") ||
      orderStatus === "cancelled"
    ) {
      dispatch(
        updateManugfacturingOrderAsync({
          id: editedRow,
          customer: updatedCustomer,
          product: updatedProduct,
          worker_name: updatedWorkerName,
          worker_contact: updatedWorkerContact,
          start_date: updatedStartDate,
          end_date: updatedEndDate,
          weight: updatedWeight,
          decription: updatedDescription,
          ornament_name: ornamentName,
          product_weight: productWeight,
          wastage_weight: wastageWeight,
          return_weight: returnWeight,
          balance: balance,
          status: orderStatus,
        })
      ).then((result) => {
        if (updateManugfacturingOrderAsync.fulfilled.match(result)) {
          dispatch(getManufacturingOrderListAsync());
          setEditedRow("");
          setCustomer("");
          setProduct("");
          setWorkerName("");
          setWorkerContact("");
          setStartDate("");
          setEndDate("");
          setWeight("");
          setDescription("");
          setOrnamentName("");
          setProductWeight("");
          setWastageWeight("");
          setReturnWeight("");
          setBalance("");
          setOrderStatus("");

          setUpdateSuccess(true);
          setTimeout(() => {
            setUpdateSuccess(false);
          }, 3000);
        }
      });
    } else {
      e.preventDefault();
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 3000);
    }
  };

  const handleDelete = (selectedRowId) => {
    const orderId = selectedRowId;
    dispatch(deleteManufacturingOrderAsync(orderId)).then((result) => {
      if (deleteManufacturingOrderAsync.fulfilled.match(result)) {
        dispatch(getManufacturingOrderListAsync());
      }
    });
  };

  const handleDeleteCancel = () => {
    setSelectedRowToDelete(null);
  };

  const handleDeletePopup = (selectedRowId) => {
    setSelectedRowToDelete(selectedRowId);
  };

  const handleUser = () => {
    setOpenCategory(!openCategory);
  };

  const handleUserClick = (option) => {
    setOrderStatus(option);
    setOpenCategory(!openCategory);
  };

  const handleEdit = (
    rowId,
    rowCustomer,
    rowProduct,
    rowWorkerName,
    rowWorkerContact,
    rowStartDate,
    rowEndDate,
    rowWeight,
    rowDescription,
    rowBillNo,
    rowStatus
  ) => {
    setEditedRow(rowId);
    setCustomer(rowCustomer);
    setProduct(rowProduct);
    setWorkerName(rowWorkerName);
    setWorkerContact(rowWorkerContact);
    setStartDate(rowStartDate);
    setEndDate(rowEndDate);
    setWeight(rowWeight);
    setDescription(rowDescription);
    setBillNo(rowBillNo);
    setOrderStatus(rowStatus);
  };

  const handleProductType = () => {
    setOpenProductType(!openProductType);
  };

  const handleProductClick = (option) => {
    setProduct(option);
    setOpenProductType(!openProductType);
  };

  const handleCancel = () => {
    setEditedRow("");
    setCustomer("");
    setProduct("");
    setWorkerName("");
    setWorkerContact("");
    setStartDate("");
    setEndDate("");
    setWeight("");
    setDescription("");
    setOrnamentName("");
    setWastageWeight("");
    setReturnWeight("");
    setBalance("");
    setOrderStatus("");
    setProductWeight("");
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const hideError = () => {
    setError(false);
  };

  const hideUpdateSuccess = () => {
    setUpdateSuccess(false);
  };

  React.useEffect(() => {
    dispatch(getManufacturingOrderListAsync());
  }, [dispatch]);

  React.useEffect(() => {
    if (orderList && Array.isArray(orderList)) {
      let srNo = 1;
      console.log(orderList);
      const newRows = orderList.map((data) => {
        const newRow = createData(
          data.id || "",
          data.customer || "",
          data.product || "",
          data.worker.first_name + " " + data.worker.last_name || "",
          data.worker.mobile || "",
          data.start_date || "",
          data.end_date || "",
          data.weight || "",
          data.decription || "",
          data.bill_no || "",
          data.status || "",
          data.ornament_name || "",
          data.wastage_weight || "",
          data.return_weight || "",
          data.balance || "",
          data.product_weight || ""
        );
        srNo = srNo + 1;
        return newRow;
      });

      setRows(newRows);
    }
  }, [orderList]);

  return (
    <>
      {updateSuccess && (
        <div
          // className="bg-red-100 flex justify-between items-center border border-red-400 text-red-700 px-4 py-3 rounded relative"
          className="bg-blue-100 flex justify-between items-center border border-blue-400 text-blue-700 px-4 py-3 rounded fixed top-0 left-0 right-0"
          role="success"
          style={{ zIndex: 1001 }}
        >
          <strong className="font-bold">ऑर्डर अपडेट झाली</strong>
          <button
            onClick={hideUpdateSuccess}
            className="relative top-0.5 bottom-0 left-1"
          >
            <span className="text-blue-500 text-2xl">×</span>
          </button>
        </div>
      )}
      {error && (
        <div
          // className="bg-red-100 flex justify-between items-center border border-red-400 text-red-700 px-4 py-3 rounded relative"
          className="bg-red-100 flex justify-between items-center border border-red-400 text-red-700 px-4 py-3 rounded fixed top-0 left-0 right-0"
          role="alert"
          style={{ zIndex: 1000 }}
        >
          <strong className="font-bold">त्कृपया सर्व आवश्यक फील्ड भरा</strong>
          <button
            onClick={hideError}
            className="relative top-0.5 bottom-0 left-1"
          >
            <span className="text-red-500 text-2xl">×</span>
          </button>
        </div>
      )}
      <Paper sx={{ width: "100%", overflow: "hidden" }} className="w-full">
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
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
                                    <EditFormManufacturingOrder
                                      row={row}
                                      productWeight={productWeight}
                                      setProductWeight={setProductWeight}
                                      orderStatus={orderStatus}
                                      setOrderStatus={setOrderStatus}
                                      error={error}
                                      setError={setError}
                                      balance={balance}
                                      setBalance={setBalance}
                                      returnWeight={returnWeight}
                                      setReturnWeight={setReturnWeight}
                                      wastageWeight={wastageWeight}
                                      setWastageWeight={setWastageWeight}
                                      ornamentName={ornamentName}
                                      setOrnamentName={setOrnamentName}
                                      weight={weight}
                                      setWeight={setWeight}
                                      endDate={endDate}
                                      setEndDate={setEndDate}
                                      startDate={startDate}
                                      setStartDate={setStartDate}
                                      workerContact={workerContact}
                                      setWorkerContact={setWorkerContact}
                                      workerName={workerName}
                                      setWorkerName={setWorkerName}
                                      product={product}
                                      setProduct={setProduct}
                                      customer={customer}
                                      setCustomer={setCustomer}
                                      id={id}
                                      setId={setId}
                                      description={description}
                                      setDescription={setDescription}
                                      handleUserClick={handleUserClick}
                                      handleUpdateManufacturingOrder={
                                        handleUpdateManufacturingOrder
                                      }
                                      openCategory={openCategory}
                                      openProductType={openProductType}
                                      handleUser={handleUser}
                                      handleProductType={handleProductType}
                                      handleProductClick={handleProductClick}
                                      isOpen={true}
                                      handleCancel={handleCancel}
                                    />
                                  </div>
                                ) : (
                                  <div className="space-x-7 flex">
                                    {row.status === "Pending" ? (
                                      <MdEdit
                                        onClick={() =>
                                          handleEdit(
                                            row.id,
                                            row.customer,
                                            row.product,
                                            row.workerName,
                                            row.workerContact,
                                            row.startDate,
                                            row.endDate,
                                            row.weight,
                                            row.description,
                                            row.billNo,
                                            row.status
                                          )
                                        }
                                        size={24}
                                        style={{
                                          cursor: "pointer",
                                          color: "black",
                                        }}
                                      />
                                    ) : (
                                      <MdNote
                                        onClick={() =>
                                          handleEdit(
                                            row.id,
                                            row.customer,
                                            row.product,
                                            row.workerName,
                                            row.workerContact,
                                            row.startDate,
                                            row.endDate,
                                            row.weight,
                                            row.description,
                                            row.billNo,
                                            row.status
                                          )
                                        }
                                        size={24}
                                        style={{
                                          cursor: "pointer",
                                          color: "black",
                                        }}
                                      />
                                    )}
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
                                        deleteDetails={{ title: "ऑर्डर" }}
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
