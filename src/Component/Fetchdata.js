import React, { useState, useEffect } from "react";
export default function Fetchdata() {
  const [Memes, setMemes] = useState([]);
  const [Meme, setMeme] = useState(null);
  const [loading, setLoading] = useState(true);
  const [TopText, setTopText] = useState("");
  const [BottomText, setBottomText] = useState("");
  const [text, setText] = useState({ text0: "", text1: "" });
  const [header, setHeader] = useState("Pick a Template");

  const url = "https://api.imgflip.com/get_memes";
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(url);
      const data = await response.json();
      setMemes(data.data.memes);
      setLoading(false);
    };
    fetchData();
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    setText({ text0: TopText, text1: BottomText });
    setTopText("");
    setBottomText("");
  };

  return (
    <div className="App">
      <h1>{header}</h1>

      <div>{loading && <h1>loading...</h1>}</div>
      {Meme && (
        <form onSubmit={handleSubmit}>
          <div>
            <h1>{text.text0}</h1>
            <img src={Meme.url} alt="picked" />
            <h1>{text.text1}</h1>
          </div>
          <input
            type="text"
            value={TopText}
            placeholder="top text"
            onChange={(e) => setTopText(e.target.value)}
          />
          <input
            type="text"
            value={BottomText}
            placeholder="botton text"
            onChange={(e) => setBottomText(e.target.value)}
          />
          <button type="submit">add text</button>
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
                    setHeader("Generate meme");
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
