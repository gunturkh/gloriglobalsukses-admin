import { useState } from "react";
import {
  Button,
  DateField,
  EditButton,
  SelectField,
  Show,
  SimpleShowLayout,
  TextField,
  TopToolbar,
} from "react-admin";
import { useParams } from "react-router-dom";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import MaterialButton from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import MUITextField from "@mui/material/TextField";

const TrackingShowActions = ({ basePath, data, handleClick }) => {
  return (
    <TopToolbar>
      <EditButton basePath={basePath} record={data} />
      <Button
        // onClick={handlePDFClick}
        onClick={handleClick}
        icon={<PictureAsPdfIcon />}
        label="Export to PDF"
      />
    </TopToolbar>
  );
};

export const TrackingShow = (props) => {
  const { id } = useParams();
  const [open, setOpen] = useState(false);
  const [pageCount, setPageCount] = useState(1);

  const handleClick = () => setOpen(true);
  const handleDialogClose = () => setOpen(false);

  const handleConfirm = async () => {
    console.log("confirm");
    // const { id } = data;
    const pdf = await fetch(
      `${process.env.REACT_APP_SERVER_URL}/tracking/getpdf/${id}/${pageCount}`
    );
    const blob = await pdf.blob();
    const file = new Blob([blob], { type: "application/pdf" });
    //Build a URL from the file
    const fileURL = URL.createObjectURL(file);
    //Open the URL on new Window
    window.open(fileURL);
  };

  return (
    <Show
      actions={<TrackingShowActions handleClick={handleClick} />}
      {...props}
    >
      <Dialog onClose={handleDialogClose} open={open}>
        <DialogTitle>Jumlah Halaman</DialogTitle>
        <DialogContent>
          <MUITextField
            style={{ padding: "10px" }}
            defaultValue={1}
            min={1}
            type="number"
            name={"pageCount"}
            // label={"Jumlah Halaman"}
            onChange={(e) => setPageCount(e.target.value)}
            required={true}
          />
        </DialogContent>
        <DialogActions>
          <MaterialButton onClick={handleConfirm}>Submit</MaterialButton>
        </DialogActions>
      </Dialog>
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
        {/* <SelectField
          source="delay"
          choices={[
            { id: true, name: "Yes" },
            { id: false, name: "No" },
          ]}
        /> */}
        <DateField source="customerOrderDate" label="Tanggal Customer Order" />
        {/* <NumberField */}
        {/*   source="daysToSendReminder" */}
        {/*   label="Jumlah hari pengingat otomatis dari tanggal customer order" */}
        {/*   helperText="Masukkan Jumlah hari pengingat otomatis dari tanggal customer order" */}
        {/* /> */}
        <DateField
          source="orderArrivedToWarehouseDate"
          label="Tanggal Terima Gudang"
        />
        {/* <TextField label="Diedit oleh" source="user.name" /> */}
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
