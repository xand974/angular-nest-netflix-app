import { DeleteOutlined, EditOutlined } from "@material-ui/icons";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./list.scss";
import { ListModel, MovieModel } from "netflix-malet-types";
import { ListService } from "../../services/list.service";
import { FilmService } from "services/film.service";
import { AxiosResponse } from "axios";

export default function List() {
  const [data, setData] = useState<ListModel[]>([]);
  const [movies, setMovies] = useState<MovieModel[]>([]);
  const listService = useRef(new ListService());
  const movieService = useRef(new FilmService());
  useEffect(() => {
    const getLists = async () => {
      const res = await listService.current.getAll();
      if (!res) return;
      const lists = res.data;
      setData(lists);
    };
    getLists();
  }, []);

  //   useEffect(() => {
  //     const getMovies = async (): Promise<void> => {
  //         const ids = params.row.movieIds as string[];
  //         const all = await Promise.all(
  //           ids.map((item: string) => {
  //             return movieService.current.getById(item);
  //           })
  //         );
  //         const moviesArray = all.map((item: AxiosResponse) => item.data);
  //         setMovies(moviesArray);
  //       };

  //       getMovies();
  //       console.log(movies);
  //   }, [])

  const removeOne = (id: string) => {};
  const columns = [
    { field: "_id", headerName: "ID", width: 100 },
    {
      field: "name",
      headerName: "Name",
      width: 200,
      renderCell: (params) => {
        return <div className="renderProduct">{params.row.name}</div>;
      },
    },
    {
      field: "genre",
      headerName: "Genre",
      type: "array",
      width: 130,
    },
    {
      field: "type",
      headerName: "Type",
      width: 160,
    },
    {
      field: "movieIds",
      headerName: "All Movies",
      width: 160,
      renderCell: (params) => {
        return (
          <div className="movies">
            {/* {res.map((item, key) => (
              <img src={item.thumbnailURL} key={key} alt="" />
            ))} */}
          </div>
        );
      },
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
