import { useQuery } from "@tanstack/react-query";
import Loading from "../../components/Loading";
import DashboardTeamCard from "../../components/DashboardTeamCard";
import { Helmet } from "react-helmet-async";

const Dashboard = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["dashboard"],
    queryFn: async () => {
      const res = await fetch(`https://task-hub-server-self.vercel.app/teams`);
      const data = await res.json();
      return data;
    },
  });

  return (
    <div>
      <Helmet>
        <title>Dashboard | Task Hub</title>
      </Helmet>
      {isLoading ? (
        <div>
          <Loading />
        </div>
      ) : (
        <div>
          {data.map((team) => (
            <DashboardTeamCard key={team._id} team={team} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
