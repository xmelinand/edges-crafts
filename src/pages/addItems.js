import { React, useEffect, useState } from "react";
import {
	TextField,
	Select,
	MenuItem,
	Box,
	FormControl,
	InputLabel,
	Grid,
	Divider,
	Button,
	Typography,
} from "@mui/material";
import { primaryColor, ternaryColor } from "../config";
import { Button1 } from "../components/anm-btn";
import { Card } from "react-bootstrap";
import axios from "axios";
import { SuccessBox } from "../components/SuccessBox";
import { CLOUDINARY_PRESET, CLOUDINARY_CLOUD } from "../config";

export default function AddItems() {
	const [category, setCategory] = useState("");
	const [description, setDescription] = useState("");
	const [price, setPrice] = useState();
	const [name, setName] = useState("");
	const [pic, setPic] = useState("");
	const [selectedImage, setSelectedImage] = useState(null);
	const [message, setMessage] = useState("");

	useEffect(() => {
		if (selectedImage != null) {
			const data = new FormData();
			data.append("file", selectedImage);
			data.append("upload_preset", CLOUDINARY_PRESET);
			data.append("folder", "Edge's Crafts");
			const uploadImage = async () => {
				try {
					const response = await axios.post(
						`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD}/upload`,
						data
					);
					setPic(response.data.url);
				} catch (error) {
					console.log(error);
				}
			};
			uploadImage();
		}
	}, [selectedImage]);

	const handleCategory = (event) => {
		setCategory(event.target.value);
	};
	const handleName = (event) => {
		setName(event.target.value);
	};
	const handlePrice = (event) => {
		setPrice(event.target.value);
	};
	const handleDescription = (event) => {
		setDescription(event.target.value);
	};
	const handlePic = (event) => {
		setPic(event.target.value);
	};

	const onImageChange = (event) => {
		setSelectedImage(event.target.files[0]);
	};

	var handleAddItem = async () => {
		var rawResponse = await fetch(`http://localhost:3000/articles/add-item`, {
			method: "POST",
			headers: { "Content-Type": "application/x-www-form-urlencoded" },
			body: `name=${name}&description=${description}&price=${price}&category=${category}&pic=${pic}`,
		});
		let response = await rawResponse.json();
		console.log(response.message);
		setMessage(response.message);
	};

	return (
		<Grid
			container
			sx={{
				p: 3,
				display: "flex",
				alignItems: "flex-start",
				backgroundColor: "gray",
			}}
		>
			<Grid
				item
				xs={12}
				md={6}
				sx={[styles.grids, { borderRight: "1px solid rgba(0,0,0,0.5)" }]}
			>
				<h3>CRÉATION</h3>

				<Box sx={styles.box}>
					<TextField
						sx={styles.inputs}
						id="outlined-basic"
						label="Nom"
						variant="outlined"
						value={name}
						onChange={handleName}
						required
					/>
					<TextField
						sx={styles.inputs}
						id="outlined-basic"
						label="Description"
						variant="outlined"
						multiline={true}
						value={description}
						onChange={handleDescription}
						required
					/>
					<FormControl sx={styles.inputs}>
						<InputLabel id="demo-simple-select-label">Type</InputLabel>
						<Select
							labelId="demo-simple-select-label"
							id="demo-simple-select"
							value={category}
							label="Type"
							onChange={handleCategory}
							required
						>
							<MenuItem value="Murale">Murale</MenuItem>
							<MenuItem value="Suspension">Suspension</MenuItem>
							<MenuItem value="Fleurs séchées">Fleurs séchées</MenuItem>
							<MenuItem value="Accessoire">Accessoire</MenuItem>
						</Select>
					</FormControl>
					<TextField
						sx={styles.inputs}
						id="outlined-basic"
						type="number"
						label="Prix"
						variant="outlined"
						value={price}
						onChange={handlePrice}
						required
					/>
					<Divider sx={{ width: "80%", backgroundColor: "black", mt: 2 }} />
					<TextField
						sx={styles.inputs}
						id="outlined-basic"
						label="Img-url"
						variant="outlined"
						value={pic}
						onChange={handlePic}
						required
					/>
					<Typography sx={{ mt: 1 }}> ou </Typography>
					<input
						className="stripe_button"
						type="file"
						accept="image/png, image/jpeg"
						onChange={onImageChange}
						required
					/>
					<Divider sx={{ width: "80%", backgroundColor: "black" }} />

					<Button
						variant="contained"
						sx={{ backgroundColor: ternaryColor, mt: 2 }}
						onClick={() => handleAddItem()}
					>
						Ajouter au shop
					</Button>
				</Box>
			</Grid>
			{/* //! PREVIEW */}
			<Grid item xs={12} md={6} sx={[styles.grids, { pl: 3 }]}>
				<h3>PREVIEW</h3>
				<Card
					className="shadow"
					style={{
						margin: "10px",
						borderRadius: 0,
						border: "1px solid #967469",
						padding: 0,
						width: "50%",
					}}
				>
					<Card.Img
						variant="top"
						style={{ padding: "2%", objectFit: "cover" }}
						alt={`Handcrafted macramé named ${name}`}
						src={pic}
					/>
					<Card.Body>
						<Card.Title tag="h5">{name}</Card.Title>
						<Card.Subtitle className="mb-2 text-muted" tag="h6">
							{category}
						</Card.Subtitle>
						<Card.Text>{description}</Card.Text>
						<div className="d-flex align-items-center justify-content-between">
							<Button1
								name="Ajouter au panier"
								action={() => {
									console.log(name);
								}}
							></Button1>
							<div>
								{" "}
								<strong>{price}$</strong>{" "}
							</div>
						</div>
					</Card.Body>
				</Card>
				{message ? <SuccessBox message={message} action={()=> setMessage('')} /> : ""}
			</Grid>
		</Grid>
	);
}

var styles = {
	inputs: {
		mt: 2,
		width: "70%",
	},
	grids: {
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
	},
	box: {
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "white",
		border: `solid 1px ${primaryColor}`,
		width: "80%",
		padding: 2,
		margin: 1,
		boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.1)",
	},
};
