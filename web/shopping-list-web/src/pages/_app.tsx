// pages/_app.tsx
import React from "react";
import { AppProps } from "next/app";
import { Provider } from "react-redux";
import store from "@/stores/store";

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }: AppProps) {
    return (
        <Provider store={store}>
            <Component {...pageProps} />
        </Provider>
    );
}
