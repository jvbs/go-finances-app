import React from "react";
import { RectButtonProps } from "react-native-gesture-handler";

import { Container, Icon, Title, Button } from "./styles";

interface Props extends RectButtonProps {
  title: string;
  type: "positive" | "negative";
  isActive: boolean;
}

const icons = {
  positive: "arrow-up-circle",
  negative: "arrow-down-circle",
};

export default function TransactionTypeButton({
  title,
  type,
  isActive,
  ...rest
}: Props) {
  return (
    <Container isActive={isActive} type={type}>
      <Button {...rest}>
        <Icon name={icons[type]} type={type} />
        <Title>{title}</Title>
      </Button>
    </Container>
  );
}
