import { FaTrashAlt, FaLongArrowAltRight } from "react-icons/fa";
import { toast } from "react-hot-toast";

const TaskCard = ({ task, teamId, refetch }) => {
  let updatedStatus;
  if (task.status === "incomplete") {
    updatedStatus = "processing";
  } else if (task.status === "processing") {
    updatedStatus = "complete";
  }

  const handleStatus = async (id) => {
    const response = await fetch(
      `https://task-hub-server-self.vercel.app/teams/updateStatus/${teamId}/${id}/${updatedStatus}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: updatedStatus }),
      }
    );
    const data = await response.json();
    toast.success(`Status Updated to ${updatedStatus}`);
    refetch();
    console.log(data);
  };

  const handleDelete = async (id) => {
    const response = await fetch(
      `https://task-hub-server-self.vercel.app/teams/deleteTask/${teamId}/${id}`,
      {
        method: "PATCH",
      }
    );
    const data = await response.json();
    toast.success("Task Deleted");
    refetch();
    console.log(data);
  };

  return (
    <div className="bg-secondary/10 rounded-md p-5">
      <div className="flex justify-between">
        <h1
          className={`text-lg font-semibold mb-3 ${
            task.priority === "high" ? "text-red-500" : " "
          } ${task.priority === "medium" ? "text-yellow-500" : " "} ${
            task.priority === "low" ? "text-green-500" : " "
          }`}
        >
          {task?.name}
        </h1>
        <p className="text-lg text-gray-500">{task?.priority}</p>
      </div>
      <p className="mb-3">{task?.description}</p>
      <p className="text-sm">Assigned to - {task?.userName}</p>
      <div className="flex justify-between mt-3">
        <p>{task?.date}</p>
        <div className="flex gap-3">
          <button onClick={() => handleDelete(task._id)} title="Delete">
            <FaTrashAlt className="h-5 w-5 text-red-500" />
          </button>
          {task.status !== "complete" && (
            <button
              onClick={() => handleStatus(task._id)}
              title="Update Status"
            >
              <FaLongArrowAltRight className="h-5 w-5 text-primary" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
