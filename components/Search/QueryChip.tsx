import { Text } from "../themedCustom";

export default function QueryChip(props: {
  recipe: {
    recipeID: string;
    name: string;
    username: string;
    userID: string;
    photo: string;
    profilePicture: string;
  }
}) {
  const propsArr = Object.values(props.recipe)
  return (
    <>
      {propsArr.map((prop) => {
        <Text>{prop}</Text>
      })}
    </>
  )
}

