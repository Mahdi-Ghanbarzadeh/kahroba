import React, { useContext, useState } from "react";
import "react-router-dom";
import "@testing-library/jest-dom";
import { act, render, screen, fireEvent } from "@testing-library/react";
import axiosInstance from "../../../axios";
import DonatedBook from "./index";
import DonatedBooks from "../index";
import { useParams, useLocation, Link } from "react-router-dom";
import { toast } from "react-toastify";

jest.mock("react", () => ({
  ...jest.requireActual("react"),
  useContext: jest.fn(),
  useState: jest.fn(),
}));

jest.mock("react-toastify", () => ({
  ToastContainer: jest.fn(),
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

jest.mock("../../axios", () => ({
  get: jest.fn(),
  post: jest.fn(),
}));

jest.mock("../../../../store/UserContext");
const mockedUseState = jest.fn();

const book = {
  book_id: 15,
  name: "نبرد من",
  description: "خوبه",
  picture:
    "http://internetengineering.pythonanywhere.com/media/book/2299213907953408_sLnhDHh.jpg",
  translator: "سیده",
  shabak: "1112236521",
  print_year: "1390",
  is_donated: false,
  is_received: false,
  author: "هیتلر",
  number_of_request: 0,
  keywords: "['خوبه']",
  donator: 2,
  is_requested_before: false,
};

describe("DonatedBook component", () => {
  const mockSetBooks = jest.fn();

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
        },
      })
    );
    useState.mockImplementation((init) => [init, mockedUseState]);
    // useParams.mockReturnValue({ id: "1" });
    // useLocation.mockReturnValue({ pathname: "/books/1" });
  });

  test("renders book details when component displayed", () => {
    render(
      <DonatedBook
        id={book.book_id}
        book_name={book.name}
        book_url={book.picture}
        author_name={book.author}
        translator_name={book.translator}
        print_year={book.print_year}
        isbn={book.shabak}
        is_donated={book.is_donated}
        is_received={book.is_received}
        number_of_request={book.number_of_request}
        setBooks={mockSetBooks}
      />
    );

    expect(screen.getByText(book.name)).toBeInTheDocument();
    expect(screen.getByText(book.author)).toBeInTheDocument();
    expect(screen.getByText(book.translator)).toBeInTheDocument();
  });

  test("handles donate button click and see ", async () => {
    render(
      <DonatedBook
        id={book.book_id}
        book_name={book.name}
        book_url={book.picture}
        author_name={book.author}
        translator_name={book.translator}
        print_year={book.print_year}
        isbn={book.shabak}
        is_donated={book.is_donated}
        is_received={book.is_received}
        number_of_request={book.number_of_request}
        setBooks={mockSetBooks}
      />
    );

    fireEvent.click(screen.getByText("اهدا"));

    axiosInstance.post.mockResolvedValue({
      status: 200,
    });
  });
});
