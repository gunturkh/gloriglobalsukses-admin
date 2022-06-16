import { useState } from "react";
import {
  Button,
  DateField,
  EditButton,
  NumberField,
  SelectField,
  Show,
  SimpleShowLayout,
  TextField,
  TopToolbar,
  useRecordContext,
} from "react-admin";
import { useParams } from "react-router-dom";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import MaterialButton from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import MUITextField from "@mui/material/TextField";
import { Grid } from "@mui/material";
import moment from "moment";

import { rupiah } from "../../utils";

const TrackingShowActions = ({ basePath, data, handleClick }) => {
  const permissions = localStorage.getItem("permissions");
  return (
    <TopToolbar>
      {permissions === "admin" && (
        <EditButton basePath={basePath} record={data} />
      )}
      <Button
        // onClick={handlePDFClick}
        onClick={handleClick}
        icon={<PictureAsPdfIcon />}
        label="Export to PDF"
      />
    </TopToolbar>
  );
};
const HistoryField = () => {
  const record = useRecordContext();
  return (
    <>
      <p style={{ fontSize: "12px" }}>History</p>
      <ul>
        {record.history.map((item, idx) => (
          <li key={idx} style={{ marginBottom: "10px", fontSize: "14px" }}>
            <div>{moment(item.createdAt).format("DD-MMM-YYYY HH:mm:ss")}</div>
            <div>{item.status}</div>
          </li>
        ))}
      </ul>
    </>
  );
};
const WhatsappPreviewField = () => {
  const record = useRecordContext();
  const PreviewMessage = () => {
    console.log("status", record.status);
    // STATUS ORDERAN SUDAH DITERIMA
    if (record.status === "STATUS ORDERAN SUDAH DITERIMA") {
      return (
        <Grid
          md={12}
        >{`Customer *${record?.name}* yth, Terima kasih sudah berbelanja, orderan anda dengan *${record?.salesOrder}* barang *${record?.item}* sudah kami terima dan akan segera diproses, mohon tunggu informasi selanjutnya. Terima kasih.`}</Grid>
      );
    }

    // SUDAH DIPESAN DAN BARANG READY
    if (record.status === "SUDAH DIPESAN DAN BARANG READY") {
      return (
        <Grid md={12}>{`Customer *${
          record?.name
        }* yth, kami menginformasikan bahwa barang no *${
          record?.salesOrder
        }* dengan item *${
          record?.item
        }* sudah dipesan & sedang dalam proses pengemasan pada tanggal ${moment(
          record?.customerOrderDate
        ).format(
          "DD MMMM YYYY"
        )}, sudah dalam proses pengiriman ke Gudang China. Ditunggu informasi selanjutnya. Terima kasih.`}</Grid>
      );
    }

    // SUDAH DIPESAN DAN BARANG PRODUKSI
    if (record.status === "SUDAH DIPESAN DAN BARANG PRODUKSI") {
      return (
        <Grid md={12}>{`Customer *${
          record?.name
        }* yth, kami menginformasikan bahwa barang no *${
          record?.salesOrder
        }* dengan item *${record?.item}* sudah dipesan pada tanggal ${moment(
          record?.customerOrderDate
        ).format("DD MMMM YYYY")} dan dalam proses *produksi ${
          record?.productionDays
        } hari*. Kemungkinan akan mengalami keterlambatan pengiriman dikarenakan adanya proses produksi tersebut. Mohon ditunggu informasi selanjutnya. Terima kasih.`}</Grid>
      );
    }

    // SUDAH DIKIRIM VENDOR KE GUDANG CHINA
    if (record.status === "SUDAH DIKIRIM VENDOR KE GUDANG CHINA") {
      return (
        <Grid
          md={12}
        >{`Customer *${record?.name}* yth, kami menginformasikan bahwa barang no *${record?.salesOrder}* dengan item *${record?.item}* sudah dikirim dengan nomor *resi china lokal ${record?.resi}* dan akan tiba di Gudang China dalam waktu 4-5 hari. Mohon ditunggu informasi selanjutnya. Terima kasih.`}</Grid>
      );
    }

    // SUDAH TIBA DIGUDANG CHINA
    if (record.status === "SUDAH TIBA DIGUDANG CHINA") {
      return (
        <Grid
          md={12}
        >{`Customer *${record?.name}* yth, kami menginformasikan bahwa barang no *${record?.salesOrder}* dengan item *${record?.item}* sudah tiba di Gudang China dengan resi china lokal *${record?.resi}*. Mohon ditunggu informasi selanjutnya. Terima kasih.`}</Grid>
      );
    }

    // BARANG LOADING BATAM - JAKARTA
    if (record.status === "BARANG LOADING BATAM - JAKARTA") {
      return (
        <Grid md={12}>{`Customer *${
          record?.name
        }* yth, kami menginformasikan bahwa barang no *${
          record?.salesOrder
        }* dengan item *${record?.item}* dengan resi *${
          record?.resi
        }* sudah di loading dan akan tiba di gudang Jakarta dengan estimasi *${moment(
          record?.estimatedDate
        ).format(
          "DD MMMM YYYY"
        )}*. Mohon ditunggu informasi selanjutnya. Terima kasih.`}</Grid>
      );
    }

    // BARANG KOMPLIT ITEM & BELUM CLEAR DP
    if (record.status === "BARANG KOMPLIT ITEM & BELUM CLEAR DP") {
      return (
        <Grid md={12}>{`Customer *${
          record?.name
        }* yth, kami menginformasikan bahwa barang no *${
          record?.salesOrder
        }* dengan item *${record?.item}* atas *${
          record?.resi
        }* tiba di Gudang Jakarta pada tanggal  *${moment(
          record?.estimatedDate
        ).format(
          "DD MMMM YYYY"
        )}* dan akan segera diproses pengiriman ke alamat anda. Mohon untuk segera melakukan pelunasan *sisa DP 30%* sebesar *IDR ${rupiah(
          record?.remainingDownPaymentAmount
        )}*. Mohon ditunggu informasi selanjutnya. Terima kasih.`}</Grid>
      );
    }

    // BARANG KOMPLIT ITEM & SUDAH CLEAR DP
    if (record.status === "BARANG KOMPLIT ITEM & SUDAH CLEAR DP") {
      return (
        <Grid md={12}>{`Customer *${
          record?.name
        }* yth, kami menginformasikan bahwa barang no *${
          record?.salesOrder
        }* dengan item *${
          record?.item
        }* tiba di Gudang Jakarta pada tanggal  *${moment(
          record?.estimatedDate
        ).format(
          "DD MMMM YYYY"
        )}* dan sudah dikirimkan dengan nomor resi SENTRAL CARGO *${
          record?.resi
        }* .Jangan lupa Untuk membuat video unboxing jika barang telah sampai untuk menghindari kesalahan dalam pengiriman. Ditunggu orderan selanjutnya, Terima kasih.`}</Grid>
      );
    }

    // DELAY - RANDOM CHECK CHINA
    if (record.status === "DELAY - RANDOM CHECK CHINA") {
      return (
        <Grid
          md={12}
        >{`Customer *${record?.name}* yth, kami menginformasikan bahwa barang no *${record?.salesOrder}* dengan item *${record?.item}* akan mengalami kemunduran estimasi tiba di Indonesia dikarenakan adanya *Random Check* di Custom China maka dari itu untuk estimasi selanjutnya akan kami informasikan kembali. Kami segenap perusahaan memohon maaf sebesar besarnya atas kemunduran estimasi tersebut. Mohon ditunggu. Terima kasih.`}</Grid>
      );
    }

    // DELAY - STATUS BARANG OVERLOAD
    if (record.status === "DELAY - STATUS BARANG OVERLOAD") {
      return (
        <Grid
          md={12}
        >{`Customer *${record?.name}* yth, kami menginformasikan bahwa barang no *${record?.salesOrder}* dengan item *${record?.item}* Estimasi awal *${record?.estimatedDate}* mengalami kemunduran Estimasi dikarenakan adanya *Overload Container* dipelabuhan Transit Indonesia. Maka estimasi selanjutnya *${record?.newEstimatedDate}*, Kami segenap perusahaan memohon maaf sebesar besarnya atas kemunduran estimasi tersebut. Mohon ditunggu informasi selanjutnyya. Terima kasih.`}</Grid>
      );
    } else {
      return <Grid md={12}>{record?.status}</Grid>;
    }
  };
  return (
    <Grid style={{}}>
      <div
        style={{
          fontWeight: 400,
          fontSize: 12,
          color: "rgba(0, 0, 0, 0.6)",
          marginBottom: 10,
        }}
      >
        Isi Pesan WA
      </div>
      <PreviewMessage />
    </Grid>
  );
};
export const TrackingShow = (props) => {
  const { id } = useParams();
  const [open, setOpen] = useState(false);
  const [pageCount, setPageCount] = useState(1);

  console.log("props", props);
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
        <TextField source="itemDetail" label="Keterangan Barang" />
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
            {
              id: "BARANG LOADING BATAM - JAKARTA",
              name: "BARANG LOADING BATAM - JAKARTA",
            },
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
            {
              id: "DELAY - STATUS BARANG OVERLOAD",
              name: "DELAY - STATUS BARANG OVERLOAD",
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
        <NumberField source="cartonAmount" label="Jumlah Carton" />
        <TextField source="cargoName" label="Nama Cargo" />
        <DateField
          source="estimatedDate"
          label="Tanggal Perkiraan Barang Sampai"
        />
        <DateField
          source="orderArrivedToWarehouseDate"
          label="Tanggal Terima Gudang"
        />
        <DateField source="shipoutDate" label="Tanggal Ship Out" />
        {/* <TextField label="Diedit oleh" source="user.name" /> */}
        <SelectField
          source="sendMessageStatus"
          label="Status WA"
          choices={[
            { id: true, name: "Terkirim" },
            { id: false, name: "Belum Terkirim" },
          ]}
        />
        <WhatsappPreviewField />
        <HistoryField />
      </SimpleShowLayout>
    </Show>
  );
};
