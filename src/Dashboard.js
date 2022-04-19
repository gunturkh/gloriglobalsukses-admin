import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader } from "@material-ui/core";
import { Loading, useNotify } from "react-admin";
import QRCode from "react-qr-code";

const url = process.env.REACT_APP_SERVER_URL;
export const Dashboard = () => {
  const notify = useNotify();

  const [qr, setQr] = useState({ message: "", data: null });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const intervalId = setInterval(() => {
      handleGetQR();
    }, 30000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
    if (qr?.message === "authenticated") notify("Whatsapp authenticated");
  }, [notify, qr]);

  const handleGetQR = async () => {
    setLoading(true);
    const response = await fetch(`${url}/auth/getqr`);
    const result = await response.json();
    if (result) {
      setQr(result);
      setLoading(false);
    }
  };

  console.log("qr data", qr);
  return (
    <Card>
      <CardHeader title="Welcome to Tracking Management System Dashboard" />
      <CardContent>
        {qr?.message !== "authenticated"
          ? "Please scan QR code below"
          : "WA Authentication Success!"}
      </CardContent>
      {loading ? (
        <Loading loadingPrimary="QR Code Loading..." />
      ) : (
        <>
          {qr && qr?.message !== "authenticated" && (
            <>
              <div style={{ background: "white", padding: "16px" }}>
                <QRCode value={qr?.data?.qr} />
              </div>
              {/* <button onClick={handleGetQR}>Get QR</button> */}
            </>
          )}
        </>
      )}
    </Card>
  );
};
