import React from "react";
import { render, fireEvent, screen } from "@testing-library/react-native";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "../screens/HomeScreen";

jest.mock("../hooks/useSavedSets", () => {
  const deleteSetMock = jest.fn();
  return {
    __esModule: true,
    default: () => ({
      savedSets: [
        { id: "1", name: "Set 1" },
        { id: "2", name: "Set 2" },
      ],
      loadSets: jest.fn(),
      deleteSet: deleteSetMock,
    }),
  };
});

describe("HomeScreen", () => {
  it("renders the home screen correctly", () => {
    render(
      <NavigationContainer>
        <HomeScreen navigation={{ navigate: jest.fn() }} />
      </NavigationContainer>
    );

    expect(screen.getByText("Welcome to the Formations App")).toBeTruthy();

    expect(screen.getByText("Create New Set Formations")).toBeTruthy();
  });

  it("renders saved sets", () => {
    render(
      <NavigationContainer>
        <HomeScreen navigation={{ navigate: jest.fn() }} />
      </NavigationContainer>
    );

    expect(screen.getByText("Set 1")).toBeTruthy();
    expect(screen.getByText("Set 2")).toBeTruthy();
  });
});
