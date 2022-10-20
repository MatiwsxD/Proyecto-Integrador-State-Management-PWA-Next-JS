import React, { useState } from 'react'
import { Grid, Container, Paper, Avatar, Typography, TextField, Button, CssBaseline } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import fondo from './assets/images/fondo.png'
import { LockOutlined as LockOutlinedIcon } from '@material-ui/icons'



const useStyles = makeStyles(theme => ({
	root: {
		backgroundImage: `url(${fondo})`,
		backgroundRepeat: 'no-repeat',
		backgroundSize: 'cover',
		backgroundPosition: 'center',
		height: '100vh'
	},
	container: {
		opacity: '0.8',
		height: '60%',
		marginTop: theme.spacing(10),
		[theme.breakpoints.down(400 + theme.spacing(2) + 2)]: {
			marginTop: 0,
			width: '100%',
			height: '100%'
		}
	},
	div: {
		marginTop: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center'
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.primary.main
	},
	form: {
		width: '100%',
		marginTop: theme.spacing(1)
	},
	button: {
		margin: theme.spacing(3, 0, 2)
	}
}))



const App = () => {
	const { state, dispatch } = useContext(ThemeContext);
	const [body, setBody] = useState({ nickname: '', password: '' })
	const classes = useStyles()



	const handleChange = e => {
		setBody({
			...body,
			[e.target.name]: e.target.value
		})
	}


	let onSubmit = async () => {

		const response = await fetch(url + "/v1/auth", {
            mode: "cors",
            method: "POST",
            body: JSON.stringify({
                email: setBody.nickname,
                password: setBody.password,
            }),
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json",
            },

        }).then(response=>response.json()).then(json => {
			window.$token=json.token;
			window.$expiration=json.expirationDate;
			navigate("../tasks")
		});

	  }

	  
	

	return (
		<Grid container component='main' className={classes.root}>
			<CssBaseline />
			<Container component={Paper} elevation={5} maxWidth='xs' className={classes.container}>
				<div className={classes.div}>
					<Avatar className={classes.avatar}>
						<LockOutlinedIcon />
					</Avatar>
					<Typography component='h1' variant='h5'>Sign In</Typography>
					<form className={classes.form}>
						<TextField
							fullWidth
							autoFocus
							color='primary'
							margin='normal'
							variant='outlined'
							label='Nickname'
							name='nickname'
							value={body.nickname}
							onChange={handleChange}
						/>
						<TextField
							fullWidth
							type='password'
							color='primary'
							margin='normal'
							variant='outlined'
							label='Password'
							name='password'
							value={body.password}
							onChange={handleChange}
						/>
						<Button
							fullWidth
							variant='contained'
							color='secondary'
							className={classes.button}
							onClick={() => onSubmit()}
						>
							Sign In
						</Button>
					</form>
				</div>
			</Container>
		</Grid>
	)
}

export default App
