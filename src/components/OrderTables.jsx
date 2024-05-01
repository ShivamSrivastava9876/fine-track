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
import { MdAdd, MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteOrderAsync,
  getOrderList,
  getOrderListAsync,
} from "@/redux/slice/order/orderSlice";
import CreateManufacturingOrder from "./CreateManufacturingOrder";
import DeleteOption from "./DeleteOption";

const columns = [
  { id: "srNo", label: "अनुक्रमांक", minWidth: 50 },
  { id: "product", label: "प्रोडक्ट", minWidth: 100 },
  { id: "customer", label: "ग्राहक", minWidth: 100 },
  { id: "prevBalanceFine", label: "मागील शिल्लक फाइन (ग्राम)", minWidth: 50 },
  { id: "goldRate", label: "सोन्याचा दर 24 कैरेट प्रति ग्राम", minWidth: 40 },
  { id: "weight", label: "वजन (ग्राम)", minWidth: 40 },
  { id: "size", label: "माप", minWidth: 40 },
  { id: "quantity", label: "प्रमाण", minWidth: 40 },
  { id: "fineRequired", label: "एकूण फाइन आवश्यक (ग्राम)", minWidth: 40 },
  {
    id: "receivedFine",
    label: "ग्राहकपासून आलेला फाइन (ग्राम)",
    minWidth: 40,
  },
  {
    id: "remainingCash",
    label: "रक्कम भरावी लागेल (₹)",
    minWidth: 40,
  },
  {
    id: "receivedCash",
    label: "ग्राहकपासून मिळालेला रक्कम (₹)",
    minWidth: 40,
  },
  { id: "makingCharges", label: "तयार करण्याचे रक्कम (₹)", minWidth: 40 },
  { id: "balancePending", label: "बाकी रक्कम (₹)", minWidth: 40 },
  { id: "dateOfOrderPlaced", label: "ऑर्डर दिल्याची तारीख", minWidth: 60 },
  // { id: "status", label: "Status", minWidth: 100 },
  { id: "actions", label: "", minWidth: 100 },
];

const createData = (
  srNo,
  id,
  product,
  customer,
  prevBalanceFine,
  goldRate,
  weight,
  size,
  quantity,
  fineRequired,
  receivedFine,
  remainingCash,
  receivedCash,
  makingCharges,
  balancePending,
  dateOfOrderPlaced
) => {
  return {
    srNo,
    id,
    product,
    customer,
    prevBalanceFine,
    goldRate,
    weight,
    size,
    quantity,
    fineRequired,
    receivedFine,
    remainingCash,
    receivedCash,
    makingCharges,
    balancePending,
    dateOfOrderPlaced,
  };
};

export default function OrderTables() {
  const dispatch = useDispatch();

  const [selectedProduct, setSelectedProduct] = React.useState("");
  const [selectedCustomer, setSelectedCustomer] = React.useState("");
  const [goldRate, setGoldRate] = React.useState("");
  const [weight, setWeight] = React.useState("");
  const [size, setSize] = React.useState("");
  const [quantity, setQuantity] = React.useState("");
  const [totalFine, setTotalFine] = React.useState("");
  const [receivedFineFromCustomer, setReceivedFineFromCustomer] =
    React.useState("");
  const [remainingCash, setRemainingCash] = React.useState("");
  const [receivedCashFromCustomer, setReceivedCashFromCustomer] =
    React.useState("");
  const [makingCharges, setMakingCharges] = React.useState("");
  const [balancePending, setBalancePending] = React.useState("");
  const [remark, setRemark] = React.useState("");

  const [page, setPage] = React.useState(0);
  const [rows, setRows] = React.useState([]);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [editedRow, setEditedRow] = React.useState(null);
  const [selectedRowToDelete, setSelectedRowToDelete] = React.useState(null);

  const orderList = useSelector(getOrderList);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleDelete = (selectedRowId) => {
    const orderId = selectedRowId;
    dispatch(deleteOrderAsync(orderId)).then((result) => {
      if (deleteOrderAsync.fulfilled.match(result)) {
        dispatch(getOrderListAsync());
      }
    });
  };

  const handleDeletePopup = (selectedRowId) => {
    console.log("selectedRowId", selectedRowId);
    setSelectedRowToDelete(selectedRowId);
  };

  const handleDeleteCancel = () => {
    setSelectedRowToDelete(null);
  };

  const handleEdit = (rowId, row) => {
    setEditedRow(rowId);
  };

  const handleCancel = () => {
    setEditedRow(null);
  };

  

  React.useEffect(() => {
    dispatch(getOrderListAsync());
  }, [dispatch]);

  React.useEffect(() => {
    if (orderList && Array.isArray(orderList)) {
      let srNo = 1;
      const newRows = orderList.map((data) => {
        const date = data.created;

        const newDate = new Date(date);
        const formattedDate = newDate.toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "long",
          year: "2-digit",
        });
        const newRow = createData(
          srNo,
          data.id || "",
          data.product || "",
          data.customer || "",
          data.previous_balance_fine || 0,
          data.today_gold_rate || "",
          data.metal_weight || "",
          data.size || "",
          data.quantity || "",
          data.fine_required || "",
          data.received_fine || "",
          data.remainig_cash_required || "",
          data.received_cash || "",
          data.making_charges || "",
          data.pending_balance || "",
          formattedDate || ""
          // data.status || "",
        );
        srNo = srNo + 1;
        return newRow;
      });

      setRows(newRows);
    }
  }, [orderList]);

  return (
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
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.srNo}>
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
                                  <CreateManufacturingOrder // This will change for edit form where worker is to be added
                                    row={row}
                                    isOpen={true}
                                    handleCancel={handleCancel}
                                  />
                                </div>
                              ) : (
                                <div className="space-x-7 flex">
                                  <MdAdd
                                    onClick={() => handleEdit(row.id, row)}
                                    size={24}
                                    style={{
                                      cursor: "pointer",
                                      color: "black",
                                    }}
                                  />

                                  <MdDelete
                                    onClick={() =>
                                      handleDeletePopup(row.orderId)
                                    }
                                    size={24}
                                    style={{ cursor: "pointer", color: "red" }}
                                  />
                                  {selectedRowToDelete === row.orderId && (
                                    <DeleteOption
                                      deleteDetails={{
                                        title: "ऑर्डर",
                                      }}
                                      rowId={row.orderId}
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
  );
}
