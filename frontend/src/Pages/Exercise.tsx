import { useState } from "react";

const Exercise = () => {
  const [message, setMessage] = useState("");

  const handleClick = () => {
    // event.preventDefault();

    // 👇️ value of input field
    console.log("old value: ", message);

    // 👇️ set value of input field
    setMessage("New value");
    alert("Valami");
  };

  return (
    <div>
      <input type="text" id="message" name="message" />

      <h2>Message: {message}</h2>

      <button onClick={handleClick}>Click</button>
    </div>
  );
};

export default Exercise;
