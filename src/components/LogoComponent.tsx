import Image from "next/image";

import React from "react";


const LogoComponent: React.FC = () => {
    return (<Image
        className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
        src="/miniblog-logo.png"
        alt="Mini Blog Logo"
        width={180}
        height={37}
        priority
    />);
};

export default LogoComponent;
