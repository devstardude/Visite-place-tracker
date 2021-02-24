import React from "react";
import { useField } from "formik";
import { TextField, MenuItem } from "@material-ui/core";
import ImageUpload from "../ImageUpload/ImageUpload";
import "./Inputs.css";

const placeTypes = [
  {
    value: "urban",
    label: "Urban",
  },
  {
    value: "nature",
    label: "Nature",
  },
  {
    value: "sea",
    label: "Sea",
  },
  {
    value: "other",
    label: "Other",
  },

];


export const CustomTextInput = (props) => {
  const [field, meta] = useField(props);
  return (
    <div className="m-3 py-2">
      <TextField
        {...props}
        {...field}
        fullWidth
        error={meta.touched && meta.error ? meta.error : false}
        id={props.name}
        label={props.label}
        helperText={meta.error}
        InputLabelProps={{
          style: { color: "grey" },
        }}
        type={props.password && "password"}
      />
    </div>
  );
};

export const CustomSelectInput = (props) => {
  const [field, meta] = useField(props);
  return (
    <div className="m-3">
      <TextField
        error={meta.touched && meta.error ? meta.error : false}
        {...props}
        {...field}
        InputLabelProps={{
          style: { color: "grey" },
        }}
        fullWidth
        id="standard-select-currency"
        label="Select Type of Place"
        select
        helperText={meta.error}
      >
        {placeTypes.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
    </div>
  );
};

export const CustomFileInput = (props) => {
  const [field, meta] = useField(props);
  return (
    <div className="mx-3 mt-3 py-4">
      <ImageUpload center type="file" {...props} {...field} />
      {meta.error && <p className="Center" > {meta.error} </p>}
    </div>
  );
};
