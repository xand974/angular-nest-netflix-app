import { DeleteOutlined, EditOutlined } from "@material-ui/icons";
import { DataGrid, GridColumns } from "@mui/x-data-grid";
import { useState } from "react";
import { Link } from "react-router-dom";
import "./productsList.scss";
import { products } from "mockData";

export default function Products() {
  const [data, setData] = useState(products);
  const HandleClick = (id: number) => {
    setData((prev) => {
      return prev.filter((m) => m.id !== id);
    });
  };
  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    {
      field: "name",
      headerName: "Name",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="renderProduct">
            <img src={params.row.img} alt="" />
            {params.row.name}
          </div>
        );
      },
    },
    { field: "stock", headerName: "Stock", type: "number", width: 130 },
    {
      field: "status",
      headerName: "Status",
      width: 160,
    },
    {
      field: "price",
      headername: "Price",
      width: 160,
    },
    {
      field: "action",
      headerName: "Action",
      width: 160,
      renderCell: (params) => {
        return (
          <div className="productlist">
            <Link to={`/product/${params.row.id}`}>
              <button>
                <EditOutlined className="btn__edit" />
              </button>
            </Link>
            <button
              onClick={() => {
                HandleClick(params.row.id);
              }}
            >
              <DeleteOutlined className="btn__delete" />
            </button>
          </div>
        );
      },
    },
  ] as GridColumns;
  return (
    <div className="products">
      <DataGrid
        rows={data}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[5]}
        checkboxSelection
        disableSelectionOnClick
      />
    </div>
  );
}
