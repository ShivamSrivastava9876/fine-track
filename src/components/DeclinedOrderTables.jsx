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
import { getDeclinedOrderAsync, getDeclinedOrderData, getOrderList, getOrderListAsync } from "@/redux/slice/order/orderSlice";

const columns = [
  { id: "HuId", label: "HU ID", minWidth: 80 },
  { id: "productId", label: "Product ID", minWidth: 100 },
  { id: "product", label: "Product", minWidth: 150 },
  { id: "user", label: "User", minWidth: 200 },
  { id: "quantity", label: "Quantity", minWidth: 50 },
  { id: "puritySpc", label: "Purity spc", minWidth: 100 },
  { id: "price", label: "Product price", minWidth: 50 },
  { id: "total", label: "Total price", minWidth: 50 },
  // { id: "actions", label: "", minWidth: 150 },
];

const createData = (
  HuId,
  productId,
  product,
  user,
  quantity,
  puritySpc,
  price,
  total
) => {
  return {
    HuId,
    productId,
    product,
    user,
    quantity,
    puritySpc,
    price,
    total,
  };
};

export default function DeclinedOrderTables() {
  const dispatch = useDispatch();
  const [page, setPage] = React.useState(0);
  const [rows, setRows] = React.useState([]);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const orderList = useSelector(getDeclinedOrderData);

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
    console.log("declined order working")
    dispatch(getDeclinedOrderAsync())
  }, [dispatch])

  React.useEffect(() => {
    console.log("orderList", orderList);
    if (orderList && Array.isArray(orderList)) {
      let srNo = 1;
      const newRows = orderList.map((data) => {
        const newRow = createData(
          data.product.hu_id || "",
          data.product.product_id || "",
          data.product.product_name || "",
          data.order.user || "",
          data.quantity || "",
          data.product.purity_spec || "",
          data.price|| "",
          data.order.total_price  || ""
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
                        <TableCell key={column.id} align={column.align}>
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
