import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader } from "@mui/material";
import { Loading } from "react-admin";
import QRCode from "react-qr-code";
import socketIOClient from "socket.io-client";

const url = process.env.REACT_APP_SERVER_URL;
const SOCKET_ENDPOINT = process.env.REACT_APP_SOCKET_ENDPOINT || "http://127.0.0.1:4000";
export const Dashboard = () => {
  // const notify = useNotify();

  const parsedClientInfoFromLocalStorage = JSON.parse(localStorage.getItem('clientInfo')) || {}
  const parsedQRFromLocalStorage = JSON.parse(localStorage.getItem('qr')) || {}
  const checkSavedClientInfo = Object.keys(parsedClientInfoFromLocalStorage).length > 0
  const checkSavedQR = Object.keys(parsedQRFromLocalStorage).length > 0
  const [socketData, setSocketData] = useState({ message: "", data: "" });
  const [socketClientData, setSocketClientData] = useState(JSON.parse(localStorage.getItem('clientInfo')));
  const [qr, setQr] = useState({ message: "", data: "" });
  const [clientInfo, setClientInfo] = useState(parsedClientInfoFromLocalStorage);
  const [loading, setLoading] = useState(checkSavedQR ? false : true);

  useEffect(() => {
    const socket = socketIOClient(SOCKET_ENDPOINT);
    socket.on("FromAPI", (data) => {
      setLoading(false);
      setSocketData(data);
      localStorage.setItem('qr', JSON.stringify(data))
    });
    socket.on("ClientInfo", (data) => {
      setSocketClientData(data);
      console.log('ClientInfo from socket ', data)
      localStorage.setItem('clientInfo', JSON.stringify(data))
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    setQr(socketData);
    console.log('qr data', qr)
  }, [socketData, qr]);

  useEffect(() => {
    setClientInfo(socketClientData);
  }, [socketClientData]);

  const handleWALogout = async () => {
    setLoading(true);
    const response = await fetch(`${url}/auth/wa-logout`);
    const result = await response.json();
    if (result) {
      localStorage.removeItem('clientInfo')
      localStorage.removeItem('qr')
      setSocketClientData({})
      setClientInfo({})
    }
  };

  return (
    <Card sx={{ height: '100%' }}>
      <CardHeader title="Welcome to Tracking Management System Dashboard" />
      <CardContent>
        <div style={{ marginBottom: 6 }}>
          Status:{" "}
          {checkSavedClientInfo
            ? "WA Authentication Success!"
            : "Please scan QR code below"
          }
        </div>
        {checkSavedClientInfo && (
          <>
            <div style={{ marginBottom: 6 }}>Username: {clientInfo?.pushname ?? ""}</div>
            <div style={{ marginBottom: 6 }}>Phone number: {clientInfo?.wid?.user ?? ""}</div>
            <div style={{ marginBottom: 6 }}>Platform: {clientInfo?.platform ?? ""}</div>
            <button onClick={handleWALogout}> Logout </button>
          </>
        )}
      </CardContent>
      {loading ? (
        <Loading loadingPrimary="QR Code Loading..." />
      ) : (
        <>
          {checkSavedQR && !checkSavedClientInfo && (
            <>
              <div style={{ background: "white", padding: "16px" }}>
                <QRCode value={parsedQRFromLocalStorage?.data} />
              </div>
            </>
          )}
        </>
      )}
    </Card>
  );
};
