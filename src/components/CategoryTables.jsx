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
import { deleteCategoryAsync, editCategoryAsync, getCategoriesAsync, getCategoryList } from "@/redux/slice/category/categorySlice";
import EditForm from "./EditForm";
import DeleteOption from "./DeleteOption";

const columns = [
  { id: "srNo", label: "Sr No", minWidth: 80 },
  { id: "category", label: "Category name", minWidth: 600 },
  { id: "actions", label: "", minWidth: 200 },
];

const createData = (srNo, Id, category) => {
  return { srNo, Id, category };
};

export default function CategoryTables() {
  const dispatch = useDispatch();
  const [page, setPage] = React.useState(0);
  const [rows, setRows] = React.useState([]);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [editedRow, setEditedRow] = React.useState(null);
  const [edited, setEdited] = React.useState("");
  const [selectedRowToDelete, setSelectedRowToDelete] = React.useState(null);
  const categoryList = useSelector(getCategoryList);
  console.log(categoryList);

  const edits = [{name: "Category"}];

  const handleEdit = (rowId, rowCategory) => {
    setEditedRow(rowId);
  }

  const handleSave = () => {
    const categoryId = editedRow;
    dispatch(editCategoryAsync({ "category_name": edited, id: categoryId })).then((result) => {
      if (editCategoryAsync.fulfilled.match(result)) {
        dispatch(getCategoriesAsync());
        setEdited("");
      }
    })
    setEditedRow(null);
  }

  const handleDelete = (selectedRowId) => {
    
    const categoryId = selectedRowId;
    dispatch(deleteCategoryAsync({id: categoryId})).then((result) => {
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
          data.category_name || ""
        );
        srNo = srNo+1;
        return newRow;
      });

      setRows(newRows)
    }
  }, [categoryList]);

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
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.Id}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.id === "actions" ? (
                            <div className="space-x-2">
                              {editedRow === row.Id ? (
                                <div className="space-x-2">
                                  {/* <Button onClick={handleSave} className="bg-blue-400 hover:bg-blue-600 text-white  py-2 px-4 rounded-md shadow-md hover:shadow-lg transition duration-300 ease-in-out">
                                    Save
                                  </Button>
                                  <Button onClick={handleCancel} className="bg-red-400 hover:bg-red-600 text-white  py-2 px-4 rounded-md shadow-md hover:shadow-lg transition duration-300 ease-in-out">
                                    Cancel
                                  </Button> */}
                                  <EditForm isOpen={true} handleSave={handleSave} handleCancel={handleCancel} handleCategoryChange={handleCategoryChange} edited={edited} edits={edits} title="category"/>
                                </div>
                              ) : (
                                <div className="space-x-2">
                                  <Button onClick={() => handleEdit(row.Id, row.category)} className="bg-blue-400 hover:bg-blue-600 text-white py-2 px-4 rounded-xl shadow-md hover:shadow-lg transition duration-300 ease-in-out">
                                    Edit
                                  </Button>
                                  <Button onClick={() => handleDeletePopup(row.Id)} className="bg-red-400 hover:bg-red-600 text-white py-2 px-4 rounded-xl shadow-md hover:shadow-lg transition duration-300 ease-in-out">
                                    Delete
                                  </Button>
                                  {selectedRowToDelete === row.Id && <DeleteOption deleteDetails={{title: "category"}} rowId={row.Id} isOpen={true} handleDelete={handleDelete} handleDeleteCancel={handleDeleteCancel}/>}

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
  );
}
