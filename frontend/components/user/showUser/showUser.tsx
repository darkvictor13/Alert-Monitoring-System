import { NextPage } from "next";
import { IUser } from "../../../types/user";

const ShowUser: NextPage<{ user: IUser }> = ({ user }) => {
  return (
    <div>
      <p>{user.email}</p>
    </div>
  );
};

export default ShowUser;
