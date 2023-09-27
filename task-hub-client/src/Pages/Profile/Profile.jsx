import { Helmet } from "react-helmet-async";
import useUser from "../../hooks/useUser";
import UpdateProfile from "./UpdateProfile";

const Profile = () => {
  const user = useUser();

  return (
    <div>
      <Helmet>
        <title>Profile | Task Hub</title>
      </Helmet>
      <div className="flex flex-col md:flex-row justify-center items-center md:justify-center gap-20">
        <div>
          <img
            className="w-32 h-32 rounded-full"
            src={
              user?.photo ? user.photo : "https://i.ibb.co/cLRwPXz/profile.png "
            }
            alt=""
          />
        </div>
        <UpdateProfile />
      </div>
    </div>
  );
};

export default Profile;
