export const sortTasksByDate = (tasks_ls_name) => {
  return tasks_ls_name.sort((a, b) => b.date - a.date);
};

export const getDate = (timestamp) => {
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const date = new Date(timestamp);

  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();

  // Get the day of the week
  const dayOfWeek = daysOfWeek[date.getDay()];

  return `${dayOfWeek}: ${year}-${month}-${day} : ${hours}:${minutes}`;
};
