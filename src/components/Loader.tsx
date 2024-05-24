import React from 'react';


const Loader: React.FC = () => {
    return (
        <div
            className="absolute top-0 left-0 bottom-10 right-0 z-50 w-full flex items-center justify-center"
            style={{ zIndex: 1000, height: "100vh", backgroundColor: "#ffffff9e" }}
        >
            <img src='/loader.gif' alt="loader" />
        </div>
    );
};

export default Loader;
