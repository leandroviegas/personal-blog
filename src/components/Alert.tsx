import React from "react";

import { FaInfoCircle } from "react-icons/fa";
import { VscError } from "react-icons/vsc";
import { GrStatusGood } from "react-icons/gr";

export type AlertProps = {
    message: string;
    type: "success" | "error" | "warning";
}

const Index = ({ message, type }: AlertProps) => {
    return (
        <>
            {type === "error" &&
                <div className="rounded gap-1 text-sm py-1 px-2 bg-red-100 border border-red-600 text-red-700 flex items-center">
                    <VscError />
                    {message}
                </div>
            }

            {type === "success" &&
                <div className="rounded gap-1 text-sm py-1 px-2 bg-green-100 border border-green-600 text-green-700 flex items-center">
                    <GrStatusGood />
                    {message}
                </div>
            }

            {type === "warning" &&
                <div className="rounded gap-1 text-sm py-1 px-2 bg-yellow-100 border border-yellow-600 text-yellow-700 flex items-center">
                    <FaInfoCircle />
                    {message}
                </div>
            }
        </>
    )
}

export default Index;