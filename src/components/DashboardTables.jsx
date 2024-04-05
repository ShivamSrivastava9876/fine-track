"use client"

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
import { approveOrderAsync, declineOrderAsync, getApprovalList, getApproveListAsync, getDashboardDetailsAsync } from "@/redux/slice/order/orderSlice";

const columns = [
  { id: "srNo", label: "Sr No", minWidth: 80 },
  { id: "productName", label: "Product name", minWidth: 250 },
  { id: "quantity", label: "Quantity", minWidth: 80 },
  { id: "price", label: "Price", minWidth: 80 },
  { id: "total", label: "Total", minWidth: 250 },
  { id: "actions", label: "", minWidth: 200 },
];

const createData = (
  srNo,
  productName,
  quantity,
  price,
  total,
  id
) => {
  return { srNo, productName, quantity, price, total, id };
};

export default function DashboardTables() {
  const dispatch = useDispatch();
  const [page, setPage] = React.useState(0);
  const [rows, setRows] = React.useState([]);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const approvalList = useSelector(getApprovalList);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  React.useEffect(() => {
    dispatch(getApproveListAsync())
  }, [dispatch]);

  React.useEffect(() => {
    if (approvalList && Array.isArray(approvalList)) {
      let srNo = 1;
      const newRows = approvalList.map((data) => {
        const newRow = createData(
          srNo,
          data.product.product_name || "",
          data.quantity || "",
          data.price || "",
          data.order.total_price || "",
          data.id,
        );
        srNo = srNo + 1;
        return newRow;
      });

      setRows(newRows)
    }
  }, [approvalList]);

  const handleApprove = (orderId) => {
    dispatch(approveOrderAsync({ orderId: orderId, orderInfo: { "status": "approved" } })).then((result) => {
      if (approveOrderAsync.fulfilled.match(result)) {
        dispatch(getApproveListAsync());
        dispatch(getDashboardDetailsAsync());
      }
    })
  }

  const handleCancel = (orderId) => {
    dispatch(declineOrderAsync({ orderId: orderId, orderInfo: { "status": "decline" } })).then((result) => {
      if (declineOrderAsync.fulfilled.match(result)) {
        dispatch(getApproveListAsync());
        dispatch(getDashboardDetailsAsync());
      }
    })
  }

  return (
    <>
    <h1 className="my-2 font-bold">New orders</h1>
    <Paper sx={{ width: "100%", overflow: "hidden" }} className="w-full my-4">
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
                        <TableCell key={column.id} align={column.align} className=" font-poppins">
                          {column.id === "actions" ? (
                            // Render Edit and Delete buttons
                            <div className="space-x-2 flex">
                              <Button onClick={() => handleApprove(row.id)} className="bg-orange-400 hover:bg-orange-600 text-white py-2 px-4 rounded-full shadow-md hover:shadow-lg transition duration-300 ease-in-out">
                                Approve
                              </Button>
                              <Button onClick={() => handleCancel(row.id)} className="bg-red-400 hover:bg-red-600 text-white py-2 px-4 rounded-full shadow-md hover:shadow-lg transition duration-300 ease-in-out">
                                Decline
                              </Button>
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
