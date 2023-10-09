"use client"
import Toast from '@/utils/toast'
import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import Link from 'next/link';
import { getCookie } from "cookies-next"
import { LoginAndRegisterContext } from '@/context/LoginAndRegisterContext';
const Logout = () => {


    const token = getCookie("token");
    const [profilePicture, setProfilePicture] = useState("")
    const [tokenExistOrNot, settokenExistOrNot] = useState(false)
    const [username, setUserName] = useState("")
    async function checkIfTokenExistOrNot() {
        if (token === undefined || token === null || token.length === 0) {
            settokenExistOrNot(false);
        } else {
            settokenExistOrNot(true);
        }
    }

    useEffect(() => {
        checkIfTokenExistOrNot();
    }, [token]);

    const getUserData = async () => {
        try {
            const userResponse = await fetch('/api/get-users');
            if (!userResponse.ok) {
                alert("Network response was not ok");
            }
            const user = await userResponse.json();
            setUserName(user?.userData?.username?.charAt(0).toUpperCase());
            console.log(user?.userData?.username);
        } catch (error: any) {
            Toast.ErrorShowToast(error.message || "Something went wrong");
        }
    };
    useEffect(() => {
        getUserData()
    }, [])

    return (
        <>
            {tokenExistOrNot ? (
                <Link href={"/profile"} className=" bg-white rounded-full text-black font-bold w-10 h-10 p-2 text-center flex items-center justify-center">
                    {
                        profilePicture != null ? (
                            <p>{username}</p>
                        ) : (
                            <p>P</p>
                        )
                    }
                </Link>
            ) : (
                <Link href="/login" className='bg-white text-black hover:text-white hover:bg-transparent duration-150 border-white hover:border text-center p-2 text-sm md:text-xl rounded-lg font-semibold w-16 md:w-32'>Login</Link>
            )}

        </>
    )
}

export default Logout