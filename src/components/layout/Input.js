import React from "react";

const Input = (props) => {
  const {
    type = "text",
    placeholder = "placeholder text",
    name = "name",
    value = "value",
    onChange,
  } = props;
  return (
    <input
      type={type}
      className="form-control w-56 md:w-64 xl:w-full shadow appearance-none border rounded  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      placeholder={placeholder}
      name={name}
      value={value}
      onChange={onChange}
    />
  );
};

export default Input;
