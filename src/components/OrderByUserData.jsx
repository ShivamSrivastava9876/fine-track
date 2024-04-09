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
import { getConfirmOrderAsync, getConfirmOrderData } from "@/redux/slice/order/orderSlice";
import { getManufacturingByWorkerData, getOrderByUserData, getSelectedUserName, getSelectedWorkerName, getWorkerReportAsync, getWorkerReportList, getYearlyManufacturingReportDataAsync, getYearlyReportList } from "../redux/slice/report/reportSlice";

const columns = [
    // { id: "HuId", label: "HU ID", minWidth: 80 },
    { id: "productName", label: "Product name", minWidth: 150 },
    { id: "category", label: "Category", minWidth: 120 },
    { id: "productType", label: "Product type", minWidth: 120 },
    { id: "quantity", label: "Quantity", minWidth: 80 },
    { id: "price", label: "Price (in INR)", minWidth: 150 },
    { id: "orderDate", label: "Date of order placed", minWidth: 150 },
    { id: "orderStatus", label: "Order status", minWidth: 100 }
];

const createData = (
    user,
    productName,
    category,
    productType,
    quantity,
    price,
    orderDate,
    orderStatus,
    orderId
) => {
    return {
        user,
        productName,
        category,
        productType,
        quantity,
        price,
        orderDate,
        orderStatus,
        orderId
    };
};

export default function OrderByUserData() {
    const dispatch = useDispatch();
    const [page, setPage] = React.useState(0);
    const [rows, setRows] = React.useState([]);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const reportList = useSelector(getOrderByUserData);
    const selectedUserName = useSelector(getSelectedUserName);

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
        if (reportList && Array.isArray(reportList)) {
            let srNo = 1;
            const newRows = reportList.map((data) => {
                const date = data.created;

                const newDate = new Date(date)
                const formattedDate = newDate.toLocaleDateString('en-GB', {
                    day: '2-digit',
                    month: 'long',
                    year: '2-digit',
                });
                const newRow = createData(
                    data.user || "",
                    data.product.product_name || "",
                    data.product.category || "",
                    data.product.product_type || "",
                    data.quantity || "",
                    data.price || "",
                    formattedDate || "",
                    data.status || "",
                    data.order.id || ""
                );
                srNo = srNo + 1;
                return newRow;
            });

            setRows(newRows)
        }
    }, [reportList]);

    return (
        <div>
            <h1 className="text-xl mx-4 mb-4 font-bold text-gray-500">
                {selectedUserName.length !== 0 ? (
                    <span>User report of <span className="text-black">{selectedUserName}</span></span>
                ) : (
                    <span>There is no data to be displayed</span>
                )}
            </h1>
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
                                        className="font-poppins font-semibold"
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
        </div>
    );
}
