import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { UserProvider } from "./store/UserContext";

import Navbar from "./container/Navbar";
import Routes from "./routes";
import Footer from "./container/Footer";

const MainApp = (props) => {
    return (
        <UserProvider>
            <Router>
                <div className="relative min-h-[100vh] flex flex-col font-axiforma">
                    <div>
                        <Navbar {...props} />
                    </div>
                    <div className="flex-1">
                        <Routes {...props} />
                    </div>
                    <Footer />
                </div>
            </Router>
        </UserProvider>
    );
};
export default MainApp;

// https://dribbble.com/shots/20958621-Wemeet-Webinar-Landing-Page
