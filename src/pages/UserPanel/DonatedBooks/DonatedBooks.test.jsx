import React, { useContext, useState } from "react";
import "react-router-dom";
import "@testing-library/jest-dom";
import { act, render, screen, fireEvent } from "@testing-library/react";
import axiosInstance from "../../../axios";
import DonatedBooks from "./index";
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
    book_id: 15,
    name: "نبرد من",
    description: "خوبه",
    picture:
      "http://internetengineering.pythonanywhere.com/media/book/2299213907953408_sLnhDHh.jpg",
    translator: "سیده",
    shabak: "1112236521",
    publish_year: "1390",
    is_donated: false,
    is_received: false,
    author: "هیتلر",
    number_of_request: 0,
    keywords: "['خوبه']",
    donator: 2,
    is_requested_before: false,
  },
  {
    book_id: 14,
    name: "asd",
    description: "ads",
    picture:
      "http://internetengineering.pythonanywhere.com/media/book/bajoni4346_johny_depp_portrait_anime_0fc48dc2-9d7b-45c4-9006-99c6cdd9bce8_fgvwLkE.png",
    translator: "asd",
    shabak: "1",
    publish_year: "1379",
    is_donated: false,
    is_received: false,
    author: "asd",
    number_of_request: 0,
    keywords: "['ads']",
    donator: 3,
    is_requested_before: false,
  },
  {
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
    is_requested_before: true,
  },
  {
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
    is_requested_before: true,
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
    // useParams.mockReturnValue({ id: "1" });
    // useLocation.mockReturnValue({ pathname: "/books/1" });
  });

  test("renders loading spinner when loading is true", () => {
    render(<DonatedBooks />);
    expect(screen.getByTestId("loader")).toBeInTheDocument();
  });

  test("display error message when request is 400", async () => {
    axiosInstance.get.mockRejectedValue({
      status: 400,
    });
    useState.mockImplementationOnce(() => [false, mockedUseState]);
    render(<DonatedBooks />);
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

    render(<DonatedBooks />);

    expect(screen.getByText("نبرد من")).toBeInTheDocument();
  });
});
