import detectEthereumProvider from '@metamask/detect-provider';
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react'
import "./login.css";

export const Login = () => {

    let navigate = useNavigate();

    // let injectedProvider = false

    if (typeof window.ethereum !== 'undefined') {
        // injectedProvider = true
        console.log(window.ethereum)
    }

    const [hasProvider, setHasProvider] = useState<boolean | null>(null)
    const initialState = { accounts: [] }
    const [wallet, setWallet] = useState(initialState)

    useEffect(() => {
        const getProvider = async () => {
            const provider = await detectEthereumProvider({ silent: true })
            console.log(provider)
            setHasProvider(Boolean(provider)) // transform provider to true or false
        }

        getProvider()
    }, [])

    const updateWallet = async (accounts: any) => {
        setWallet({ accounts })
    }

    const handleConnect = async () => {
        let accounts = await window.ethereum.request({
            method: "eth_requestAccounts",
        })
        updateWallet(accounts)
        console.log(wallet)
        let path = `/mint`;
        navigate(path);
    }

    return (
        <div>
            <div className="article">
                <div>
                    {hasProvider &&
                        <button onClick={handleConnect}>LOGIN</button>
                    }
                </div>
                <img src="https://media.tenor.com/iyDS2fJlO7wAAAAC/rainbow-cute.gif" />
                <div className="content">

                </div>
            </div>
        </div>
    );

}