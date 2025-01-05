import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode; 
  negative?: boolean; 
}

const Button: React.FC<ButtonProps> = ({ children, negative = false, ...props }) => {
  let buttonStyle =
    "w-48 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800";

  if (negative) {
    buttonStyle =
      "w-48 text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800";
  }

  return (
    <button className={buttonStyle} {...props}>
      {children}
    </button>
  );
};

export default Button;
