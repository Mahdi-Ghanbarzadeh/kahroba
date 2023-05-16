import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ForgotPassword from "./index";
import { MemoryRouter, useNavigate } from "react-router-dom";
import "@testing-library/jest-dom";
import { rest } from "msw";
import { setupServer } from "msw/node";

// 1- Mocking the hook using jest.fn
const mockedUsedNavigate = jest.fn();

// 2- Mock the library
jest.mock("react-router-dom", () => ({
  // 3- Import non-mocked library and use other functionalities and hooks
  ...(jest.requireActual("react-router-dom") as any),

  // 4- Mock the required hook
  useNavigate: () => mockedUsedNavigate,
}));

const server = setupServer(
  rest.post("/auth/reset-password/", (req, res, ctx) => {
    return res(ctx.status(200));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("ForgotPassword component", () => {
  test("renders the component", () => {
    render(
      <MemoryRouter>
        <ForgotPassword />
      </MemoryRouter>
    );

    const emailInput = screen.getByPlaceholderText("ایمیل");
    const resetButton = screen.getByText("بازیابی");

    expect(emailInput).toBeInTheDocument();
    expect(resetButton).toBeInTheDocument();
  });

  test("displays success toast notification on successful form submission", async () => {
    render(
      <MemoryRouter>
        <ForgotPassword />
      </MemoryRouter>
    );

    const emailInput = screen.getByPlaceholderText("ایمیل");
    fireEvent.change(emailInput, { target: { value: "test@gmail.com" } });

    const submitButton = screen.getByText("بازیابی");
    fireEvent.click(submitButton);

    const successToast = await screen.findByText(
      "لطفا ایمیل خود را بررسی کنید"
    );

    expect(successToast).toBeInTheDocument();
  });

  test("displays error toast notification on failed form submission", async () => {
    server.use(
      rest.post("/auth/reset-password/", (req, res, ctx) => {
        return res(ctx.status(500));
      })
    );

    render(
      <MemoryRouter>
        <ForgotPassword />
      </MemoryRouter>
    );

    const emailInput = screen.getByPlaceholderText("ایمیل");
    fireEvent.change(emailInput, { target: { value: "test@gmail.com" } });

    const submitButton = screen.getByText("بازیابی");
    fireEvent.click(submitButton);

    // screen.debug();
    const errorToast = await screen.findByText(
      "حساب کاربری با ایمیل وارد شده یافت نشد"
    );

    expect(errorToast).toBeInTheDocument();
  });

  test("should navigate to the /account-box path on click", () => {
    render(
      <MemoryRouter>
        <ForgotPassword />
      </MemoryRouter>
    );

    const spanElement = screen.getByText("ورود | ثبت‌نام");
    fireEvent.click(spanElement);
    expect(mockedUsedNavigate).toHaveBeenCalledWith("/account-box");
  });
});
