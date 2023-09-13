import { useState, useRef } from "react";
import "./editor.scss";
import Row from "./Row";
import { exportComponentAsPNG } from "react-component-export-image";

export default function Editor() {

    const [hideOptions, setHideOptions] = useState(false);
    const [hideDrawingPanel, setHideDrawingPanel] = useState(true);
    const [buttonText, setButtonText] = useState("start drawing");
    const [selectedColor, setColor] = useState("#f44336");

    function initializeDrawingPanel() {
        setHideOptions(!hideOptions);
        setHideDrawingPanel(!hideDrawingPanel);

        buttonText === "start drawing"
            ? setButtonText("reset")
            : setButtonText("start drawing");
    }

    function changeColor(color: string ) {
        setColor(color);
    }

    const panelRef = useRef<HTMLInputElement>(null)

    let rows = [];

    for (let i = 0; i < 7; i++) {
        rows.push(<Row key={i} width={7} selectedColor={selectedColor} />);
    }

    return (
        <>

            {hideOptions && <a onClick={initializeDrawingPanel}>
                <img style={{ width: "3%", position: "fixed", marginTop:"10%", marginLeft:"-10%" }} src="https://cdn-icons-png.flaticon.com/512/5632/5632370.png" />
            </a>}

            {!hideOptions && <a onClick={initializeDrawingPanel}>
                <img style={{ width: "25%", marginLeft: "-12%", position: "fixed" }}
                    src="https://img.freepik.com/premium-vector/cute-rainbow-cloud-pixel-art-style_475147-1456.jpg" /> </a>}


            {hideOptions && (<div id="editor">


                {/* <CirclePicker color={selectedColor} onChangeComplete={changeColor} /> */}
                <div className="circles">
                    <div className="smbutton violet" onClick={() => changeColor("#6a5acd")}></div>
                    <div className="smbutton indigo" onClick={() => changeColor("indigo")}></div>
                    <div className="smbutton blue" onClick={() => changeColor("blue")}></div>
                    <div className="smbutton green" onClick={() => changeColor("#3cb371")}></div>
                    <div className="smbutton yellow" onClick={() => changeColor("yellow")}></div>
                    <div className="smbutton orange" onClick={() => changeColor("orange")}></div>
                    <div className="smbutton red" onClick={() => changeColor("red")}></div>
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
