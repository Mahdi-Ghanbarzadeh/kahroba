import React, { useContext, useState } from "react";
import "react-router-dom";
import "@testing-library/jest-dom";
import { act, render, screen, fireEvent } from "@testing-library/react";
import axiosInstance from "../../../axios";
import RequestedBooks from "./index";
import { useParams, useLocation, Link } from "react-router-dom";
import { toast } from "react-toastify";
// import { act } from "react-dom/test-utils";

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

jest.mock("../../../store/UserContext");
const mockedUseState = jest.fn();
const book = [
  {
    book: {
      book_id: 9,
      name: "نبرد جدید",
      description: "نبرد، جنگگگگگگ",
      picture:
        "http://internetengineering.pythonanywhere.com/media/book/2299213907953408_GmzYxCt.jpg",
      translator: "من",
      shabak: "15616541564",
      publish_year: "1385",
      is_donated: true,
      is_received: false,
      author: "من",
      number_of_request: 1,
      keywords: "['نبرد،', 'جنگگگگگگ']",
      donator: 5,
    },
    status: "Approved",
    is_reported: true,
    user: 2,
    phone_number: "09365263215",
  },
  {
    book: {
      book_id: 10,
      name: "نبرد 2",
      description: "نبرد 2 عه دیگ",
      picture:
        "http://internetengineering.pythonanywhere.com/media/book/2299213907953408_fmMz5xA.jpg",
      translator: "من",
      shabak: "541545444154",
      publish_year: "1386",
      is_donated: true,
      is_received: true,
      author: "من",
      number_of_request: 1,
      keywords: "['نبرد', '2', 'عه', 'دیگ']",
      donator: 5,
    },
    status: "Approved",
    is_reported: false,
    user: 2,
    phone_number: "09365263215",
  },
];

describe("DonatedBooks component", () => {
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
  });

  test("renders loading spinner when loading is true", () => {
    render(<RequestedBooks />);
    expect(screen.getByTestId("loader")).toBeInTheDocument();
  });

  test("display error message when request is 400", async () => {
    axiosInstance.get.mockRejectedValue({
      status: 400,
    });
    useState.mockImplementationOnce(() => [false, mockedUseState]);
    render(<RequestedBooks />);
    expect(screen.getByText("کتابی یافت نشد!")).toBeInTheDocument();
  });

  test("renders book information when loading is false", async () => {
    axiosInstance.get.mockResolvedValue({
      status: 200,
      data: {
        book,
      },
    });
    useState.mockImplementationOnce(() => [false, mockedUseState]);
    useState.mockImplementationOnce(() => [book, mockedUseState]);

    render(<RequestedBooks />);
    expect(screen.getByText("نبرد جدید")).toBeInTheDocument();
    expect(screen.getByText("نبرد 2")).toBeInTheDocument();
  });
});
