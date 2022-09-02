import React, { useContext, useEffect, useState } from 'react'
import './Navbar.css';
import Image from '../assets/amazon-logo.png';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import { Link,useNavigate } from 'react-router-dom';
import { LoginContext } from '../ContextProvider/Contextprovider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import LeftBar from './LeftBar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Navbar = () => {
    const { account, setAccount } = useContext(LoginContext);
    const navigate = useNavigate();
    console.log(account[0]);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const [DrawerOpen, setDrawerOpen] = useState(false);

    const getdetailvaliduser = async () => {
        const res = await fetch("/ValidUser", {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            credentials: "include"
        });
        const data = await res.json();
        console.log(data);
        if (res.status !== 201) {
            console.log("error");
        }
        else {
            console.log("Data is valid");
            setAccount(data);

        }
    };

    const Open = () => {
        setDrawerOpen(true)
    }

    const Close = () => {
        setDrawerOpen(false)
    }

    const LogOut = async () => {
        const res1 = await fetch("/LogOut", {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            credentials: "include"
        });
        const data1 = await res1.json();
        console.log(data1);
        if (res1.status !== 201) {
            console.log("error");
        }
        else {
            
            setAccount(false);
            navigate("/");
            console.log("User logout");
            toast.success("Successfully LogOut", {
                position: "top-center",
            })
        }
    };

    useEffect(() => {
        getdetailvaliduser();
    }, [])

    return (

        <header>
            <nav>
                <div className="left">
                    <IconButton className='hamburgur' onClick={Open}>
                        <MenuIcon style={{ color: "white" }} />
                    </IconButton>
                    <Drawer open={DrawerOpen} onClick={Close} >
                        <LeftBar Close={Close} LogOutUser={LogOut}/>
                    </Drawer>
                    <div className="navlogo">
                        <img src={Image} alt="" />
                    </div>
                    <div className="nav_searchbaar">
                        <input type="text" placeholder='Search The Products' />
                        <div className="search_icon">
                            <SearchIcon id='search' />
                        </div>
                    </div>
                </div>
                <div className="right">
                    <div className="nav_btn">
                        <Link to="/">Home</Link>
                    </div>

                    <div className="nav_btn">
                        <Link to="/signin">SignIn</Link>
                    </div>
                    <div className="cart_btn">
                        {
                            account ? <Link to='/buynow'>
                                <Badge badgeContent={account.carts?.length} color="primary">
                                    <ShoppingCartIcon id="icon" />
                                </Badge>
                            </Link> : <Link to='/login'>
                                <Badge badgeContent={0} color="primary">
                                    <ShoppingCartIcon id="icon" />
                                </Badge>
                            </Link>
                        }
                        < ToastContainer />
                        <p>Cart</p>
                    </div>
                    {
                        account ? <Avatar className='avtar2' onClick={handleClick} >
                            {account?.name[0].toUpperCase()}</Avatar> :
                            <Avatar className='avtar' onClick={handleClick}>
                            </Avatar>
                    }
                    <div>
                        <Menu id="basic-menu"
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            MenuListProps={{
                                'aria-labelledby': 'basic-button',
                            }}
                        >

                            <MenuItem onClose={handleClose}>My account</MenuItem>
                            {
                                account ? <MenuItem onClose={handleClose} onClick={LogOut}>Logout</MenuItem> : ""
                            }

                        </Menu>
                    </div>
                </div>
            </nav >
        </header >
    )
}

export default Navbar
