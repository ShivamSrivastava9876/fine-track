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
import { getDailyManufacturingReportDataAsync, getDailyReportList, getWeeklyManufacturingReportDataAsync, getWeeklyReportList } from "../redux/slice/report/reportSlice";

const columns = [
    // { id: "HuId", label: "HU ID", minWidth: 80 },
    { id: "workerName", label: "Worker name", minWidth: 200 },
    { id: "productName", label: "Product name", minWidth: 200 },
    { id: "goldIssued", label: "Gold issued (in gm)", minWidth: 80 },
    { id: "goldWaste", label: "Gold waste (in gm)", minWidth: 80 },
    { id: "goldBalance", label: "Gold balance (in gm)", minWidth: 80 },
    { id: "goldReceived", label: "Gold received (in gm)", minWidth: 80 },
    // { id: "puritySpc", label: "Purity spc", minWidth: 100 },
    { id: "issuedDate", label: "Issued date", minWidth: 120 },
    { id: "receiveDate", label: "Received date", minWidth: 120 },
    // { id: "actions", label: "", minWidth: 150 },
];

const createData = (

    workerName,
    productName,
    goldIssued,
    goldWaste,
    goldBalance,
    goldReceived,
    issuedDate,
    receiveDate
) => {
    return {
        workerName,
        productName,
        goldIssued,
        goldWaste,
        goldBalance,
        goldReceived,
        issuedDate,
        receiveDate
    };
};

export default function WeeklyManufacturingDetailsTable() {
    const dispatch = useDispatch();
    const [page, setPage] = React.useState(0);
    const [rows, setRows] = React.useState([]);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const reportList = useSelector(getWeeklyReportList);

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
        dispatch(getWeeklyManufacturingReportDataAsync())
    }, [dispatch])

    React.useEffect(() => {
        if (reportList && Array.isArray(reportList)) {
            let srNo = 1;
            const newRows = reportList.map((data) => {
                // const date = data.order.order_date;

                // const newDate = new Date(date)
                // const formattedDate = newDate.toLocaleDateString('en-GB', {
                //     day: '2-digit',
                //     month: 'long',
                //     year: '2-digit',
                // });
                const newRow = createData(
                    data.worker.first_name + " " + data.worker.last_name || "",
                    data.product.product_name || "",
                    data.weight || "",
                    // formattedDate || "",
                    data.wastage_weight || "",
                    data.balance || "",
                    data.return_weight || "",
                    data.start_date || "",
                    data.end_date || ""
                );
                srNo = srNo + 1;
                return newRow;
            });

            setRows(newRows)
        }
    }, [reportList]);

    return (
        <div>
            <h1 className="text-2xl mx-4 mb-4 font-bold">Weekly manufacturing report</h1>
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
        </div>
    );
}