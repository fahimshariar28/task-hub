import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const AddMember = ({ teamId, memberRefetch }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    const response = await fetch(
      `https://task-hub-server-self.vercel.app/teams/addMember/${teamId}/${data.email}`,
      {
        method: "PATCH",
        headers: { "content-type": "application/json" },
      }
    ).then((res) => res.json());
    console.log(response);
    reset();
    if (response.result && response.user) {
      memberRefetch();
      toast.success("Member Added Successfully");
    } else if (!response.result && response.user) {
      toast.error("Member Already Exists");
    } else if (!response.user) {
      toast.error("User not found, tell them to register.");
    } else {
      toast.error("Something went wrong");
    }
  };
  return (
    <div>
      <h1 className="text-xl mt-5">Add Members</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col space-y-3">
          <div className="flex flex-col space-y-1">
            <label className="block mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              className="w-full border p-2 mb-4"
              id="email"
              placeholder="Enter the email of the member"
              {...register("email", { required: true })}
            />
            {errors.email && (
              <span className="text-red-500">This field is required</span>
            )}
          </div>
          <div className="flex flex-col space-y-1">
            <input type="submit" className="btn btn-primary" />
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddMember;
