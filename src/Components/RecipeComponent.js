const RecipeComponent = ({ recipe, history }) => {
  const id = recipe.uuid;
  return (
    <div>
      <h1
        onClick={() =>
          history.push({
            pathname: `/recipe/${id}`,
            state: { recipe: JSON.stringify(recipe) },
          })
        }
        style={{ textAlign: "center", color: "blue" }}
      >
        {recipe.title}
      </h1>
    </div>
  );
};

export default RecipeComponent;
