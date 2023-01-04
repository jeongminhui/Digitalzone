import * as React from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
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
import "../Header.scss";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";

export default function Header_userIcon() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      {/* <div className="Header_userIcon">
        <PersonRoundedIcon
          className="PersonRoundedIcon"
          // 색상이 안먹힙니다요 ㅜㅜ 추후 추가 수정 하겠읍니다,,
          color="#4669f5"
          background="#4669f5"
          fontSize="large"
        />
      </div> */}
      {/* 여기가 가져온 것 */}
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
                // 색상이 안먹힙니다요 ㅜㅜ 추후 추가 수정 하겠읍니다,,
                fontSize="large"
              />
            </div>
          </Tooltip>
        </Box>
        {/* 여기서 삼항 조건자, 로그인 상태 따라 어떤 것을 띄울지 정함. */}
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
          {/* 프로필 데이터 받아오는 것으로 바꿔야 함. */}
          <MenuItem>
            <p>Profile@gmail.com</p>
          </MenuItem>

          <Divider />
          <MenuItem>
            <ListItemIcon>
              <PersonRoundedIcon fontSize="small" />
            </ListItemIcon>
            나의 정보
          </MenuItem>
          <MenuItem>
            <ListItemIcon>
              <Settings fontSize="small" />
            </ListItemIcon>
            사용자 관리
          </MenuItem>
          <MenuItem>
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            로그아웃
          </MenuItem>
        </Menu>
      </React.Fragment>
    </>
  );
}