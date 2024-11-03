import { StyleSheet, View } from "react-native";
import { Button, Text } from "react-native-paper";
import Title from "../Components/Typography/Title";
import PaddedBox from "../Components/Layout/PaddedBox";
import { useEffect, useState } from "react";
import axios from "axios";

// create type for form response
type FormResponse = {
  id: number;
  form_id: number;
  question_id: number;
  response: string;
  field_label: string;
};

export default function HomeScreen() {
  const [questions, setQuestions] = useState([]);
  async function fetchQuestions() {
    try {
      let endpoint = `http://10.0.2.2:3000/forms/1/questions`;
      const response = await axios.get(endpoint);
      if (response.status === 200) {
        setQuestions(response.data.questions);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(error);
      } else {
        console.error(error);
      }
    }
  }
  return (
    <View style={styles.container}>
      <PaddedBox>
        <Title>Classic Transportation</Title>
        <Text>My Forms</Text>
        <Button onPress={fetchQuestions}>Submit</Button>
        {questions.map((question: FormResponse) => (
          <Text key={question.id}>{question.field_label}</Text>
        ))}
      </PaddedBox>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
