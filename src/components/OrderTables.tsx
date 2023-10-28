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

interface Column {
  id:
    | "HuId"
    | "productId"
    | "product"
    | "quantity"
    | "stoneWeight"
    | "grossWeight"
    | "puritySpc"
    | "price"
    | "total"
    | "actions";
  label: string;
  minWidth?: number;
  align?: "left";
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: "HuId", label: "HU ID", minWidth: 80 },
  { id: "productId", label: "Product ID", minWidth: 100 },
  { id: "product", label: "Product", minWidth: 150 },
  { id: "quantity", label: "Quantity", minWidth: 50 },
  { id: "stoneWeight", label: "Stone weight(gm)", minWidth: 150 },
  { id: "grossWeight", label: "Gross weight(gm)", minWidth: 150 },
  { id: "puritySpc", label: "Purity spc", minWidth: 100 },
  { id: "price", label: "Price", minWidth: 50 },
  { id: "total", label: "Total", minWidth: 50 },
  { id: "actions", label: "", minWidth: 150 },
];

interface Data {
  HuId: number;
  productId: number;
  product: string;
  quantity: number;
  stoneWeight: number;
  grossWeight: number;
  puritySpc: number;
  price: number;
  total: number;
}

const createData = (
  HuId: number,
  productId: number,
  product: string,
  quantity: number,
  stoneWeight: number,
  grossWeight: number,
  puritySpc: number,
  price: number,
  total: number
): Data => {
  return {
    HuId,
    productId,
    product,
    quantity,
    stoneWeight,
    grossWeight,
    puritySpc,
    price,
    total,
  };
};

const rows: Data[] = [
  createData(1, 23, "Gold", 1, 20, 22, 2, 20000, 20000)
  // Add more mock data as needed
];

export default function OrderTables() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

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
                              <Button variant="contained" color="primary">
                                Edit
                              </Button>
                              <Button variant="contained" color="secondary">
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
