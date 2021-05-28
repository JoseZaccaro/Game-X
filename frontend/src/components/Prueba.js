import React from "react";
import Chat from "./Chat";

class Prueba extends React.Component {
  toTop = () => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  componentDidMount() {
    this.toTop();
  }

  render() {
    return (
      <>
        <div
          className="containPageHome" style={{ backgroundImage: "url(../assets/fondo.png)" }}>
          <Chat />
        </div>
      </>
    );
  }
}

export default Prueba;
