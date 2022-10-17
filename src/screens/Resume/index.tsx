import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { VictoryPie } from "victory-native";
import { useTheme } from "styled-components";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { RFValue } from "react-native-responsive-fontsize";
import { addMonths, format, subMonths } from "date-fns";
import { ptBR } from "date-fns/locale";

import { HistoryCard } from "../../components/HistoryCard";
import { TransactionCardProps } from "../../components/TransactionCard";

import {
  Container,
  Header,
  Title,
  Content,
  ChartContainer,
  MonthSelect,
  MonthSelectButton,
  MonthSelectIcon,
  MonthName,
} from "./styles";
import { categories } from "../../utils/categories";

interface CategoryData {
  key: string;
  name: string;
  total: number;
  totalStringfied: string;
  color: string;
  percent: string;
}

export function Resume() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [totalByCategories, setTotalByCategories] = useState<CategoryData[]>(
    []
  );

  const theme = useTheme();

  function handleDateChange(action: "next" | "prev") {
    if (action === "next") {
      setSelectedDate(addMonths(selectedDate, 1));
    } else {
      setSelectedDate(subMonths(selectedDate, 1));
    }
  }

  async function loadData() {
    const dataKey = "@goFinances:transactions";
    const response = await AsyncStorage.getItem(dataKey);
    const formattedResponse = response ? JSON.parse(response) : [];

    const expenses = formattedResponse.filter(
      (expense: TransactionCardProps) =>
        expense.type === "negative" &&
        new Date(expense.date).getMonth() === selectedDate.getMonth() &&
        new Date(expense.date).getFullYear() === selectedDate.getFullYear()
    );

    const expensesTotal = expenses.reduce(
      (acumullator: number, expensive: TransactionCardProps) => {
        return acumullator + Number(expensive.amount);
      },
      0
    );

    const totalByCategory: CategoryData[] = [];

    categories.forEach((category) => {
      let categorySum = 0;
      expenses.forEach((expense: TransactionCardProps) => {
        if (expense.category === category.key) {
          categorySum += Number(expense.amount);
        }
      });

      if (categorySum > 0) {
        const totalStringfied = categorySum.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        });

        const percent = `${((categorySum / expensesTotal) * 100).toFixed(0)}%`;

        totalByCategory.push({
          key: category.key,
          name: category.name,
          total: categorySum,
          totalStringfied,
          color: category.color,
          percent,
        });
      }
    });

    setTotalByCategories(totalByCategory);
  }

  useEffect(() => {
    loadData();
  }, [selectedDate]);

  return (
    <Container>
      <Header>
        <Title>Resumo por categoria</Title>
      </Header>

      <Content
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          flexGrown: 1,
          paddingBottom: useBottomTabBarHeight(),
          paddingHorizontal: 24,
        }}
      >
        <MonthSelect>
          <MonthSelectButton onPress={() => handleDateChange("prev")}>
            <MonthSelectIcon name="chevron-left" />
          </MonthSelectButton>

          <MonthName>
            {format(selectedDate, "MMMM, yyyy", { locale: ptBR })}
          </MonthName>

          <MonthSelectButton onPress={() => handleDateChange("next")}>
            <MonthSelectIcon name="chevron-right" />
          </MonthSelectButton>
        </MonthSelect>

        <ChartContainer>
          <VictoryPie
            data={totalByCategories}
            x="percent"
            y="total"
            colorScale={totalByCategories.map((category) => category.color)}
            labelRadius={50}
            style={{
              labels: {
                fontSize: RFValue(18),
                fontWeight: "bold",
                fill: theme.colors.shape,
              },
            }}
          />
        </ChartContainer>

        {totalByCategories.map((item) => (
          <HistoryCard
            key={item.key}
            title={item.name}
            amount={item.totalStringfied}
            color={item.color}
          />
        ))}
      </Content>
    </Container>
  );
}
