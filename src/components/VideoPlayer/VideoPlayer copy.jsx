import React, { useState } from 'react';
import MenuBar from "./MenuBar";
import MusicCard from "./MusicCard";
import { db } from "./db";
function getWindowSize() {
    const { innerWidth, innerHeight } = window;
    return { innerWidth, innerHeight };
}
const VideoPlayer = () => {
    const [windowSize, setWindowSize] = React.useState(getWindowSize());
    React.useEffect(() => {
        function handleWindowResize() {
            setWindowSize(getWindowSize());
        }
        window.addEventListener('resize', handleWindowResize);
        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };
    }, []);

    const [state,setState]=useState({current:1});
    const next = action => {
        
        
        let current = state.current;

        if (action === "next") {
            if (current === db.alternative.length) setState({ current: 1 });
            else {
                setState({ current: state.current + 1 });
            }
        } else {
            if (current === 1) {
                setState({ current: db.alternative.length });
            } else {
                setState({ current: state.current - 1 });
            }
        }
    }
    const play = () => {
        document.getElementById("video").src += "?autoplay=1";
    };

    return (
        <div>
            <MenuBar />
            <MusicCard
                data={db.alternative[state.current - 1]}
                next={() => next()}
                play={() => play()}
                playerW={windowSize.innerWidth>640?"640":"230"}
                playerH={windowSize.innerWidth>640?"480":"154"}
            />
            
        </div>
    );


}

export default VideoPlayer;
