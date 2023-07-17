import Header from "../components/Header";
import pin from "../assets/pin.svg";
import { FiPlus } from "react-icons/fi";
import { useState } from "react";
import TaskCard from "../components/TaskCard";

const taskStatus = [
  {
    title: "Todo",
    number: 10,
  },
  {
    title: "In Progress",
    number: 5,
  },
  {
    title: "Completed",
    number: 2,
  },
];

const taskData = [
  {
    id: "1",
    title: "Water the plants",
    description: "Water the plants in the balcony",
    dueDate: "2021-10-10",
    priority: "Low",
    progress: "Todo",
    createdAt: "2021-10-10",
  },
];

const Home = () => {
  const [activeTaskStatus, setActiveTaskStatus] = useState("Todo");

  const handleActiveTaskStatus = (status: string) => {
    setActiveTaskStatus(status);
  };

  return (
    <div className="flex flex-col w-full h-screen">
      <Header />
      <div className="flex flex-grow w-full flex-col items-center justify-start  bg-[#F7F7F7]">
        <div className="flex flex-col items-start px-6 py-2 w-full h-16 ">
          <div className="flex flex-row items-center justify-between w-full h-full">
            <p className="text-xl pt-2 font-medium flex flex-row items-center gap-2 ">
              Tasks List
              <img src={pin} alt="pin" className="w-6 h-6" />
            </p>
          </div>
          <p className="text-xs py-1 pl-1 text-gray-400">
            Here is a list of task you have created.
          </p>
        </div>
        <div className="flex flex-col w-full h-16 mt-4 px-6 ">
          <div className="flex flex-row w-full h-full justify-between rounded-2xl bg-white py-3 shadow-sm">
            <div className="flex flex-row gap-8 pl-6 h-full ">
              {taskStatus.map((status) => (
                <div
                  key={status.title}
                  className={`flex flex-row items-center justify-center gap-2 h-full hover:cursor-pointer
                  ${
                    activeTaskStatus === status.title
                      ? "text-[#2F57FA] border-b-2 border-[#2F57FA]"
                      : "text-gray-400"
                  }
                  `}
                  onClick={() => handleActiveTaskStatus(status.title)}
                >
                  <p className="text-xs font-semibold ">{status.title}</p>

                  <div
                    className={`w-5 h-5  rounded-md flex items-center justify-center
                    ${
                      activeTaskStatus === status.title
                        ? "bg-[#2F57FA]"
                        : "bg-gray-400"
                    }
                   `}
                  >
                    <p className="text-white text-xs">{status.number}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex flex-row rounded-xl items-center border px-3 border-gray-500 ">
              <FiPlus className="text-gray-500 " />
              <p className="text-xs font-semibold text-gray-500 px-2">
                Add New
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col w-full h-full mt-4 px-6 ">
          <div className="flex flex-row flex-wrap w-full justify-start py-3">
            {taskData.map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
