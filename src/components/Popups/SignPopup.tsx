import React from "react";

import { BsGoogle } from "react-icons/bs";

import SignInForm from "../Forms/SignInForm";
import SignUpForm from "../Forms/SignUpForm";
import OpaqueBackground from "../OpaqueBackground";

const SignPopup = ({ open, setOpen, tab, setTab }) => {

    return (
        <OpaqueBackground open={open} callback={() => setOpen(false)}>
            <div data-aos="fade-down" className="md:top-4 absolute max-h-full h-full md:h-auto overflow-y-auto mx-auto bg-white rounded-lg max-w-screen max-w-[550px] w-full shadow">
                <div className="p-8 text-zinc-700 rounded-t-lg h-auto">
                    <div className="grid grid-cols-2 border rounded">
                        <button onClick={() => setTab("SignIn")} className={`font-semibold w-full ${tab === "SignIn" ? "bg-violet-700 text-white" : "text-zinc-600 hover:text-zinc-900"} transition py-2 rounded`}>Entrar</button>
                        <button onClick={() => setTab("SignUp")} className={`font-semibold w-full ${tab === "SignUp" ? "bg-violet-700 text-white" : "text-zinc-600 hover:text-zinc-900"} transition py-2 rounded`}>Registrar-se</button>
                    </div>
                    <div className="flex justify-center items-center py-8 pb-5">
                        <span className="absolute text-sm bg-white px-2 text-zinc-500">Redes sociais</span>
                        <hr className="w-full" />
                    </div>

                    <div className="w-full flex justify-center py-3">
                        <button className="bg-red-500 rounded-lg font-semibold text-white transition px-4 py-2 hover:bg-red-600 flex items-center gap-2"><span><BsGoogle /></span><span className="text-sm opacity-90 font-normal">Entrar com Google</span></button>
                    </div>

                    <div className="flex justify-center items-center py-3">
                        <span className="absolute text-sm bg-white px-2 text-zinc-500">ou</span>
                        <hr className="w-full" />
                    </div>

                    {tab === "SignIn" &&
                        <SignInForm onSuccess={() => setOpen(false)} />}
                    {tab === "SignUp" &&
                        <SignUpForm onSuccess={() => setOpen(false)} />}
                </div>
            </div>
        </OpaqueBackground>
    )
}

export default SignPopup;