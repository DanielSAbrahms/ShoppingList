import React from "react";
import store from "@/stores/store";
import { Provider } from "react-redux";
import Link from "next/link";

type AppLayoutProps = {
    children: React.ReactNode;
};

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
    return (
        <>
            <hr />
            <nav>
                <Link href={"/"}>Shopping Lists</Link>
                &nbsp;|&nbsp;
                <Link href={"/stores"}>Stores</Link>
            </nav>
            <hr />
            <main>{children}</main> {/* This will render the page content */}
        </>
    );
};

export default AppLayout;
