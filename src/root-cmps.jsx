import { useEffect, useState } from "react";
import { MainHeader } from "./cmps/main-header";
import { InstagramIndex } from "./pages/instagram.index";

function App() {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [openSignIn, setOpenSignIn] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);



  return (
    <div className="app">
      <MainHeader handleOpen={handleOpen} user={user} setOpenSignIn={setOpenSignIn} />
      <InstagramIndex handleClose={handleClose} setOpen={setOpen} open={open} user={user} setUser={setUser} openSignIn={openSignIn} setOpenSignIn={setOpenSignIn} />
    </div>
  );
}

export default App;
