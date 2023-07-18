import { ITaskData } from "../types/types";
import { FiCalendar } from "react-icons/fi";

const TaskCard = ({ task }: { task: ITaskData }) => {
  const formatDate = (date: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(date).toLocaleDateString(undefined, options);
  };

  return (
    <div className="flex flex-col w-64 shadow-sm bg-white rounded-md hover:cursor-pointer hover:shadow-md">
      <div className="flex flex-row items-center justify-between px-4 py-2">
        <div
          className={`flex items-center justify-center w-20 h-8 rounded-full
          ${
            task.priority === "High"
              ? "bg-[#f89191] text-[#c33636]"
              : task.priority === "Medium"
              ? "bg-[#f8c991] text-[#c38a36]"
              : "bg-[#99f0c3] text-[#268f65]"
          }
          `}
        >
          <p className="text-xs font-semibold">{task.priority}</p>
        </div>

        <p className="text-3xl text-gray-400 pb-2 ">...</p>
      </div>
      <div className="flex flex-col h-16 px-4  gap-2">
        <p className="text-sm font-semibold">{task.title}</p>
        <p className="text-xs text-gray-400 overflow-hidden line-clamp-2">
          {task.description}
        </p>
      </div>
      <div className="w-full border-b-2 border-gray-200 p-2" />
      <div className="flex flex-row px-4 py-3 items-center justify-end gap-2">
        <FiCalendar className="text-gray-400" />
        <p className="text-xs font-semibold text-gray-400">
          {formatDate(task.dueDate)}
        </p>
      </div>
    </div>
  );
};

export default TaskCard;
