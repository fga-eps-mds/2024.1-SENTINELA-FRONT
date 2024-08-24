import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { TextField, IconButton } from "@mui/material";
import { PhotoCamera } from "@mui/icons-material";

export default function FieldFile({ label, onChange, disabled, value }) {
  const [fileName, setFileName] = useState("");
  const [fileURL, setFileURL] = useState("");

  useEffect(() => {
    if (value) {
      if (value instanceof File) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setFileURL(reader.result);
        };
        reader.readAsDataURL(value);
      } else if (typeof value === "string") {
        setFileURL(value);
      }
    }
  }, [value]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name);
      const reader = new FileReader();
      reader.onloadend = () => {
        setFileURL(reader.result);
      };
      reader.readAsDataURL(file);
      onChange(file);
    }
  };

  return (
    <TextField
      label={label}
      value={fileName}
      variant="filled"
      disabled={disabled}
      sx={{
        margin: ".7rem",
        background: "#EAE3D7",
        borderRadius: "5px",
        position: "relative",
      }}
      InputProps={{
        endAdornment: (
          <IconButton color="primary" component="label" disabled={disabled}>
            <PhotoCamera />
            <input type="file" hidden onChange={handleFileChange} />
          </IconButton>
        ),
        startAdornment: fileURL && (
          <div
            style={{
              position: "absolute",
              right: "50px",
              top: "50%",
              transform: "translateY(-50%)",
            }}
          >
            <img
              src={fileURL}
              alt="Preview"
              style={{
                maxWidth: "50px",
                maxHeight: "50px",
                borderRadius: "5px",
                objectFit: "cover",
              }}
            />
          </div>
        ),
      }}
    />
  );
}

FieldFile.propTypes = {
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  value: PropTypes.oneOfType([PropTypes.instanceOf(File), PropTypes.string]),
};
