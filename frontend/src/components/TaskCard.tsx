import { ITaskData } from "../types/types";

const TaskCard = ({ task }: { task: ITaskData }) => {
  return (
    <div className="flex flex-col w-64 h-64 shadow-sm bg-white rounded-md">
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
        <div className="flex items-end justify-end">
          <p className="text-xs text-gray-400">...</p>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
