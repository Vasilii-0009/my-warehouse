import { useEffect, useState, useTransition } from "react";
import { getTodos, getUsers } from "../../api/apiTable";
import { Todo, User } from "../../common/models";
import avatar from "../../img/avatar.svg";
import "./Tablet.css";

export const Tablet = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersData, todosData] = await Promise.all([
          getUsers(),
          getTodos(),
        ]);

        const usersWithTodos = usersData.map((user: User) => {
          const userTodos = todosData.filter(
            (todo: Todo) => todo.userId === user.id
          );
          return {
            ...user,
            todos: userTodos,
          };
        });

        startTransition(() => {
          setUsers(usersWithTodos);
        });
      } catch (error) {
        console.error("Ошибка загрузки данных:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {isPending && <div>Загрузка данных...</div>}

      <table className="tablet">
        <thead className="tablet__thead">
          <tr className="tablet__thead-tr">
            <th className="tablet__th cell__number">#</th>
            <th className="tablet__th cell__user">Username</th>
            <th className="tablet__th cell__tasks">to-do count</th>
          </tr>
        </thead>
        <tbody className="tablet__tbody">
          {users.map((user, index) => (
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
          ))}
        </tbody>
      </table>
    </div>
  );
};
