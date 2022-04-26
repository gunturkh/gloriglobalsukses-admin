import * as React from "react";
import { useMediaQuery } from "@mui/material";
import {
  Button,
  ChipField,
  Create,
  Datagrid,
  DateField,
  DateInput,
  DateTimeInput,
  Edit,
  EditButton,
  List,
  NumberInput,
  SelectField,
  SelectInput,
  Show,
  ShowButton,
  SimpleForm,
  SimpleList,
  SimpleShowLayout,
  TextField,
  TextInput,
  TopToolbar,
} from "react-admin";
import BulkUpdateStatusButton from "./BulkUpdateStatusButton";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import { FormDataConsumer } from "react-admin";

const TrackingTitle = ({ record }) => {
  return <span>Tracking {record ? `"${record.title}"` : ""}</span>;
};

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

const TrackingShowActions = ({ basePath, data, resource }) => {
  const handlePDFClick = async () => {
    const { id } = data;
    const pdf = await fetch(
      `${process.env.REACT_APP_SERVER_URL}/tracking/getpdf/${id}`
    );
    const blob = await pdf.blob();
    const file = new Blob([blob], { type: "application/pdf" });
    //Build a URL from the file
    const fileURL = URL.createObjectURL(file);
    //Open the URL on new Window
    window.open(fileURL);
  };
  return (
    <TopToolbar>
      <EditButton basePath={basePath} record={data} />
      <Button
        onClick={handlePDFClick}
        icon={<PictureAsPdfIcon />}
        label="Export to PDF"
      />
    </TopToolbar>
  );
};

export const TrackingShow = (props) => {
  //   const record = useListController(props);
  return (
    <Show actions={<TrackingShowActions />} {...props}>
      <SimpleShowLayout>
        <TextField source="name" />
        <TextField source="phone" />
        <TextField source="address" />
        <TextField source="item" />
        <TextField source="resi" />
        <SelectField
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
        />
        <SelectField
          source="label"
          choices={[
            { id: "retailgeneral", name: "Barang Retail/General" },
            { id: "kids", name: "Barang Anak" },
            { id: "cosmetic", name: "Cosmetic" },
          ]}
        />
        <DateField label="Waktu Kirim" source="sendMessageTimestamp" showTime />
        <SelectField
          source="delay"
          choices={[
            { id: true, name: "Yes" },
            { id: false, name: "No" },
          ]}
        />
        <DateField source="customerOrderDate" label="Tanggal Customer Order" />
        <DateField
          source="daysToSendReminderFromCustomerOrderDate"
          label="Jumlah hari pengingat otomatis dari tanggal customer order"
          helperText="Masukkan Jumlah hari pengingat otomatis dari tanggal customer order"
        />
        <DateField
          source="orderArrivedToWarehouseDate"
          label="Tanggal Terima Gudang"
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
      </SimpleShowLayout>
    </Show>
  );
};

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

