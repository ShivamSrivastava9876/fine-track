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
// import { FaEdit } from '@fortawesome/free-solid-svg-icons';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch, useSelector } from "react-redux";
import { deleteCategoryAsync, editCategoryAsync, getCategoriesAsync, getCategoryList } from "@/redux/slice/category/categorySlice";
import EditForm from "./EditForm";
import DeleteOption from "./DeleteOption";

const columns = [
  { id: "srNo", label: "Sr No", minWidth: 80 },
  { id: "category", label: "Category name", minWidth: 1000 },
  { id: "actions", label: "", minWidth: 100 },
];

const createData = (srNo, Id, category, image) => {
  return { srNo, Id, category, image };
};

export default function CategoryTables() {
  const dispatch = useDispatch();
  const [page, setPage] = React.useState(0);
  const [rows, setRows] = React.useState([]);
  const [category, setCategory] = React.useState("");
  const [image, setImage] = React.useState(null);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [editedRow, setEditedRow] = React.useState(null);
  const [edited, setEdited] = React.useState("");
  const [selectedRowToDelete, setSelectedRowToDelete] = React.useState(null);
  const [error, setError] = React.useState(false);

  const [updateSuccess, setUpdateSuccess] = React.useState(false);
  const categoryList = useSelector(getCategoryList);

  // const edits = [{name: "Category"}];

  const handleEdit = (rowId, rowCategory, rowImage) => {
    setEditedRow(rowId);
    setCategory(rowCategory);
    setImage(rowImage);
  }

  const handleUpdateCategory = (rowCategory) => {
    const categoryId = editedRow;
    const updatedCategory = category !== "" ? category : rowCategory;
    dispatch(editCategoryAsync({ category: updatedCategory, image, id: categoryId })).then((result) => {
      if (editCategoryAsync.fulfilled.match(result)) {
        dispatch(getCategoriesAsync());
        setCategory("");
        setImage(null);
        setEditedRow("");
        setUpdateSuccess(true);
        setTimeout(() => {
          setUpdateSuccess(false);
        }, 3000)
      }
    })
    setEditedRow(null);
  }

  const handleDelete = (selectedRowId) => {

    const categoryId = selectedRowId;
    dispatch(deleteCategoryAsync({ id: categoryId })).then((result) => {
      if (deleteCategoryAsync.fulfilled.match(result)) {
        dispatch(getCategoriesAsync());
      }
    })
  }

  const handleDeletePopup = (selectedRowId) => {
    setSelectedRowToDelete(selectedRowId)
  }

  const handleDeleteCancel = () => {
    setSelectedRowToDelete(null);
  }

  const handleCancel = () => {
    setEditedRow(null);
    setEdited("");
    setImage(null);
  }

  const handleCategoryChange = (event) => {
    setEdited(event.target.value);
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

  const hideError = () => {
    setError(false);
  }

  const hideUpdateSuccess = () => {
    setUpdateSuccess(false);
  }

  React.useEffect(() => {
    dispatch(getCategoriesAsync())
  }, [dispatch]);

  React.useEffect(() => {
    if (categoryList && Array.isArray(categoryList)) {
      let srNo = 1;
      const newRows = categoryList.map((data) => {
        const newRow = createData(
          srNo,
          data.id,
          data.category_name || "",
          data.image
        );
        srNo = srNo + 1;
        return newRow;
      });

      setRows(newRows)
    }
  }, [categoryList]);

  return (
    <>
      {updateSuccess && <div
        // className="bg-red-100 flex justify-between items-center border border-red-400 text-red-700 px-4 py-3 rounded relative"
        className="bg-blue-100 flex justify-between items-center border border-blue-400 text-blue-700 px-4 py-3 rounded fixed top-0 left-0 right-0"
        role="success"
        style={{ zIndex: 1001 }}
      >
        <strong className="font-bold">Category updated successfully</strong>
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
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.Id}>
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}  className=" font-poppins">
                            {column.id === "actions" ? (
                              <div className="space-x-2">
                                {editedRow === row.Id ? (
                                  <div className="space-x-2">
                                    <EditForm row={row} isOpen={true} handleUpdateCategory={handleUpdateCategory} handleCancel={handleCancel} handleCategoryChange={handleCategoryChange} category={category} setCategory={setCategory} image={image} setImage={setImage} edited={edited} />
                                  </div>
                                ) : (
                                  <div className="space-x-7 flex">
                                    {/* <Button onClick={() => handleEdit(row.Id, row.category)} className="border-black text-white rounded"></Button> */}
                                    <MdEdit onClick={() => handleEdit(row.Id, row.category, row.image)} size={24} style={{ cursor: 'pointer', color: 'black' }} />

                                    {/* <Button onClick={() => handleDeletePopup(row.Id)} className="bg-red-500 hover:bg-red-700 active:bg-red-700 border border-black text-white rounded">
                                    Delete
                                  </Button> */}
                                    <MdDelete onClick={() => handleDeletePopup(row.Id)} size={24} style={{ cursor: 'pointer', color: 'red' }} />
                                    {selectedRowToDelete === row.Id && <DeleteOption deleteDetails={{ title: "category" }} rowId={row.Id} isOpen={true} handleDelete={handleDelete} handleDeleteCancel={handleDeleteCancel} />}

                                  </div>
                                )}
                              </div>
                            ) : (
                              // Render other columns
                              column.format && typeof value === "number" ? (
                                column.format(value)
                              ) : (
                                value
                              )
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
