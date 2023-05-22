import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

import TabSwitch from "./components/TabSwitch";
import Task from "./components/Task";
import { ITask } from "./ts/types";
import PlusIcon from "./assets/+.svg";
import "./app.css";


const tabs = ["To do", "Done", "Trash"];

function App() {
  const [activeTab, setActiveTab] = useState<(typeof tabs)[0]>(tabs[0]);
  const [addTaskOpen, setAddTaskOpen] = useState<boolean>(false);
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState<string>("");

  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleAddTask = () => {
    if (newTaskTitle) {
      setTasks((prev) => [
        ...prev,
        { id: uuidv4(), title: newTaskTitle, status: "To do" },
      ]);
      setNewTaskTitle("");
      setAddTaskOpen(false);
    }
  };

  const handlePlusBtnClick = () => {
    setAddTaskOpen((prev) => !prev);
  };

  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <div className="app">
              <h1 className="header-primary | u-margin-bottom-small">
                Simple to do list
              </h1>
              <p className="text-primary | u-margin-bottom-xlarge">
                Today is awesome day. The weather is awesome, you are awesome
                too!
              </p>
              <div className="row | u-margin-bottom-large">
                <TabSwitch
                  tabs={tabs}
                  activeTab={activeTab}
                  onChange={(tab) => setActiveTab(tab)}
                />
                <button className="plus-btn" onClick={handlePlusBtnClick}>
                  <img
                    src={PlusIcon}
                    alt="Add new task"
                    className={
                      addTaskOpen ? "plus-btn--active" : "plus-btn--passive"
                    }
                  />
                </button>
                {addTaskOpen && (
                  <div className="add-task">
                    <p className="add-task-text">Add New To Do</p>
                    <textarea
                      className="add-task-input"
                      placeholder="Your text"
                      onChange={(e) => setNewTaskTitle(e.target.value)}
                    />
                    <button className="btn-blue" onClick={handleAddTask}>
                      Add
                    </button>
                  </div>
                )}
              </div>
              <div className="container">
                <h3 className="active-tab | u-margin-bottom-small">
                  {activeTab}
                </h3>
                <hr className="solid" />
                {tasks
                  .filter((task) => task.status === activeTab)
                  .map((task) => (
                    <Task key={task.id} task={task} setTasks={setTasks} />
                  ))}
              </div>
            </div>
          </>
        }
      />
    </Routes>
  );
}

export default App;
