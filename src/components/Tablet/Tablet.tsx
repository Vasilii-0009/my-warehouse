import { useEffect, useState } from "react";
import { getUsers, getTodos } from "../../api/apiTable";
import avatar from "../../img/avatar.svg";
import "./Tablet.css";

interface User {
  id: number;
  username: string;
  email: string;
  tasks: number;
  todos?: { id: number; title: string; completed: boolean }[];
}

export const Tablet = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersData, todosData] = await Promise.all([
          getUsers(),
          getTodos(),
        ]);
        console.log("usersData", usersData);
        console.log("todosData", todosData);

        const usersWithTodos = usersData.map((user: any) => {
          const userTodos = todosData.filter(
            (todo: any) => todo.userId === user.id
          );
          return {
            ...user,
            todos: userTodos,
          };
        });
        console.log("usersWithTodos", usersWithTodos);

        setUsers(usersWithTodos);
      } catch (error) {
        console.error("Ошибка загрузки данных:", error);
      }
    };

    fetchData();
  }, []);
  return (
    <table className="tablet">
      <thead className="tablet__thead">
        <tr className="tablet__thead-tr">
          <th className="tablet__th cell__number">#</th>
          <th className="tablet__th cell__user">Username</th>
          <th className="tablet__th cell__tasks">to-do count</th>
        </tr>
      </thead>
      <tbody className="tablet__tbody">
        {users.map((user, index) => {
          console.log("user", user);
          return (
            <tr className="tablet__tbody-tr" key={user.id}>
              <td className="tablet__td cell__number">{index + 1}</td>
              <td className="tablet__td cell__user">
                <div className="tablet__user-container ">
                  <img src={avatar} alt="Аватарка" />
                  <div>
                    <div className="tablet__username">{user.username}</div>
                    <div className="tablet__email">{user.email}</div>
                  </div>
                </div>
              </td>
              <td className="tablet__td cell__tasks">{user.todos?.length}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
