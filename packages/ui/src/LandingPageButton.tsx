'use client';
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@web/firebase";

const LandingPageButton = ({ styles }: any) => {
    const [user] = useAuthState(auth);
    return (
        <button onClick={(e) => {
            e.preventDefault();
            window.location.href = (user ? '/userPortal' : '/login');
        }}
            name="mainButton"
            type="button"
            className={`quoteButton py-4 px-6 font-poppins font-medium text-[18px] text-primary bg-blue-gradient rounded-[10px] outline-none ${styles}`}>
            Add Your Properties
        </button>
    );
};

export default LandingPageButton;
