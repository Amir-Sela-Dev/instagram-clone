import Button from '@mui/material/Button';
import { auth } from "../firebase";

export function MainHeader({ handleOpen, user, setOpenSignIn }) {
    return (
        <header>
            <div className="app-header flex align-center">
                <div className="image">Instagram</div>

                {!user && <div className="flex">
                    <Button onClick={handleOpen}>Sign up</Button>
                    <Button onClick={() => setOpenSignIn(true)}>Sign in</Button>
                </div>}
                {user && <div className="user">
                    <h4>{user.multiFactor.user.displayName}</h4>
                    <Button onClick={() => auth.signOut()}>Logout</Button>
                </div>}


            </div>
        </header>
    )
}