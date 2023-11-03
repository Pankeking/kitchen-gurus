import { router } from "expo-router";
import { useEffect } from "react";

export default function buttonToAdd() {
  useEffect(() => {
    router.replace('/(content)/(add)');
  },[])
  return (
    <></>
  )
}