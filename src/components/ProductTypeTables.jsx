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
import { deleteProductTypeAsync, getProductTypeAsync, getProductTypeList, updateProductTypeAsync } from "@/redux/slice/productType/productTypeSlice";
import EditFormProductType from "./EditFormProductType";
import DeleteOption from "./DeleteOption";

const columns = [
  { id: "srNo", label: "Sr No", minWidth: 80 },
  { id: "category", label: "Category", minWidth: 100 },
  { id: "productType", label: "Product type", minWidth: 600 },
  { id: "actions", label: "", minWidth: 100 }
];

const createData = (srNo, id, category, productType, image) => {
  return {
    srNo, id, category, productType, image
  };
};

export default function ProductTypeTables() {
  const dispatch = useDispatch();
  const [category, setCategory] = React.useState("");
  const [productType, setProductType] = React.useState("");
  const [image, setImage] = React.useState(null);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [editedRow, setEditedRow] = React.useState(null);
  // const [edited, setEdited] = React.useState("");
  const [rows, setRows] = React.useState([]);
  const [selectedRowToDelete, setSelectedRowToDelete] = React.useState(null);
  const [openCategory, setOpenCategory] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [updateSuccess, setUpdateSuccess] = React.useState(false);

  const productTypeList = useSelector(getProductTypeList);

  const handleUpdateProductType = (e, rowProductType, rowCategory) => {
    e.preventDefault();
    const updatedCategory = category !== "" ? category : rowCategory;
    const updatedProductType = productType !== "" ? productType : rowProductType;
    dispatch(updateProductTypeAsync({ category: updatedCategory, product_type: updatedProductType, image: image, productTypeId: editedRow })).then((result) => {
      if (updateProductTypeAsync.fulfilled.match(result)) {
        dispatch(getProductTypeAsync());
        setCategory("");
        setProductType("");
        setImage(null);
        setEditedRow(null);
        setUpdateSuccess(true);
        setTimeout(() => {
          setUpdateSuccess(false);
        }, 3000)
      }
    });
  };

  const handleDelete = (selectedRowId) => {
    const productTypeId = selectedRowId;
    dispatch(deleteProductTypeAsync(productTypeId)).then((result) => {
      if (deleteProductTypeAsync.fulfilled.match(result)) {
        dispatch(getProductTypeAsync());
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

  const handleEdit = (rowId, rowCategory, rowProductType, rowImage) => {
    setEditedRow(rowId);
    // setCategory(rowCategory);
    setProductType(rowProductType);
    setImage(rowImage);
  }

  const handleCancel = () => {
    setCategory("");
    setProductType("");
    setImage(null);
    setEditedRow(null);
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
    dispatch(getProductTypeAsync())
  }, [dispatch]);

  React.useEffect(() => {
    if (productTypeList && Array.isArray(productTypeList)) {
      let srNo = 1;
      const newRows = productTypeList.map((data) => {
        const newRow = createData(
          srNo,
          data.id,
          data.category || "",
          data.product_type || "",
          data.image
        );
        srNo = srNo + 1;
        return newRow;
      });
      setRows(newRows)
    }
  }, [productTypeList]);

  return (
    <>
      {updateSuccess && <div
        // className="bg-red-100 flex justify-between items-center border border-red-400 text-red-700 px-4 py-3 rounded relative"
        className="bg-blue-100 flex justify-between items-center border border-blue-400 text-blue-700 px-4 py-3 rounded fixed top-0 left-0 right-0"
        role="success"
        style={{ zIndex: 1001 }}
      >
        <strong className="font-bold">Product type updated successfully</strong>
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
                                    <EditFormProductType image={image} openCategory={openCategory} handleCategory={handleCategory} handleOptionClick={handleOptionClick} handleUpdateProductType={handleUpdateProductType} isOpen={true} row={row} category={category} productType={productType} handleCancel={handleCancel} setProductType={setProductType} setImage={setImage} />
                                  </div>
                                ) : (
                                  <div className="space-x-7 flex">
                                    {/* <Button onClick={() => handleEdit(row.id, row.category)} className="bg-blue-500 hover:bg-blue-800 active:bg-blue-800 border border-black text-white rounded">
                                    Edit
                                  </Button> */}
                                    <MdEdit onClick={() => handleEdit(row.id, row.category, row.productType, row.image)} size={24} style={{ cursor: 'pointer', color: 'black' }} />

                                    {/* <Button onClick={() => handleDeletePopup(row.id)} className="bg-red-500 hover:bg-red-700 active:bg-red-700 border border-black text-white rounded">
                                    Delete
                                  </Button> */}
                                    <MdDelete onClick={() => handleDeletePopup(row.id)} size={24} style={{ cursor: 'pointer', color: 'red' }} />

                                    {selectedRowToDelete === row.id && <DeleteOption deleteDetails={{ title: "product type" }} rowId={row.id} isOpen={true} handleDelete={handleDelete} handleDeleteCancel={handleDeleteCancel} />}

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
