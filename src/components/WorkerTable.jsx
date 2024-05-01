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
import { MdEdit, MdDelete } from 'react-icons/md';
import { useDispatch, useSelector } from "react-redux";
import { deleteWorkerAsync, getWorkerAsync, getWorkerList, updateWorkerAsync } from "../redux/slice/worker/workerSlice";
import { deleteProductTypeAsync, getProductTypeAsync, getProductTypeList, updateProductTypeAsync } from "@/redux/slice/productType/productTypeSlice";
import EditFormWorker from "./EditFormWorker";
import DeleteOption from "./DeleteOption";

const columns = [
  { id: "srNo", label: "अनुक्रमांक", minWidth: 50 },
  { id: "firstName", label: "पहिला नाव", minWidth: 80 },
  { id: "lastName", label: "शेवटचा नाव", minWidth: 80 },
  { id: "email", label: "ईमेल", minWidth: 80 },
  { id: "mobile", label: "संपर्क क्रमांक", minWidth: 80 },
  { id: "address", label: "पत्ता", minWidth: 100 },
  { id: "city", label: "शहर", minWidth: 50 },
  { id: "state", label: "राज्य", minWidth: 100 },
  { id: "country", label: "देश", minWidth: 50 },
  { id: "zipcode", label: "पिन कोड", minWidth: 50 },
  { id: "actions", label: "", minWidth: 100 }
];

const createData = (srNo, id, firstName, lastName, email, mobile, zipcode, city, state, country, address, isActive) => {
  return {
    srNo, id, firstName, lastName, email, mobile, zipcode, city, state, country, address, isActive
  };
};

