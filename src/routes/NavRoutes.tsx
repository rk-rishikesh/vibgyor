import { Route, Routes } from "react-router-dom";
import { Accordion } from "../components";
import { Mint } from "../components/mint/Mint";
import { Login } from "../components/login/login";
import { Profile } from "../components/profile/Profile";

export const NavRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/mint" element={<Mint />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/vibgyor" element={<Accordion />} />
        </Routes>
    );
};