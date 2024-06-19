import axios from "axios";

export const getUserDetails = async () => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  if (!user || !user.token) {
    throw new Error('No user logged in');
  }
  const response = await axios.get(`http://localhost:3036/user`, {
    headers: { Authorization: `Bearer ${user.token}` }
  });
  return response.data;
};

export const login = async (email: string, password: string) => {
  const result = await axios.get(`http://localhost:3036/checkuser/${email}/${password}`, { withCredentials: true });
  if (result.data.token) {
    localStorage.setItem("user", JSON.stringify(result.data));
  }
  return result.data;
};
export const logout = () => {
  localStorage.removeItem("user");
};

export const getCurrentUser = () => {
  // console.log((localStorage.getItem("user")),"getcurrentuser");
  return JSON.parse(localStorage.getItem("user") || '{}');
};
