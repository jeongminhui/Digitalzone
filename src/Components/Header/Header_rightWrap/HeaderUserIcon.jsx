import * as React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
// import PersonAdd from "@mui/icons-material/PersonAdd";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import { Link, useNavigate } from "react-router-dom";
import { AccessAlarm, ThreeDRotation } from "@mui/icons-material";
import ListItemText from "@mui/material/ListItemText";
import ListItem from "@mui/material/ListItem";
import List from "@mui/material/List";

export default function HeaderUserIcon() {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    // 조건을 여기에 달아주어야 하나?
    console.log(event.currentTarget);
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
  const isManager = 1;
  return (
    <>
      <React.Fragment>
        <div
          className="HeaderUserIcon"
          onClick={handleClick}
          size="small"
          sx={{ ml: 2 }}
          aria-controls={open ? "account-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
        >
          <PersonRoundedIcon className="PersonRoundedIcon" fontSize="large" />
        </div>

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
              <MenuItem
                onClick={() => {
                  navigate("/user/mypage");
                }}
              >
                <ListItemIcon>
                  <PersonRoundedIcon fontSize="small" />
                </ListItemIcon>
                나의 정보
              </MenuItem>
              <MenuItem
                onClick={() => {
                  navigate("/user/list");
                }}
              >
                <ListItemIcon>
                  <Settings fontSize="small" />
                </ListItemIcon>
                사용자 관리
              </MenuItem>
              <MenuItem
                onClick={() => {
                  navigate("/");
                }}
              >
                <ListItemIcon>
                  <Logout fontSize="small" />
                </ListItemIcon>
                로그아웃
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
              <MenuItem
                onClick={() => {
                  navigate("/user/mypage");
                }}
              >
                <ListItemIcon>
                  <PersonRoundedIcon fontSize="small" />
                </ListItemIcon>
                나의 정보
              </MenuItem>
              <MenuItem
                onClick={() => {
                  navigate("/");
                }}
              >
                <ListItemIcon>
                  <Logout fontSize="small" />
                </ListItemIcon>
                로그아웃
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
                to="/user/login"
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