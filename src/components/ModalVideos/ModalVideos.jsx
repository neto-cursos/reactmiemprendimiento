import React, { useEffect, useRef, useState } from 'react'
//import ModalVideo from 'react-modal-video'

const ModalVideos = ({playVideo,setPlayVideo}) => {
    const videoId='ZQgXyiozmYY';
    //const [isOpen, setOpen] = useState(playVideo.play)
    
    return (playVideo.id!==null&&
        <React.Fragment>
            {/* <ModalVideo channel='youtube' autoplay={1} isOpen={playVideo.play} videoId={playVideo.id} onClose={() => setPlayVideo({...playVideo,play:false})} /> */}

            {/* <button className="btn-primary" onClick={() => setOpen(true)}>{suge_text}</button> */}
        </React.Fragment>
    );
}

export default ModalVideos;
