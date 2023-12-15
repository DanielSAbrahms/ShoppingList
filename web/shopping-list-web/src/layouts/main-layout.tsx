import React from 'react';
import Link from 'next/link';

type MainLayoutProps = {
    children: React.ReactNode;
};

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
    return (
        <>
            <hr/>
            <nav>
                <Link href={'/'}>Shopping Lists</Link>
                &nbsp;|&nbsp;
                <Link href={'/stores'}>Stores</Link>
            </nav>
            <hr/>
            <main>{children}</main> {/* This will render the page content */}
        </>
    );
};

export default MainLayout;