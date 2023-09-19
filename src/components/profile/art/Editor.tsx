import { useState, useRef, useEffect } from "react";
import "./editor.scss";
import Row from "./Row";
import Start from "./Start.png";
import detectEthereumProvider from '@metamask/detect-provider';
import { ethers } from "ethers";
import { TokenboundClient } from '@tokenbound/sdk'

import {
    VIOLETADDRESS,
    VIOLETABI,
} from "../../../contracts/Violet";

import {
    INDIGOADDRESS,
    INDIGOABI,
} from "../../../contracts/Indigo";

import {
    BLUEADDRESS,
    BLUEABI,
} from "../../../contracts/Blue";

import {
    GREENADDRESS,
    GREENABI,
} from "../../../contracts/Green";

import {
    YELLOWADDRESS,
    YELLOWABI,
} from "../../../contracts/Yellow";

import {
    ORANGEADDRESS,
    ORANGEABI,
} from "../../../contracts/Orange";

import {
    REDADDRESS,
    REDABI,
} from "../../../contracts/Red";

import {
    VIBGYORADDRESS,
    VIBGYORABI,
} from "../../../contracts/Vibgyor";
import { useNavigate } from "react-router-dom";
import { exportComponentAsPNG } from "react-component-export-image";

export default function Editor() {

    const [hideOptions, setHideOptions] = useState(false);
    const [hideDrawingPanel, setHideDrawingPanel] = useState(true);
    const [buttonText, setButtonText] = useState("start drawing");
    const [selectedColor, setColor] = useState("white");

    const [violetMinted, setVioletMinted] = useState(false);
    const [indigoMinted, setIndigoMinted] = useState(false);
    const [blueMinted, setBlueMinted] = useState(false);
    const [greenMinted, setGreenMinted] = useState(false);
    const [yellowMinted, setYellowMinted] = useState(false);
    const [orangeMinted, setOrangeMinted] = useState(false);
    const [redMinted, setRedMinted] = useState(false);

    let navigate = useNavigate();

    function initializeDrawingPanel() {
        setHideOptions(!hideOptions);
        setHideDrawingPanel(!hideDrawingPanel);

        buttonText === "start drawing"
            ? setButtonText("reset")
            : setButtonText("start drawing");
    }

    function changeColor(color: string) {
        setColor(color);
    }

    const panelRef = useRef<HTMLInputElement>(null)

    let rows = [];

    for (let i = 0; i < 7; i++) {
        rows.push(<Row key={i} width={7} selectedColor={selectedColor} />);
    }

    useEffect(() => {

        const handleConnect = async () => {
            const provider = await detectEthereumProvider({ silent: true })
            console.log(provider)
            const ethereum = await window.ethereum;

            const signer = await new ethers.BrowserProvider(ethereum).getSigner();
            console.log(signer)

            let accounts = await window.ethereum.request({
                method: "eth_requestAccounts",
            })

            const vibgyor = new ethers.Contract(
                VIBGYORADDRESS,
                VIBGYORABI,
                signer
            );

            console.log(VIBGYORADDRESS)

            const totalSupply = await vibgyor.totalSupply();

            let tokenID = 0;
            for (var i = 0; i < totalSupply; i++) {
                const owner = await vibgyor.ownerOf(i);
                if (owner.toString().toLowerCase() == accounts[0]) {
                    tokenID = i;
                    console.log(i)
                }
            }

            console.log(tokenID)

            const tokenboundClient = new TokenboundClient({ signer, chainId: 5 })

            const account = await tokenboundClient.getAccount({
                tokenContract: VIBGYORADDRESS,
                tokenId: tokenID.toString(),
            })

            const isAccountDeployed = await tokenboundClient.checkAccountDeployment({
                accountAddress: account,
            })

            // setIsDeployed(isAccountDeployed);
            console.log("IS ACCOUNT DEPLOYED?", isAccountDeployed)


            if (!isAccountDeployed) {
                let path = `/mint`;
                navigate(path);
            }

            // VIOLET
            const violet = new ethers.Contract(
                VIOLETADDRESS,
                VIOLETABI,
                signer
            );

            console.log(account)
            const vbalance = await violet.balanceOf(
                account
            );

            if (vbalance > 0) {
                setVioletMinted(true)
            }

            // INDIGO
            const indigo = new ethers.Contract(
                INDIGOADDRESS,
                INDIGOABI,
                signer
            );

            console.log(account)
            const ibalance = await indigo.balanceOf(
                account
            );

            if (ibalance > 0) {
                setIndigoMinted(true)
            }

            // BLUE
            const blue = new ethers.Contract(
                BLUEADDRESS,
                BLUEABI,
                signer
            );

            console.log(account)
            const bbalance = await blue.balanceOf(
                account
            );

            if (bbalance > 0) {
                setBlueMinted(true)
            }

            //GREEN
            const green = new ethers.Contract(
                GREENADDRESS,
                GREENABI,
                signer
            );

            console.log(account)
            const gbalance = await green.balanceOf(
                account
            );

            if (gbalance > 0) {
                setGreenMinted(true)
            }

            //YELLOW
            const yellow = new ethers.Contract(
                YELLOWADDRESS,
                YELLOWABI,
                signer
            );

            console.log(account)
            const ybalance = await yellow.balanceOf(
                account
            );

            if (ybalance > 0) {
                setYellowMinted(true)
            }

            // ORANGE
            const orange = new ethers.Contract(
                ORANGEADDRESS,
                ORANGEABI,
                signer
            );

            console.log(account)
            const obalance = await orange.balanceOf(
                account
            );

            if (obalance > 0) {
                setOrangeMinted(true)
            }

            // RED
            const red = new ethers.Contract(
                REDADDRESS,
                REDABI,
                signer
            );

            console.log(account)
            const rbalance = await red.balanceOf(
                account
            );

            if (rbalance > 0) {
                setRedMinted(true)
            }


        }
        handleConnect()

    }, [])

    return (
        <>

            {hideOptions && <a onClick={initializeDrawingPanel}>
                <img style={{ width: "3%", position: "fixed", marginTop: "10%", marginLeft: "-10%" }} src="https://cdn-icons-png.flaticon.com/512/5632/5632370.png" />
            </a>}

            {!hideOptions && <a onClick={initializeDrawingPanel}>
                <img style={{ width: "25%", marginLeft: "-12%", position: "fixed" }}
                    src={Start} /> </a>}


            {hideOptions && (<div id="editor">
                {/* <CirclePicker color={selectedColor} onChangeComplete={changeColor} /> */}
                <div className="circles">
                    {violetMinted ? <div className="smbutton violet" onClick={() => changeColor("#6a5acd")}>V</div> : <div className="blankButton">V</div>}
                    {indigoMinted ? <div className="smbutton indigo" onClick={() => changeColor("indigo")}>I</div> : <div className="blankButton">I</div>}
                    {blueMinted ? <div className="smbutton blue" onClick={() => changeColor("blue")}>B</div> : <div className="blankButton">B</div>}
                    {greenMinted ? <div className="smbutton green" onClick={() => changeColor("#3cb371")}>G</div> : <div className="blankButton">G</div>}
                    {yellowMinted ? <div className="smbutton yellow" onClick={() => changeColor("yellow")}>Y</div> : <div className="blankButton">Y</div>}
                    {orangeMinted ? <div className="smbutton orange" onClick={() => changeColor("orange")}>O</div> : <div className="blankButton">O</div>}
                    {redMinted ? <div className="smbutton red" onClick={() => changeColor("red")}>R</div> : <div className="blankButton">R</div>}
                </div>


                <div id="drawingPanel">
                    <div id="pixels" ref={panelRef}>
                        {rows}
                    </div>
                </div>



            </div>)}

            {hideOptions && <a onClick={() => exportComponentAsPNG(panelRef)}>
                <img style={{ width: "3%", marginLeft: "-15%", marginTop: "10%", position: "fixed" }}
                    src="https://cdn-icons-png.flaticon.com/512/189/189249.png" /> </a>}
        </>

    );
}
