const DashboardTeamCard = ({ team }) => {
  return (
    <div>
      <div className="card w-9/12 mx-auto mt-3 bg-base-100 shadow-xl">
        <div className="card-body">
          <div className="flex justify-between">
            <p>Team Name: {team.name}</p>
            <p>Total Tasks: {team.tasks.length}</p>
            <p>Total Member: {team.members.length}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardTeamCard;
