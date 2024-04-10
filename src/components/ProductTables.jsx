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
import { deleteProductAsync, getProductAsync, getProductList, updateProductAsync } from "@/redux/slice/product/productSlice";
import EditFormProduct from "@/components/EditFormProduct";
import DeleteOption from "./DeleteOption";

const columns = [
  { id: "HuId", label: "HU ID", minWidth: 50 },
  { id: "product", label: "Product", minWidth: 100 },
  { id: "productId", label: "Product ID", minWidth: 100 },
  { id: "category", label: "Category", minWidth: 100 },
  { id: "productType", label: "Product type", minWidth: 100 },
  { id: "quantity", label: "Quantity", minWidth: 50 },
  { id: "grossWeight", label: "Weight (gm)", minWidth: 80 },
  { id: "size", label: "Size (cm)", minWidth: 80 },
  { id: "length", label: "Length (cm)", minWidth: 80 },
  { id: "puritySpc", label: "Purity spc", minWidth: 50 },
  { id: "price", label: "Price", minWidth: 100 },
  { id: "actions", label: "", minWidth: 100 },
];

const createData = (
  HuId,
  productId,
  product,
  quantity,
  // stoneWeight,
  grossWeight,
  puritySpc,
  price,
  id,
  model,
  subModel,
  description,
  category,
  productType,
  productImage,
  size,
  length
) => {
  return {
    HuId,
    productId,
    product,
    quantity,
    grossWeight,
    puritySpc,
    price,
    id,
    model,
    subModel,
    description,
    category,
    productType,
    productImage,
    size,
    length
  };
};

