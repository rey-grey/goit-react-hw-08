import { useDispatch } from 'react-redux';
import { logout } from '../../redux/auth/operations';

import Button from '@mui/material/Button';
import LogoutIcon from '@mui/icons-material/Logout';

const UserMenu = () => {
  const dispatch = useDispatch();

  return (
    <div>
      <Button
        variant="outlined"
        color="primary"
        size="small"
        endIcon={<LogoutIcon />}
        onClick={() => dispatch(logout())}
        sx={{
          color: '#bbdefb',             
          '&:hover': {
            backgroundColor: '#1976d2', 
            color: '#fff',             
            borderColor: '#1976d2',
          },
        }}
      >
        Log Out
      </Button>
    </div>
  );
};

export default UserMenu;
