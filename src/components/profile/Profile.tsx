import { useRef, useEffect, useState, useCallback } from "react";
import { Link } from 'react-router-dom';
import * as THREE from "three";
import { random } from "lodash";
import detectEthereumProvider from '@metamask/detect-provider';
import Editor from "./art/Editor";
import Matic from "./matic.png";
import {
  VIBGYORADDRESS,
  VIBGYORABI,
} from "../../contracts/Vibgyor";
import { useNavigate } from "react-router-dom";
import { ethers } from "ethers";
import { TokenboundClient } from '@tokenbound/sdk'
import ButtonPic from "./button.png";
import "./profile.css";
import { parseUnits } from 'viem'
// Globals

const scene = new THREE.Scene();
const renderer = new THREE.WebGLRenderer({
  antialias: true
});
const camera = new THREE.PerspectiveCamera(
  10,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const light = new THREE.DirectionalLight("#FFFFFF", 1);
const ambientLight = new THREE.AmbientLight("hsl(0, 0%, 95%)");
light.position.set(0, 4, 4);

// Cubes
const cubeGeometry = new THREE.OctahedronGeometry(1, 2);

export const Profile = () => {

  const containerRef = useRef<any>(null);

  let navigate = useNavigate();

  const [tba, setTBA] = useState("")
  const [bal, setBal] = useState("")

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

      setTBA(account)

      const formatBalance = (rawBalance: string) => {
        const balance = (parseInt(rawBalance) / 1000000000000000000).toFixed(2)
        return balance
      }

      console.log(account)
      const balance = formatBalance(await window.ethereum!.request({  
      method: "eth_getBalance",                                     
      params: [account, "latest"],                               
    })) 

    console.log(balance)
    setBal(balance)

      const isAccountDeployed = await tokenboundClient.checkAccountDeployment({
        accountAddress: account,
      })

      // setIsDeployed(isAccountDeployed);
      console.log("IS ACCOUNT DEPLOYED?", isAccountDeployed)


      if (!isAccountDeployed) {
        let path = `/mint`;
        navigate(path);
      }
    }
    handleConnect()

  }, [])

  useEffect(() => {
    if (containerRef.current !== null) {
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setClearColor("#FFFFFF", 1);
      containerRef.current.appendChild(renderer.domElement);

      scene.add(camera);
      scene.add(light);
      scene.add(ambientLight);

      camera.position.set(40, 40, 40);
      camera.lookAt(new THREE.Vector3());

      // Generate some cubes
      const cubes: any = [];
      var cubeMesh;

      const density = [1, 1, 1, 1, 1, 1, 1];

      var palate = [""];
      var pos = 0;
      const colours = [
        "#DF76F9",
        "rgb(144, 214, 239)",
        "blue",
        "#42FD78",
        "yellow",
        "orange",
        "red"
      ];
      for (let i = 0; i < 7; i++) {
        if (density[i] == 0) {
          palate[pos] = "#FFFFFF";
          pos = pos + 1;
        } else {
          for (let j = 0; j < density[i]; j++) {
            palate[pos] = colours[i];
            pos = pos + 1;
          }
        }

      }
      console.log(palate)

      for (let i = 0; i < pos; i++) {
        cubeMesh = new THREE.Mesh(
          cubeGeometry,
          new THREE.MeshStandardMaterial({
            color: palate[i]
          })
        );

        cubeMesh.scale.set(random(2, 2, true), random(2, 2, true), random(2, 2, true));
        cubeMesh.position.set(
          random(1, 1, true),
          random(1, 1, true),
          random(1, 1, true)
        );
        scene.add(cubeMesh);
        cubes.push(cubeMesh);
      }

      animate();

      // Declarations
      function animate() {
        requestAnimationFrame(animate);
        cubes.forEach((cube: any) => {
          cube.rotation.x += Math.random() * 0.05;
          cube.rotation.y += Math.random() * 0.05;
        });
        renderer.render(scene, camera);
      }
    }
  }, [containerRef]);

  const executeCall = useCallback(async (fromAddress:any, amount:any) => {
    const ethereum = await window.ethereum;
    const signer = await new ethers.BrowserProvider(ethereum).getSigner();
    console.log(signer)

    const tokenboundClient = new TokenboundClient({ signer, chainId: 5 })
    let accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    })

    if (!tokenboundClient || !accounts[0]) return

    const to =
    accounts[0] as `0x${string}`
    const from = fromAddress as `0x${string}`
    const amt = parseUnits(`${amount}`, 18);


    const input = {
      from : from,
      to : to,
      amount : amt,
    }

    console.log(input)

    const txData = await tokenboundClient.prepareExecuteCall({
      account: from,
      to: to,
      value: amt,
      data: '',
    })

    await signer?.sendTransaction( {
      ...txData,
      value: 0n,
    })

  }, [TokenboundClient])

  return (
    <div>
      <div className="profile">
        <div className="user">

          <Link to="/profile"><img className="profileIcon" src="https://i.pinimg.com/736x/df/11/ac/df11acb295997d05484c57cb556c4a0a.jpg" /></Link>
          <div className="h2">
            <h2>{tba}</h2>
          </div>
          <div>
            <Link to="/">
              <img className="logout" src="https://cdn-icons-png.flaticon.com/512/8206/8206598.png" />
            </Link>
          </div>
        </div>
        <div>

          <div className="box">
            <div>
              <div className="profileimg"><Editor /></div>

            </div>

            <div>
              <Link to="/vibgyor">
                <div className="stat01">
                  CHASE THE COLOURS
                </div>
              </Link>

              <div className="wallet01">
                <p style={{ color: "black", marginLeft: "-74%" }}>GOERLI</p>
                <hr />
                <p style={{ color: "black", marginTop: "-15%", marginLeft: "62%" }}>{bal} ETH</p>

                <img style={{ width: "80%", marginLeft: "0%", marginTop: "-12%" }} src={Matic} />
                {/* <img style={{ width: "25%", marginLeft: "28%", marginTop: "48px" }} src="https://static.vecteezy.com/system/resources/thumbnails/008/880/081/small_2x/3d-up-down-arrow-pack-set-isolated-illustration-png.png" /> */}

                <img style={{ width: "30%", marginLeft: "0%", marginTop: "78px" }} onClick={() => executeCall(tba, bal)} src={ButtonPic} />
                {/* <h6 style={{color:"black", marginLeft: "-80%", marginTop: "208px"}}>D E P O S I T</h6> */}

              </div>
            </div>
          </div>

        </div>
      </div>



    </div>
  );

}