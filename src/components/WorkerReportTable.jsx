import * as React from "react";
import Paper from "@mui/material/Paper";
import Link from "next/link";
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
import { getManufacturingByWorkerReportAsync, getWorkerReportAsync, getWorkerReportList, getYearlyManufacturingReportDataAsync, getYearlyReportList } from "../redux/slice/report/reportSlice";

const columns = [
    { id: "workerId", label: "Worker Id", minWidth: 50 },
    { id: "workerName", label: "Worker name", minWidth: 150 },
    { id: "email", label: "Email Id", minWidth: 200 },
    { id: "mobile", label: "Contact No", minWidth: 80 },
    { id: "manufacturingCount", label: "Manufacturing count", minWidth: 80 },
    { id: "totalBalance", label: "Total balance (in gm)", minWidth: 80 },
    { id: "address", label: "Address", minWidth: 150 },
    { id: "city", label: "City", minWidth: 80 },
    { id: "state", label: "State", minWidth: 80 },
    { id: "country", label: "Country", minWidth: 80 },
    { id: "state", label: "State", minWidth: 80 },
    { id: "zipcode", label: "Pin Code", minWidth: 60 },
];

const createData = (

    workerName,
    email,
    mobile,
    manufacturingCount,
    totalBalance,
    address,
    city,
    state,
    country,
    zipcode,
    workerId
) => {
    return {
        workerName,
        email,
        mobile,
        manufacturingCount,
        totalBalance,
        address,
        city,
        state,
        country,
        zipcode,
        workerId
    };
};

export default function WorkerReportTable() {
    const dispatch = useDispatch();
    const [page, setPage] = React.useState(0);
    const [rows, setRows] = React.useState([]);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const reportList = useSelector(getWorkerReportList);

    const handleWorkerReportData = (workerId) => {
        dispatch(getManufacturingByWorkerReportAsync(workerId));
    }

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
        dispatch(getWorkerReportAsync())
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
                    data.first_name + " " + data.last_name || "",
                    data.email || "",
                    data.mobile || "",
                    data.manufacturing_count || "",
                    data.total_balance || "",
                    data.address || "",
                    data.city || "",
                    data.state || "",
                    data.country || "",
                    data.zipcode || "",
                    data.id || ""
                );
                srNo = srNo + 1;
                return newRow;
            });

            setRows(newRows)
        }
    }, [reportList]);

    return (
        <div>
            <h1 className="text-2xl mx-4 mb-4 font-bold">Worker report</h1>
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
                                                        {column.id === "manufacturingCount" ? (
                                                            <div className="text-blue-500">
                                                                <Link href="/manufactureByWorkerReportData" onClick={() => handleWorkerReportData(row.workerId)}>{value}</Link>
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
