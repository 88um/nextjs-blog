"use client";

import { PuffLoader} from "react-spinners";

const Loader = () => {
  return (
    <div
      className="
      h-[70vh]
      flex 
      flex-col 
      justify-center 
      items-center 
    "
    >
      <div className="hidden dark:flex">
        <PuffLoader size={100} color="white" />
      </div>
      <div className="dark:hidden ">
      <PuffLoader size={100} color={'black'} />
      </div>
      
    </div>
  );
};

export default Loader;