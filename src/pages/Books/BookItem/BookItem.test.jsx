import React, { useContext, useState } from "react";
import "react-router-dom";
import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import axiosInstance from "../../axios";
import { useParams, useLocation, Link } from "react-router-dom";
import { toast } from "react-toastify";
import BookItem from "./index";

jest.mock("react", () => ({
  ...jest.requireActual("react"),
  useContext: jest.fn(),
  useState: jest.fn(),
}));

jest.mock("../../../components/MainNavigation", () => jest.fn());
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

jest.mock("../../../store/UserContext");

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
        userId: "test-id",
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

  test("normal render", () => {
    render(
      <BookItem
        author={"author"}
        description={"description"}
        donator={"donator"}
        id={"id"}
        is_donated={true}
        is_received={true}
        is_requested_before={false}
        isbn={"isbn"}
        name={"name"}
        picture={"picture"}
        print_year={1320}
        setBooks={() => {}}
        translator={"translator"}
      />
    );
    expect(screen.getByText("name")).toBeInTheDocument();
  });

  test("handles book deletion by donator", async () => {
    const successMessage = "کتاب با موفقیت حذف شد";
    toast.success.mockImplementation(() => {
      render(
        <>
          <BookItem
            author={"author"}
            description={"description"}
            donator={"donator"}
            id={"id"}
            is_donated={false}
            is_received={true}
            is_requested_before={false}
            isbn={"isbn"}
            name={"name"}
            picture={"picture"}
            print_year={1320}
            setBooks={() => {}}
            translator={"translator"}
          />
          <div>{successMessage}</div>
        </>
      );
      expect(screen.getByText(successMessage)).toBeInTheDocument();
    });
    useState.mockImplementationOnce(() => [false, mockedUseState]);

    render(
      <BookItem
        author={"author"}
        description={"description"}
        donator={"test-id"}
        id={"id"}
        is_donated={true}
        is_received={true}
        is_requested_before={true}
        isbn={"isbn"}
        name={"name"}
        picture={"picture"}
        print_year={1320}
        setBooks={() => {}}
        translator={"translator"}
      />
    );

    fireEvent.click(screen.getByText("حذف کتاب"));
  });

  test("handles request deletion by non-donator", async () => {
    const successMessage = "درخواست کتاب با موفقیت حذف شد";
    axiosInstance.post.mockResolvedValueOnce({ status: 200 });
    toast.success.mockImplementation(() => {
      render(
        <>
          <BookItem
            author={"author"}
            description={"description"}
            donator={"donator"}
            id={"id"}
            is_donated={true}
            is_received={true}
            is_requested_before={false}
            isbn={"isbn"}
            name={"name"}
            picture={"picture"}
            print_year={1320}
            setBooks={() => {}}
            translator={"translator"}
          />
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

    render(
      <BookItem
        author={"author"}
        description={"description"}
        donator={"donator"}
        id={"id"}
        is_donated={true}
        is_received={true}
        is_requested_before={true}
        isbn={"isbn"}
        name={"name"}
        picture={"picture"}
        print_year={1320}
        setBooks={() => {}}
        translator={"translator"}
      />
    );

    fireEvent.click(screen.getByText("حذف درخواست"));
  });

  test("handles request registration by non-donator", async () => {
    const successMessage = "درخواست کتاب با موفقیت افزوده شد";
    axiosInstance.post.mockResolvedValueOnce({ status: 200 });
    toast.success.mockImplementation(() => {
      render(
        <>
          <BookItem
            author={"author"}
            description={"description"}
            donator={"donator"}
            id={"id"}
            is_donated={true}
            is_received={true}
            is_requested_before={true}
            isbn={"isbn"}
            name={"name"}
            picture={"picture"}
            print_year={1320}
            setBooks={() => {}}
            translator={"translator"}
          />
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

    render(
      <BookItem
        author={"author"}
        description={"description"}
        donator={"non-donator"}
        id={"id"}
        is_donated={true}
        is_received={true}
        is_requested_before={false}
        isbn={"isbn"}
        name={"name"}
        picture={"picture"}
        print_year={1320}
        setBooks={() => {}}
        translator={"translator"}
      />
    );

    fireEvent.click(screen.getByText("ثبت درخواست"));
  });
});
