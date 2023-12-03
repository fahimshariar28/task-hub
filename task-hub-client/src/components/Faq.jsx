import { Link } from "react-router-dom";

const Faq = () => {
  return (
    <div className="mt-10">
      <h3 className="text-6xl font-light text-blue-500 text-center">
        Task Hub FAQ
      </h3>
      <div className="mt-5">
        <div className="collapse collapse-plus bg-base-200">
          <input type="radio" name="my-accordion-3" checked="checked" />
          <div className="collapse-title text-xl font-medium text-blue-500">
            What is Task Hub?
          </div>
          <div className="collapse-content">
            <p>
              Task Hub is an online workspace designed to be used by a group of
              people for sales, marketing, project management, and other
              activities. It is a platform that allows teams to collaborate and
              work together on a project.
            </p>
          </div>
        </div>
        <div className="collapse collapse-plus bg-base-200 mt-2">
          <input type="radio" name="my-accordion-3" />
          <div className="collapse-title text-xl font-medium text-blue-500">
            How do I get started with Task Hub?
          </div>
          <div className="collapse-content">
            <p>
              To get started with Task Hub, you need to create an account. You
              can do this by clicking on the Login button on the top right
              corner of the page. After creating an account, you can create a
              team and invite your team members to join the team. You can then
              create tasks and assign them to your team members.
            </p>
          </div>
        </div>
        <div className="collapse collapse-plus bg-base-200 mt-2">
          <input type="radio" name="my-accordion-3" />
          <div className="collapse-title text-xl font-medium text-blue-500">
            What devices can I use Task Hub on?
          </div>
          <div className="collapse-content">
            <p>
              Task Hub is a web application that can be accessed on any device
              with a web browser. This includes desktops, laptops, tablets, and
              mobile phones.
            </p>
          </div>
        </div>
      </div>
      <div className="my-5 flex justify-center">
        <Link
          to="/login"
          className="bg-blue-500 text-white px-10 py-3 rounded-full"
        >
          Get for Free
        </Link>
      </div>
    </div>
  );
};

export default Faq;
