import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader } from "@mui/material";
import { Button, inferTypeFromValues, Loading, useNotify } from "react-admin";
import QRCode from "react-qr-code";
import socketIOClient from "socket.io-client";

const url = process.env.REACT_APP_SERVER_URL;
const SOCKET_ENDPOINT = "http://127.0.0.1:4001";
export const Dashboard = () => {
  const notify = useNotify();

  const [socketData, setSocketData] = useState({ message: "", data: "" });
  const [socketClientData, setSocketClientData] = useState({});
  const [qr, setQr] = useState({ message: "", data: "" });
  const [clientInfo, setClientInfo] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const socket = socketIOClient(SOCKET_ENDPOINT);
    socket.on("FromAPI", (data) => {
      console.log("socket data", data);
      console.log(" typeof socket data", typeof data);
      setLoading(false);
      setSocketData(data);
    });
    socket.on("ClientInfo", (data) => {
      setSocketClientData(data);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  // useEffect(() => {
  //   const intervalId = setInterval(() => {
  //     handleGetQR();
  //   }, 5000);

  //   return () => {
  //     clearInterval(intervalId);
  //   };
  // }, []);

  useEffect(() => {
    // if (qr?.message === "authenticated") notify("Whatsapp authenticated");
    setQr(socketData);
    console.log("socketData qr", socketData);
  }, [socketData]);

  useEffect(() => {
    setClientInfo(socketClientData);
    console.log("ClientInfo", clientInfo);
    // const info = clientInfo;
    // info &&
    //   console.log(`*Connection info*
    // User name: ${info.pushname}
    // My number: ${info.wid.user}
    // Platform: ${info.platform}`);
  }, [socketClientData]);

  const handleGetQR = async () => {
    setLoading(true);
    const response = await fetch(`${url}/auth/getqr`);
    const result = await response.json();
    if (result) {
      setQr(result);
      setLoading(false);
    }
  };

  const handleWALogout = async () => {
    setLoading(true);
    const response = await fetch(`${url}/auth/wa-logout`);
    const result = await response.json();
    if (result) {
      console.log("WA Logout Success", result);
    }
  };

  // console.log("qr data", qr);
  return (
    <Card>
      <CardHeader title="Welcome to Tracking Management System Dashboard" />
      <CardContent>
        <div>
          Status:{" "}
          {qr?.message !== "authenticated"
            ? "Please scan QR code below"
            : "WA Authentication Success!"}
        </div>
        {qr?.message === "authenticated" && (
          <>
            <div>Username: {socketClientData?.pushname ?? ""}</div>
            <div>Phone number: {socketClientData?.wid?.user ?? ""}</div>
            <div>Platform: {socketClientData?.platform ?? ""}</div>
            <button onClick={handleWALogout}> Logout </button>
          </>
        )}
      </CardContent>
      {loading ? (
        <Loading loadingPrimary="QR Code Loading..." />
      ) : (
        <>
          {qr && qr?.message !== "authenticated" && (
            <>
              <div style={{ background: "white", padding: "16px" }}>
                <QRCode value={qr?.data} />
              </div>
            </>
          )}
        </>
      )}
    </Card>
  );
};
