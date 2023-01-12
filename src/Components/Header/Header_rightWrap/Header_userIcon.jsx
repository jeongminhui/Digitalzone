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
import { useNavigate } from "react-router-dom";
import { AccessAlarm, ThreeDRotation } from "@mui/icons-material";
import ListItemText from "@mui/material/ListItemText";
import ListItem from "@mui/material/ListItem";
import List from "@mui/material/List";
import "./Header_userIcon.scss";
// 로그아웃 구현
import { db } from "../../../firebase";
import { getAuth, signOut } from "firebase/auth";
import { useRecoilState } from "recoil";
import { loginAtom } from "../../../Recoil/Atom";

export default function Header_userIcon() {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  // 로그아웃 구현
  const [loginUser, setLoginUser] = useRecoilState(loginAtom);
  const auth = getAuth();
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    // 조건을 여기에 달아주어야 하나?
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // 조건 따라 어떤 Menu 띄울지 정함. (두가지 조건)
  // const userId = `${loginUser.username}`;
  let userId = "";
  if (loginUser !== null) userId = `${loginUser.userid}`;
  // 로그인 상태
  let isLogin;
  if (loginUser !== null) isLogin = 1;
  else isLogin = 0;
  // 관리자 여부
  let isManager;
  if (loginUser !== null && loginUser.userclass === "관리자") isManager = 1;
  else isManager = 0;
  return (
    <>
      <React.Fragment>
        {/* <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}> */}
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
            <PersonRoundedIcon className="PersonRoundedIcon" fontSize="large" />
          </div>
        </Tooltip>
        {/* </Box> */}
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
                  signOut(auth);
                  setLoginUser(null);
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
                  signOut(auth);
                  setLoginUser(null);
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
            <MenuItem
              onClick={() => {
                navigate("/user/login");
              }}
            >
              <ListItemIcon>
                <PersonRoundedIcon fontSize="small" />
              </ListItemIcon>
              로그인
            </MenuItem>
          </Menu>
        )}
      </React.Fragment>
    </>
  );
}
