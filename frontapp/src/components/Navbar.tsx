import { MouseEventHandler, ReactNode, useState } from "react";
import SignUpDialog from "./SignUpDialog.tsx";

const Navbar = () => {
  const [hidden, setHidden] = useState(true);
  const MenuItem = (props: {
    children: ReactNode;
    onClick: MouseEventHandler<HTMLDivElement>;
  }) => {
    return (
      <div
        className="hover:cursor-pointer hover:bg-neutral-content py-6 w-full text-center"
        onClick={props.onClick}
      >
        {props.children}
      </div>
    );
  };

  return (
    <div className="navbar bg-base-100 relative left-0 right-0 shadow-md">
      <div className="flex-none">
        <button
          className="hover:border-none focus:border-none focus:outline-none bg-transparent"
          onMouseOver={() => setHidden(false)}
          onClick={() => setHidden(!hidden)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block w-5 h-5 stroke-current"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </button>
      </div>
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">daisyUI</a>
      </div>
      <div className="flex-none">
        <button className="btn btn-square btn-ghost">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block w-5 h-5 stroke-current"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
            ></path>
          </svg>
        </button>
      </div>
      <div
        className={`${
          hidden ? "hidden" : "absolute"
        } flex-col shadow-md w-full top-full right-0 left-0 z-20 bg-white`}
        onMouseLeave={() => setHidden(true)}
      >
        <MenuItem>List</MenuItem>
        <MenuItem>Login</MenuItem>
        <MenuItem
          onClick={() => {
            (document.getElementById("signUpModal") as any).showModal();
          }}
        >
          SignUp
        </MenuItem>
      </div>
      <SignUpDialog />
    </div>
  );
};

export default Navbar;
