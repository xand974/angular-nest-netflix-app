import { DeleteOutlined, EditOutlined } from "@material-ui/icons";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./movieList.scss";
import { FilmService } from "services/film.service";
import { MovieModel } from "netflix-malet-types";

export default function Products() {
  const [data, setData] = useState<MovieModel[]>([]);
  const filmService = useRef(new FilmService());
  useEffect(() => {
    const getFilms = async () => {
      const res = await filmService.current.getAllMovies();
      if (!res) return;
      setData(res.data);
    };
    getFilms();
  }, []);

  const removeOne = (id: string) => {};
  const columns = [
    { field: "_id", headerName: "ID", width: 100 },
    {
      field: "name",
      headerName: "Name",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="renderProduct">
            <img src={params.row.thumbnailURL} alt="" />
            {params.row.name}
          </div>
        );
      },
    },
    {
      field: "releaseYear",
      headerName: "Release Year",
      type: "number",
      width: 130,
    },
    {
      field: "synopsis",
      headerName: "Synopsis",
      width: 160,
    },
    {
      field: "type",
      headerName: "Type",
      width: 160,
    },
    {
      field: "action",
      headerName: "Action",
      width: 160,
      renderCell: (params) => {
        return (
          <div className="productlist">
            <Link to={`/product/${params.row._id}`}>
              <button>
                <EditOutlined className="btn__edit" />
              </button>
            </Link>
            <button
              onClick={() => {
                removeOne(params.row._id);
              }}
            >
              <DeleteOutlined className="btn__delete" />
            </button>
          </div>
        );
      },
    },
  ] as GridColDef[];
  return (
    <div className="products">
      <DataGrid
        rows={data}
        columns={columns}
        getRowId={(row) => row._id}
        pageSize={10}
        rowsPerPageOptions={[5]}
        checkboxSelection
        disableSelectionOnClick
      />
    </div>
  );
}
