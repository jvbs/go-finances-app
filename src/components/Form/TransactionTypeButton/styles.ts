import styled, { css } from "styled-components/native";
import { Feather } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";
import { RectButton } from "react-native-gesture-handler";

interface ContainerProps {
  isActive: boolean;
  type: "positive" | "negative";
}

interface IconProps {
  type: "positive" | "negative";
}

export const Container = styled.View<ContainerProps>`
  width: 48%;

  border-radius: 5px;
  border-width: ${({ isActive }) => (isActive ? 0 : 1.5)}px;
  border-style: solid;
  border-color: ${({ theme }) => theme.colors.text};

  ${({ isActive, theme, type }) =>
    isActive &&
    type === "positive" &&
    css`
      background-color: ${theme.colors.success_light};
    `}

  ${({ isActive, theme, type }) =>
    isActive &&
    type === "negative" &&
    css`
      background-color: ${theme.colors.attention_light};
    `}
`;

export const Button = styled(RectButton)`
  flex-direction: row;
  align-items: center;
  justify-content: center;

  padding: 16px;
`;

export const Icon = styled(Feather)<IconProps>`
  font-size: ${RFValue(24)}px;
  margin-right: 12px;

  color: ${({ type, theme }) =>
    type === "positive" ? theme.colors.success : theme.colors.attention};
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(14)}px;
`;
