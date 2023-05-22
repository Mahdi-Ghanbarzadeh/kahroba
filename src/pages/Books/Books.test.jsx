import React, { useContext, useState } from "react";
import "react-router-dom";
import "@testing-library/jest-dom";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import axiosInstance from "../../axios";
import { useParams, useLocation } from "react-router-dom";
import Books from "./index";
import { toast } from "react-toastify";

jest.mock("react", () => ({
  orginalReact: jest.requireActual("react"),
  ...jest.requireActual("react"),
  useContext: jest.fn(),
  useState: jest.fn(),
}));

jest.mock("../../components/MainNavigation", () => jest.fn());
jest.mock("react-toastify", () => ({
  ToastContainer: jest.fn(),
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: jest.fn(),
  useLocation: jest.fn(),
  Link: ({ children }) => <div>{children}</div>,
}));

jest.mock("../../axios", () => ({
  get: jest.fn(),
  post: jest.fn(),
}));

jest.mock("../../store/UserContext");

const mockedUseState = jest.fn();
const books = [
  {
    book_id: 1,
    name: "Test Name",
    description: "Test Description",
    picture: "url.png",
    translator: "Test Translator",
    shabak: "1",
    publish_year: "1379",
    is_donated: false,
    is_received: false,
    author: "Test Author",
    number_of_request: 0,
    keywords: "['test_keyword']",
    donator: 3,
    is_requested_before: false,
  },
  {
    book_id: 2,
    name: "Test Name 2",
    description: "Test Description 2",
    picture: "url.png",
    translator: "Test Translator 2",
    shabak: "2",
    publish_year: "1390",
    is_donated: true,
    is_received: false,
    author: "Test Author 2",
    number_of_request: 10,
    keywords: "['test_keyword']",
    donator: 4,
    is_requested_before: true,
  },
];

describe("Book component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    useContext.mockReturnValue({
      username: "",
      userId: "test-id",
      phoneNumber: "",
      email: "",
      rooyesh: "",
      auth: false,
      user: {
        auth: false,
      },
    });
    axiosInstance.post.mockImplementation(() =>
      Promise.resolve({
        status: 200,
      })
    );
    axiosInstance.get.mockImplementation(() =>
      Promise.resolve({
        status: 200,
        data: books,
      })
    );
    useState.mockImplementation((init) => [init, mockedUseState]);
    useParams.mockReturnValue({ id: "1" });
    useLocation.mockReturnValue({ pathname: "/books/1" });
  });

  test("renders loading spinner when loading is true", () => {
    render(<Books />);
    expect(screen.getByTestId("loader")).toBeInTheDocument();
  });

  test("renders book information when loading is false", async () => {
    axiosInstance.get.mockResolvedValue({
      status: 200,
      data: books,
    });
    useState.mockImplementationOnce(() => [false, mockedUseState]);
    useState.mockImplementationOnce(() => [books, mockedUseState]);

    render(<Books />);

    expect(screen.getByText("Test Name")).toBeInTheDocument();
    expect(screen.getByText("Test Name 2")).toBeInTheDocument();
    expect(screen.getByText("Test Author")).toBeInTheDocument();
    expect(screen.getByText("Test Author 2")).toBeInTheDocument();
  });

  test("check searching function", async () => {
    jest.useFakeTimers();
    axiosInstance.get.mockResolvedValue({
      status: 200,
      data: books,
    });
    useState.mockImplementationOnce(() => [false, mockedUseState]);
    useState.mockImplementationOnce(() => [books, mockedUseState]);
    useState.mockImplementationOnce(() => ["first", mockedUseState]);

    const { rerender } = render(<Books />);

    useState.mockImplementationOnce(() => [false, mockedUseState]);
    useState.mockImplementationOnce(() => [
      [{ ...books[1], book_id: 3, name: "second in name" }],
      mockedUseState,
    ]);
    useState.mockImplementationOnce(() => ["second", mockedUseState]);

    rerender(<Books />);
    jest.advanceTimersByTime(1500);
    expect(screen.getByText("second in name")).toBeInTheDocument();
  });

  test("search error", async () => {
    jest.useFakeTimers();
    axiosInstance.get.mockRejectedValue({
      status: 400,
    });
    useState.mockImplementationOnce(() => [false, mockedUseState]);
    useState.mockImplementationOnce(() => [books, mockedUseState]);
    useState.mockImplementationOnce(() => ["first", mockedUseState]);

    const { rerender } = render(<Books />);

    useState.mockImplementationOnce(() => [false, mockedUseState]);
    useState.mockImplementationOnce(() => [[], mockedUseState]);
    useState.mockImplementationOnce(() => ["second", mockedUseState]);

    rerender(<Books />);
    jest.advanceTimersByTime(1500);
    expect(screen.queryByText("second in name")).not.toBeInTheDocument();
  });
});
