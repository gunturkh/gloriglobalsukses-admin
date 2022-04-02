import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader } from '@material-ui/core';
import QRCode from "react-qr-code";

const url = process.env.REACT_APP_SERVER_URL
export const Dashboard = () => {
    const [qr, setQr] = useState('')

    const handleGetQR = async () => {
        const response = await fetch(`${url}/auth/getqr`)
        const result = await response.text()
        console.log('result', result)
        if (result) {
            setQr(result)
        }
    }

    return (
    <Card>
        <CardHeader title="Welcome to the Admin Dashboard" />
        <CardContent>QR: {qr}</CardContent>
        <div style={{ background: 'white', padding: '16px' }}>
            <QRCode value={qr}/>
        </div>
        <button onClick={handleGetQR}>Get QR</button>
    </Card>);
};
