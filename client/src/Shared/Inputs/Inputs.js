import React from "react";
import { useField } from "formik";
import { TextField } from "@material-ui/core";
import ImageUpload from "../ImageUpload/ImageUpload";
import "./Inputs.css"

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

export const CustomFileInput = (props) => {
  const [field, meta] = useField(props);
  return (
    <div className="mx-3 mt-3 py-4">
      <ImageUpload center type="file" {...props} {...field} />
      {meta.error && <p className="Center" > {meta.error} </p>}
    </div>
  );
};
