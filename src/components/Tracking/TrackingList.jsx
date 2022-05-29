import * as React from "react";
import { useMediaQuery } from "@mui/material";
import {
  ChipField,
  Datagrid,
  DateField,
  DateInput,
  downloadCSV,
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
import jsonExport from "jsonexport/dist";
import moment from "moment";

const exporter = (trackingDatas) => {
  const trackingDatasForExport = trackingDatas.map((data) => {
    const {
      salesOrder,
      item,
      shipoutDate,
      resi,
      cartonAmount,
      orderArrivedToWarehouseDate,
      cargoName,
      ...rest
    } = data;

    return {
      "No SI": salesOrder,
      "Nama Item": item,
      "Ship Out": moment(shipoutDate).format("DD-MMMM-YYYY"),
      "Resi China Local": resi,
      "Total Ctn": cartonAmount,
      "Tanggal Terima Gudang": moment(orderArrivedToWarehouseDate).format(
        "DD-MMMM-YYYY"
      ),
      "Nama Cargo": cargoName,
    };
  });
  jsonExport(
    trackingDatasForExport,
    {
      headers: [
        "No SI",
        "Nama Item",
        "Tanggal Kirim Bukti Payment",
        "Ship Out",
        "Total Ctn",
        "Tanggal Terima Gudang",
        "Nama Cargo",
      ],
    },
    (err, csv) => {
      downloadCSV(csv, `${moment().format("DD-MMMM-YYYY")} GGS-Data-Tracking`);
    }
  );
};

const trackingFilters = [
  <DateInput
    label="Tanggal Customer Order"
    source="customerOrderDate"
    parse={(value) => `${value}T00:00:00.000Z`}
  />,
  // <DateInput
  //   source="customerOrderDate_gte"
  //   label="Tanggal Customer Order (Start)"
  // />,
  // <DateInput
  //   source="customerOrderDate_lte"
  //   label="Tanggal Customer Order (End)"
  // />,
  <SelectInput
    label="Terbaca"
    source="read"
    choices={[
      { id: true, name: "Terbaca" },
      { id: false, name: "Belum Terbaca" },
    ]}
  />,
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
        id: "STATUS ORDERAN SUDAH DITERIMA",
        name: "STATUS ORDERAN SUDAH DITERIMA",
      },
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
  // <SelectInput
  //   source="delay"
  //   choices={[
  //     { id: true, name: "Ya" },
  //     { id: false, name: "Tidak" },
  //   ]}
  // />,
];

const TrackingBulkActionButtons = (props) => (
  <React.Fragment>
    <BulkUpdateStatusButton label="Bulk Updata Status" {...props} />
  </React.Fragment>
);

export const TrackingList = (props) => {
  const permissions = localStorage.getItem("permissions");
  console.log("permissions", permissions);
  const isSmall = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const postRowStyle = (record) => ({
    backgroundColor: record.read === false ? "rgba(0,0,0,0.2)" : "white",
    color: record.read === false ? "black" : "white",
  });
  return (
    <List
      filters={trackingFilters}
      {...props}
      bulkActionButtons={<TrackingBulkActionButtons />}
      exporter={exporter}
      perPage={25}
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
          <TextField source="cargoName" label="Nama Cargo" />
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
          <SelectField
            source="read"
            label="Terbaca"
            choices={[
              { id: true, name: "Terbaca" },
              { id: false, name: "Belum Terbaca" },
            ]}
          />
          {permissions === "admin" && <EditButton />}
          <ShowButton />
        </Datagrid>
      )}
    </List>
  );
};
