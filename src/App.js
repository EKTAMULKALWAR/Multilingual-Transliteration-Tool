import { useState } from 'react';
import './App.css';

const urlWithQuery = (query) => {
  return `https://inputtools.google.com/request?text=${query}&itc=mr-t-i0-und&num=13&cp=0&cs=1&ie=utf-8&oe=utf-8&app=demopage`;
};

const fetchResults = async (query) => {
  const res = await fetch(urlWithQuery(query));
  const resJson = await res.json();
  return resJson[1][0][1];
};

function App() {
  const [text, setText] = useState('');
  const [res, setRes] = useState([]);

  const onTextChange = (e) => {
    const typedValue = e.target.value;
    setText(typedValue);
    if (typedValue) {
      fetchResults(typedValue).then((apiRes) => {
        setRes(apiRes);
      });
    } else {
      setRes([]);
    }
  };

  return (
    <div className="App">
      <input value={text} onChange={onTextChange} />
      {res?.map((val) => {
        return <div key={val}>{val}</div>;
      })}
    </div>
  );
}

export default App;
