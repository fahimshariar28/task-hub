import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import useUser from "../hooks/useUser";

function CreateTeam({ modalRef, refetch }) {
  const user = useUser();
  const mutation = useMutation(async (data) => {
    return fetch("https://task-hub-server-self.vercel.app/teams", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(data),
    }).then((res) => res.json());
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    const team = {
      name: data.name,
      members: [user.email],
      tasks: [],
    };
    try {
      const response = await mutation.mutateAsync(team);
      console.log(response);
      modalRef.current.close();
      toast.success("Team Created Successfully");
      reset();
      refetch();
    } catch (error) {
      toast.error("Something went wrong");
      console.log(error);
    }
  };
  return (
    <dialog id="my_modal_1" className="modal" ref={modalRef}>
      <div className="modal-box ">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="max-w-sm mx-auto mt-8 p-6 rounded"
        >
          <div>
            <label className="block mb-2">Team Name</label>
            <input
              placeholder="Team Name"
              {...register("name", { required: true })}
              className="w-full border p-2 mb-4"
            />
          </div>
          {/* errors will return when field validation fails  */}
          {errors.exampleRequired && (
            <span className="text-red-500">This field is required</span>
          )}
          <div className="flex justify-between mt-4">
            <button
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={() => modalRef.current.close()}
            >
              Cancel
            </button>
            <input
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
              value="Submit"
            />
          </div>
        </form>
      </div>
    </dialog>
  );
}

export default CreateTeam;
