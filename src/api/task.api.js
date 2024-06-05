class Task {
  async fetchCollection() {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/tasks/`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "token": localStorage.getItem("token"),
      },
    });
    return await response.json();
  }

  async createCollection(name, category) {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/tasks/create`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "token": localStorage.getItem("token"),
        },
        body: JSON.stringify({
          name: name,
          category: category,
        }),
      }
    );
    return await response.json();
  }

  async deleteCollection(collectionId) {
    const response = await fetch(
      `${
        import.meta.env.VITE_API_URL
      }/tasks/deleteCollection/?id=${collectionId}`,
      {
        method: "DELETE",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "token": localStorage.getItem("token"),
        },
      }
    );
    return await response.json();
  }

  async fetchallTask(collectionId) {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/tasks/getTasks/?id=${collectionId}`,
      {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "token": localStorage.getItem("token"),
        },
      }
    );
    return await response.json();
  }

  async createTask(title, desc, collectionId) {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/tasks/createTask/`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "token": localStorage.getItem("token"),
        },
        body: JSON.stringify({
          title,
          desc,
          collectionId,
        }),
      }
    );
    return await response.json();
  }

  async deleteTask(taskId) {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/tasks/deleteTask?id=${taskId}`,
      {
        method: "DELETE",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "token": localStorage.getItem("token"),
        },
      }
    );
    return await response.json();
  }

  async updateTask(title, desc, status = false, taskId) {
    const response = await fetch(
      `${
        import.meta.env.VITE_API_URL
      }/tasks/updateTask?id=${taskId}&title=${title}&desc=${desc}&status=${status}`,
      {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "token": localStorage.getItem("token"),
        },
      }
    );
    return await response.json();
  }

  async share(email, collectionId) {
    const response = await fetch(
      `${
        import.meta.env.VITE_API_URL
      }/tasks/share?email=${email}&collectionId=${collectionId}`,
      {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "token": localStorage.getItem("token"),
        },
      }
    );
    return await response.json();
  }
}

const task = new Task();
export default task;
