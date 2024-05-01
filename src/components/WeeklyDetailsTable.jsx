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
import { getWeeklyReportDataAsync, getWeeklyReportList, searchWeeklyOrderReportAsync } from "../redux/slice/report/reportSlice";

const columns = [
  { id: "srNo", label: "अनुक्रमांक", minWidth: 50 },
  { id: "product", label: "प्रोडक्ट", minWidth: 100 },
  { id: "customer", label: "ग्राहक", minWidth: 100 },
  { id: "prevBalanceFine", label: "मागविण्याचा शिल्लक (ग्राम)", minWidth: 50 },
  { id: "goldRate", label: "सोन्याचा दर 24 कैरेट प्रति ग्राम", minWidth: 40 },
  { id: "weight", label: "वजन (ग्राम)", minWidth: 40 },
  { id: "size", label: "माप", minWidth: 40 },
  { id: "quantity", label: "प्रमाण", minWidth: 40 },
  { id: "fineRequired", label: "एकूण शिल्लक आवश्यक (ग्राम)", minWidth: 40 },
  {
    id: "receivedFine",
    label: "ग्राहकपासून आलेला शिल्लक (ग्राम)",
    minWidth: 40,
  },
  {
    id: "remainingCash",
    label: "रक्कम भरावी लागेल (₹)",
    minWidth: 40,
  },
  {
    id: "receivedCash",
    label: "ग्राहकपासून मिळालेला रक्कम (₹)",
    minWidth: 40,
  },
  { id: "makingCharges", label: "तयार करण्याचे रक्कम (₹)", minWidth: 40 },
  { id: "balancePending", label: "बाकी रक्कम (₹)", minWidth: 40 },
  { id: "dateOfOrderPlaced", label: "ऑर्डर दिल्याची तारीख", minWidth: 60 },
  { id: "status", label: "स्टेटस", minWidth: 100 },
  // { id: "actions", label: "", minWidth: 100 },
];

const createData = (
  srNo,
  orderId,
  product,
  customer,
  prevBalanceFine,
  goldRate,
  weight,
  size,
  quantity,
  fineRequired,
  receivedFine,
  remainingCash,
  receivedCash,
  makingCharges,
  balancePending,
  dateOfOrderPlaced,
  status
) => {
  return {
    srNo,
    orderId,
    product,
    customer,
    prevBalanceFine,
    goldRate,
    weight,
    size,
    quantity,
    fineRequired,
    receivedFine,
    remainingCash,
    receivedCash,
    makingCharges,
    balancePending,
    dateOfOrderPlaced,
    status
  };
};

export default function WeeklyDetailsTables() {
  const dispatch = useDispatch();
  const [page, setPage] = React.useState(0);
  const [rows, setRows] = React.useState([]);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [searchParameter, setSearchParameter] = React.useState("");

  const orderList = useSelector(getWeeklyReportList);

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

  const handleWeeklyOrderReportSearch = (e) => {
    e.preventDefault();
    dispatch(searchWeeklyOrderReportAsync(searchParameter)).then((result) => {
      if (searchWeeklyOrderReportAsync.fulfilled.match(result)) {
        // setSearchParameter("");
      }
    })
  }

  const handleDownload = () => {
    downloadExcel(rows);
  }

  const downloadExcel = (data) => {
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(data);
    XLSX.utils.book_append_sheet(workbook, worksheet, "WeeklyOrderReport");
    XLSX.writeFile(workbook, "weekly_order_report.xlsx");
  }


  React.useEffect(() => {
    dispatch(getWeeklyReportDataAsync())
  }, [dispatch])

  React.useEffect(() => {
    if (orderList && Array.isArray(orderList)) {
      let srNo = 1;
      const newRows = orderList.map((data) => {
        const date = data.created;

        const newDate = new Date(date);
        const formattedDate = newDate.toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "long",
          year: "2-digit",
        });
        const newRow = createData(
          srNo,
          data.id || "",
          data.product.product_name || "",
          data.customer.full_name || "",
          data.previous_balance_fine || 0,
          data.today_gold_rate || "",
          data.metal_weight || "",
          data.size || "",
          data.quantity || "",
          data.fine_required || "",
          data.received_fine || "",
          data.remainig_cash_required || "",
          data.received_cash || "",
          data.making_charges || "",
          data.pending_balance || "",
          formattedDate || "",
          data.status || "",
        );
        srNo = srNo + 1;
        return newRow;
      });

      setRows(newRows);
    }
  }, [orderList]);

  return (
    <div>
      <div className="flex items-center justify-between flex-wrap w-full mb-4">

        <h1 className="text-2xl mx-4 mb-4 font-bold">साप्ताहिक ऑर्डर अहवाल</h1>
        <div className="flex flex-wrap">
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
          <form onSubmit={(e) => handleWeeklyOrderReportSearch(e)} className="flex items-center m-2 md:w-80 border-2 border-solid border-gray-300 rounded-full px-4 py-2">
            <input
              type="search"
              placeholder="शोधा"
              value={searchParameter}
              onChange={(e) => handleSearchParameter(e.target.value)}
              className="w-full h-full outline-none bg-transparent text-blue-gray-700"
            />
            <div className="ml-2">
              <Image
                onClick={handleWeeklyOrderReportSearch}
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
