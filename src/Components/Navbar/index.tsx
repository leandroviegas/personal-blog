import { useState } from "react"
import { Link } from "react-router-dom"

import { FaSearch } from "react-icons/fa"
import { TiCode } from "react-icons/ti"
import { MdClose } from "react-icons/md"
import { BiMenu } from "react-icons/bi"

const Index = () => {

    const [showNavbar, setShowNavbar] = useState<boolean>(false)

    return (
        <>
            <nav className="w-full bg-gradient-to-b from-sky-600 to-cyan-400">
                <div className="container mx-auto flex flex-row justify-between lg:items-center py-4 ">
                    <div className="shrink-0 grow flex flex-col md:flex-row justify-start items-center gap-4 px-2">
                        <Link to={"/"} className="flex items-center gap-1">
                            <span className="text-4xl text-zinc-800 shrink-0"><TiCode /></span>
                            <span className="font-semibold text-white text-zinc-800 shrink-0">Leandro Viegas 2</span>
                        </Link>
                        <form className="w-full md:w-auto flex items-center bg-white h-7 rounded border border-zinc-200 text-sm text-zinc-600">
                            <button className="px-2 text-zinc-700 h-full text-center border-r border-zinc-300"><FaSearch /></button>
                            <input className="grow w-full px-2 h-full rounded-r bg-zinc-50 outline-none" placeholder="Procurar" type="text" />
                        </form>
                    </div>
                    <div className="absolute top-0 right-0 text-3xl p-4 lg:hidden">
                        <BiMenu onClick={() => setShowNavbar(true)} />
                    </div>
                    <div className={`${showNavbar ? "" : "hidden "}w-screen lg:block h-screen lg:h-auto fixed lg:relative right-0 top-0 z-20 flex justify-end bg-black/70 lg:bg-transparent`}>
                        {showNavbar &&
                            <div className="h-full p-4 lg:p-0 bg-white lg:bg-transparent justify-start w-64 lg:w-auto flex flex-col lg:flex-row lg:items-center gap-4 text-gray-800 font-semibold">
                                {[
                                    { value: "Página Inicial", href: "/" },
                                    { value: "Blog", href: "/blog" },
                                    { value: "Sobre Mim", href: "/sobre-mim" },
                                    { value: "Contato", href: "/contato" }
                                ].map(link => <Link className={`order-1 text-zinc-700 hover:text-black ${window.location.pathname + window.location.hash === link.href ? "text-black lg:text-white" : "hover:lg:text-white/90"}`} to={link.href} key={link.value + link.href}>{link.value}</Link>)}
                                <div className="order-0 lg:order-1">
                                    <div className="lg:hidden w-full mb-4 flex justify-end">
                                        <MdClose onClick={() => setShowNavbar(false)} className="text-zinc-600 hover:text-black text-4xl cursor-pointer" />
                                    </div>
                                    <div className="flex gap-4 text-sm">
                                        <button className="bg-gradient-to-b from-sky-600 to-cyan-400 lg:from-white lg:to-white hover:text-black text-gray-700 rounded py-1 px-4">Entrar</button>
                                        <button className="bg-gradient-to-b from-sky-600 to-cyan-400 lg:from-white lg:to-white hover:text-black text-gray-700 rounded py-1 px-4">Registrar-se</button>
                                    </div>
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Index