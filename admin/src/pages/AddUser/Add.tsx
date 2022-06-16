import "./add.scss";

export default function Add() {
  return (
    <div className="add">
      <h3 className="title">New User</h3>
      <form>
        <div className="data">
          <label htmlFor="username">Username</label>
          <input placeholder="anabeck" type="text" id="username" />
        </div>
        <div className="data">
          <label htmlFor="fullname">Full Name</label>
          <input placeholder="anna back" type="text" id="fullname" />
        </div>
        <div className="data">
          <label htmlFor="email">Email</label>
          <input placeholder="annaback@gmail.com" type="text" id="email" />
        </div>
        <div className="data">
          <label htmlFor="phone">Phone</label>
          <input placeholder="06 98 75 32 45" type="text" id="phone" />
        </div>
        <div className="data">
          <label htmlFor="address">Address</label>
          <input placeholder="New York | USA" type="text" id="adresse" />
        </div>
        <div className="data">
          <label htmlFor="gender">Gender</label>
          <div className="radioItem">
            <input type="radio" name="genre" id="male" value="male" />
            <label htmlFor="male">Male</label>

            <input type="radio" name="genre" id="female" value="female" />
            <label htmlFor="female">Female</label>

            <input type="radio" name="genre" id="other" value="other" />
            <label htmlFor="other">Other</label>
          </div>
        </div>
        <div className="data">
          <label>Active</label>
          <select name="active" id="user__select">
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>
        <div className="data">
          <button>Create</button>
        </div>
      </form>
    </div>
  );
}
