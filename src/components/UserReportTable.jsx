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
import { useDispatch, useSelector } from "react-redux";
import { getConfirmOrderAsync, getConfirmOrderData } from "@/redux/slice/order/orderSlice";
import { getManufacturingByWorkerReportAsync, getOrderByUserReportAsync, getUserReportAsync, getUserReportList, getWorkerReportAsync, getWorkerReportList, getYearlyManufacturingReportDataAsync, getYearlyReportList, searchUserReportAsync } from "../redux/slice/report/reportSlice";

const columns = [
    { id: "userId", label: "User Id", minWidth: 50 },
    { id: "userName", label: "User name", minWidth: 150 },
    { id: "email", label: "Email Id", minWidth: 200 },
    { id: "mobile", label: "Contact No", minWidth: 100 },
    { id: "orderCount", label: "Number of orders", minWidth: 100 }
];

const createData = (
    userName,
    email,
    mobile,
    orderCount,
    userId
) => {
    return {
        userName,
        email,
        mobile,
        orderCount,
        userId
    };
};

export default function UserReportTable() {
    const dispatch = useDispatch();
    const [page, setPage] = React.useState(0);
    const [rows, setRows] = React.useState([]);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [searchParameter, setSearchParameter] = React.useState("");

    const reportList = useSelector(getUserReportList);

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

    const handleUserReportSearch = (e) => {
        e.preventDefault();
        dispatch(searchUserReportAsync(searchParameter)).then((result) => {
            if (searchUserReportAsync.fulfilled.match(result)) {
                // setSearchParameter("");
            }
        })
    }

    React.useEffect(() => {
        dispatch(getUserReportAsync())
    }, [dispatch])

    React.useEffect(() => {
        if (reportList && Array.isArray(reportList)) {
            let srNo = 1;
            const newRows = reportList.map((data) => {

                const newRow = createData(
                    data.first_name + " " + data.last_name || "",
                    data.email || "",
                    data.mobile || "",
                    data.order_count || "",
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
                <h1 className="text-2xl mx-4 mb-1 font-bold">User report</h1>
                {/* Right-hand side Search Box */}
                <form onSubmit={(e) => handleUserReportSearch(e)} className="flex items-center m-2 md:w-80 border-2 border-solid border-gray-300 rounded-full px-4 py-2">
                    <input
                        type="search"
                        placeholder="Search"
                        value={searchParameter}
                        onChange={(e) => handleSearchParameter(e.target.value)}
                        className="w-full h-full outline-none bg-transparent text-blue-gray-700"
                    />
                    <div className="ml-2">
                        <Image
                            onClick={handleUserReportSearch}
                            src={SearchIcon}
                            alt="search-icon"
                            className="cursor-pointer"
                        />
                    </div>
                </form>
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
                                                        {column.id === "orderCount" ? (
                                                            <div className="text-blue-500 font-semibold">
                                                                <Link href={`/orderByUserData/${row.userId}`}>{value || "0"}</Link>
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
