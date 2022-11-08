import { React, useState } from "react";
import { Button1 } from "./anm-btn";
import { Link } from "react-router-dom";
import { primaryColor, ternaryColor } from "../config";
import { FaShoppingCart, FaArrowLeft } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { Add, Edit, Menu } from "@mui/icons-material";
import {
	IconButton,
	Box,
	AppBar,
	Toolbar,
	Typography,
	Container,
	Button,
	Badge,
	SwipeableDrawer,
	List,
	ListItem,
	ListItemText,
	ListItemButton,
	Divider,
} from "@mui/material";
import articles from "../data/articles";
import UserPopover from "./userButton";

export default function NavBar() {
	const [hover, setHover] = useState(false);
	let color = hover ? primaryColor : "white";
	let colorIcon = !hover ? primaryColor : "white";
	const [state, setState] = useState(false);
	const [stateLeft, setStateLeft] = useState(false);

	var total = 12.99;
	const toggleDrawer = (event) => {
		setState(!state);
	};
	const toggleLeftDrawer = (event) => {
		setStateLeft(!stateLeft);
	};

	return (
		<AppBar position="static">
			<Container maxWidth="xl" sx={{ backgroundColor: "white", p:0 }}>
				<Toolbar
					sx={{
						display: "flex",
						justifyContent: { xs: "space-between", md: "" },
					}}
					disableGutters
				>
					{/* //!BoxLOGO */}
					<Box
						sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
						className="md-me-auto"
					>
						<Link to="/">
							<img
								className="d-none d-md-block"
								style={{ maxHeight: "70px" }}
								src="../logo.png"
								alt="Logo de l'entreprise"
								href="/"
							/>
						</Link>
					</Box>
					{/* //!Left Button Box // SmallScreen */}
					<Box sx={{ display: { xs: "flex", md: "none" } }}>
						<IconButton
							size="large"
							aria-label="account of current user"
							aria-controls="menu-appbar"
							aria-haspopup="true"
							onClick={() => {
								toggleLeftDrawer();
							}}
							color="inherit"
						>
							<Menu style={{ color: primaryColor }} />
						</IconButton>
					</Box>
					{/* //!Title-SmallScreen */}
					<Link to="/">
						<Typography
							variant="h5"
							noWrap
							sx={{
								mr: 2,
								display: { xs: "flex", md: "none" },
								flexGrow: 1,
								fontFamily: "fg",
								fontWeight: 700,
								letterSpacing: ".1rem",
								color: ternaryColor,
								textDecoration: "none",
								fontSize: 20,
							}}
						>
							Edge's Crafts
						</Typography>
					</Link>
					{/* //!  ADMIN BUTTONS */}
					{/* //TODO Hide/show if admin */}
					<Box
						sx={{
							flex: 1,
							display: { xs: "none", md: "flex" },
							justifyContent: "flex-end",
							alignItems: "center",
						}}
					>
						<Link to="/add-items">
							<Button
								variant="contained"
								sx={{ backgroundColor: ternaryColor, mr: 1 }}
							>
								<Add fontSize="medium" />
							</Button>
						</Link>
						<Button
							variant="contained"
							sx={{ backgroundColor: primaryColor, mr: 1 }}
							aria-label="edit"
							label="Edit"
						>
							<Edit fontSize="medium" />
						</Button>
						{/* //!USER BUTTON / large screen */}
						<UserPopover sx={{ display: { xs: "none", md: "flex" } }} />
					</Box>
					<Box
						sx={{
							display: { xs: "none", md: "flex" },
							justifyContent: "flex-end",
						}}
					>
						{/* //!Nav buttons // LargeScreen */}
						<Link to="/" style={{textDecoration:'none'}} >
							<Button1 name="HOME"></Button1>
						</Link>
						<Link to="/shop" style={{textDecoration:'none'}}>
							<Button1 name="SHOP"></Button1>
						</Link>
						<Link to="/about" style={{textDecoration:'none'}}>
							<Button1 name="ABOUT"></Button1>
						</Link>
						<Link to="/about" style={{textDecoration:'none'}}>
							<Button1 name="CONTACT"></Button1>
						</Link>
					</Box>
					<Box sx={{ display: "flex" }}>
						{" "}
						{/* //!USER BUTTON / large screen */}
						<Box sx={{ display: { xs: "flex", md: "none" } }}>
							<UserPopover />
						</Box>
						{/* //!Cart button // Toggles Right Drawer */}
						<IconButton
							style={{
								backgroundColor: `${color}`,
								border: `1px solid ${primaryColor}`,
							}}
							onMouseOver={() => {
								setHover(true);
							}}
							onMouseOut={() => {
								setHover(false);
							}}
							onClick={() => toggleDrawer()}
						>
							<Badge badgeContent={9} color="error">
								<FaShoppingCart color={colorIcon} size={16} />
							</Badge>
						</IconButton>
					</Box>

					{/* //!RIGHT DRAWER CONTENT */}
					<SwipeableDrawer
						anchor="right"
						open={state}
						onOpen={() => console.log("open")}
						onClose={(event, reason) => {
							if (reason === "backdropClick") {
								setState(false);
							}
						}}
					>
						{/* //!HEADER   */}
						<List
							sx={{
								padding: 0,
								width: { xs: "100vw", md: "33vw" },
							}}
						>
							<ListItem
								sx={{
									backgroundColor: "black",
									position: "sticky",
									top: 0,
									zIndex: 10,
								}}
							>
								<IconButton
									onClick={() => toggleDrawer()}
									className="w-xs-3 w-lg-100"
								>
									<FaArrowLeft color="white" size={20} />
								</IconButton>
								<ListItemText
									sx={{ my: 0, marginLeft: "20px" }}
									primary="Mon Panier"
									primaryTypographyProps={{
										fontSize: 20,
										fontWeight: "medium",
										letterSpacing: 0,
										color: "white",
									}}
								/>
								<FaShoppingCart color="white" />
							</ListItem>
							{/* //!ITEMS */}
							{articles.map((item, index) => (
								<Box>
									<ListItem key={index} sx={{ textAlign: "center" }}>
										<div
											style={{
												flex: 1,
												display: "flex",
												justifyContent: "space-between",
												alignItems: "center",
											}}
										>
											<div>
												<img
													style={{ objectFit: "cover" }}
													height={130}
													width={130}
													src={item.pic}
													srcSet={`${item.pic}`}
													alt={item.name}
													loading="lazy"
												/>
											</div>
											<div>
												<ListItemText>
													<strong>Name</strong>
												</ListItemText>
												<ListItemText>{item.name}</ListItemText>
											</div>
											<div>
												<ListItemText>
													<strong>Price</strong>
												</ListItemText>
												<ListItemText>{item.price}</ListItemText>
											</div>
											<IconButton>
												<IoClose size={20} color="grey" />
											</IconButton>
										</div>
										<Divider />
									</ListItem>
									<Divider variant="middle" sx={{ backgroundColor: "black" }} />
								</Box>
							))}
							{/* //!Footer */}
							<ListItem
								sx={{
									backgroundColor: "black",
									position: "sticky",
									bottom: 0,
									zIndex: 10,
								}}
							>
								<ListItemText
									className="pe-3"
									sx={{ my: 0, marginLeft: "20px" }}
									primaryTypographyProps={{
										fontSize: 16,
										fontWeight: "medium",
										color: "white",
									}}
								>
									<strong>Total: {total} $CAD</strong>
								</ListItemText>
								<Button
									style={{
										backgroundColor: ternaryColor,
										border: "none",
										fontFamily: "fg",
										color: "white",
									}}
								>
									Commander
								</Button>
							</ListItem>
						</List>
					</SwipeableDrawer>
					{/* //!LEFT DRAWER */}
					<SwipeableDrawer
						anchor="left"
						open={stateLeft}
						onOpen={() => console.log("open")}
						onClose={(event, reason) => {
							if (reason === "backdropClick") {
								setStateLeft(false);
							}
						}}
					>
						{/* //!ITEMS */}
						<List className="xs-100vw md-33vw" sx={{ padding: 0 }}>
							<Link
								onClick={() => {
									toggleLeftDrawer();
								}}
							>
								<ListItemButton sx={{ my: 0, width: "50vw" }}>
									<ListItemText primary="HOME" />
								</ListItemButton>
							</Link>
							<Link
								onClick={() => {
									toggleLeftDrawer();
								}}
								to="/shop"
							>
								<ListItemButton sx={{ my: 0, width: "50vw" }}>
									<ListItemText primary="SHOP" />
								</ListItemButton>
							</Link>
							<Link
								onClick={() => {
									toggleLeftDrawer();
								}}
								to="/about"
							>
								<ListItemButton sx={{ my: 0, width: "50vw" }}>
									<ListItemText primary="ABOUT" />
								</ListItemButton>
							</Link>
							<Link
								onClick={() => {
									toggleLeftDrawer();
								}}
								to="/contact"
							>
								<ListItemButton sx={{ my: 0, width: "50vw" }}>
									<ListItemText primary="CONTACT" />
								</ListItemButton>
							</Link>
						</List>
					</SwipeableDrawer>
				</Toolbar>
			</Container>
		</AppBar>
	);
}
