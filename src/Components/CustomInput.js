import React from "react";

const CustomInput = (props) => {
  const { type, label, i_id, i_class, name,style={} ,value, onChng, onBlr } = props;
  return (
    <div className="form-group mt-3">
      <label className="mb-1 h6 text" htmlFor={label}>
        {label}
      </label>
      <input
        type={type}
        style={style}
        className={`form-control`}
        id={i_id}
        placeholder={label}
        name={name}
        value={value}
        onChange={onChng}
        onBlur={onBlr}
      />
    </div>
  );
};

export default CustomInput;
