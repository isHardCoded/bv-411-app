import { BASE_URL } from '../shared/constants';

export const TASK_SERVICE = {
  getAll: async (token) => {
    const response = await fetch(`${BASE_URL}/tasks`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return await response.json();
  },

  getById: async (id, token) => {
    const response = await fetch(`${BASE_URL}/tasks/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return await response.json();
  },

  create: async (task, token) => {
    const response = await fetch(`${BASE_URL}/tasks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(task),
    });

    return await response.json();
  },

  update: async (taskId, userId, task, token) => {
    const response = await fetch(`${BASE_URL}/tasks/${taskId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ userId, ...task }),
    });

    return await response.json();
  },

  deleteAll: async () => {},

  deleteById: async (id, token) => {
    await fetch(`${BASE_URL}/tasks/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
};
