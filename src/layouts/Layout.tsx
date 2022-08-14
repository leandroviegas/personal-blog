import React from "react";

// Components
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

type LayoutProps = {
    children: any;
}

const Index = ({ children }: LayoutProps) => {
    return (
        <div className="flex flex-col justify between min-h-screen">
            <Navbar />
            <div className="grow bg-zinc-100">
                {children}
            </div>
            <Footer />
        </div>
    )
}

export default Index