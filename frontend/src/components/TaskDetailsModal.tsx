import { ITaskData } from "../types/types";
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { useEffect } from "react";
import { useMutation, useQueryClient } from "react-query";
import { deleteTaskMutation, updateTaskMutation } from "../api/api";
interface ITaskDetailsModalProps {
  task: ITaskData;
  closeModal: () => void;
}

const TaskDetailsModal = ({ task, closeModal }: ITaskDetailsModalProps) => {
  const queryClient = useQueryClient();

  console.log(task);
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<ITaskData>({
    defaultValues: {
      title: task?.title,
      description: task?.description,
      dueDate: new Date(task.dueDate).toISOString().substr(0, 10),
      priority: task?.priority,
      progress: task?.progress,
    },
  });

  const { mutate: updateTaskMutate } = useMutation<
    ITaskData,
    unknown,
    ITaskData
  >((newTask) => updateTaskMutation(task._id, newTask), {
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

  const { mutate: deleteTaskMutate } = useMutation<ITaskData, unknown, string>(
    (id) => deleteTaskMutation(id),
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries({ queryKey: ["tasks"] });
      },
    }
  );

  useEffect(() => {
    reset({
      title: task.title,
      description: task.description,
      dueDate: new Date(task.dueDate).toISOString().substr(0, 10),
      priority: task.priority,
      progress: task.progress,
    });
  }, [task, reset]);

  const onSubmit: SubmitHandler<ITaskData> = (data) => {
    updateTaskMutate(data);
  };

  const deleteTaskHandler = () => {
    deleteTaskMutate(task._id);
    closeModal();
  };

  return (
    <div className="w-full shadow-sm h-80 bg-white rounded-md mt-2 flex flex-col ">
      <div className="flex justify-between  items-center px-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold py-2 text-gray-800">
          Task Details
        </h3>
        <button onClick={closeModal}>
          <svg
            className="w-6 h-6 text-gray-500 hover:text-gray-700"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col px-4 items-start justify-center"
      >
        <label className="text-sm text-gray-400 pb-1">Title</label>
        <input
          type="text"
          className={`w-full border border-gray-400 rounded-sm px-2 py-1 text-xs ${
            errors?.title?.message !== undefined
              ? "border-red-500 focus:outline-none"
              : ""
          }`}
          {...register("title", { required: "Title is required" })}
        />
        {Boolean(errors?.title?.message) && (
          <p className="text-red-500 text-xs">{errors?.title?.message}</p>
        )}
        <div className="flex flex-col w-full mt-2">
          <label className="text-sm text-gray-400 pb-1">Description</label>
          <textarea
            className="w-full border border-gray-400 rounded-sm px-2 py-1 text-xs"
            {...register("description", {
              required: "Description is required",
            })}
          />
        </div>

        <div className="flex flex-row justify-between w-full mt-2">
          <div className="flex flex-col pr-2">
            <label className="text-sm text-gray-400 pb-1">Due Date</label>
            <input
              type="date"
              className="w-full border border-gray-400 rounded-sm px-2 py-1 text-xs"
              {...register("dueDate", {
                required: "Due Date is required",
              })}
            />
          </div>
          <div className="flex flex-col ">
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
          <div className="flex flex-col ">
            <label className="text-sm text-gray-400 pb-1">Progress</label>
            <select
              className="w-full bg-white border border-gray-400 rounded-sm px-2 py-1 text-xs hover:cursor-pointer "
              defaultValue="Todo"
              {...register("progress", {})}
            >
              <option value="Todo">Todo</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
        </div>
        <div className="flex flex-row justify-end px-2 pt-4 w-full">
          <button
            className="px-4 py-1 bg-blue-500 text-white rounded-sm hover:bg-blue-600 mr-2"
            type="submit"
          >
            Update
          </button>
          <button
            type="button"
            onClick={deleteTaskHandler}
            className="px-4 py-1 bg-blue-500 text-white rounded-sm hover:bg-blue-600"
          >
            Delete
          </button>
        </div>
      </form>
    </div>
  );
};

export default TaskDetailsModal;
