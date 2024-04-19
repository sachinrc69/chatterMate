import React from "react";

function GenderCheckBox({ inputs, setInputs }) {
  return (
    <div className="flex">
      <div className="form-control">
        <label className="label gap-2  cursor-pointer">
          <span className="label-text  text-white ">Male</span>
          <input
            type="checkbox"
            defaultChecked
            className="checkbox bg-white"
            checked={inputs.gender === "male"}
            onClick={() => setInputs({ ...inputs, gender: "male" })}
          />
        </label>
      </div>
      <div className="form-control">
        <label className="label gap-2 cursor-pointer">
          <span className="label-text  text-white "> Female</span>
          <input
            type="checkbox"
            defaultChecked
            className="checkbox bg-white"
            checked={inputs.gender === "female"}
            onClick={() => setInputs({ ...inputs, gender: "female" })}
          />
        </label>
      </div>
    </div>
  );
}

export default GenderCheckBox;
