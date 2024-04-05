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
import { getLiveManufacturingOrderAsync, getLiveManufacturingOrderData, getOrderList, getOrderListAsync } from "@/redux/slice/order/orderSlice";

const columns = [
  { id: "id", label: "ID", minWidth: 50 },
  { id: "customer", label: "Customer", minWidth: 100 },
  { id: "product", label: "Product", minWidth: 150 },
  { id: "workerName", label: "Worker name", minWidth: 50 },
  { id: "workerContact", label: "Worker Contact", minWidth: 100 },
  { id: "startDate", label: "Start date", minWidth: 100 },
  { id: "endDate", label: "End date", minWidth: 100 },
  { id: "weight", label: "Weight", minWidth: 100 },
  // { id: "actions", label: "", minWidth: 150 },
];

const createData = (
  id,
  customer,
  product,
  workerName,
  workerContact,
  startDate,
  endDate,
  weight
) => {
  return {
    id,
    customer,
    product,
    workerName,
    workerContact,
    startDate,
    endDate,
    weight
  };
};

export default function LiveManufacturingOrderTables() {
  const dispatch = useDispatch();
  const [page, setPage] = React.useState(0);
  const [rows, setRows] = React.useState([]);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const orderList = useSelector(getLiveManufacturingOrderData);

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
    dispatch(getLiveManufacturingOrderAsync())
  }, [dispatch])

  React.useEffect(() => {
    if (orderList && Array.isArray(orderList)) {
      let srNo = 1;
      const newRows = orderList.map((data) => {
        const newRow = createData(
          data.id || "",
          data.customer || "",
          data.product || "",
          data.worker_name || "",
          data.worker_contact || "",
          data.start_date || "",
          data.end_date || "",
          data.weight || ""
        );
        srNo = srNo + 1;
        return newRow;
      });

      setRows(newRows)
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
                        <TableCell key={column.id} align={column.align} className=" font-poppins">
                          {column.id === "actions" ? (
                            // Render Edit and Delete buttons
                            <div className="space-x-2">

                              {/* <Button className="bg-red-400 hover:bg-red-600 text-white py-2 px-4 rounded-xl shadow-md hover:shadow-lg transition duration-300 ease-in-out">
                                Delete
                              </Button> */}
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
