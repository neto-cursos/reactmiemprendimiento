import React, { useState } from 'react';
import MenuBar from "./MenuBar";
import MusicCard from "./MusicCard";
import { db } from "./db";
import "./estilos.css";
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Avatar from '@mui/material/Avatar'
import IconButton from '@mui/material/IconButton'
import FavoriteIcon from '@mui/icons-material/Favorite'
import ShareIcon from '@mui/icons-material/Share'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import CommentIcon from '@mui/icons-material/Comment'
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { FixedSizeList } from 'react-window';
import { useParams } from 'react-router-dom';

function renderRow(props) {
    const { index, style } = props;
    return (
        <ListItem style={style} key={index} component="div" disablePadding>
            <ListItemButton>
                <ListItemText primary={`Item ${index + 1}`} />
            </ListItemButton>
        </ListItem>
    );
}
function getWindowSize() {
    const { innerWidth, innerHeight } = window;
    return { innerWidth, innerHeight };
}
const VideoPlayer = () => {
    const {code}=useParams();
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

    const [state, setState] = useState({ current: 1 });
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
        <div className='flex flex-row items-center justify-center'>
            <Grid container>
                <Grid
                    item
                    xs={12}
                    style={{ height: '4rem', display: 'grid', placeItems: 'center' }}
                >
                    <Typography variant='h3' className="text-whitish">Galería de Videos</Typography>
                </Grid>

                <Grid item container xs={12} justifyContent='center'>
                    <Grid item xs={12}>
                        {/* <PostCard />{' '} */}
                        <Card className='flex flex-col'>
                            <CardHeader
                                sx={{ bgcolor: '#23acb4' }}
                                avatar={<Avatar src={'#'} />}
                                title='Videos De Modelo de Negocios Canvas'
                                // subheader={new Date().toDateString()}
                                action={
                                    <IconButton>
                                        <MoreVertIcon />
                                    </IconButton>
                                }

                            />
                            <CardActions disableSpacing>
                                {/* <IconButton>
                                    <FavoriteIcon />
                                </IconButton>
                                <IconButton>
                                    <CommentIcon />
                                </IconButton>
                                <IconButton>
                                    <ShareIcon />
                                </IconButton> */}
                            </CardActions>

                            <CardContent className="flex flex-row">
                                <div className='flex-col'>
                                    <Typography component="h5" variant="h5">
                                        {db.alternative[state.current - 1].title}
                                    </Typography>
                                    <Typography variant="subtitle1" color="textSecondary">
                                        {db.alternative[state.current - 1].artist}
                                    </Typography>
                                    {/* db.alternative[state.current - 1].videoId */}
                                    <iframe
                                        id="video"
                                        width={windowSize.innerWidth > 640 ? "640" : "230"}
                                        height={windowSize.innerWidth > 640 ? "480" : "154"}
                                        src={"https://www.youtube.com/embed/" + code}
                                        frameBorder="0"
                                        allow="accelerometer, autoplay; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    />
                                </div>

                                <Box
                                    className="flex flex-col"
                                    sx={{ bgcolor: 'background.paper',pt:'2rem',pl:'2rem' }}
                                >
                                    <Typography component="h5" variant="h5" sx={{display:'flex',pb:'2rem'}}>
                                        Lista de Videos
                                    </Typography>
                                    <FixedSizeList
                                        height={400}
                                        width={360}
                                        itemSize={46}
                                        itemCount={200}
                                        overscanCount={5}
                                    >
                                        {renderRow}
                                    </FixedSizeList>
                                </Box>
                            </CardContent>
                            <div className="flex flex-row">
                                <IconButton aria-label="Anterior" onClick={() => next("prev")}>
                                    {/* {theme.direction === "rtl" ? (
              <SkipNextIcon />
            ) : ( */}
                                    <SkipPreviousIcon sx={{ fontSize: 60 }} />
                                    {/* )} */}
                                </IconButton>
                                <IconButton aria-label="Reproducir/pausa">
                                    <PlayArrowIcon
                                        sx={{ fontSize: 60 }}
                                        className={''}
                                        onClick={() => play()}
                                    />
                                </IconButton>
                                <IconButton aria-label="Siguiente" onClick={() => next("next")}>
                                    {/* {theme.direction === "rtl" ? ( */}
                                    {/* <SkipPreviousIcon />
            ) : ( */}
                                    <SkipNextIcon
                                        sx={{ fontSize: 60 }} />
                                    {/* )} */}
                                </IconButton>
                            </div>


                        </Card >

                    </Grid>
                </Grid>
            </Grid>

            {/* <MenuBar /> */}


        </div >
    );


}

export default VideoPlayer;

