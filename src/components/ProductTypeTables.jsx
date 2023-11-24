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
import { deleteProductTypeAsync, getProductTypeAsync, getProductTypeList, updateProductTypeAsync } from "@/redux/slice/productType/productTypeSlice";
import EditFormProductType from "./EditFormProductType";
import DeleteOption from "./DeleteOption";

const columns = [
  { id: "srNo", label: "Sr No", minWidth: 80 },
  { id: "category", label: "Category", minWidth: 100 },
  { id: "productType", label: "Product type", minWidth: 600 },
  { id: "actions", label: "", minWidth: 100 }
];

const createData = (srNo, id, category, productType) => {
  return {
    srNo, id, category, productType
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


  const productTypeList = useSelector(getProductTypeList);

  const handleUpdateProductType = (e, rowProductType, rowCategory) => {
    e.preventDefault();
    console.log(category, productType, image, editedRow);
    const updatedCategory = category !== "" ? category : rowCategory;
    const updatedProductType = productType !== "" ? productType : rowProductType;
    dispatch(updateProductTypeAsync({ category: updatedCategory, product_type: updatedProductType, image: image, productTypeId: editedRow })).then((result) => {
      if (updateProductTypeAsync.fulfilled.match(result)) {
        dispatch(getProductTypeAsync());
        setCategory("");
        setProductType("");
        setImage(null);
        setEditedRow(null);
      }
    });
  };

  const handleDelete = (selectedRowId) => {
    console.log("select", selectedRowId)
    const productTypeId = selectedRowId;
    dispatch(deleteProductTypeAsync(productTypeId)).then((result) => {
      if (deleteProductTypeAsync.fulfilled.match(result)) {
        dispatch(getProductTypeAsync());
      }
    })
  }

  //To open or close the category dropdown
  const handleCategory = (e) => {
    console.log(e);
    setOpenCategory(!openCategory);
  };

  //To save new category
  const handleOptionClick = (option) => {
    setCategory(option);
    setOpenCategory(!openCategory);
  };

  const handleEdit = (rowId, rowCategory) => {
    setEditedRow(rowId);
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
          data.product_type || ""
        );
        srNo = srNo + 1;
        return newRow;
      });
      console.log(rows);
      setRows(newRows)
    }
  }, [productTypeList]);

  return (
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
                            // Render Edit and Delete buttons
                            <div className="space-x-2">

                              {editedRow === row.id ? (
                                <div className="space-x-2">
                                  <EditFormProductType openCategory={openCategory} handleCategory={handleCategory} handleOptionClick={handleOptionClick} handleUpdateProductType={handleUpdateProductType} isOpen={true} row={row} category={category} productType={productType} handleCancel={handleCancel} setProductType={setProductType} setImage={setImage} />
                                </div>
                              ) : (
                                <div className="space-x-2">
                                  <Button onClick={() => handleEdit(row.id, row.category)} className="bg-blue-400 hover:bg-blue-600 text-white py-2 px-4 rounded-xl shadow-md hover:shadow-lg transition duration-300 ease-in-out">
                                    Edit
                                  </Button>
                                  <Button onClick={() => handleDeletePopup(row.id)} className="bg-red-400 hover:bg-red-600 text-white py-2 px-4 rounded-xl shadow-md hover:shadow-lg transition duration-300 ease-in-out">
                                    Delete
                                  </Button>
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
  );
}
