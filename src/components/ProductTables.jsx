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
import { deleteProductAsync, getProductAsync, getProductList, updateProductAsync } from "@/redux/slice/product/productSlice";
import EditFormProduct from "@/components/EditFormProduct";
import DeleteOption from "./DeleteOption";

const columns = [
  { id: "HuId", label: "HU ID", minWidth: 80 },
  { id: "productId", label: "Product ID", minWidth: 100 },
  { id: "product", label: "Product", minWidth: 150 },
  { id: "quantity", label: "Quantity", minWidth: 50 },
  { id: "stoneWeight", label: "Stone weight(gm)", minWidth: 150 },
  { id: "grossWeight", label: "Gross weight(gm)", minWidth: 150 },
  { id: "puritySpc", label: "Purity spc", minWidth: 100 },
  { id: "price", label: "Price", minWidth: 100 },
  { id: "actions", label: "", minWidth: 150 },
];

const createData = (
  HuId,
  productId,
  product,
  quantity,
  stoneWeight,
  grossWeight,
  puritySpc,
  price,
  id
) => {
  return {
    HuId,
    productId,
    product,
    quantity,
    stoneWeight,
    grossWeight,
    puritySpc,
    price,
    id
  };
};

export default function ProductTables() {
  const dispatch = useDispatch();

  const [huId, setHuId] = React.useState("");
  const [productId, setProductId] = React.useState("");
  const [productName, setProductName] = React.useState("");
  const [model, setModel] = React.useState("");
  const [subModel, setSubModel] = React.useState("");
  const [stoneWeight, setStoneWeight] = React.useState("");
  const [image, setImage] = React.useState("");
  const [grossWeight, setGrossWeight] = React.useState("");
  const [puritySpc, setPuritySpc] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [quantity, setQuantity] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [productType, setProductType] = React.useState("");
  const [description, setDescription] = React.useState("");

  const [openCategory, setOpenCategory] = React.useState(false);
  const [openProductType, setOpenProductType] = React.useState(false);
  const [editedRow, setEditedRow] = React.useState(null);
  const [selectedRowToDelete, setSelectedRowToDelete] = React.useState(null);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [rows, setRows] = React.useState([]);
  const productList = useSelector(getProductList);

  const handleUpdateProduct = (e) => {
    e.preventDefault();
    
    dispatch(updateProductAsync({ productId: editedRow, category: category, product_type: productType, product_id: productId, product_name: productName, hu_id: huId, model, sub_model: subModel, gross_wt: grossWeight, stone_wt: stoneWeight, purity_spec: puritySpc, quantity, description, price, image, is_available: true })).then((result) => {
      if (updateProductAsync.fulfilled.match(result)) {
        dispatch(getProductAsync());
        setHuId("");
        setProductId("");
        setProductName("");
        setModel("");
        setSubModel("");
        setStoneWeight("");
        setImage(null);
        setGrossWeight("");
        setPuritySpc("");
        setPrice("");
        setQuantity("");
        setCategory("");
        setProductType("");
        setDescription("");
        setEditedRow(null);
      }
    })
  }
  
  const handleDelete = (selectedRowId) => {
    console.log("select", selectedRowId)
    const productId = selectedRowId;
    dispatch(deleteProductAsync(productId)).then((result) => {
      if (deleteProductAsync.fulfilled.match(result)) {
        dispatch(getProductAsync());
      }
    })
  }

  const handleDeleteCancel = () => {
    setSelectedRowToDelete(null);
  }

  const handleDeletePopup = (selectedRowId) => {
    setSelectedRowToDelete(selectedRowId)
  }

  const handleCategory = () => {
    setOpenCategory(!openCategory);
  };

  const handleCategoryClick = (option) => {
    setCategory(option);
    setOpenCategory(!openCategory);
  };

  const handleEdit = (rowId, rowCategory) => {
    // console.log(rowCategory);
    setEditedRow(rowId);
  }

  const handleProductType = () => {
    setOpenProductType(!openProductType)
  }

  const handleProductTypeClick = (option) => {
    setProductType(option);
    setOpenProductType(!openProductType);
  }

  const handleCancel = () => {
    setHuId("");
    setProductId("");
    setProductName("");
    setModel("");
    setSubModel("");
    setStoneWeight("");
    setImage(null);
    setGrossWeight("");
    setPuritySpc("");
    setPrice("");
    setQuantity("");
    setCategory("");
    setProductType("");
    setDescription("");
    setEditedRow(null);
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
    dispatch(getProductAsync());
  }, [dispatch])

  React.useEffect(() => {
    console.log("productList1", productList);
    if (productList && Array.isArray(productList)) {
      let srNo = 1;
      const newRows = productList.map((data) => {
        const newRow = createData(
          data.hu_id || "",
          data.product_id || "",
          data.product_name || "",
          data.quantity || "",
          data.stone_wt || "",
          data.gross_wt || "",
          data.purity_spec || "",
          data.price || "",
          data.id
        );
        srNo = srNo + 1;
        return newRow;
      });

      setRows(newRows)
    }
  }, [productList]);

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
                                  <EditFormProduct handleCategoryClick={handleCategoryClick} handleUpdateProduct={handleUpdateProduct} description={description} setDescription={setDescription} productType={productType} setProductType={setProductType} category={category} setCategory={setCategory} quantity={quantity} setQuantity={setQuantity} price={price} row={row} setPrice={setPrice} puritySpc={puritySpc} setPuritySpc={setPuritySpc} grossWeight={grossWeight} setGrossWeight={setGrossWeight} image={image} setImage={setImage} stoneWeight={stoneWeight} setStoneWeight={setStoneWeight} subModel={subModel} setSubModel={setSubModel} model={model} setModel={setModel} productName={productName} setProductName={setProductName} productId={productId} setProductId={setProductId} huId={huId} setHuId={setHuId} openCategory={openCategory} openProductType={openProductType} handleCategory={handleCategory} handleProductType={handleProductType} handleProductTypeClick={handleProductTypeClick} isOpen={true} handleCancel={handleCancel} />
                                </div>
                              ) : (
                                <div className="space-x-2">
                                  <Button onClick={() => handleEdit(row.id, row.category)} className="bg-blue-400 hover:bg-blue-600 text-white py-2 px-4 rounded-xl shadow-md hover:shadow-lg transition duration-300 ease-in-out">
                                    Edit
                                  </Button>
                                  <Button onClick={() => handleDeletePopup(row.id)} className="bg-red-400 hover:bg-red-600 text-white py-2 px-4 rounded-xl shadow-md hover:shadow-lg transition duration-300 ease-in-out">
                                    Delete
                                  </Button>
                                  {selectedRowToDelete === row.id && <DeleteOption deleteDetails={{ title: "product" }} rowId={row.id} isOpen={true} handleDelete={handleDelete} handleDeleteCancel={handleDeleteCancel} />}

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
