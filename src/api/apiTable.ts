export const getUsers = async () => {
  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/users`);

    if (!response.ok) {
      throw new Error(`Ошибка: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
};

export const getTodos = async () => {
  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/todos`);

    if (!response.ok) {
      throw new Error(`Ошибка: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
};
