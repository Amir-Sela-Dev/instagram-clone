import Avatar from '@mui/material/Avatar';

export function Post() {

    return (
        <div className="post">
            <div className="post-header">
                <Avatar className='avatar' alt="Username" src="/static/images/avatar/1.jpg" />
                <h3>Username</h3>
            </div>

            <img src={require("../assets/img/logo.png")} alt="" />

            <h4 className="post-text"> <strong>Amir_sela</strong> wow crazy!!</h4>
            <h4>Username caption</h4>

        </div>
    )
}