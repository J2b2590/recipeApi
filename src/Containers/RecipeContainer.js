import { Link } from "react-router-dom";
import RecipeComponent from "../Components/RecipeComponent";
import { Col, Row, Container } from "react-bootstrap";

const RecipeContainer = (props) => {
  return (
    <Container fluid style={{ height: "100vh" }}>
      <h1 style={{ textAlign: "center" }}>Choose A Recipe</h1>
      <Row
        style={{
          margin: "auto 50px",
          padding: "100px",
        }}
      >
        {props.recipes.map((recipe, index) => {
          console.log(recipe.uuid);
          return (
            <div>
              <RecipeComponent
                key={index}
                history={props.history}
                recipe={recipe}
              />
            </div>
          );
        })}
      </Row>
    </Container>
  );
};

export default RecipeContainer;
