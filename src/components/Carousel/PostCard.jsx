import React, { useState } from 'react'

import { styled } from '@mui/material/styles'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Avatar from '@mui/material/Avatar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import FavoriteIcon from '@mui/icons-material/Favorite'
import ShareIcon from '@mui/icons-material/Share'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import CommentIcon from '@mui/icons-material/Comment'

import "./estilos.css";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import { FreeMode, Navigation, Thumbs } from "swiper";

import avatarImage from './img/postAvatar.jpg'
import ts_1 from './img/carousels/ts_1.jpg'
import ts_2 from './img/carousels/ts_2.jpg'
import ts_3 from './img/carousels/ts_3.jpg'
import ts_4 from './img/carousels/ts_4.jpg'
import ts_5 from './img/carousels/ts_5.jpg'

const useStyles = styled(({ theme }) => ({
    media: {
        height: 0,
        paddingTop: '100%',
    },
    swiperContainer: {
        paddingBottom: '3rem',
        '& .swiper-pagination-bullet': {
            background: 'blue',
        },
        '& .swiper-button-next:after': {
            fontSize: '2rem !important',
        },
        '& .swiper-button-prev:after': {
            fontSize: '2rem !important',
        },
    },
}))

// SwiperCore.use([Keyboard, Scrollbar, Pagination, Navigation])

const images = [ts_1, ts_2, ts_3, ts_4, ts_5]

const PostCard = () => {

    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    return (
        <Card>
            <CardHeader
                avatar={<Avatar src={avatarImage} />}
                title='Just a Carousel'
                subheader={new Date().toDateString()}
                action={
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
                }
            />
            <Swiper
                style={{
                    "--swiper-navigation-color": "#fff",
                    "--swiper-pagination-color": "#fff",
                }}
                loop={true}
                spaceBetween={10}
                navigation={true}
                thumbs={{ swiper: thumbsSwiper }}
                modules={[FreeMode, Navigation, Thumbs]}
                className="mySwiper2"
            >

                {images.map((image, index) => (
                    <SwiperSlide key={index}>
                        <CardMedia height="140" image={image} component="img" />
                        {/* <img src={ts_1} /> */}
                    </SwiperSlide>
                ))}
            </Swiper>
            <Swiper
                // onSwiper={setThumbsSwiper}
                loop={true}
                spaceBetween={10}
                slidesPerView={4}
                freeMode={true}
                watchSlidesProgress={true}
                modules={[FreeMode, Navigation, Thumbs]}
                className="mySwiper"
            >
                {images.map((image, index) => (
                    <SwiperSlide key={index}>
                        <CardMedia height="140" image={image} component="img" />
                        {/* { <img src={image} /> } */}
                    </SwiperSlide>
                ))}


            </Swiper>
            {/* <Swiper
				grabCursor
				keyboard={{ enabled: true }}
				pagination={{ clickable: true }}
				navigation
				loop
				className={useStyles.swiperContainer}
			>
				{images.map((image, index) => (
					<SwiperSlide key={index}>
						<CardMedia className={useStyles.media} image={image} />
					</SwiperSlide>
				))}
			</Swiper> */}

            <CardActions disableSpacing>
                <IconButton>
                    <FavoriteIcon />
                </IconButton>
                <IconButton>
                    <CommentIcon />
                </IconButton>
                <IconButton>
                    <ShareIcon />
                </IconButton>
            </CardActions>

            <CardContent>
                <Typography variant='body2' color='textSecondary' component='p'>
                    Adipisicing eaque temporibus elit incidunt obcaecati. Aut eum excepturi id
                    aut consequatur ex? Incidunt debitis at consequuntur accusamus rerum
                    Tempora veritatis maiores quam molestias aut placeat qui. Iure neque libero
                    voluptas aliquid!
                </Typography>
            </CardContent>
        </Card >
    )
}

export default PostCard