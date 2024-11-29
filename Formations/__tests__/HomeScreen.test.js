import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import HomeScreen from "../HomeScreen";

// Mock useSavedSets hook
jest.mock("../hooks/useSavedSets", () => ({
  __esModule: true,
  default: jest.fn(() => ({
    savedSets: [
      { id: "1", name: "Set 1" },
      { id: "2", name: "Set 2" },
    ],
    loadSets: jest.fn(),
    deleteSet: jest.fn(),
  })),
}));

describe("HomeScreen Component", () => {
  it("renders the HomeScreen and checks if the introduction text is visible", () => {
    const { getByText } = render(<HomeScreen navigation={{ navigate: jest.fn() }} />);
    expect(getByText("Welcome to the Formations App")).toBeTruthy();
    expect(
      getByText("Create and manage your dance formations with ease. Either create a new set of formations or access an existing set.")
    ).toBeTruthy();
  });

  it("checks if the 'Create New Set Formations' button works", () => {
    const navigateMock = jest.fn();
    const { getByText } = render(<HomeScreen navigation={{ navigate: navigateMock }} />);
    
    const createButton = getByText("Create New Set Formations");
    fireEvent.press(createButton);

    expect(navigateMock).toHaveBeenCalledWith("CreateSetScreen");
  });

  it("displays saved sets and allows navigation to a specific set", () => {
    const navigateMock = jest.fn();
    const { getByText } = render(<HomeScreen navigation={{ navigate: navigateMock }} />);

    const setButton = getByText("Set 1");
    expect(setButton).toBeTruthy();

    fireEvent.press(setButton);
    expect(navigateMock).toHaveBeenCalledWith("SetDetailsScreen", { setId: "1" });
  });

  it("shows a message when there are no saved sets", () => {
    // Mock empty saved sets
    jest.mock("../hooks/useSavedSets", () => ({
      __esModule: true,
      default: jest.fn(() => ({
        savedSets: [],
        loadSets: jest.fn(),
        deleteSet: jest.fn(),
      })),
    }));

    const { getByText } = render(<HomeScreen navigation={{ navigate: jest.fn() }} />);
    expect(getByText("No saved sets available.")).toBeTruthy();
  });

  it("handles deleting a saved set", () => {
    const deleteSetMock = jest.fn();
    jest.mock("../hooks/useSavedSets", () => ({
      __esModule: true,
      default: jest.fn(() => ({
        savedSets: [
          { id: "1", name: "Set 1" },
          { id: "2", name: "Set 2" },
        ],
        loadSets: jest.fn(),
        deleteSet: deleteSetMock,
      })),
    }));

    const { getByText } = render(<HomeScreen navigation={{ navigate: jest.fn() }} />);
    const deleteButton = getByText("Delete");

    fireEvent.press(deleteButton);
    expect(deleteSetMock).toHaveBeenCalledWith("1");
  });
});
