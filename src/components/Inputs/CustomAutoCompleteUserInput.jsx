import * as React from "react";
import { Grid } from "@mui/material";
import { TextInput, useGetList, AutocompleteInput } from "react-admin";
import { useFormContext, useWatch } from "react-hook-form";

export const CustomAutoCompleteUserInput = () => {
  const name = useWatch({ name: "name" });
  const { setValue } = useFormContext();
  const [showAutoCompleteInput, setShowAutoCompleteInput] =
    React.useState(true);
  const { data } = useGetList("tracking", {
    pagination: { page: 1, perPage: 1000 },
    sort: { field: "name", order: "ASC" },
  });
  const choices =
    data?.length > 0
      ? data.reduce((acc, currentValue) => {
          if (acc.findIndex((item) => item.name === currentValue.name) === -1) {
            return [
              ...acc,
              {
                name: currentValue?.name,
                phone: currentValue?.phone,
                address: currentValue?.address,
              },
            ];
          }
          return acc;
        }, [])
      : [{ id: "", name: "No users found", phone: 0 }];

  React.useEffect(() => {
    if (choices?.length > 0) {
      const AutoCompletePhoneFieldValue = choices.find(
        (item) => item.name === name
      );
      setValue("phone", AutoCompletePhoneFieldValue?.phone);
      setValue("address", AutoCompletePhoneFieldValue?.address);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name, setValue]);

  React.useEffect(() => {
    if (name?.length === 0) {
      setShowAutoCompleteInput(true);
    }
  }, [name]);

  return (
    <>
      <Grid md={6} paddingX={2}>
        {showAutoCompleteInput ? (
          <AutocompleteInput
            fullWidth
            onCreate={(value) => {
              setShowAutoCompleteInput(false);
              return { name: value };
            }}
            value={name}
            source="name"
            label="Nama"
            choices={choices}
            optionValue="name"
          />
        ) : (
          <TextInput fullWidth source="name" label="Nama" />
        )}
      </Grid>
      <Grid md={6} paddingX={2}>
        <TextInput fullWidth label="No HP" source="phone" />
      </Grid>
      <Grid md={6} paddingX={2}>
        <TextInput fullWidth source="address" label="Alamat" />
      </Grid>
    </>
  );
};
