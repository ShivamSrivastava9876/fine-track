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
import * as XLSX from 'xlsx'
import Image from "next/image";
import SearchIcon from "../../public/assets/Icons/searchIcon.svg";
import { getConfirmOrderAsync, getConfirmOrderData } from "@/redux/slice/order/orderSlice";
import { getManufacturingByWorkerData, getOrderByProductData, getOrderByProductReportAsync, getOrderByUserData, getProductReportAsync, getSelectedProductName, getSelectedUserName, getWorkerReportAsync, getWorkerReportList, getYearlyManufacturingReportDataAsync, getYearlyReportList, searchOrderByProductReportAsync } from "../redux/slice/report/reportSlice";
import { useRouter } from "next/router";

const columns = [
    // { id: "HuId", label: "HU ID", minWidth: 80 },
    // { id: "productName", label: "Product name", minWidth: 150 },
    { id: "category", label: "कैटेगरी", minWidth: 120 },
    { id: "productType", label: "प्रोडक्टचा प्रकार", minWidth: 120 },
    { id: "quantity", label: "प्रमाण", minWidth: 80 },
    { id: "price", label: "किमत (₹)", minWidth: 150 },
    { id: "orderDate", label: "ऑर्डरची तारीख", minWidth: 150 },
    { id: "orderStatus", label: "स्टेटस", minWidth: 100 }
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
    const [searchParameter, setSearchParameter] = React.useState("");

    const reportList = useSelector(getOrderByProductData);
    const selectedProductName = useSelector(getSelectedProductName);

    const router = useRouter();
    React.useEffect(() => {
        if (router.query.productId) {
            dispatch(getOrderByProductReportAsync(router.query.productId));
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

    const handleSearchParameter = (searchParameter) => {
        setSearchParameter(searchParameter);
    }

    const handleDownload = () => {
        downloadExcel(rows);
    }

    const downloadExcel = (data) => {
        const workbook = XLSX.utils.book_new();
        const worksheet = XLSX.utils.json_to_sheet(data);
        XLSX.utils.book_append_sheet(workbook, worksheet, "OrderByProductReport");
        XLSX.writeFile(workbook, "order_by_product_report.xlsx");
    }

    const handleUserReportSearch = (e) => {
        e.preventDefault();
        dispatch(searchOrderByProductReportAsync({ productId: router.query.productId, data: searchParameter })).then((result) => {
            if (searchOrderByProductReportAsync.fulfilled.match(result)) {
                // setSearchParameter("");
            }
        })
    }

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
                    data.order?.id || ""
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
                <h1 className="text-xl mx-4 mb-4 font-bold text-gray-500">
                    {selectedProductName.length !== 0 ? (<span><span className=" text-black ">{selectedProductName}</span> चा प्रोडक्ट अहवाल</span>) : (
                        <span>प्रोडक्ट अहवाल</span>
                    )}
                </h1>
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
                    <form onSubmit={(e) => handleUserReportSearch(e)} className="flex items-center m-2 md:w-80 border-2 border-solid border-gray-300 rounded-full px-4 py-2">
                        <input
                            type="search"
                            placeholder="शोधा"
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
                {selectedProductName.length === 0 && (<div className="text-black font-semibold text-base mx-4 mt-2 flex justify-center">माहिती उपलब्ध नाही</div>)}
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
