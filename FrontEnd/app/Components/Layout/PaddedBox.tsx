import { useAppTheme } from "@/app/_layout";
import React, { ReactNode } from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";

type Props = {
  children: React.ReactNode;
};

const PaddedBox: React.FC<Props> = ({ children }) => {
  const theme = useAppTheme();
  const styles = StyleSheet.create({
    container: {
      padding: theme.spacing(2),
    },
  });
  return <View style={styles.container}>{children}</View>;
};

export default PaddedBox;
