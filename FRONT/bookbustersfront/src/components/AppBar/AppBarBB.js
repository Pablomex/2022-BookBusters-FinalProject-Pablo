import React, { useContext } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { Link } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import authContext from "../../contexts/AuthContext";
import scannerIcon from "../../assets/img/scanner-icon.svg";
import { convertLength } from "@mui/material/styles/cssUtils";
import logoBusters from "../../assets/img/logoBusters.svg";
import logoBustersWhiteDesktop from "../../assets/img/logo_bb_reserve.svg";

const pages = [
  {
    href: "/",
    style: { textDecoration: "none" },
    sx: { color: { xs: "black", md: "white" } },
    label: "Accueil",
    disconnectedOnly: false,
  },
  {
    href: "/Contact",
    style: { textDecoration: "none" },
    sx: { color: { xs: "black", md: "white" } },
    label: "Contact",
    disconnectedOnly: false,
  },
  {
    href: "/Credits",
    style: { textDecoration: "none" },
    sx: { color: { xs: "black", md: "white" } },
    label: "Crédits",
    disconnectedOnly: false,
  },
  {
    href: "/signUp",
    style: { textDecoration: "none" },
    sx: {
      color: { xs: "black", md: "white" },
      display: { xs: "none", md: "block" },
    },
    label: "Inscription",
    disconnectedOnly: true,
  },
  {
    href: "/SignIn",
    style: { textDecoration: "none", color: "fff" },
    sx: {
      color: { xs: "black", md: "white" },
      display: { xs: "none", md: "block" },
    },
    label: "Connexion",
    disconnectedOnly: true,
  },
];

