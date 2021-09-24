import React from 'react'
import { Toast, ToastContainer, Button } from 'react-bootstrap';

const { ipcRenderer } = window.require("electron");

const ToastNotification: React.FC = (): JSX.Element => {

	const [toast, setToast] = React.useState<boolean>(false)
	const [toastDownload, setToastDownload] = React.useState<boolean>(false)

	const toogleToast = ():void => setToast(!toast)
	const toogleDownload = ():void => setToastDownload(!toastDownload)

    ipcRenderer.on("update_available", () => {
        ipcRenderer.removeAllListeners("update_available")
        setToast(true)
    })

    ipcRenderer.on("update_downloaded", () => {
        ipcRenderer.removeAllListeners("update_downloaded")
        setToastDownload(true)
    })

    const restartApp = () => {
        ipcRenderer.send('restart_app');
      }

    return (
        <ToastContainer position={"bottom-start"}>
            <Toast show={toast} onClose={toogleToast} delay={5000} autohide>
                <Toast.Header>
                    <img src="./logo192.png" className="rounded me-2" style={{width: "20px"}} alt="" />
                    <strong className="me-auto">Update available</strong>
                </Toast.Header>
                <Toast.Body>A new update is available.<br />Downloading now...</Toast.Body>
                <Toast.Body><Button onClick={toogleToast} size={"sm"}>Close</Button></Toast.Body>
            </Toast>
            <Toast show={toastDownload} onClose={toogleDownload}>
                <Toast.Header>
                    <img src="./logo192.png" className="rounded me-2" style={{width: "20px"}} alt="" />
                    <strong className="me-auto">Update Downloaded</strong>
                </Toast.Header>
                <Toast.Body>Update Downloaded. It will be installed on restart. Restart now?</Toast.Body>
                <Toast.Body><Button onClick={toogleDownload} size={"sm"}>Close</Button> <Button onClick={() => restartApp()} size={"sm"}>Restart</Button></Toast.Body>
            </Toast>
        </ToastContainer>
    )
}

export default ToastNotification