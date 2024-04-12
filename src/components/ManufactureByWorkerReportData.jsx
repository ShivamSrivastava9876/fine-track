// "use client"

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
import { getManufacturingByWorkerData, getManufacturingByWorkerReportAsync, getSelectedWorkerName, getWorkerReportAsync, getWorkerReportList, getYearlyManufacturingReportDataAsync, getYearlyReportList } from "../redux/slice/report/reportSlice";
import { useParams, useSearchParams } from "next/navigation";
import { useRouter } from "next/router";

const columns = [
    // { id: "HuId", label: "HU ID", minWidth: 80 },
    { id: "customerName", label: "Customer name", minWidth: 150 },
    { id: "productName", label: "Product name", minWidth: 200 },
    { id: "issuedWeight", label: "Issued gold weight (in gm)", minWidth: 80 },
    { id: "wastageWeight", label: "Wastage weight (in gm)", minWidth: 80 },
    { id: "productWeight", label: "Product weight (in gm)", minWidth: 80 },
    { id: "balanceWeight", label: "Balance weight (in gm)", minWidth: 150 },
    { id: "issuedDate", label: "Issued date", minWidth: 80 },
    { id: "receivedDate", label: "Received date", minWidth: 80 }
];

const createData = (
    customerName,
    productName,
    issuedWeight,
    wastageWeight,
    productWeight,
    balanceWeight,
    issuedDate,
    receivedDate,
    workerName
) => {
    return {
        customerName,
        productName,
        issuedWeight,
        wastageWeight,
        productWeight,
        balanceWeight,
        issuedDate,
        receivedDate,
        workerName
    };
};

export default function ManufactureByWorkerReportData() {
    const dispatch = useDispatch();
    const [page, setPage] = React.useState(0);
    const [rows, setRows] = React.useState([]);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const reportList = useSelector(getManufacturingByWorkerData);
    const selectedWorkerName = useSelector(getSelectedWorkerName);

    const router = useRouter();
    React.useEffect(() => {
        if(router.query.workerId){
            dispatch(getManufacturingByWorkerReportAsync(router.query.workerId));
        }
        
    }, [dispatch, router])


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
                    data.customer.first_name + " " + data.customer.last_name || "",
                    data.product.product_name || "",
                    data.weight || "",
                    data.wastage_weight || "",
                    data.product_weight || "",
                    data.balance || "",
                    data.start_date || "",
                    data.end_date || "",
                    data.worker.first_name + " " + data.worker.last_name || ""
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
                {selectedWorkerName.length !== 0 ? (<span>Worker report of <span className=" text-black ">{selectedWorkerName}</span></span>) : (
                    <span>Worker report</span>
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
                {selectedWorkerName.length === 0 && (<div className="text-black font-semibold text-base mx-4 mt-2 flex justify-center">No data found</div>)}
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
