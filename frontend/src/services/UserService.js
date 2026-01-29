import { BASE_URL } from '../shared/constants';

export const USER_SERVICE = {
  get: async (token) => {
    const response = await fetch(`${BASE_URL}/users`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return await response.json();
  },

  getById: async (id, token) => {
    const response = await fetch(`${BASE_URL}/users/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return await response.json();
  },
};
