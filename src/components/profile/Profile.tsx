import { useRef, useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import * as THREE from "three";
import { random } from "lodash";
import detectEthereumProvider from '@metamask/detect-provider';
import Editor from "./art/Editor";
import Matic from "./matic.png";
import "./profile.css";

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


  // WALLET CONNECTION
  // let navigate = useNavigate();

  // let injectedProvider = false

  if (typeof window.ethereum !== 'undefined') {
    // injectedProvider = true
    console.log(window.ethereum)
  }

  const initialState = { accounts: [] }
  const [wallet, setWallet] = useState(initialState)

  useEffect(() => {
    const getProvider = async () => {
      const provider = await detectEthereumProvider({ silent: true })
      console.log(provider)
    }

    getProvider()

    const handleConnect = async () => {
      let accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      })
      updateWallet(accounts)
    }
    handleConnect()

  }, [])

  const updateWallet = async (accounts: any) => {
    setWallet({ accounts })
  }

  return (
    <div>
      <div className="profile">
        <div className="user">

          <Link to="/profile"><img className="profileIcon" src="https://i.pinimg.com/736x/df/11/ac/df11acb295997d05484c57cb556c4a0a.jpg" /></Link>
          <div className="h2">
            <h2>{wallet.accounts[0]}</h2>
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
             <div className="profileimg"><Editor/></div>
              
            </div>

            <div>
              <Link to="/vibgyor">
                <div className="stat01">
                  CHASE THE COLOURS
                </div>
              </Link>

              <div className="wallet01">
                <p style={{ color: "black", marginLeft: "-74%" }}>M A T I C</p>
                <hr />
                <p style={{ color: "black", marginTop: "-15%", marginLeft: "72%" }}>0 MATIC</p>
                
                <img style={{ width: "80%", marginLeft: "0%", marginTop: "-12%" }} src={Matic} />
                <img style={{ width: "25%", marginLeft: "28%", marginTop: "48px" }} src="https://static.vecteezy.com/system/resources/thumbnails/008/880/081/small_2x/3d-up-down-arrow-pack-set-isolated-illustration-png.png" />

                <img style={{ width: "25%", marginLeft: "-32%", marginTop: "48px" }} src="https://static.vecteezy.com/system/resources/thumbnails/008/880/086/small_2x/3d-up-down-arrow-pack-set-isolated-illustration-png.png" />
                <h6 style={{color:"black", marginLeft: "-80%", marginTop: "208px"}}>D E P O S I T</h6>
                <h6 style={{color:"black", marginLeft: "68.8%", marginTop: "-35px"}}>T R A N S F E R</h6>
              </div>




            </div>
          </div>

        </div>
      </div>

    

    </div>
  );

}