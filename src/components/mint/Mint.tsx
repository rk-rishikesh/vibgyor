import { Link } from 'react-router-dom';
import detectEthereumProvider from '@metamask/detect-provider';
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react'
import { TokenboundClient } from '@tokenbound/sdk'
import { ethers } from "ethers";
import {
    VIBGYORADDRESS,
    VIBGYORABI,
} from "../../contracts/Vibgyor";

import {
    RESGISTRYADDRESS,
    RESGISTRYABI,
} from "../../contracts/ERC6551Registry";

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
    // const [balance, setBalance] = useState(0)
    const [live, setIsDeployed] = useState(false)
    const [tba, setTBA] = useState("")

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

            await updateWallet(accounts)

            const vibgyor = new ethers.Contract(
                VIBGYORADDRESS,
                VIBGYORABI,
                signer
            );

            console.log(VIBGYORADDRESS)
            console.log(vibgyor)

            // CHECK VIBGYOR BALANCE OF THE USER HERE
            console.log(accounts[0])
            const balance = await vibgyor.balanceOf(
                accounts[0]
            );
            console.log(balance)

            // setBalance(balance)


            const totalSupply = await vibgyor.totalSupply();

            let tokenID = 0;
            for (var i = 0; i < totalSupply; i++) {
                const owner = await vibgyor.ownerOf(i);
                console.log(owner.toString().toLowerCase())
                console.log(wallet.accounts[0])
                if (owner.toString().toLowerCase() == wallet.accounts[0]) {
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
    
            console.log(tokenID.toString())
            console.log(account)
            setTBA(account)
    
            const isAccountDeployed = await tokenboundClient.checkAccountDeployment({
                accountAddress: account,
            })
    
            setIsDeployed(isAccountDeployed);
            console.log("IS ACCOUNT DEPLOYED?", isAccountDeployed)

        }
        handleConnect()

    }, [])

    const updateWallet = async (accounts: any) => {
        setWallet({ accounts })
        console.log(accounts[0])
    }

    const handleClick = async () => {
        const provider = await detectEthereumProvider({ silent: true })
        console.log(provider)
        const ethereum = await window.ethereum;

        const signer = await new ethers.BrowserProvider(ethereum).getSigner();
        console.log(signer)

        let accounts = await window.ethereum.request({
            method: "eth_requestAccounts",
        })

        updateWallet(accounts)

        const vibgyor = new ethers.Contract(
            VIBGYORADDRESS,
            VIBGYORABI,
            signer
        );

        console.log(VIBGYORADDRESS)
        console.log(vibgyor)

        // CHECK VIBGYOR BALANCE OF THE USER HERE
        console.log(accounts[0])
        const balance = await vibgyor.balanceOf(
            accounts[0]
        );

        console.log(balance)

        if (balance <= 0) {
            handleMint()
        } else {
            handleCreateAccount()
        }
    }

    const handleMint = async () => {
        const provider = await detectEthereumProvider({ silent: true })
        console.log(provider)
        const ethereum = await window.ethereum;

        const signer = await new ethers.BrowserProvider(ethereum).getSigner();
        console.log(signer)

        const vibgyor = new ethers.Contract(
            VIBGYORADDRESS,
            VIBGYORABI,
            signer
        );
        const transaction = await vibgyor.mintVIBGYOR();

        console.log(transaction);
        await transaction.wait();
        let path = `/mint`;
        navigate(path);
    }

    const handleCreateAccount = async () => {
        const provider = await detectEthereumProvider({ silent: true })
        console.log(provider)
        const ethereum = await window.ethereum;

        const signer = await new ethers.BrowserProvider(ethereum).getSigner();
        console.log(signer)

        const vibgyor = new ethers.Contract(
            VIBGYORADDRESS,
            VIBGYORABI,
            signer
        );

        const totalSupply = await vibgyor.totalSupply();

        let tokenID = 0;
        for (var i = 0; i < totalSupply; i++) {
            const owner = await vibgyor.ownerOf(i);
            if (owner.toString().toLowerCase() == wallet.accounts[0]) {
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

        console.log("IS ACCOUNT DEPLOYED?", isAccountDeployed)

        if (isAccountDeployed) {
            let path = `/vibgyor`;
            navigate(path);
        } else {
            const registry = new ethers.Contract(
                RESGISTRYADDRESS,
                RESGISTRYABI,
                signer
            );

            const implementation = "0x2D25602551487C3f3354dD80D76D54383A243358"
            const chainId = 5
            const tokenContract = VIBGYORADDRESS
            const tokenId = tokenID
            const salt = 0

            const transaction = await registry.createAccount(
                implementation,
                chainId,
                tokenContract,
                tokenId,
                salt,
                "0x8129fc1c"
            )

            console.log(transaction);
            await transaction.wait();
            let path = `/vibgyor`;
            navigate(path);
        }

    }

    return (
        <div>
            <div className="mint">
                <div className="user">
                    <Link to="/profile"><img className="profileIcon" src="https://i.pinimg.com/736x/df/11/ac/df11acb295997d05484c57cb556c4a0a.jpg" /></Link>
                    <div className="h2">
                        <h2>{live ? tba : wallet.accounts[0]}</h2>
                    </div>
                </div>
                <div>
                    <button onClick={handleClick}>{live ? "ENTER VIBGYOR" : "MINT VIBGYOR"}</button>
                </div>
                <img src="https://media.tenor.com/iyDS2fJlO7wAAAAC/rainbow-cute.gif" />
            </div>
        </div>
    );
}