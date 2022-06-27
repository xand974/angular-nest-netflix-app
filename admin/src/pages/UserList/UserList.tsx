import "./userList.scss";
import { DataGrid, GridColumns } from "@mui/x-data-grid";
import { DeleteOutlined, EditOutlined } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { UserModel } from "netflix-malet-types";
import { UserService } from "../../services/user.service";

export default function UserList() {
  const [data, setData] = useState<UserModel[]>([]);
  const userService = useRef(new UserService());
  const removeUser = (id: string | undefined) => {};

  useEffect(() => {
    const getUsers = async () => {
      const res = await userService.current.getNewUsers();
      setData(res.data);
    };
    getUsers();
  }, []);
  const columns = [
    { field: "_id", headerName: "ID", width: 100 },
    {
      field: "user",
      headerName: "User",
      width: 160,
      renderCell: (params: { row: UserModel }) => {
        return (
          <div className="renderUser">
            <img src={params.row.photoURL} alt="" />
            {params.row.username}
          </div>
        );
      },
    },
    { field: "email", headerName: "Email", width: 130 },
    {
      field: "roles",
      headerName: "Roles",
      width: 160,
      renderCell: (params: { row: UserModel }) => (
        <div className="roles">
          {params.row.roles?.map((item, index) => (
            <div className="roles__single" key={index}>
              <span className="roles__single__text">
                {item}
                {index !== (params.row.roles?.length ?? 0) - 1 && ","}
              </span>
            </div>
          ))}
        </div>
      ),
    },
    {
      field: "action",
      headerName: "Action",
      width: 160,
      renderCell: (params: { row: UserModel }) => {
        return (
          <div className="userlist">
            <Link to={`/user/${params.row._id}`}>
              <button>
                <EditOutlined className="btn__edit" />
              </button>
            </Link>
            <button
              onClick={() => {
                removeUser(params.row._id);
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
    <div className="userlist">
      <DataGrid
        rows={data}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[5]}
        checkboxSelection
        getRowId={(row) => row._id}
        disableSelectionOnClick
      />
    </div>
  );
}
