import React from 'react';
import Link from 'next/link';
import store from '@/stores/store';
import { Provider } from 'react-redux';

type MainLayoutProps = {
    children: React.ReactNode;
};

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
    return (
        <Provider store={store}>
            <hr/>
            <nav>
                <Link href={'/'}>Shopping Lists</Link>
                &nbsp;|&nbsp;
                <Link href={'/stores'}>Stores</Link>
            </nav>
            <hr/>
            <main>{children}</main> {/* This will render the page content */}
        </Provider>
    );
};

export default MainLayout;