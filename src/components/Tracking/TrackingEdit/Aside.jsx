import * as React from "react";
import { Typography } from "@mui/material";
import { useRecordContext } from "react-admin";

export const Aside = () => {
  const record = useRecordContext();
  return (
    <div style={{ width: 200, margin: "1em" }}>
      <Typography variant="h6">Post details</Typography>
      {record && (
        <Typography variant="body2">
          Creation date: {record.createdAt}
        </Typography>
      )}
    </div>
  );
};
