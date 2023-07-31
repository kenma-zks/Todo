import pin from "../assets/pin.svg";
import { FiPlus, FiX } from "react-icons/fi";
import { useState } from "react";
import TaskCard from "../components/TaskCard";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { createTaskMutation, getTasks } from "../api/api";
import { ITaskData } from "../types/types";
import { useForm, SubmitHandler } from "react-hook-form";
import TaskDetailsModal from "../components/TaskDetailsModal";
import { useAppSelector } from "../store/hooks";
import { toast, ToastContainer } from "react-toastify";

const Progress = [
  {
    progress: "Todo",
    count: 0,
  },
  {
    progress: "In Progress",
    count: 0,
  },
  {
    progress: "Completed",
    count: 0,
  },
];

const Home = () => {
  const [activeTaskStatus, setActiveTaskStatus] = useState("Todo");
  const [showForm, setShowForm] = useState(false);
  const { handleSubmit, register, reset } = useForm<ITaskData>();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<ITaskData | null>(null);
  const queryClient = useQueryClient();

  const searchTerm = useAppSelector((state) => state.search);

  const refreshData = async () => {
    try {
      await queryClient.invalidateQueries({ queryKey: ["tasks"] });
    } catch (error) {
      console.error("Error refreshing data:", error);
    }
  };

  const {
    data: taskData,
    isLoading: taskDataLoading,
    isError: taskDataError,
  } = useQuery({
    queryKey: ["tasks"],
    queryFn: getTasks,
  });

  const mutation = useMutation<ITaskData, unknown, ITaskData>(
    createTaskMutation,
    {
      onMutate: (variables) => {
        return variables;
      },
      onSuccess: (data) => {
        console.log("New task created:", data);
        reset();
        setShowForm(false);
        toast.success("Task created successfully", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 2000,
          hideProgressBar: true,
        });
      },
      onError: (error: unknown) => {
        const errorMessage =
          (error as Error)?.message || "Unknown error occurred";
        console.error("Error creating task:", errorMessage);
        toast.error("Error creating task", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 2000,
          hideProgressBar: true,
        });
      },
    }
  );

  if (taskDataLoading) return <p>Loading...</p>;
  if (taskDataError) return <p>Error...</p>;

  const handleActiveTaskStatus = (status: string) => {
    setActiveTaskStatus(status);
  };

  const getProgressCount = (status: string) => {
    return taskData?.filter((task) => task.progress === status).length;
  };

  const openModal = (task: ITaskData) => {
    task._id === selectedTask?._id
      ? setModalIsOpen((prev) => !prev)
      : (setSelectedTask(task), setModalIsOpen(true));
  };

  const getFilteredTasks = taskData?.filter(
    (task) =>
      task.progress === activeTaskStatus &&
      task.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const addNewTaskHandler = () => {
    setShowForm(true);
  };

  const onSubmit: SubmitHandler<ITaskData> = async (data) => {
    try {
      await mutation.mutateAsync(data);

      await refreshData();
    } catch (error: unknown) {
      const errorMessage =
        (error as Error)?.message || "Unknown error occurred";
      console.error("Error creating task:", errorMessage);
    }
  };

  return (
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
        <div className="flex flex-row w-full h-full justify-between rounded-2xl bg-white py-2 shadow-sm pr-8">
          <div className="flex flex-row gap-8 pl-6 h-full ">
            {Progress?.map((task) => (
              <div
                key={task.progress}
                className={`flex flex-row items-center justify-center gap-2 h-full hover:cursor-pointer
                  ${
                    activeTaskStatus === task.progress
                      ? "text-[#2F57FA] border-b-2 border-[#2F57FA]"
                      : "text-gray-400"
                  }
                  `}
                onClick={() => handleActiveTaskStatus(task.progress)}
              >
                <p className="text-xs font-semibold ">{task.progress}</p>

                <div
                  className={`w-5 h-5  rounded-md flex items-center justify-center
                    ${
                      activeTaskStatus === task.progress
                        ? "bg-[#2F57FA]"
                        : "bg-gray-400"
                    }
                   `}
                >
                  <p className="text-white text-xs">
                    {getProgressCount(task.progress)}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div
            className="flex flex-row rounded-lg items-center border px-3 border-gray-400 hover:cursor-pointer"
            onClick={addNewTaskHandler}
          >
            <FiPlus className="text-gray-500 " />
            <p className="text-xs font-semibold text-gray-500 px-2 ">Add New</p>
          </div>
        </div>
      </div>
      <div className="flex flex-row w-full h-full mt-4 px-6 ">
        {showForm ? (
          <div className="flex flex-col w-3/4 pr-6">
            <div className="flex flex-row flex-wrap w-full justify-start py-3 gap-4">
              {getFilteredTasks?.map((task) => (
                <TaskCard key={task.title} task={task} onClick={openModal} />
              ))}
            </div>
          </div>
        ) : (
          <div className="flex flex-col w-full pr-6">
            {getFilteredTasks?.length ? (
              <div className="flex flex-row flex-wrap w-full justify-start py-3 gap-4">
                {getFilteredTasks?.map((task) => (
                  <TaskCard key={task._id} task={task} onClick={openModal} />
                ))}
              </div>
            ) : (
              <div className="flex flex-row items-center justify-center w-full h-full">
                <p className="text-2xl font-semibold">No products found 😔</p>
              </div>
            )}
          </div>
        )}
        {modalIsOpen && selectedTask && (
          <TaskDetailsModal
            closeModal={() => setModalIsOpen(false)}
            task={selectedTask}
          />
        )}
        {showForm && (
          <div className="flex flex-col items-start mt-3 w-2/6 ">
            <div className="bg-white rounded-md w-full p-4 shadow-sm ">
              <div className="flex flex-row items-center justify-between w-full">
                <p className="text-sm font-semibold">Add New Task</p>
                <FiX
                  className="text-gray-400 hover:cursor-pointer"
                  onClick={() => setShowForm(false)}
                />
              </div>

              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col w-full mt-4 gap-1">
                  <label className="text-sm text-gray-400 pb-1">Title</label>
                  <input
                    type="text"
                    className="w-full border border-gray-400 rounded-sm px-2 py-1 text-xs"
                    {...register("title", { required: "Title is required" })}
                  />
                  <div className="flex flex-col w-full mt-2">
                    <label className="text-sm text-gray-400 pb-1">
                      Description
                    </label>
                    <textarea
                      className="w-full border border-gray-400 rounded-sm px-2 py-1 text-xs"
                      {...register("description", {
                        required: "Description is required",
                      })}
                    />
                  </div>

                  <div className="flex flex-row w-full mt-2">
                    <div className="flex flex-col w-1/2 pr-2">
                      <label className="text-sm text-gray-400 pb-1">
                        Due Date
                      </label>
                      <input
                        type="date"
                        className="w-full border border-gray-400 rounded-sm px-2 py-1 text-xs"
                        {...register("dueDate", {
                          required: "Due Date is required",
                        })}
                      />
                    </div>
                    <div className="flex flex-col w-1/2 ">
                      <label className="text-sm text-gray-400 pb-1">
                        Select Priority
                      </label>
                      <select
                        className="w-full bg-white border border-gray-400 rounded-sm px-2 py-1 text-xs hover:cursor-pointer "
                        defaultValue="Low"
                        {...register("priority", {
                          required: "Priority is required",
                        })}
                      >
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="flex flex-row w-full mt-4">
                  <button
                    className="bg-[#2F57FA] rounded-md w-full py-2 text-white text-sm font-semibold"
                    type="submit"
                  >
                    Add Task
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default Home;
