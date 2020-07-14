import React, { Fragment } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom"
import LinearityApp from "./Linearity/LinearityApp"
import HomePage from "./HomePage/HomePage"
import ScrollToTop from "./ScrollToTop";

export default function App() {
    return (
        <>
            <BrowserRouter>
                <Switch>
                    <ScrollToTop>
                        <Route path="/" exact component={() => <HomePage />} />
                        <Route path="/linearity" exact component={() => <LinearityApp />} />
                    </ScrollToTop>
                </Switch>
            </BrowserRouter>
        </>
    );
}