"use client";
import {store} from "@/redux/store";
import {Provider} from "react-redux";
import React, {FC, ReactNode} from "react";

interface Props {
    children: ReactNode;
}

export const ClientProvider: FC<Props> = ({children}) => {
    return (
        <Provider store={store}>
            {children}
        </Provider>
    );
};