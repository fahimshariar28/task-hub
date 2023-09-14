import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import useUser from "../../hooks/useUser";
import { useRef, useState } from "react";
import AddTaskModal from "../../components/AddTaskModal";
import Loading from "../../components/Loading";
import TaskCard from "../../components/TaskCard";
import AddMember from "../../components/AddMember";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import { Helmet } from "react-helmet-async";

const Tasks = () => {
  const { teamId } = useParams();

  const modalRef = useRef(null);

  const openModal = () => {
    if (modalRef.current) {
      modalRef.current.showModal();
    }
  };

  const [sortOrder, setSortOrder] = useState("asc");

  const [priority, setPriority] = useState("all");

  const handlePriorityChange = (event) => {
    setPriority(event.target.value);
  };

  const user = useUser();
  const {
    data: tasks,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["tasks", teamId, user?.email, priority],
    enabled: !!user?.email,
    queryFn: async () => {
      const response = await fetch(
        `https://task-hub-server-self.vercel.app/tasksByIdAndEmail/${teamId}/${user?.email}?priority=${priority}`
      );
      const data = await response.json();
      return data;
    },
  });

  const { data: members, refetch: memberRefetch } = useQuery({
    queryKey: ["members", teamId],
    queryFn: async () => {
      const response = await fetch(
        `https://task-hub-server-self.vercel.app/membersById/${teamId}`
      );
      const data = await response.json();
      return data;
    },
  });

  const convertToDate = (dateString) => {
    const [dd, mm, yyyy] = dateString.split("/").map(Number);
    return new Date(yyyy, mm - 1, dd);
  };

  const incompleteTasks = tasks
    ?.filter((task) => task.status === "incomplete")
    .sort((a, b) => {
      const dateA = convertToDate(a.date);
      const dateB = convertToDate(b.date);
      return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
    });

  const completeTasks = tasks
    ?.filter((task) => task.status === "complete")
    .sort((a, b) => {
      const dateA = convertToDate(a.date);
      const dateB = convertToDate(b.date);
      return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
    });

  const processingTasks = tasks
    ?.filter((task) => task.status === "processing")
    .sort((a, b) => {
      const dateA = convertToDate(a.date);
      const dateB = convertToDate(b.date);
      return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
    });
  return (
    <>
      <Helmet>
        <title>Tasks | Task Hub</title>
      </Helmet>
      <AddTaskModal
        teamId={teamId}
        members={members}
        modalRef={modalRef}
        refetch={refetch}
      />

      <div className="h-screen grid md:grid-cols-12">
        <div className="col-span-9 px-10 pt-10">
          <h1 className="text-xl text-center">Tasks</h1>
          <div className="flex justify-between items-center">
            <div>
              <div className="flex gap-3">
                {sortOrder === "asc" ? (
                  <button
                    onClick={() => {
                      setSortOrder("desc"), refetch();
                    }}
                    className="text-lg"
                  >
                    <span className="flex gap-3 items-center">
                      Sort by Date <FaArrowUp />
                    </span>
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setSortOrder("asc"), refetch();
                    }}
                    className="text-lg"
                  >
                    <span className="flex gap-3 items-center">
                      Sort by Date <FaArrowDown />
                    </span>
                  </button>
                )}
              </div>
            </div>
            <div>
              <select value={priority} onChange={handlePriorityChange}>
                <option value="all">All Tasks</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high"> High</option>
              </select>
            </div>
            <div>
              <button className="btn btn-primary btn-sm" onClick={openModal}>
                Create New Task
              </button>
            </div>
          </div>
          {isLoading ? (
            <Loading />
          ) : (
            <div className="grid md:grid-cols-3 gap-5 mt-5">
              <div className="relative overflow-auto">
                <div className="flex sticky top-0  justify-between bg-[#D3DDF9] p-5 rounded-md mb-3">
                  <h1>Up Next</h1>
                  <p className="bg-primary text-white w-6 h-6 grid place-content-center rounded-md">
                    {incompleteTasks.length}
                  </p>
                </div>
                <div className="space-y-3">
                  {incompleteTasks.map((item) => (
                    <TaskCard
                      key={item._id}
                      refetch={refetch}
                      teamId={teamId}
                      task={item}
                    />
                  ))}
                </div>
              </div>
              <div className="relative overflow-auto">
                <div className="flex sticky top-0 justify-between bg-[#D3DDF9] p-5 rounded-md mb-3">
                  <h1>In Progress</h1>
                  <p className="bg-primary text-white w-6 h-6 grid place-content-center rounded-md">
                    {processingTasks.length}
                  </p>
                </div>
                <div className="space-y-3">
                  {processingTasks.map((item) => (
                    <TaskCard
                      key={item._id}
                      refetch={refetch}
                      teamId={teamId}
                      task={item}
                    />
                  ))}
                </div>
              </div>
              <div className="relative overflow-auto">
                <div className="flex sticky top-0 justify-between bg-[#D3DDF9] p-5 rounded-md mb-3">
                  <h1>Up Next</h1>
                  <p className="bg-primary text-white w-6 h-6 grid place-content-center rounded-md">
                    {completeTasks.length}
                  </p>
                </div>
                <div className="space-y-3">
                  {completeTasks.map((item) => (
                    <TaskCard
                      key={item._id}
                      refetch={refetch}
                      teamId={teamId}
                      task={item}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="col-span-3 px-10 pt-10">
          <div>
            <h1 className="text-xl">Members</h1>
            {members?.map(({ name, photo }, index) => (
              <div key={index} className="flex gap-3 mt-3">
                <div className="flex gap-3 items-center">
                  <img
                    src={photo ? photo : "https://i.ibb.co/cLRwPXz/profile.png"}
                    alt=""
                    className="object-cover h-10 w-10 rounded-full"
                  />
                  <p className="text-sm">{name}</p>
                </div>
              </div>
            ))}
          </div>
          <AddMember memberRefetch={memberRefetch} teamId={teamId} />
        </div>
      </div>
    </>
  );
};

export default Tasks;
