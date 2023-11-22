"use client";

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
import { selectUserData, userDetailsAsync } from "@/redux/slice/user/userSlice";

const createData = (srNo, userName, email, mobile) => {
  return { srNo, userName, email, mobile };
};

const columns = [
  { id: "srNo", label: "Sr no", minWidth: 100 },
  { id: "userName", label: "Name", minWidth: 250 },
  { id: "email", label: "Email", minWidth: 450 },
  { id: "mobile", label: "Mobile number", minWidth: 250 },
  { id: "actions", label: "", minWidth: 150 },
];

export default function UserTables() {
  const dispatch = useDispatch();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [rows, setRows] = React.useState([]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  React.useEffect(() => {
    dispatch(userDetailsAsync());
  }, [dispatch]);

  const userData = useSelector(selectUserData)[0];

  React.useEffect(() => {
    if (userData && Array.isArray(userData)) {
    const newRows = userData.map((data) => {
      return createData(
        data.id,
        data.first_name + " " + data.last_name || "",
        data.email || "",
        data.mobile || ""
      );
    });

    setRows(newRows)
  }
  }, [userData]);
  
  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }} className="w-full">
      <TableContainer sx={{ maxHeight: 440 }} className="font-Poppins">
        <Table stickyHeader aria-label="sticky table" className="font-Poppins">
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
                            // Edit and Delete buttons
                            <div className="space-x-2">
                              {/* <Button className="bg-blue-400 hover:bg-blue-600 text-white  py-2 px-4 rounded-md shadow-md hover:shadow-lg transition duration-300 ease-in-out">
                                Edit
                              </Button> */}
                              <Button className="bg-red-400 hover:bg-red-600 text-white  py-2 px-4 rounded-xl shadow-md hover:shadow-lg transition duration-300 ease-in-out">
                                Delete
                              </Button>
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
