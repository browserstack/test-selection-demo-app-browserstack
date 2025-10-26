import React, { useState } from 'react';
import { toast } from 'react-toastify';
import API from '../../services/api';

function Tasks({ tasks, users, loading, fetchTasks, fetchAnalytics }) {
  const [newTask, setNewTask] = useState({ title: '', priority: 'medium', assignedTo: '' });
  
  const handleAddTask = async (e) => {
    e.preventDefault();
    if (!newTask.title) return;

    try {
      await API.tasks.create(newTask);
      setNewTask({ title: '', priority: 'medium', assignedTo: '' });
      fetchTasks();
      fetchAnalytics();
      toast.success('Task added successfully!');
    } catch (error) {
      console.error('Error adding task:', error);
      toast.error('Error adding task');
    }
  };

  const handleToggleTask = async (taskId, completed) => {
    try {
      await API.tasks.toggleComplete(taskId, completed);
      fetchTasks();
      fetchAnalytics();
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  return (
    <div className="tab-content">
      <div className="form-section">
        <h2>Add New Task</h2>
        <form onSubmit={handleAddTask} className="task-form">
          <input
            type="text"
            placeholder="Task Title"
            value={newTask.title}
            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
          />
          <select
            value={newTask.priority}
            onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
          >
            <option value="low">Low Priority</option>
            <option value="medium">Medium Priority</option>
            <option value="high">High Priority</option>
          </select>
          <select
            value={newTask.assignedTo}
            onChange={(e) => setNewTask({ ...newTask, assignedTo: e.target.value })}
          >
            <option value="">Unassigned</option>
            {users.map(user => (
              <option key={user.id} value={user.id}>{user.name}</option>
            ))}
          </select>
          <button type="submit" disabled={loading}>
            {loading ? 'Adding...' : 'Add Task'}
          </button>
        </form>
      </div>

      <div className="tasks-section">
        <h2>Tasks ({tasks.length})</h2>
        <div className="tasks-list">
          {tasks.map((task) => (
            <div key={task.id} className={`task-item ${task.completed ? 'completed' : ''}`}>
              <div className="task-content">
                <h3>{task.title}</h3>
                <span className={`priority-badge ${task.priority}`}>{task.priority}</span>
                {task.assignedTo && (
                  <span className="assigned-to">
                    Assigned to: {users.find(u => u.id === task.assignedTo)?.name || 'Unknown'}
                  </span>
                )}
              </div>
              <button
                className="toggle-btn"
                onClick={() => handleToggleTask(task.id, task.completed)}
              >
                {task.completed ? '✓' : '○'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Tasks;
