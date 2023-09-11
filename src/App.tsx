import { useRef, useState } from "react";
import "./App.css";
import Collapse from "./components/Collapsible";
import { API } from "./config/API";
import Spinner from "./public/icons/Spinner";
import { IUsers } from "./types";

let wasFetchedIndex: Number[] = [];
let searchedUsername = "";

function App() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [users, setUsers] = useState<IUsers[] | undefined>([]);

  const handleSearchUsers = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    wasFetchedIndex = [];
    const username = inputRef.current?.value;

    if (searchedUsername === username) return;

    setIsLoading(true);

    API.get(`/search/users?q=${username}&per_page=5`)
      .then((res) => {
        if (res.data.items.length > 1) {
          setUsers(res.data.items);
        } else {
          setUsers(undefined);
        }
        searchedUsername = username!;
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        new Error(err);
      });
  };

  return (
    <div className="bg-gray-200 flex min-h-screen p-10">
      <div className="max-w-lg flex-1 mx-auto pt-10 bg-white rounded-md">
        <form
          onSubmit={handleSearchUsers}
          className="flex flex-col justify-center items-center"
        >
          <input
            ref={inputRef}
            type="text"
            placeholder="Enter username"
            className="bg-gray-200 rounded focus:outline-none w-11/12 px-5 py-2"
          />
          <button
            disabled={isLoading}
            type="submit"
            className={`w-11/12 h-10 mt-5 rounded flex justify-center items-center gap-3 text-white bg-blue-500 ${
              isLoading && "cursor-not-allowed"
            }`}
          >
            {isLoading ? (
              <>
                <Spinner />
                Searching...
              </>
            ) : (
              "Search"
            )}
          </button>
        </form>
        <div>
          {users === undefined && !isLoading ? (
            <i className="px-5 mt-3 block text-slate-400">
              Users "{inputRef.current?.value}" not found
            </i>
          ) : (
            <Collapse wasFetchedIndex={wasFetchedIndex} data={users!} />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
