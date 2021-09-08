import axios from "axios";
import { useState, useEffect } from "react";
import RecipeContainer from "./Containers/RecipeContainer";
import RecipeView from "./Components/RecipeView";
import { Route, Switch } from "react-router";

function App() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    getAllRecipes();
  }, []);

  const getAllRecipes = () => {
    axios.get("http://localhost:3001/recipes").then((resp) => {
      // console.log(resp.data, "resp data");
      setRecipes(resp.data);
    });
  };

  return (
    <div style={{ backgroundColor: "bisque" }}>
      <Switch>
        <Route
          exact
          path="/"
          render={(props) => {
            return (
              <RecipeContainer history={props.history} recipes={recipes} />
            );
          }}
        />
        <Route
          exact
          path="/recipe/:id"
          render={(props) => {
            return <RecipeView history={props.history} recipes={recipes} />;
          }}
        />
      </Switch>
    </div>
  );
}

export default App;
