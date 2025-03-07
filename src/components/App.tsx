import { Tablet } from "./Tablet/Tablet";
import "./App.css";

function App() {
  return (
    <div className="box">
      <main className="wrapper">
        <div className="container">
          <h1 className="title">User To-Do Table</h1>
          <p className="subTitle">User task table for effective planning.</p>
          <Tablet />
        </div>
      </main>
      <footer></footer>
    </div>
  );
}

export default App;
