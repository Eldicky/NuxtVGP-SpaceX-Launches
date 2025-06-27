type Launch = { launch_date_local: string };

export const filterByYear = (launches: Launch[], year: number) => {
  if (!year) return launches;
  return launches.filter(launch => new Date(launch.launch_date_local).getFullYear() === year);
}