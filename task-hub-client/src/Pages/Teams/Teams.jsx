import { useQuery } from "@tanstack/react-query";
import useUser from "../../hooks/useUser";
import TeamCard from "../../components/TeamCard";
import Loading from "../../components/Loading";
import { useRef } from "react";
import CreateTeam from "../../components/CreateTeam";
import { Helmet } from "react-helmet-async";

const Teams = () => {
  const modalRef = useRef(null);

  const openModal = () => {
    if (modalRef.current) {
      modalRef.current.showModal();
    }
  };

  const user = useUser();
  const {
    data: teams,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["teams", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const response = await fetch(
        `https://task-hub-server-self.vercel.app/teamsByEmail/${user?.email}`
      );
      const data = await response.json();
      return data;
    },
  });

  return (
    <div>
      <Helmet>
        <title>Teams | Task Hub</title>
      </Helmet>
      <div className="flex justify-between">
        <h1 className="text-2xl mt-3">Your Teams</h1>
        <div className="">
          <button className="btn btn-primary btn-sm" onClick={openModal}>
            Create Team
          </button>
          <CreateTeam modalRef={modalRef} refetch={refetch} />
        </div>
      </div>
      {isLoading && <Loading />}
      {teams?.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {teams?.map((team) => (
            <TeamCard key={team._id} team={team} />
          ))}
        </div>
      ) : (
        <div>
          <h1 className="text-center text-2xl mt-3">You are not in any Team</h1>
          <p className="text-center">Create Your Fist Team</p>
        </div>
      )}
    </div>
  );
};

export default Teams;
