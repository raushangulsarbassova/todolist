import React, { useState } from "react";
import { ITask } from "../../ts/types";
import KebabMenu from "../../assets/kebab-menu.svg";
import TrasnIcon from "../../assets/trash.svg";
import AddCheckIcon from "../../assets/add_check.svg";
import "./index.css";

type TaskProps = {
  task: ITask;
  setTasks: React.Dispatch<React.SetStateAction<ITask[]>>;
};

const Task: React.FC<TaskProps> = ({ task, setTasks }) => {
  const [isKebabMenuOpen, setIsKebabMenuOpen] = useState<boolean>(false);

  const handleComplete = () => {
    if (task.status !== "Trash") {
      setTasks((prev) =>
        prev.map((t) => (t.id === task.id ? { ...t, status: "Done" } : t))
      );
    }
  };

  const handleUncomplete = () => {
    if (task.status !== "Trash") {
      setTasks((prev) =>
        prev.map((t) => (t.id === task.id ? { ...t, status: "To do" } : t))
      );
    }
  };

  const handleDelete = () => {
    setTasks((prev) =>
      prev.map((t) => (t.id === task.id ? { ...t, status: "Trash" } : t))
    );
  };

  const handlePermanentDelete = () => {
    setTasks((prev) => prev.filter((t) => t.id !== task.id));
  };

  const handleRestore = () => {
    setTasks((prev) =>
      prev.map((t) => (t.id === task.id ? { ...t, status: "To do" } : t))
    );
  };

  const handleKebabMenuClick = () => {
    setIsKebabMenuOpen((prev) => !prev);
  };

  return (
    <div className="task-container">
      <div className="task-container-wrapper">
        <img src={KebabMenu} alt="Kebab menu" onClick={handleKebabMenuClick} />
        {isKebabMenuOpen && (
          <div className="kebab-menu-container">
            {task.status !== "Trash" ? (
              <button onClick={handleDelete} className="btn-tooltip">
                <img src={TrasnIcon} alt="trash" />
                Move to Trash
              </button>
            ) : (
              <div className="wrapper">
                <button onClick={handlePermanentDelete} className="btn-tooltip">
                  <img src={TrasnIcon} alt="trash" />
                  Delete Forever
                </button>
                <button onClick={handleRestore} className="btn-tooltip"> 
                  <img src={AddCheckIcon} alt="add check icon" />
                  Move Back to To Do
                </button>
              </div>
            )}
          </div>
        )}
      </div>
      <input
        type="checkbox"
        checked={task.status === "Done" ? true : undefined}
        onChange={task.status === "Done" ? handleUncomplete : handleComplete}
        className="task-checkbox"
      />
      <span>{task.title}</span>
    </div>
  );
};

export default Task;
