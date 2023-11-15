import React from 'react';
import Link from 'next/link';

type MainLayoutProps = {
    children: React.ReactNode;
};

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
    return (
        <>
            <nav>
                <Link href="/shopping-lists">View Shopping Lists</Link>
            </nav>
            <main>{children}</main> {/* This will render the page content */}
        </>
    );
};

export default MainLayout;