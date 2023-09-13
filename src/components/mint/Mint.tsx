import { Link } from 'react-router-dom';
import detectEthereumProvider from '@metamask/detect-provider';
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react'
import "./mint.css";

export const Mint = () => {

    let navigate = useNavigate();

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
            let path = `/mint`;
            navigate(path);
        }
        handleConnect()

    }, [])

    const updateWallet = async (accounts: any) => {
        setWallet({ accounts })
    }
    
    return (
        <div>

            <div className="mint">
                <div className="user">
                    <Link to="/profile"><img className="profileIcon" src="https://i.pinimg.com/736x/df/11/ac/df11acb295997d05484c57cb556c4a0a.jpg"/></Link>
                    <div className="h2">
                        <h2>{wallet.accounts[0]}</h2>
                    </div>
                </div>
                <div>
                    <Link to="/vibgyor">
                        <button>MINT VIBGYOR</button>
                    </Link>
                </div>
                <img src="https://media.tenor.com/iyDS2fJlO7wAAAAC/rainbow-cute.gif" />
            </div>
        </div>

    );

}