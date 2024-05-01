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
import Image from "next/image";
import SearchIcon from "../../public/assets/Icons/searchIcon.svg";
import Button from "@mui/material/Button";
import * as XLSX from 'xlsx'
import { useDispatch, useSelector } from "react-redux";
import { getConfirmOrderAsync, getConfirmOrderData } from "@/redux/slice/order/orderSlice";
import { getManufacturingByWorkerReportAsync, getWorkerReportAsync, getWorkerReportList, getYearlyManufacturingReportDataAsync, getYearlyReportList, searchWorkerReportAsync } from "../redux/slice/report/reportSlice";

const columns = [
    { id: "workerId", label: "कामगारची आयडी", minWidth: 50 },
    { id: "workerName", label: "कामगाराचे नाव", minWidth: 150 },
    { id: "email", label: "ईमेल", minWidth: 200 },
    { id: "mobile", label: "संपर्क क्रमांक", minWidth: 80 },
    { id: "manufacturingCount", label: "उत्पादन मोजणी", minWidth: 80 },
    { id: "totalBalance", label: "एकूण शिल्लक (ग्राम)", minWidth: 80 },
    { id: "address", label: "पता", minWidth: 150 },
    { id: "city", label: "शहर", minWidth: 80 },
    { id: "zipcode", label: "पिन कोड", minWidth: 60 },
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
    const [searchParameter, setSearchParameter] = React.useState("");

    const reportList = useSelector(getWorkerReportList);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (
        event
    ) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleSearchParameter = (searchParameter) => {
        setSearchParameter(searchParameter);
    }

    const handleDownload = () => {
        downloadExcel(rows);
    }

    const downloadExcel = (data) => {
        const workbook = XLSX.utils.book_new();
        const worksheet = XLSX.utils.json_to_sheet(data);
        XLSX.utils.book_append_sheet(workbook, worksheet, "WorkerReport");
        XLSX.writeFile(workbook, "worker_report.xlsx");
    }

    const handleWorkerReportSearch = (e) => {
        e.preventDefault();
        dispatch(searchWorkerReportAsync(searchParameter)).then((result) => {
            if (searchWorkerReportAsync.fulfilled.match(result)) {
                // setSearchParameter("");
            }
        })
    }

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
            <div className="flex items-center justify-between flex-wrap w-full mb-4">
                <h1 className="text-2xl mx-4 mb-1 font-bold">कामगार अहवाल</h1>
                {/* Right-hand side Search Box */}
                <div className="flex flex-wrap">
                    {/* <Button className="hover:underline hover:bg-blue-200 underline p-0 text-sm right-0 font-semibold font-poppins" style={{ textTransform: 'none' }} onClick={handleDownload}>Download report</Button> */}
                    <button
                        className={`flex items-center m-2 md:w-52 border-2 border-solid bg-[#DB8A4D] font-semibold rounded-full px-4 py-2`}
                        onClick={handleDownload}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-6 h-6 mr-2"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                            <polyline points="7 10 12 15 17 10" />
                            <line x1="12" y1="15" x2="12" y2="3" />
                        </svg>
                        डाउनलोड अहवाल
                    </button>
                    <form onSubmit={(e) => handleWorkerReportSearch(e)} className="flex items-center m-2 md:w-80 border-2 border-solid border-gray-300 rounded-full px-4 py-2">
                        <input
                            type="search"
                            placeholder="शोधा"
                            value={searchParameter}
                            onChange={(e) => handleSearchParameter(e.target.value)}
                            className="w-full h-full outline-none bg-transparent text-blue-gray-700"
                        />
                        <div className="ml-2">
                            <Image
                                onClick={handleWorkerReportSearch}
                                src={SearchIcon}
                                alt="search-icon"
                                className="cursor-pointer"
                            />
                        </div>
                    </form>
                </div>
            </div>
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
                                                            <div className="text-blue-500 font-semibold">
                                                                <Link href={`/manufactureByWorkerReportData/${row.workerId}`}>{value || "0"}</Link>
                                                            </div>
                                                        ) : // Render other columns
                                                            column.format && typeof value === "number" ? (
                                                                column.format(value)
                                                            ) : (
                                                                value || "0"
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
