import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const AddTaskModal = ({ modalRef, refetch, members, teamId }) => {
  const memberEmails = members?.map((member) => member.email);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    const response = await fetch(
      `https://task-hub-server-self.vercel.app/teams/addTask/${teamId}`,
      {
        method: "PATCH",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(data),
      }
    ).then((res) => res.json());
    console.log(response);
    reset();
    if (response.acknowledged) {
      modalRef.current.close();
      refetch();
      toast.success("Task Added Successfully");
    } else {
      toast.error("Something went wrong");
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
            <label className="block mb-2">Task Name</label>
            <input
              placeholder="Task Name"
              {...register("name", { required: true })}
              className="w-full border p-2 mb-4"
            />
          </div>
          {/* errors will return when field validation fails  */}
          {errors.exampleRequired && (
            <span className="text-red-500">This field is required</span>
          )}
          <div>
            <label className="block mb-2">Date</label>
            <input
              type="date"
              placeholder="Date"
              {...register("date", { required: true })}
              className="w-full border p-2 mb-4"
            />
          </div>
          <div>
            <label className="block mb-2">Assign To</label>
            <select
              {...register("userEmail", { required: true })}
              className="w-full border p-2 mb-4"
            >
              {memberEmails?.map((email) => (
                <option key={email} value={email}>
                  {email}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block mb-2">Description</label>
            <textarea
              placeholder="Description"
              {...register("description", { required: true })}
              className="w-full border p-2 mb-4"
            />
          </div>
          <div>
            <label className="block mb-2">Priority</label>
            <select
              {...register("priority", { required: true })}
              className="w-full border p-2 mb-4"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high"> High</option>
            </select>
          </div>

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
};

export default AddTaskModal;