const ResponsiveAppBar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const { logOut } = useContext(authContext);
  // Utilisation du token pour conditionnalités
  const jwt = localStorage.getItem("jwt");

  const settings = [
    {
      href: "/Account",
      style: { color: "#fff", textDecoration: "none" },
      sx: { color: "black" },
      label: "Mon compte",
      action: null,
    },
    {
      href: "/MyAlerts",
      style: { color: "#fff", textDecoration: "none" },
      sx: { color: "black" },
      label: "Mes alertes",
      action: null,
    },
    {
      href: "/Library",
      style: { color: "#fff", textDecoration: "none" },
      sx: { color: "black" },
      label: "Ma bibliothèque",
      action: null,
    },
    {
      href: "/Favorites",
      style: { color: "#fff", textDecoration: "none" },
      sx: { color: "black" },
      label: "Mes favoris",
      action: null,
    },
    {
      href: null,
      style: { color: "#fff", textDecoration: "none" },
      sx: { color: "black" },
      label: "Déconnexion",
      action: logOut,
    },
  ];

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const navlinks = pages.filter((page) => {
    // Pour afficher une route, je dois return `true`.

    if (!page.disconnectedOnly) return true;
    // Boolean(jwt); => Est-ce que jwt contient quelque chose et si ce quelque chose n'est pas false, null ou encore undefined
    // Si jamais le booléen vaut true, alors cela signifie qu'un token est stocké, et par conséquent je veux masquer
    // les liens qui ne sont visibles que pour les utilisateurs non connectés.

    // Ici, je m'assure que si un JWT est stocké, je return `false` pour ne pas afficher la route.
    return !Boolean(jwt);
  });

  return (
      <AppBar position='sticky' sx={{ top: 0, left: 0, right: 0 }}>
          <Container
              maxWidth='xl'
              style={{
                  paddingInline: '0 10px',
                  maxWidth: '1280px',
                  display: 'flex',
                  flexFlow: 'row nowrap',
                  justifyContent: 'center',
                  flexGrow: 1,
              }}
          >
              <Toolbar disableGutters style={{ flexGrow: 1 }}>
                  <Typography
                      variant='h6'
                      noWrap
                      component='div'
                      sx={{
                          mr: 2,
                          display: { xs: 'none', md: 'flex' },
                          flexFlow: 'row nowrap',
                          flexGrow: 1,
                          gap: '20px',
                          justifyContent: 'flex-start',
                          alignItems: 'center',
                      }}
                  >
                      <Link to='/' sx={{ textDecoration: 'none' }}>
                          <Box
                              component='img'
                              style={{
                                  margin: '5px 0 -5px 10px',
                                  height: '50px',
                              }}
                              src={logoBustersWhiteDesktop}
                          ></Box>
                      </Link>

                      <SearchBar />
                      {jwt && (
                          <Link
                              to='/scan'
                              style={{
                                  display: 'block',
                                  minWidth: '40px',
                                  minHeight: '42px',
                                  backgroundImage: `url("${scannerIcon}")`,
                                  backgroundPosition: 'center center',
                                  backgroundRepeat: 'no-repeat',
                                  backgroundSize: 'cover',
                              }}
                          ></Link>
                      )}
                  </Typography>

                  <Box
                      sx={{
                          display: { xs: 'flex', md: 'none' },
                      }}
                  >
                      <IconButton
                          size='large'
                          aria-label='account of current user'
                          aria-controls='menu-appbar'
                          aria-haspopup='true'
                          onClick={handleOpenNavMenu}
                          color='inherit'
                      >
                          <MenuIcon />
                      </IconButton>
                      <Menu
                          id='menu-appbar'
                          anchorEl={anchorElNav}
                          anchorOrigin={{
                              vertical: 'bottom',
                              horizontal: 'left',
                          }}
                          keepMounted
                          transformOrigin={{
                              vertical: 'top',
                              horizontal: 'left',
                          }}
                          open={Boolean(anchorElNav)}
                          onClose={handleCloseNavMenu}
                          sx={{
                              display: { xs: 'block', md: 'none' },
                          }}
                      >
                          {/* key={`MenuItem-Desktop-NavBar--${index}`} */}
                          {navlinks.map((page, index) => (
                              <MenuItem
                                  key={`MenuItem-Desktop-NavBar--${index}`}
                                  onClick={handleCloseNavMenu}
                                  sx={page.sx}
                              >
                                  <Link style={page.style} to={page.href}>
                                      <Typography
                                          sx={page.sx}
                                          textAlign='center'
                                      >
                                          {page.label}
                                      </Typography>
                                  </Link>
                              </MenuItem>
                          ))}
                      </Menu>
                  </Box>
                  <Typography
                      variant='h6'
                      noWrap
                      component='div'
                      sx={{
                          flexGrow: 1,
                          display: { xs: 'flex', md: 'none' },
                          flexFlow: 'row nowrap',
                          gap: '10px',
                          justifyContent: 'flex-start',
                          alignItems: 'center',
                      }}
                  >
                      <Link to='/' sx={{ textDecoration: 'none' }}>
                          <Box
                              component='img'
                              style={{
                                  margin: '5px 0 -5px 0',
                                  height: '50px',
                                  filter: 'invert(100%)',
                              }}
                              src={logoBusters}
                          ></Box>
                      </Link>
                      <SearchBar />
                      {jwt && (
                          <Link
                              to='/scan'
                              style={{
                                  display: 'block',
                                  minWidth: '40px',
                                  minHeight: '42px',
                                  backgroundImage: `url("${scannerIcon}")`,
                                  backgroundPosition: 'center center',
                                  backgroundRepeat: 'no-repeat',
                                  backgroundSize: 'cover',
                              }}
                          ></Link>
                      )}
                  </Typography>
                  <Box
                      sx={{
                          flexGrow: 0,
                          display: { xs: 'none', md: 'flex' },
                      }}
                  >
                      {navlinks.map((page, index) => (
                          <MenuItem
                              key={`MenuItem-babybel-NavBar--${index}`}
                              onClick={handleCloseNavMenu}
                              sx={page.sx}
                          >
                              <Link style={page.style} to={page.href}>
                                  <Typography sx={page.sx} textAlign='center'>
                                      {page.label}
                                  </Typography>
                              </Link>
                          </MenuItem>
                      ))}
                  </Box>

                  {jwt && (
                      <Box sx={{ flexGrow: 0 }}>
                          <Tooltip title='Compte utilisateur'>
                              <IconButton
                                  onClick={handleOpenUserMenu}
                                  sx={{ p: 0, marginLeft: '15px' }}
                              >
                                  <AccountCircleIcon
                                      fontSize='large'
                                      style={{ color: 'white' }}
                                  />
                              </IconButton>
                          </Tooltip>
                          <Menu
                              sx={{ mt: '45px' }}
                              id='menu-appbar'
                              anchorEl={anchorElUser}
                              anchorOrigin={{
                                  vertical: 'top',
                                  horizontal: 'right',
                              }}
                              keepMounted
                              transformOrigin={{
                                  vertical: 'top',
                                  horizontal: 'right',
                              }}
                              open={Boolean(anchorElUser)}
                              onClose={handleCloseUserMenu}
                          >
                              {settings.map((setting, index) => (
                                  <MenuItem
                                      key={`MenuItem-banana-NavBar--${index}`}
                                      onClick={() => {
                                          if (setting.action) {
                                              setting.action();
                                          }
                                          handleCloseUserMenu();
                                      }}
                                      sx={setting.sx}
                                  >
                                      {setting.href && (
                                          <Link
                                              style={setting.style}
                                              to={setting.href}
                                          >
                                              <Typography
                                                  sx={setting.sx}
                                                  textAlign='center'
                                              >
                                                  {setting.label}
                                              </Typography>
                                          </Link>
                                      )}
                                      {!setting.href && (
                                          <Typography
                                              sx={setting.sx}
                                              textAlign='center'
                                          >
                                              {setting.label}
                                          </Typography>
                                      )}
                                  </MenuItem>
                              ))}
                          </Menu>
                      </Box>
                  )}
              </Toolbar>
          </Container>
      </AppBar>
  );
};
export default ResponsiveAppBar;
