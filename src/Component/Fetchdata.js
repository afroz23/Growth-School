import React, { useState, useEffect } from "react";
import axios from "axios";

const objectToQueryParam = (obj) => {
  const params = Object.entries(obj).map(([key, value]) => `${key}=${value}`);
  return "?" + params.join("&");
};
export default function Fetchdata() {
  const [Memes, setMemes] = useState([]);
  const [Meme, setMeme] = useState(null);
  const [loading, setLoading] = useState(true);
  const [Text, setText] = useState({ TopText: "", BottomText: "" });
  const [header, setHeader] = useState("Pick a Template");
  const [meme, setmeme] = useState(null);
  const [Error, setError] = useState("");

  const url = "https://api.imgflip.com/get_memes";

  useEffect(() => {
    axios.get(url).then((res) => {
      setMemes(res.data.data.memes);
      setLoading(!loading);
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (Text.TopText === "" || Text.BottomText === "") {
      return setError("Invalid input");
    }
    setText({ TopText: "", BottomText: "" });
    const params = {
      template_id: Meme.id,
      text0: Text.TopText,
      text1: Text.BottomText,
      username: "afroz23",
      password: "dhu3lpdeyv",
    };
    axios
      .post(
        `https://api.imgflip.com/caption_image${objectToQueryParam(params)}`
      )
      .then((response) => {
        console.log(response.data.data);
        setmeme(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  if (meme) {
    return (
      <div className="meme-generated">
        <img src={meme.url} alt="meme" />
        <div className="social">
          <p>LinkedIn</p>
          <p>GitHub</p>
          <p>Facebook</p>
        </div>
      </div>
    );
  }
  return (
    <div className="App">
      <h1 className="heading">{header}</h1>

      <div>{loading && <h1>loading...</h1>}</div>
      {Meme && (
        <form onSubmit={handleSubmit} className="meme-generator-container">
          <div className="meme-alignment">
            <div>
              <img src={Meme.url} alt="picked" className="meme" />
            </div>
          </div>
          <div className="input-field">
            <p className="error">{Error}</p>
            <input
              type="text"
              value={Text.TopText}
              placeholder="top text"
              onChange={(e) => setText({ ...Text, TopText: e.target.value })}
            />
            <input
              type="text"
              value={Text.BottomText}
              placeholder="botton text"
              onChange={(e) => setText({ ...Text, BottomText: e.target.value })}
            />
            <button type="submit" className="generate-meme">
              Generate meme
            </button>
          </div>
        </form>
      )}
      <div>
        {!loading && !Meme && (
          <div className="meme-container">
            {Memes.map((meme) => (
              <div className="child-container" key={meme.id}>
                <img
                  src={meme.url}
                  alt="meme"
                  onClick={() => {
                    setMeme(meme);
                    setHeader("Meme Generator");
                  }}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
