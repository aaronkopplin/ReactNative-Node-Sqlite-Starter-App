import { useAppTheme } from "@/app/_layout";
import React, { ReactNode } from "react";
import { StyleSheet, TextStyle } from "react-native";
import { Text } from "react-native-paper";

type Props = {
  children: React.ReactNode;
};

const Title: React.FC<Props> = ({ children }) => {
  const theme = useAppTheme();

  const styles = StyleSheet.create({
    title: {
      marginBottom: theme.spacing(2),
    },
  });

  return (
    <Text variant="displaySmall" style={styles.title}>
      {children}
    </Text>
  );
};

export default Title;
