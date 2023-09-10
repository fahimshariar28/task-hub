import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

const TeamCard = ({ team }) => {
  return (
    <div>
      <div className="card mt-3 w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <div className="flex justify-between">
            <p>{team.name}</p>
            <Link to={`/tasks/${team._id}`}>
              <button className="btn btn-primary btn-sm">
                <FaArrowRight />
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamCard;
