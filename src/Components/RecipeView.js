import axios from "axios";
import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";

const RecipeView = ({ recipe, history }) => {
  const [image, setImage] = useState([]);
  const [specials, setSpecials] = useState([]);

  useEffect(() => {
    getImage();
    getSpecialIngredients();
  }, []);

  const getImage = () => {
    axios
      .get("http://localhost:3001/recipes/" + `${currentRecipe.uuid}`)
      .then((resp) => {
        // console.log(resp.data, "AXIOS");
        const fullImg = resp.data.images.full;
        setImage(fullImg);
      });
  };

  const getSpecialIngredients = async () => {
    await axios.get("http://localhost:3001/specials").then((resp) => {
      //   console.log(resp.data);
      setSpecials(resp.data);
    });
  };

  //   console.log(image, "IMAGE");

  const currentRecipe = JSON.parse(history.location.state.recipe);
  //   console.log(currentRecipe);
  const recipeImg = currentRecipe.images.full;
  //   console.log(currentRecipe.images.medium, "VIEW");
  return (
    <div>
      <div style={{ textAlign: "center" }}>
        <h1>{currentRecipe.title}</h1>
        <h2>Cook Time: {currentRecipe.cookTime}</h2>
        <h3>{currentRecipe.description}</h3>
      </div>
      <div style={{ margin: "auto 10px", padding: "5px" }}>
        <h4>Directions on how to make {currentRecipe.title}</h4>
        {currentRecipe.directions.map((direction, index) => {
          // console.log(direction, "DIREC");
          return (
            <div key={index}>
              <ul>
                <li>{direction.instructions}</li>
              </ul>
            </div>
          );
        })}

        {/* <div>
        <img src={"http://localhost:3001/recipes" + image} />
      </div> */}

        <h4>ingredients for {currentRecipe.title}</h4>

        {currentRecipe.ingredients.map((ingredient, index) => {
          const ingredientId = ingredient.uuid;
          console.log(ingredientId, "INGREDIENT");

          const specialItems = specials.find((special) => {
            return special.ingredientId == ingredientId;
          });
          console.log(specialItems, "SPECIAL");

          return (
            <div key={index}>
              <ul>
                <li>amount: {ingredient.amount}</li>
                {ingredient.measurement ? (
                  <li>measurment: {ingredient.measurement}</li>
                ) : null}
                <li>{ingredient.name}</li>
                {specialItems ? (
                  <div>
                    <p style={{ fontWeight: "bold" }}>
                      Running Special for {ingredient.name}!
                    </p>
                    <ul>
                      <li>{specialItems.type}</li>
                      <li>{specialItems.title}</li>
                      <li>{specialItems.text}</li>
                    </ul>
                  </div>
                ) : null}
              </ul>
            </div>
          );
        })}
        <div>
          <p>Posted: {currentRecipe.postDate}</p>
          <p>Prep Time: {currentRecipe.prepTime}</p>
          <p>Servings: {currentRecipe.servings}</p>
        </div>
      </div>
      <div
        style={{ textAlign: "center", margin: "auto 20px", padding: "10px" }}
      >
        <Button onClick={() => history.push("/")}> Back </Button>
      </div>
    </div>
  );
};

export default RecipeView;
