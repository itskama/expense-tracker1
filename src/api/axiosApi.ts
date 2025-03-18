import axios from 'axios';

const axiosApi = axios.create({
  baseURL: 'https://expense-tracker-a2da9-default-rtdb.europe-west1.firebasedatabase.app/',
});

export default axiosApi;
