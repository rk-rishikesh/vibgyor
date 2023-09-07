import "./profile.css";

export const Profile = () => {

    return (
        <div>
            <div className="profile">
                <div className="user">
                    <span className="material-symbols-outlined" >waving_hand</span>
                    <div className="h2">
                        <h2>0xA9f9D07a3740C9028bd64A7Ed6ba343409FA3f1b</h2>
                    </div>

                </div>
                <div>


                    <div className="box">
                        <div>
                            <div className="circles">
                                <div className="smbutton violet">20</div>
                                <div className="smbutton indigo">40</div>
                                <div className="smbutton blue">60</div>
                                <div className="smbutton green">80</div>
                                <div className="smbutton yellow">80</div>
                                <div className="smbutton orange">80</div>
                                <div className="smbutton red">80</div>
                            </div>
                            <img className="profileimg" src="https://www.shutterstock.com/image-vector/cute-little-pink-bunny-girl-250nw-1609007644.jpg" />

                        </div>
                        <div>
                            <div className="stat01">
                                CHASE THE COLOURS
                            </div>
                            <div className="stat02">
                                STAT
                            </div>
                            <div>
                                <img className="value" src="https://media.istockphoto.com/id/931527130/vector/pot-of-gold-with-rainbow.jpg?s=612x612&w=0&k=20&c=z4mtZxxq6PmRtOvYYNhBwS2H1HsZCmqM0W7Sn_FuIyE="/>
                                <div className="stat03">20 SHADES</div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

        </div>
    );

}