import * as React from "react";
import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
// import PersonAdd from "@mui/icons-material/PersonAdd";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import "./Header_userIcon.scss";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import { Link, useNavigate } from "react-router-dom";
import { AccessAlarm, ThreeDRotation } from "@mui/icons-material";
import ListItemText from "@mui/material/ListItemText";
import ListItem from "@mui/material/ListItem";
import List from "@mui/material/List";
import "./Header_userIcon.scss";

export default function Header_userIcon() {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // 조건 따라 어떤 Menu 띄울지 정함. (두가지 조건)
  const userId = "Prse1284@gmail.com";
  // 로그인 상태
  const isLogin = 1;
  // 관리자 여부
  const isManager = 0;
  return (
    <>
      <React.Fragment>
        <Box
          sx={{ display: "flex", alignItems: "center", textAlign: "center" }}
        >
          <Tooltip title="마이 페이지">
            <div
              className="Header_userIcon"
              onClick={handleClick}
              size="small"
              sx={{ ml: 2 }}
              aria-controls={open ? "account-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
            >
              <PersonRoundedIcon
                className="PersonRoundedIcon"
                fontSize="large"
              />
            </div>
          </Tooltip>
        </Box>
        {isLogin ? (
          isManager ? (
            // 매니저일 경우 나타낼 메뉴
            <Menu
              anchorEl={anchorEl}
              id="account-menu"
              open={open}
              onClose={handleClose}
              onClick={handleClose}
              PaperProps={{
                elevation: 0,
                sx: {
                  overflow: "visible",
                  filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                  mt: 1.5,
                  "&:before": {
                    content: '""',
                    display: "block",
                    position: "absolute",
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: "background.paper",
                    transform: "translateY(-50%) rotate(45deg)",
                    zIndex: 0,
                  },
                },
              }}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
              <List>
                <ListItem>
                  <ListItemText primary={userId} />
                </ListItem>
              </List>
              <Divider />
              <MenuItem>
                <Link to="/myinfo">
                  <ListItemIcon>
                    <PersonRoundedIcon fontSize="small" />
                  </ListItemIcon>
                  나의 정보
                </Link>
              </MenuItem>
              <MenuItem>
                <Link to="/user">
                  <ListItemIcon>
                    <Settings fontSize="small" />
                  </ListItemIcon>
                  사용자 관리
                </Link>
              </MenuItem>
              <MenuItem>
                <Link to="/">
                  <ListItemIcon>
                    <Logout fontSize="small" />
                  </ListItemIcon>
                  로그아웃
                </Link>
              </MenuItem>
            </Menu>
          ) : (
            // 매니저 x 일반사용자 메뉴창
            <Menu
              anchorEl={anchorEl}
              id="account-menu"
              open={open}
              onClose={handleClose}
              onClick={handleClose}
              PaperProps={{
                elevation: 0,
                sx: {
                  overflow: "visible",
                  filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                  mt: 1.5,
                  "&:before": {
                    content: '""',
                    display: "block",
                    position: "absolute",
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: "background.paper",
                    transform: "translateY(-50%) rotate(45deg)",
                    zIndex: 0,
                  },
                },
              }}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
              <List>
                <ListItem>
                  <ListItemText primary={userId} />
                </ListItem>
              </List>
              <Divider />
              <MenuItem>
                <Link to="/myinfo">
                  <ListItemIcon>
                    <PersonRoundedIcon fontSize="small" />
                  </ListItemIcon>
                  나의 정보
                </Link>
              </MenuItem>
              <MenuItem>
                <Link to="/">
                  <ListItemIcon>
                    <Logout fontSize="small" />
                  </ListItemIcon>
                  로그아웃
                </Link>
              </MenuItem>
            </Menu>
          )
        ) : (
          <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            PaperProps={{
              elevation: 0,
              sx: {
                overflow: "visible",
                filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                mt: 1.5,
                "&:before": {
                  content: '""',
                  display: "block",
                  position: "absolute",
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: "background.paper",
                  transform: "translateY(-50%) rotate(45deg)",
                  zIndex: 0,
                },
              },
            }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >
            <MenuItem>
              <Link
                to="/login"
                onClick={(e) => {
                  console.log(e);
                }}
              >
                <ListItemIcon>
                  <PersonRoundedIcon fontSize="small" />
                </ListItemIcon>
                로그인
              </Link>
            </MenuItem>
          </Menu>
        )}
      </React.Fragment>
    </>
  );
}
