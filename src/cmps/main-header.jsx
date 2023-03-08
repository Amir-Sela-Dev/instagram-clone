import Button from '@mui/material/Button';
import { auth } from "../firebase";

export function MainHeader({ handleOpen, user, setOpenSignIn }) {
    return (
        <header>
            <div className="app-header flex align-center">
                <img src="https://res.cloudinary.com/dp3tok7wg/image/upload/v1678286839/svg_xml_base64_PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGFyaWEtbGFiZWw9Ikluc3RhZ3JhbSIgY2xhc3M9Il9hYjYtIiBjb2xvcj0icmdiKDM4LCAzOCwgMzgpIiBmaWxsPSJyZ2IoMzgsIDM4LCAzOCkiIGhlaWdodD0iMjkiIHJvbGU9ImltZyIgdml_ctovds.svg" alt="" />

                {!user && <div className="flex">
                    <Button onClick={handleOpen}>Sign up</Button>
                    <Button onClick={() => setOpenSignIn(true)}>Sign in</Button>
                </div>}
                {user && <div className="user flex align-center">
                    <h4>{user.multiFactor.user.displayName}</h4>
                    <Button onClick={() => auth.signOut()}>Logout</Button>
                </div>}


            </div>
        </header>
    )
}