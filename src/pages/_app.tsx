import { NextPage } from "next";
import { AppProps } from "next/app";
import React, { ReactElement, ReactNode } from "react";
import "src/styles/globals.css";
import "src/styles/global.antd.less";
import { ConfigProvider } from "antd";
import { AppTheme } from "src/styles/theme";
import { RecoilRoot } from "recoil";
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
    getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
    const [queryClient] = React.useState(() => new QueryClient());

    const getLayout = Component.getLayout ?? ((page) => page);

    return getLayout(
        <QueryClientProvider client={queryClient}>
            <Hydrate state={pageProps.dehydratedState}>
                <RecoilRoot>
                    <ConfigProvider theme={AppTheme}>
                        <Component {...pageProps} />
                    </ConfigProvider>
                </RecoilRoot>
            </Hydrate>
        </QueryClientProvider>
    );
}
