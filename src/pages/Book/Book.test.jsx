import React, { useContext, useState } from "react";
import "react-router-dom";
import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import axiosInstance from "../../axios";
import { Book } from "./Book";
import { useParams, useLocation, Link } from "react-router-dom";
import { toast } from "react-toastify";

jest.mock("react", () => ({
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
jest.mock("swiper/react", () => ({
  Swiper: ({ children, ...props }) => <div {...props}>{children}</div>,
  SwiperSlide: ({ children, ...props }) => <div {...props}>{children}</div>,
}));

jest.mock("swiper", () => ({
  Autoplay: jest.fn(),
  Mousewheel: jest.fn(),
  Navigation: jest.fn(),
}));

jest.mock("../../store/UserContext");

const mockedUseState = jest.fn();
const book = {
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
};
const similar_books = [
  {
    book_id: 2,
    name: "Test Name 2",
    description: "Test Description 2",
    picture: "url.png",
    translator: "Test Translator 2",
    shabak: "2",
    publish_year: "1379",
    is_donated: false,
    is_received: false,
    author: "Test Author 2",
    number_of_request: 0,
    keywords: "['test_keyword']",
    donator: 3,
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
        data: {
          book,
          similar_books: [],
        },
      })
    );
    useState.mockImplementation((init) => [init, mockedUseState]);
    useParams.mockReturnValue({ id: "1" });
    useLocation.mockReturnValue({ pathname: "/books/1" });
  });

  test("renders loading spinner when loading is true", () => {
    render(<Book />);
    expect(screen.getByTestId("loader")).toBeInTheDocument();
  });

  test("renders book information when loading is false", async () => {
    axiosInstance.get.mockResolvedValue({
      status: 200,
      data: {
        book,
        similar_books: [],
      },
    });
    useState.mockImplementationOnce(() => [false, mockedUseState]);
    useState.mockImplementationOnce(() => [
      {
        book,
        similar_books,
      },
      mockedUseState,
    ]);

    render(<Book />);

    expect(screen.getByText("Test Name")).toBeInTheDocument();
    expect(screen.getByText("Test Author")).toBeInTheDocument();
  });

  test("handles book deletion by donator and display successful message", async () => {
    const successMessage = "کتاب با موفقیت حذف شد";
    toast.success.mockImplementation(() => {
      render(
        <>
          <Book />
          <div>{successMessage}</div>
        </>
      );
      expect(screen.getByText(successMessage)).toBeInTheDocument();
    });
    useState.mockImplementationOnce(() => [false, mockedUseState]);
    useState.mockImplementationOnce(() => [
      {
        book: {
          ...book,
          donator: "test-id",
        },
        similar_books: [],
      },
      mockedUseState,
    ]);

    render(<Book />);

    fireEvent.click(screen.getByText("حذف کتاب"));
  });

  test("handles request deletion by non-donator and display delete message", async () => {
    const successMessage = "درخواست کتاب با موفقیت حذف شد";
    axiosInstance.post.mockResolvedValueOnce({ status: 200 });
    toast.success.mockImplementation(() => {
      render(
        <>
          <Book />
          <div>{successMessage}</div>
        </>
      );
      expect(screen.getByText(successMessage)).toBeInTheDocument();
    });

    useState.mockImplementationOnce(() => [false, mockedUseState]);
    useState.mockImplementationOnce(() => [
      {
        book,
        similar_books: [],
      },
      mockedUseState,
    ]);
    useState.mockImplementationOnce(() => [true, mockedUseState]);

    render(<Book />);

    fireEvent.click(screen.getByText("حذف درخواست"));
  });

  test("handles request registration by non-donator and display added message", async () => {
    const successMessage = "درخواست کتاب با موفقیت افزوده شد";
    axiosInstance.post.mockResolvedValueOnce({ status: 200 });
    toast.success.mockImplementation(() => {
      render(
        <>
          <Book />
          <div>{successMessage}</div>
        </>
      );
      expect(screen.getByText(successMessage)).toBeInTheDocument();
    });

    useState.mockImplementationOnce(() => [false, mockedUseState]);
    useState.mockImplementationOnce(() => [
      {
        book,
        similar_books: [],
      },
      mockedUseState,
    ]);
    useState.mockImplementationOnce(() => [false, mockedUseState]);

    render(<Book />);

    fireEvent.click(screen.getByText("ثبت درخواست"));
  });

  test("loaded suggested books when component rendered", () => {
    useState.mockImplementationOnce(() => [false, mockedUseState]);
    useState.mockImplementationOnce(() => [
      {
        book: {
          ...book,
          donator: "test-id",
        },
        similar_books,
      },
      mockedUseState,
    ]);

    render(<Book />);

    expect(screen.getByTestId("simbooks")).toBeInTheDocument();
  });
});
