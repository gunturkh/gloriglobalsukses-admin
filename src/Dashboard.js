import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader } from "@material-ui/core";
import { Loading, useNotify } from "react-admin";
import QRCode from "react-qr-code";

const url = process.env.REACT_APP_SERVER_URL;
export const Dashboard = () => {
  const notify = useNotify();

  const [qr, setQr] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const intervalId = setInterval(() => {
      handleGetQR();
    }, 10000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
    if (qr === "authenticated") notify("Whatsapp authenticated");
  }, [qr]);

  const handleGetQR = async () => {
    setLoading(true);
    const response = await fetch(`${url}/auth/getqr`);
    const result = await response.text();
    console.log("result", result);
    if (result) {
      setQr(result);
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader title="Welcome to the Admin Dashboard" />
      <CardContent>
        {qr !== "authenticated"
          ? "Please scan QR code below"
          : "WA Authentication Success!"}
      </CardContent>
      {loading ? (
        <Loading loadingPrimary="QR Code Loading..." />
      ) : (
        <>
          {qr !== "authenticated" && qr && (
            <>
              <div style={{ background: "white", padding: "16px" }}>
                <QRCode value={qr} />
              </div>
              {/* <button onClick={handleGetQR}>Get QR</button> */}
            </>
          )}
        </>
      )}
    </Card>
  );
};
