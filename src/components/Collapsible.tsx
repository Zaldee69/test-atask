import { Fragment, useMemo, useState } from "react";
import ChevronDownIcon from "../public/icons/ChevronDownIcon";
import { API } from "../config/API";
import StarIcon from "../public/icons/StarIcon";
import Spinner from "../public/icons/Spinner";
import { IRepos, IUsers } from "../types";

interface CollapsibleContentProps {
  toggle: (idx: number) => void;
  activeCollapse: number | null;
  id: number;
  name: string;
  wasFetchedIndex: Number[];
}

interface CollapsibleProps {
  data: IUsers[];
  wasFetchedIndex: Number[];
}

const Collapsible: React.FC<CollapsibleProps> = ({ data, wasFetchedIndex }) => {
  const [activeCollapse, setActiveCollapse] =
    useState<CollapsibleContentProps["activeCollapse"]>(null);

  const toggleCollapse = (idx: number) => {
    if (activeCollapse === idx) {
      setActiveCollapse(null);
    } else {
      setActiveCollapse(idx);
    }
  };

  return (
    <div className="w-11/12 mx-auto pb-5">
      {data?.map((res, idx) => (
        <CollapsibleContent
          key={idx}
          id={idx}
          name={res.login}
          activeCollapse={activeCollapse}
          toggle={toggleCollapse}
          wasFetchedIndex={wasFetchedIndex}
        />
      ))}
    </div>
  );
};

const CollapsibleContent: React.FC<CollapsibleContentProps> = ({
  toggle,
  activeCollapse,
  id,
  name,
  wasFetchedIndex,
}) => {
  const [repos, setRepos] = useState<IRepos[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchRepos = () => {
    const filteredFetchedIndex =
      wasFetchedIndex.filter((idx) => idx === id).length > 1;

    if (activeCollapse === id && !filteredFetchedIndex) {
      wasFetchedIndex.push(id);
      setIsLoading(true);
      API.get(`/users/${name}/repos`).then((res) => {
        setRepos(res.data);
        setIsLoading(false);
      });
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useMemo(fetchRepos, [activeCollapse]);

  return (
    <Fragment>
      <button
        onClick={() => toggle(id)}
        className="bg-gray-200 rounded flex justify-between px-5 mt-4 py-2 items-center w-full"
      >
        {name}{" "}
        <div
          className={`transition-all duration-300 ease-in-out ${
            activeCollapse === id ? "rotate-180" : "rotate-0"
          }`}
        >
          <ChevronDownIcon />
        </div>
      </button>
      <div
        className={`transition-all duration-300 ease-in-out ${
          activeCollapse !== id ? "h-0 opacity-0" : "h-auto opacity-100"
        } overflow-hidden`}
      >
        {isLoading ? (
          <div className="flex justify-center mt-5">
            <Spinner />
          </div>
        ) : repos.length < 1 ? (
          <i className="px-5 mt-3 block text-slate-400">
              "{name}" has no repository
            </i>
        ) : (
          repos.map((repo, idx) => (
            <div
              key={idx}
              className="p-4 ml-5 flex gap-3 justify-between bg-gray-400 mt-3 rounded "
            >
              <div>
                <p className="font-semibold">{repo.name}</p>
                <p>{repo.description}</p>
              </div>
              <div className="flex gap-2">
                {repo.stargazers_count} <StarIcon />
              </div>
            </div>
          ))
        )}
      </div>
    </Fragment>
  );
};

export default Collapsible;
