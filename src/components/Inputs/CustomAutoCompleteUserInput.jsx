import * as React from "react";
import { fetchUtils } from "react-admin";
import { Grid } from "@mui/material";
import {
  TextInput,
  AutocompleteInput,
  ArrayInput,
  SimpleFormIterator,
} from "react-admin";
import { useFormContext, useWatch } from "react-hook-form";
import _ from "lodash";

export const CustomAutoCompleteUserInput = () => {
  const name = useWatch({ name: "name" });
  const phone = useWatch({ name: "phone" });
  const { setValue } = useFormContext();
  const [showAutoCompleteInput, setShowAutoCompleteInput] =
    React.useState(true);
  const [userData, setUserData] = React.useState([]);
  const [searchData, setSearchData] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  const apiUrl = `${window.location.host}/gloriglobalsukses-backend/v1`;
  const fetchJson = (url, options = {}) => {
    if (!options.headers) {
      options.headers = new Headers();
      // { Accept: "application/json" });
    }

    const token = localStorage.getItem("token");
    options.headers.set("Authorization", `Bearer ${token}`);
    options.headers.set("X-Custom-Header", `foobar`);
    return fetchUtils.fetchJson(url, options);
  };

  const getTrackings = _.debounce(async (inputValue) => {
    setLoading(true);
    const response = await fetchJson(
      `${apiUrl}/tracking?name=${inputValue}&limit=100&sortBy=name&populate=user`
    );
    const result =
      response?.json?.results?.length > 0
        ? response?.json?.results?.reduce((acc, currentValue) => {
            if (
              acc.findIndex((item) => item.name === currentValue.name) === -1
            ) {
              return [
                ...acc,
                {
                  name: currentValue?.name,
                  phone: currentValue?.phone,
                  address: currentValue?.address,
                  additionalPhoneNumbers: currentValue?.additionalPhoneNumbers,
                },
              ];
            }
            return acc;
          }, [])
        : [{ id: "", name: "No users found", phone: 0 }];

    setUserData(result);
    return result;
  }, 1000);

  React.useEffect(() => {
    if (searchData?.length > 2 && !phone) getTrackings(searchData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchData]);

  React.useEffect(() => {
    if (userData?.length > 0) {
      const AutoCompletePhoneFieldValue = userData.find(
        (item) => item.name === name
      );
      setValue("phone", AutoCompletePhoneFieldValue?.phone);
      setValue("address", AutoCompletePhoneFieldValue?.address);
      setValue(
        "additionalPhoneNumbers",
        AutoCompletePhoneFieldValue?.additionalPhoneNumbers
      );
      setLoading(false);
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
      <Grid md={12} paddingX={2}>
        <p style={{ color: "gray" }}>
          {loading ? "Sistem sedang loading data, mohon menunggu..." : ""}
        </p>
      </Grid>
      <Grid md={6} paddingX={2}>
        {showAutoCompleteInput ? (
          <>
            <AutocompleteInput
              fullWidth
              onCreate={(value) => {
                setShowAutoCompleteInput(false);
                return { name: value };
              }}
              value={name}
              source="name"
              label="Nama"
              choices={userData}
              optionValue="name"
              setFilter={(e) => {
                console.log("setFilter", e);
                setSearchData(e);
              }}
              filterToQuery={(value) => ({ name: value })}
            />
          </>
        ) : (
          <TextInput fullWidth source="name" label="Nama" />
        )}
      </Grid>
      <Grid md={6} paddingX={2}>
        <TextInput fullWidth label="No HP" source="phone" />
      </Grid>
      <Grid md={12} paddingX={2}>
        <ArrayInput label="No HP Tambahan" source="additionalPhoneNumbers">
          <SimpleFormIterator>
            <TextInput fullWidth label="No HP" source="phone" />
          </SimpleFormIterator>
        </ArrayInput>
      </Grid>
      <Grid md={6} paddingX={2}>
        <TextInput fullWidth source="address" label="Alamat" />
      </Grid>
    </>
  );
};
