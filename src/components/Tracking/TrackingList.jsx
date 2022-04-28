import * as React from "react";
import { useMediaQuery } from "@mui/material";
import {
  ChipField,
  Datagrid,
  DateField,
  EditButton,
  List,
  SelectField,
  SelectInput,
  ShowButton,
  SimpleList,
  TextField,
  TextInput,
} from "react-admin";
import BulkUpdateStatusButton from "../Buttons/BulkUpdateStatusButton";

const trackingFilters = [
  <TextInput label="Resi" source="resi" />,
  <TextInput label="Barang" source="item" />,
  <TextInput label="No HP" source="phone" />,
  <TextInput label="Alamat" source="address" />,
  <TextInput label="SO" source="salesOrder" />,
  <SelectInput
    label="Status WA"
    source="sendMessageStatus"
    choices={[
      { id: true, name: "Terkirim" },
      { id: false, name: "Belum Terkirim" },
    ]}
  />,
  <SelectInput
    source="status"
    choices={[
      {
        id: "SUDAH DIPESAN DAN BARANG READY",
        name: "SUDAH DIPESAN DAN BARANG READY",
      },
      {
        id: "SUDAH DIPESAN DAN BARANG PRODUKSI",
        name: "SUDAH DIPESAN DAN BARANG PRODUKSI",
      },
      {
        id: "SUDAH DIKIRIM VENDOR KE GUDANG CHINA",
        name: "SUDAH DIKIRIM VENDOR KE GUDANG CHINA",
      },
      {
        id: "SUDAH TIBA DIGUDANG CHINA",
        name: "SUDAH TIBA DIGUDANG CHINA",
      },
      { id: "BARANG LOADING KE BATAM", name: "BARANG LOADING KE BATAM" },
      {
        id: "BARANG KOMPLIT ITEM & SUDAH CLEAR DP",
        name: "BARANG KOMPLIT ITEM & SUDAH CLEAR DP",
      },
      {
        id: "BARANG KOMPLIT ITEM & BELUM CLEAR DP",
        name: "BARANG KOMPLIT ITEM & BELUM CLEAR DP",
      },
      {
        id: "DELAY - RANDOM CHECK CHINA",
        name: "DELAY - RANDOM CHECK CHINA",
      },
    ]}
  />,
  <SelectInput
    source="label"
    choices={[
      { id: "retailgeneral", name: "Barang Retail/General" },
      { id: "kids", name: "Barang Anak" },
      { id: "cosmetic", name: "Cosmetic" },
    ]}
  />,
  <SelectInput
    source="delay"
    choices={[
      { id: true, name: "Ya" },
      { id: false, name: "Tidak" },
    ]}
  />,
];

const TrackingBulkActionButtons = (props) => (
  <React.Fragment>
    <BulkUpdateStatusButton label="Bulk Updata Status" {...props} />
  </React.Fragment>
);

export const TrackingList = (props) => {
  const isSmall = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  console.log("props", props);
  const postRowStyle = (record, index) => ({
    backgroundColor: record.read === false ? "rgba(0,0,0,0.2)" : "white",
    color: record.read === false ? "black" : "white",
  });
  return (
    <List
      filters={trackingFilters}
      {...props}
      bulkActionButtons={<TrackingBulkActionButtons />}
    >
      {isSmall ? (
        <SimpleList
          primaryText={(record) => record.name}
          secondaryText={(record) => `${record.resi}`}
        />
      ) : (
        <Datagrid rowStyle={postRowStyle}>
          <TextField source="name" label="Nama" />
          <TextField source="phone" label="No. HP" />
          <TextField source="address" label="Alamat" />
          <TextField source="item" label="Barang" />
          <TextField source="resi" label="No Resi" />
          <ChipField source="status" label="Status" />
          <TextField source="salesOrder" label="No. SO" />
          <DateField
            source="customerOrderDate"
            label="Tanggal Customer Order"
          />
          <DateField
            source="orderArrivedToWarehouseDate"
            label="Tanggal Terima Gudang"
          />
          <SelectField
            source="label"
            choices={[
              { id: "retailgeneral", name: "Barang Retail/General" },
              { id: "kids", name: "Barang Anak" },
              { id: "cosmetic", name: "Cosmetic" },
            ]}
          />
          <SelectField
            source="delay"
            choices={[
              { id: true, name: "Yes" },
              { id: false, name: "No" },
            ]}
          />
          <DateField
            label="Waktu Kirim"
            source="sendMessageTimestamp"
            showTime
          />
          <TextField label="Diedit oleh" source="user.name" />
          <SelectField
            source="sendMessageStatus"
            label="Status WA"
            choices={[
              { id: true, name: "Terkirim" },
              { id: false, name: "Belum Terkirim" },
            ]}
          />
          <EditButton />
          <ShowButton />
        </Datagrid>
      )}
    </List>
  );
};