export default function ProductTables() {
  const dispatch = useDispatch();

  const [huId, setHuId] = React.useState("");
  const [productId, setProductId] = React.useState("");
  const [productName, setProductName] = React.useState("");
  const [model, setModel] = React.useState("");
  const [subModel, setSubModel] = React.useState("");
  const [stoneWeight, setStoneWeight] = React.useState([]);
  const [image, setImage] = React.useState(null);
  const [grossWeight, setGrossWeight] = React.useState([]);
  const [puritySpc, setPuritySpc] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [quantity, setQuantity] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [productType, setProductType] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [size, setSize] = React.useState([]);
  const [length, setLength] = React.useState([]);

  const [files, setFiles] = React.useState("");

  const [openCategory, setOpenCategory] = React.useState(false);
  const [openProductType, setOpenProductType] = React.useState(false);
  const [editedRow, setEditedRow] = React.useState(null);
  const [selectedRowToDelete, setSelectedRowToDelete] = React.useState(null);
  const [error, setError] = React.useState(false);
  const [updateSuccess, setUpdateSuccess] = React.useState(false);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [rows, setRows] = React.useState([]);
  const productList = useSelector(getProductList);

  const handleUpdateProduct = (e, rowHuId, rowProductId, rowModel, rowSubModel, rowProduct, rowStoneWeight, rowGrossWeight, rowSize, rowLength, rowPuritySpc, rowPrice, rowQuantity, rowDescription, rowCategory, rowProductType, rowImage) => {
    e.preventDefault();
    const updatedImage = image !== null ? image : rowImage;
    const updatedHuId = huId !== "" ? huId : rowHuId;
    const updatedProductId = productId !== "" ? productId : rowProductId;
    const updatedModel = model !== "" ? model : rowModel;
    const updatedSubModel = subModel !== "" ? subModel : rowSubModel;
    const updatedProduct = productName !== "" ? productName : rowProduct;
    // const updatedStoneWeight = stoneWeight.length !== 0 ? stoneWeight : rowStoneWeight;
    const updatedGrossWeight = grossWeight.length !== 0 ? grossWeight : rowGrossWeight;
    const updatedSize = size.length !== 0 ? size : rowSize;
    const updatedLength = length.length !== 0 ? length : rowLength;
    const updatedPuritySpc = puritySpc !== "" ? puritySpc : rowPuritySpc;
    const updatedQuantity = quantity !== "" ? quantity : rowQuantity;
    const updatedPrice = price !== "" ? price : rowPrice;
    const updatedDescription = description !== "" ? description : rowDescription;
    const updatedCategory = category !== "" ? category : rowCategory;
    const updatedProductType = productType !== "" ? productType : rowProductType;

    dispatch(updateProductAsync({ productId: editedRow, category: updatedCategory, product_type: updatedProductType, product_id: updatedProductId, product_name: updatedProduct, hu_id: updatedHuId, model: updatedModel, sub_model: updatedSubModel, gross_wt: updatedGrossWeight, size: updatedSize, length: updatedLength, purity_spec: updatedPuritySpc, quantity: updatedQuantity, description: updatedDescription, price: updatedPrice, image: updatedImage, is_available: true })).then((result) => {
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

        setUpdateSuccess(true);
        setTimeout(() => {
          setUpdateSuccess(false);
        }, 3000)
      }
    })
  }

  const handleDelete = (selectedRowId) => {
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
    setOpenProductType(false);
  };

  const handleCategoryClick = (option) => {
    setCategory(option);
    setOpenCategory(!openCategory);
  };

  const handleEdit = (rowImage, rowId, rowCategory, rowProductType, rowHuId, rowProductId, rowModel, rowSubModel, rowProduct, rowStoneWeight, rowGrossWeight, rowPuritySpc, rowPrice, rowQuantity, rowDescription) => {
    setEditedRow(rowId);
    setHuId(rowHuId);
    setProductId(rowProductId);
    setModel(rowModel);
    setSubModel(rowSubModel);
    setProductName(rowProduct);
    setStoneWeight(rowStoneWeight);
    setGrossWeight(rowGrossWeight);
    setPuritySpc(rowPuritySpc);
    setPrice(rowPrice);
    setQuantity(rowQuantity);
    setDescription(rowDescription);
    setImage(rowImage);
    setFiles(rowImage.length);
  }

  const handleProductType = () => {
    setOpenProductType(!openProductType);
    setOpenCategory(false);
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
    setFiles("");
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
    dispatch(getProductAsync());
  }, [dispatch])

  React.useEffect(() => {
    if (productList && Array.isArray(productList)) {
      let srNo = 1;
      const newRows = productList.map((data) => {
        const newRow = createData(
          data.hu_id || "",
          data.product_id || "",
          data.product_name || "",
          data.quantity || "",
          data.gross_wt || "",
          data.purity_spec || "",
          data.price || "",
          data.id,
          data.model || "",
          data.sub_model || "",
          data.description || "",
          data.category || "",
          data.product_type || "",
          data.product_images,
          data.size || [],
          data.length || []
        );
        srNo = srNo + 1;
        return newRow;
      });

      setRows(newRows)
    }
  }, [productList]);

  return (
    <>
      {updateSuccess && <div
        // className="bg-red-100 flex justify-between items-center border border-red-400 text-red-700 px-4 py-3 rounded relative"
        className="bg-blue-100 flex justify-between items-center border border-blue-400 text-blue-700 px-4 py-3 rounded fixed top-0 left-0 right-0"
        role="success"
        style={{ zIndex: 1001 }}
      >
        <strong className="font-bold">Product updated successfully</strong>
        <button
          onClick={hideUpdateSuccess}
          className="relative top-0.5 bottom-0 left-1"
        >
          <span className="text-blue-500 text-2xl">×</span>
        </button>
      </div>}
      {/* {error && <div
        // className="bg-red-100 flex justify-between items-center border border-red-400 text-red-700 px-4 py-3 rounded relative"
        className="bg-red-100 flex justify-between items-center border border-red-400 text-red-700 px-4 py-3 rounded fixed top-0 left-0 right-0"
        role="alert"
        style={{ zIndex: 1000 }}
      >
        <strong className="font-bold">Error!</strong>
        <span className="ml-2">Upload the image</span>
        <button
          onClick={hideError}
          className="relative top-0.5 bottom-0 left-1"
        >
          <span className="text-red-500 text-2xl">×</span>
        </button>
      </div>} */}
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
                                    <EditFormProduct length={length} setLength={setLength} size={size} setSize={setSize} files={files} setFiles={setFiles} productImage={image} handleCategoryClick={handleCategoryClick} handleUpdateProduct={handleUpdateProduct} description={description} setDescription={setDescription} productType={productType} setProductType={setProductType} category={category} setCategory={setCategory} quantity={quantity} setQuantity={setQuantity} price={price} row={row} setPrice={setPrice} puritySpc={puritySpc} setPuritySpc={setPuritySpc} grossWeight={grossWeight} setGrossWeight={setGrossWeight} image={image} setImage={setImage} stoneWeight={stoneWeight} setStoneWeight={setStoneWeight} subModel={subModel} setSubModel={setSubModel} model={model} setModel={setModel} productName={productName} setProductName={setProductName} productId={productId} setProductId={setProductId} huId={huId} setHuId={setHuId} openCategory={openCategory} openProductType={openProductType} handleCategory={handleCategory} handleProductType={handleProductType} handleProductTypeClick={handleProductTypeClick} isOpen={true} handleCancel={handleCancel} />
                                  </div>
                                ) : (
                                  <div className="space-x-7 flex">
                                    {/* <Button onClick={() => handleEdit(row.id, row.category)} className="bg-blue-500 hover:bg-blue-800 active:bg-blue-800 border border-black text-white rounded">
                                    Edit
                                  </Button> */}
                                    <MdEdit onClick={() => handleEdit(row.productImage, row.id, row.category, row.productType, row.HuId, row.productId, row.model, row.subModel, row.product, row.stoneWeight, row.grossWeight, row.puritySpc, row.price, row.quantity, row.description)} size={24} style={{ cursor: 'pointer', color: 'black' }} />
                                    {/* <Button onClick={() => handleDeletePopup(row.id)} className="bg-red-500 hover:bg-red-700 active:bg-red-700 border border-black text-white rounded">
                                    Delete
                                  </Button> */}
                                    <MdDelete onClick={() => handleDeletePopup(row.id)} size={24} style={{ cursor: 'pointer', color: 'red' }} />
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
    </>
  );
}
