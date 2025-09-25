import { useEffect, useState } from "react";
import "./App.css";

const Card = ({ title }) => {
  const [hasLiked, setHasLiked] = useState(false);

  useEffect(() => {
    console.log(`${title} has been liked: ${hasLiked}`);
  }, [hasLiked, title]);

  return (
    <div className="card">
      <h2>{title}</h2>

      <button onClick={() => setHasLiked(!hasLiked)}>
        {hasLiked ? "Liked" : "Like"}
      </button>
    </div>
  );
};

const App = () => {
  return (
    <div className="card-container">
      <Card
        title="Star Wars"
        isCool={true}
        actors={[{ name: "Actors" }]}
      />
      <Card title="Pulp Fiction" />
    </div>
  );
};

export default App;
