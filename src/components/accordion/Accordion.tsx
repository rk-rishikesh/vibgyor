import { useState } from "react";
import { cards } from "../../data";
import "./styles.css";

export const Accordion = () => {
  const [active, setActive] = useState(0);

  const [violetMinting, setVioletMinting] = useState(false);
  const [indigoMinting, setIndigoMinting] = useState(false);
  const [blueMinting, setBlueMinting] = useState(false);
  const [greenMinting, setGreenMinting] = useState(false);
  const [yellowMinting, setYellowMinting] = useState(false);
  const [orangeMinting, setOrangeMinting] = useState(false);
  const [redMinting, setRedMinting] = useState(false);

  const handleToggle = (index: number) => setActive(index);

  // const handleMint = (colour:string) => {
  //   handleMinting(colour);
  //   handleMinted(colour);
  // }

  const handleMinting = (colour: string) => {

    if (colour == "Violet") {
      setVioletMinting(true);
    } else if (colour == "Indigo") {
      setIndigoMinting(true)
    } else if (colour == "Blue") {
      setBlueMinting(true);
    } else if (colour == "Green") {
      setGreenMinting(true);
    } else if (colour == "Yellow") {
      setYellowMinting(true);
    } else if (colour == "Orange") {
      setOrangeMinting(true);
    } else {
      setRedMinting(true);
    }
  }

  // const handleMinted = (colour: string) => {

  //   if (colour == "Violet") {
  //     setVioletMinting(false);
  //   } else if (colour == "Indigo") {
  //     setIndigoMinting(false)
  //   } else if (colour == "Blue") {
  //     setBlueMinting(false);
  //   } else if (colour == "Green") {
  //     setGreenMinting(false);
  //   } else if (colour == "Yellow") {
  //     setYellowMinting(false);
  //   } else if (colour == "Orange") {
  //     setOrangeMinting(false);
  //   } else {
  //     setRedMinting(false);
  //   }
  // }

  return (
    <section>
      <article
        key={cards[0].image}
        className={active === 0 ? "active" : ""}
        onClick={() => handleToggle(0)}
      >
        {violetMinting && cards[0].header == "Violet" ? <img src={cards[0].minting} /> : <img src={cards[0].image} />}


        <div className="content">
          <span className="material-symbols-outlined" onClick={() => handleMinting(cards[0].header)}>circles</span>
          <div>
            <h2>{cards[0].header}</h2>
            <p>{cards[0].text}</p>
            <p>20 PTS</p>
          </div>
        </div>
      </article>

      {/* Indigo NFT */}
      <article
        key={cards[1].image}
        className={active === 1 ? "active" : ""}
        onClick={() => handleToggle(1)}
      >

        {indigoMinting && cards[1].header == "Indigo" ? <img src={cards[1].minting} /> : <img src={cards[1].image} />}

        <div className="content">
          <span className="material-symbols-outlined" onClick={() => handleMinting(cards[1].header)}>circles</span>
          <div>
            <h2>{cards[1].header}</h2>
            <p>{cards[1].text}</p>
          </div>
        </div>
      </article>

      {/* Blue NFT */}
      <article
        key={cards[2].image}
        className={active === 2 ? "active" : ""}
        onClick={() => handleToggle(2)}
      >

        {blueMinting && cards[2].header == "Blue" ? <img src={cards[2].minting} /> : <img src={cards[2].image} />}

        <div className="content">
          <span className="material-symbols-outlined" onClick={() => handleMinting(cards[2].header)}>circles</span>
          <div>
            <h2>{cards[2].header}</h2>
            <p>{cards[2].text}</p>
          </div>
        </div>
      </article>

      {/* Green NFT */}
      <article
        key={cards[3].image}
        className={active === 3 ? "active" : ""}
        onClick={() => handleToggle(3)}
      >

        {greenMinting && cards[3].header == "Green" ? <img src={cards[3].minting} /> : <img src={cards[3].image} />}

        <div className="content">
          <span className="material-symbols-outlined" onClick={() => handleMinting(cards[3].header)}>circles</span>
          <div>
            <h2>{cards[3].header}</h2>
            <p>{cards[3].text}</p>
          </div>
        </div>
      </article>

      {/* Yellow NFT */}
      <article
        key={cards[4].image}
        className={active === 4 ? "active" : ""}
        onClick={() => handleToggle(4)}
      >

        {yellowMinting && cards[4].header == "Yellow" ? <img src={cards[4].minting} /> : <img src={cards[4].image} />}

        <div className="content">
          <span className="material-symbols-outlined" onClick={() => handleMinting(cards[4].header)}>circles</span>
          <div>
            <h2>{cards[4].header}</h2>
            <p>{cards[4].text}</p>
          </div>
        </div>
      </article>

      {/* Orange NFT */}
      <article
        key={cards[5].image}
        className={active === 5 ? "active" : ""}
        onClick={() => handleToggle(5)}
      >

        {orangeMinting && cards[5].header == "Orange" ? <img src={cards[5].minting} /> : <img src={cards[5].image} />}

        <div className="content">
          <span className="material-symbols-outlined" onClick={() => handleMinting(cards[5].header)}>circles</span>
          <div>
            <h2>{cards[5].header}</h2>
            <p>{cards[5].text}</p>
          </div>
        </div>
      </article>


      {/* Red NFT */}
      <article
        key={cards[6].image}
        className={active === 6 ? "active" : ""}
        onClick={() => handleToggle(6)}
      >

        {redMinting && cards[6].header == "Red" ? <img src={cards[6].minting} /> : <img src={cards[6].image} />}

        <div className="content">
          <span className="material-symbols-outlined" onClick={() => handleMinting(cards[6].header)}>circles</span>
          <div>
            <h2>{cards[6].header}</h2>
            <p>{cards[6].text}</p>
          </div>
        </div>
      </article>
    </section>
  );
};
