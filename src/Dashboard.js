import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader } from "@mui/material";
import { Loading } from "react-admin";
import QRCode from "react-qr-code";
import socketIOClient from "socket.io-client";

const url = `${window.location.host}/gloriglobalsukses-backend/v1`;
const SOCKET_HOST =
  window.location || "http://127.0.0.1:4000";
const SOCKET_PATH = '/gloriglobalsukses-backend/socket.io/';
export const Dashboard = () => {
  // const notify = useNotify();

  // const parsedClientInfoFromLocalStorage =
  //   localStorage.getItem("clientInfo") ? JSON.parse(localStorage.getItem("clientInfo")) : {};
  const parsedQRFromLocalStorage = JSON.parse(localStorage.getItem("qr")) || {};
  // const checkSavedClientInfo =
  //   Object.keys(parsedClientInfoFromLocalStorage).length > 0;
  const checkSavedQR = Object.keys(parsedQRFromLocalStorage).length > 0;
  const [socketData, setSocketData] = useState({ message: "", data: "" });
  const [socketClientData, setSocketClientData] = useState(
    // JSON.parse(localStorage.getItem("clientInfo"))
    null
  );
  const [qr, setQr] = useState({ message: "", data: "" });
  const [clientInfo, setClientInfo] = useState(
    // parsedClientInfoFromLocalStorage || socketClientData
    null
  );
  const [loading, setLoading] = useState(checkSavedQR ? false : true);

  useEffect(() => {
    const socket = socketIOClient(SOCKET_HOST, {
      path: SOCKET_PATH
    });
    socket.on("FromAPI", (data) => {
      setLoading(false);
      setSocketData(data);
      setSocketClientData(data?.clientInfo);
      console.log("FromAPI", data);
      if (data?.clientInfo) {
        localStorage.setItem("clientInfo", JSON.stringify(data?.clientInfo));
      } else localStorage.setItem("clientInfo", null);
      localStorage.setItem("qr", JSON.stringify(data));
      // localStorage.removeItem("clientInfo");
    });
    socket.on("ClientInfo", (data) => {
      setSocketClientData(data);
      setLoading(false);
      console.log("ClientInfo from socket ", data);
      localStorage.setItem("clientInfo", JSON.stringify(data));
      localStorage.removeItem("qr");
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    setQr(socketData);
    console.log("qr data", qr);
    console.log("socket data", socketData);
  }, [socketData, qr]);

  useEffect(() => {
    setClientInfo(socketClientData);
  }, [socketClientData]);

  const handleWALogout = async () => {
    const socket = socketIOClient(SOCKET_HOST, {
      path: SOCKET_PATH
    });
    socket.emit("logout", true);
    setLoading(true);
    localStorage.removeItem("clientInfo");
    localStorage.removeItem("qr");
    // setSocketClientData({});
    // setClientInfo({});
    socket.disconnect();
    const response = await fetch(`${url}/auth/wa-logout`);
    const result = await response.json();
    console.log("wa logout result", result);
    // if (result) {
    // }
  };

  console.log("loading", loading);
  console.log("checkSavedQR", checkSavedQR);
  // console.log("checkSavedClientInfo", checkSavedClientInfo);
  return (
    <Card sx={{ height: "100%" }}>
      <CardHeader title="Welcome to Tracking Management System Dashboard" />
      <CardContent>
        <div style={{ marginBottom: 6 }}>
          Status: {/* {checkSavedClientInfo */}
          {socketData.message === "authenticated"
            ? "WA Authentication Success!"
            : "Please scan QR code below"}
        </div>
        {socketData?.clientInfo && (
          <>
            <div style={{ marginBottom: 6 }}>
              Username: {clientInfo?.pushname ?? ""}
            </div>
            <div style={{ marginBottom: 6 }}>
              Phone number: {clientInfo?.wid?.user ?? ""}
            </div>
            <div style={{ marginBottom: 6 }}>
              Platform: {clientInfo?.platform ?? ""}
            </div>
            <button onClick={handleWALogout}> Logout </button>
          </>
        )}
      </CardContent>
      {loading ? (
        <Loading loadingPrimary="QR Code Loading..." />
      ) : (
        <>
          {/* {(!checkSavedClientInfo || qr?.data) && ( */}
          {socketData?.data && (
            <>
              <div style={{ background: "white", padding: "16px" }}>
                <QRCode
                  value={parsedQRFromLocalStorage?.data || qr?.data || ""}
                />
              </div>
            </>
          )}
        </>
      )}
    </Card>
  );
};