export default function ProductTypeTables() {
  const dispatch = useDispatch();
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastname] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [mobile, setMobile] = React.useState("");
  const [zipcode, setZipcode] = React.useState("");
  const [city, setCity] = React.useState("");
  const [state, setState] = React.useState("");
  const [country, setCountry] = React.useState("");
  const [address, setAddress] = React.useState("");

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [editedRow, setEditedRow] = React.useState(null);
  // const [edited, setEdited] = React.useState("");
  const [rows, setRows] = React.useState([]);
  const [selectedRowToDelete, setSelectedRowToDelete] = React.useState(null);
  const [openCategory, setOpenCategory] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [updateSuccess, setUpdateSuccess] = React.useState(false);

  const workerList = useSelector(getWorkerList);

  const handleUpdateWorker = (e, rowFirstName, rowLastName, rowEmail, rowMobile, rowAddress, rowCity, rowState, rowCountry, rowZipcode) => {
    e.preventDefault();
    const updatedFirstName = firstName !== "" ? firstName : rowFirstName;
    const updatedLastName = lastName !== "" ? lastName : rowLastName;
    const updatedEmail = email !== "" ? email : rowEmail;
    const updatedMobile = mobile !== "" ? mobile : rowMobile;
    const updatedAddress = address !== "" ? address : rowAddress;
    const updatedCity = city !== "" ? city : rowCity;
    const updatedState = state !== "" ? state : rowState;
    const updatedCountry = country !== "" ? country : rowCountry;
    const updatedZipcode = zipcode !== "" ? zipcode : rowZipcode;
    dispatch(updateWorkerAsync({ first_name: updatedFirstName, last_name: updatedLastName, email: updatedEmail, mobile: updatedMobile, address: updatedAddress, city: updatedCity, state: updatedState, country: updatedCountry, zipcode: updatedZipcode, is_active: true, workerId: editedRow })).then((result) => {
      if (updateWorkerAsync.fulfilled.match(result)) {
        dispatch(getWorkerAsync());
        setEditedRow(null);
        setFirstName("");
        setLastname("");
        setEmail("");
        setMobile("");
        setAddress("");
        setCity("");
        setState("");
        setCountry("");
        setZipcode("");

        setUpdateSuccess(true);
        setTimeout(() => {
          setUpdateSuccess(false);
        }, 3000)
      }
    });
  };

  const handleDelete = (selectedRowId) => {
    const workerId = selectedRowId;
    dispatch(deleteWorkerAsync(workerId)).then((result) => {
      if (deleteWorkerAsync.fulfilled.match(result)) {
        dispatch(getWorkerAsync());
      }
    })
  }

  //To open or close the category dropdown
  const handleCategory = (e) => {
    setOpenCategory(!openCategory);
  };

  //To save new category
  const handleOptionClick = (option) => {
    setCategory(option);
    setOpenCategory(!openCategory);
  };

  const handleEdit = (rowId, rowFirstName, rowLastName, rowEmail, rowMobile, rowZipcode, rowCity, rowState, rowCountry, rowAddress) => {
    setEditedRow(rowId);
    setFirstName(rowFirstName);
    setLastname(rowLastName);
    setEmail(rowEmail);
    setMobile(rowMobile);
    setZipcode(rowZipcode);
    setCity(rowCity);
    setState(rowState);
    setCountry(rowCountry);
    setAddress(rowAddress);
  }

  const handleCancel = () => {
    setEditedRow(null);
    setFirstName("");
    setLastname("");
    setEmail("");
    setMobile("");
    setAddress("");
    setCity("");
    setState("");
    setCountry("");
    setZipcode("");
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleDeletePopup = (selectedRowId) => {
    setSelectedRowToDelete(selectedRowId)
  }

  const handleDeleteCancel = () => {
    setSelectedRowToDelete(null);
  }

  const handleChangeRowsPerPage = (
    event
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const hideError = () => {
    setError(false);
  }

  const hideUpdateSuccess = () => {
    setUpdateSuccess(false);
  }

  React.useEffect(() => {
    dispatch(getWorkerAsync())
  }, [dispatch]);

  React.useEffect(() => {
    if (workerList && Array.isArray(workerList)) {
      let srNo = 1;
      const newRows = workerList.map((data) => {
        const newRow = createData(
          srNo,
          data.id,
          data.first_name || "",
          data.last_name || "",
          data.email || "",
          data.mobile || "",
          data.zipcode || "",
          data.city || "",
          data.state || "",
          data.country || "",
          data.address || "",
          data.is_active || ""
        );
        srNo = srNo + 1;
        return newRow;
      });
      setRows(newRows)
    }
  }, [workerList]);

  return (
    <>
      {updateSuccess && <div
        // className="bg-red-100 flex justify-between items-center border border-red-400 text-red-700 px-4 py-3 rounded relative"
        className="bg-blue-100 flex justify-between items-center border border-blue-400 text-blue-700 px-4 py-3 rounded fixed top-0 left-0 right-0"
        role="success"
        style={{ zIndex: 1001 }}
      >
        <strong className="font-bold">कामगारचे अपडेट पूर्ण झाले</strong>
        <button
          onClick={hideUpdateSuccess}
          className="relative top-0.5 bottom-0 left-1"
        >
          <span className="text-blue-500 text-2xl">×</span>
        </button>
      </div>}
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

                                {editedRow === row.id ? (
                                  <div className="space-x-2">
                                    <EditFormWorker firstName={firstName} setFirstName={setFirstName} lastName={lastName} setLastname={setLastname} email={email} setEmail={setEmail} mobile={mobile} setMobile={setMobile} zipcode={zipcode} setZipcode={setZipcode} city={city} setCity={setCity} state={state} setState={setState} country={country} setCountry={setCountry} address={address} setAddress={setAddress} handleUpdateWorker={handleUpdateWorker} isOpen={true} row={row} handleCancel={handleCancel} />
                                  </div>
                                ) : (
                                  <div className="space-x-7 flex">
                                    <MdEdit onClick={() => handleEdit(row.id, row.firstName, row.lastName, row.email, row.mobile, row.zipcode, row.city, row.state, row.country, row.address)} size={24} style={{ cursor: 'pointer', color: 'black' }} />

                                    <MdDelete onClick={() => handleDeletePopup(row.id)} size={24} style={{ cursor: 'pointer', color: 'red' }} />

                                    {selectedRowToDelete === row.id && <DeleteOption deleteDetails={{ title: "कामगार" }} rowId={row.id} isOpen={true} handleDelete={handleDelete} handleDeleteCancel={handleDeleteCancel} />}

                                  </div>
                                )}
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
    </>
  );
}
