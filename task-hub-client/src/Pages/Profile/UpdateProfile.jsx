import { useState } from "react";
import { useForm } from "react-hook-form";
import useUser from "../../hooks/useUser";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";

const UpdateProfile = () => {
  const [isEditMode, setIsEditMode] = useState(false);

  const { updateUserProfile } = useAuth();
  const user = useUser();

  const { register, handleSubmit } = useForm();
  const onSubmit = async (data) => {
    try {
      const name = data.name;
      const email = data.email;
      const bio = data.bio;
      updateUserProfile(name).then(() => {
        //   Profile name update
      });
      const savedUser = { name, email, bio };
      fetch(`https://task-hub-server-self.vercel.app/users/${user?.email}`, {
        method: "PATCH",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(savedUser),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          toast.success("Account updated Successfully");
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {!isEditMode ? (
        <div>
          <h1 className="text-2xl font-bold">Name: {user?.name}</h1>
          <h1 className="text-2xl font-bold">Email: {user?.email}</h1>
          <h1 className="text-2xl font-bold">Bio: {user?.bio}</h1>
          <button
            onClick={() => setIsEditMode(true)}
            className="btn btn-outline btn-primary mt-5"
          >
            Edit Profile
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col md:flex-row mt-5 gap-5">
            <input
              className="w-1/2 h-12 input input-bordered border-primary"
              type="text"
              defaultValue={user?.name}
              placeholder="Name"
              {...register("name")}
            />
            <input
              className="w-1/2 h-12 input input-bordered border-primary"
              type="text"
              defaultValue={user?.email}
              placeholder="Email"
              {...register("email")}
              readOnly
            />
          </div>
          <div className="flex flex-col md:flex-row mt-5 gap-5">
            <input
              className="w-1/2 h-12 input input-bordered border-primary"
              type="text"
              {...register("bio")}
              placeholder="Bio"
              defaultValue={user.bio}
            />

            <div className="w-full">
              <input
                type="submit"
                value="Save Changes"
                className="btn btn-primary"
              />
              <button
                onClick={() => setIsEditMode(false)}
                className="btn btn-warning ml-3"
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      )}
    </>
  );
};

export default UpdateProfile;
