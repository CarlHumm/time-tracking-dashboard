export async function fetchData(url) {
  const localData = localStorage.getItem('timedata');

  if (localData) {
    try {
      return JSON.parse(localData);
    } catch (error) {
      console.warn("Invalid state attempting to fetch new data!");
      localStorage.removeItem('timedata');
    }
  }

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response Status: ${response.status}`);
    }
    const data = await response.json();

    localStorage.setItem('timedata', JSON.stringify(data));

    return data;
  } catch (error) {
    console.error("Fetch error:", error.message);
    return null;
  }
  }