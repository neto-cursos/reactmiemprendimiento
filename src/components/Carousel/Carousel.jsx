import React from 'react';
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

import PostCard from './PostCard'


const Carousel = () => {
    return (
        <div>
			<Grid container>
				<Grid
					item
					xs={12}
					style={{ height: '25vh', display: 'grid', placeItems: 'center' }}
				>
					<Typography variant='h3'>Insta Carousel</Typography>
				</Grid>

				<Grid item container xs={12} justifyContent='center'>
					<Grid item xs={3}>
						<PostCard />{' '}
					</Grid>
				</Grid>
			</Grid>
		</div>
    );
}

export default Carousel;

