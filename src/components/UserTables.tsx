import * as React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

const columns: GridColDef[] = [
  { field: "id", headerName: "Sr No", width: 70 },
  { field: "email", headerName: "User Email", width: 200 },
  { field: "password", headerName: "Password", width: 200 },
];

const rows = [
  { id: 1, email: "user1@example.com", password: "password123" },
  { id: 2, email: "user2@example.com", password: "securepass" },
  { id: 3, email: "user3@example.com", password: "123456" },
  { id: 4, email: "user2@example.com", password: "securepass" },
  { id: 5, email: "user3@example.com", password: "123456" },
  { id: 6, email: "user2@example.com", password: "securepass" },
  { id: 7, email: "user3@example.com", password: "123456" },
  { id: 8, email: "user2@example.com", password: "securepass" },
  { id: 9, email: "user3@example.com", password: "123456" },
  { id: 10, email: "user2@example.com", password: "securepass" },
  { id: 11, email: "user3@example.com", password: "123456" },
];

export default function UserTables() {
  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        // checkboxSelection
      />
    </div>
  );
}