export const TrackingEdit = (props) => (
  <Edit title={<TrackingTitle />} {...props}>
    <SimpleForm>
      <TextInput source="name" label="Nama" />
      <TextInput source="phone" label="No HP" />
      <TextInput source="address" label="Alamat" />
      <TextInput source="item" label="Barang" />
      <TextInput source="resi" label="No Resi" />
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
      />
      <FormDataConsumer>
        {({ formData, ...rest }) =>
          formData.status === "SUDAH DIPESAN DAN BARANG PRODUKSI" && (
            <NumberInput
              source="productionDays"
              label="Jumlah hari barang diproduksi"
              {...rest}
            />
          )
        }
      </FormDataConsumer>
      <FormDataConsumer>
        {({ formData, ...rest }) =>
          formData.status === "BARANG LOADING KE BATAM" && (
            <DateInput
              source="estimatedDate"
              label="Tanggal Perkiraan Barang Sampai"
              {...rest}
            />
          )
        }
      </FormDataConsumer>
      <FormDataConsumer>
        {({ formData, ...rest }) =>
          formData.status === "BARANG KOMPLIT ITEM & BELUM CLEAR DP" && (
            <>
              <DateInput
                source="estimatedDate"
                label="Tanggal Barang Sampai"
                {...rest}
              />
              <NumberInput
                source="remainingDownPaymentAmount"
                label="Sisa DP"
                {...rest}
              />
            </>
          )
        }
      </FormDataConsumer>
      <FormDataConsumer>
        {({ formData, ...rest }) =>
          formData.status === "BARANG KOMPLIT ITEM & SUDAH CLEAR DP" && (
            <DateInput
              source="estimatedDate"
              label="Tanggal Barang Sampai"
              {...rest}
            />
          )
        }
      </FormDataConsumer>
      <TextInput source="salesOrder" title="Sales Order" />
      <SelectInput
        source="label"
        choices={[
          { id: "retailgeneral", name: "Barang Retail/General" },
          { id: "kids", name: "Barang Anak" },
          { id: "cosmetic", name: "Cosmetic" },
        ]}
      />
      <DateInput source="customerOrderDate" label="Tanggal Customer Order" />
      <DateInput
        source="daysToSendReminderFromCustomerOrderDate"
        label="Jumlah hari pengingat otomatis dari tanggal customer order"
        helperText="Masukkan Jumlah hari pengingat otomatis dari tanggal customer order"
      />
      <DateInput
        source="orderArrivedToWarehouseDate"
        label="Tanggal Terima Gudang"
      />
      <SelectInput
        source="delay"
        choices={[
          { id: true, name: "Yes" },
          { id: false, name: "No" },
        ]}
      />
      <DateTimeInput
        source="sendMessageTimestamp"
        label="Waktu Kirim Otomatis"
      />
    </SimpleForm>
  </Edit>
);

export const TrackingCreate = (props) => {
  return (
    <Create {...props}>
      <SimpleForm>
        <TextInput source="name" label="Nama" />
        <TextInput source="phone" label="No HP" />
        <TextInput source="address" label="Alamat" />
        <TextInput source="item" label="Barang" />
        <TextInput source="resi" label="No Resi" />
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
        />
        <FormDataConsumer>
          {({ formData, ...rest }) =>
            formData.status === "SUDAH DIPESAN DAN BARANG PRODUKSI" && (
              <NumberInput
                source="productionDays"
                label="Jumlah hari barang diproduksi"
                {...rest}
              />
            )
          }
        </FormDataConsumer>
        <FormDataConsumer>
          {({ formData, ...rest }) =>
            formData.status === "BARANG LOADING KE BATAM" && (
              <DateInput
                source="estimatedDate"
                label="Tanggal Perkiraan Barang Sampai"
                {...rest}
              />
            )
          }
        </FormDataConsumer>
        <FormDataConsumer>
          {({ formData, ...rest }) =>
            formData.status === "BARANG KOMPLIT ITEM & BELUM CLEAR DP" && (
              <>
                <DateInput
                  source="estimatedDate"
                  label="Tanggal Barang Sampai"
                  {...rest}
                />
                <NumberInput
                  source="remainingDownPaymentAmount"
                  label="Sisa DP"
                  {...rest}
                />
              </>
            )
          }
        </FormDataConsumer>
        <FormDataConsumer>
          {({ formData, ...rest }) =>
            formData.status === "BARANG KOMPLIT ITEM & SUDAH CLEAR DP" && (
              <DateInput
                source="estimatedDate"
                label="Tanggal Barang Sampai"
                {...rest}
              />
            )
          }
        </FormDataConsumer>
        <TextInput source="salesOrder" title="so" />
        <SelectInput
          source="label"
          choices={[
            { id: "retailgeneral", name: "Barang Retail/General" },
            { id: "kids", name: "Barang Anak" },
            { id: "cosmetic", name: "Cosmetic" },
          ]}
        />
        <DateInput source="customerOrderDate" label="Tanggal Customer Order" />
        <DateInput
          source="daysToSendReminderFromCustomerOrderDate"
          label="Jumlah hari pengingat otomatis dari tanggal customer order"
          helperText="Masukkan Jumlah hari pengingat otomatis dari tanggal customer order"
        />
        <DateInput
          source="orderArrivedToWarehouseDate"
          label="Tanggal Terima Gudang"
        />
        <SelectInput
          source="delay"
          choices={[
            { id: true, name: "Yes" },
            { id: false, name: "No" },
          ]}
        />
        <DateTimeInput
          source="sendMessageTimestamp"
          label="Waktu Kirim Otomatis"
        />
      </SimpleForm>
    </Create>
  );
};
