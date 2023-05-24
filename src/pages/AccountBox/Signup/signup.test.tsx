import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Signup } from "./index";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { setupServer } from "msw/node";
import { rest } from "msw";

jest.useFakeTimers();

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
  rest.post("/auth/register/", (req, res, ctx) => {
    const { name, email } = req.body;

    if (name === "mahdi" && email === "mahdi@gmail.com") {
      return res(
        ctx.status(200),
        ctx.json({
          name: "mahdi",
          user_id: "1",
          phone_number: "09333333333",
          email: "mahdi@gmail.com",
          rooyesh: "3",
          token: "1000",
        })
      );
    } else {
      return res(ctx.status(400));
    }
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("Signup", () => {
  test("renders the signup form", () => {
    render(
      <MemoryRouter>
        <Signup />
      </MemoryRouter>
    );

    const fullNameInput = screen.getByPlaceholderText("نام و نام‌خانوادگی");
    const emailInput = screen.getByPlaceholderText("ایمیل");
    const phoneNumberInput = screen.getByPlaceholderText("شماره موبایل");
    const passwordInput = screen.getByPlaceholderText("رمز عبور");
    const submitButton = screen.getByRole("button", { name: "ثبت‌نام" });

    expect(fullNameInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(phoneNumberInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });

  test("fills in the form and check the value of inputs", () => {
    render(
      <MemoryRouter>
        <Signup />
      </MemoryRouter>
    );

    const fullNameInput = screen.getByPlaceholderText("نام و نام‌خانوادگی");
    const emailInput = screen.getByPlaceholderText("ایمیل");
    const phoneNumberInput = screen.getByPlaceholderText("شماره موبایل");
    const passwordInput = screen.getByPlaceholderText("رمز عبور");

    const fullName = "mahdi";
    const email = "mahdi@gmail.com";
    const phoneNumber = "09123456789";
    const password = "12345678";

    fireEvent.change(fullNameInput, { target: { value: fullName } });
    fireEvent.change(emailInput, { target: { value: email } });
    fireEvent.change(phoneNumberInput, { target: { value: phoneNumber } });
    fireEvent.change(passwordInput, { target: { value: password } });

    expect(fullNameInput.value).toBe(fullName);
    expect(emailInput.value).toBe(email);
    expect(phoneNumberInput.value).toBe(phoneNumber);
    expect(passwordInput.value).toBe(password);
  });

  test("fills in the form and submits it successfully and display success message", async () => {
    render(
      <MemoryRouter>
        <Signup />
      </MemoryRouter>
    );

    const fullNameInput = screen.getByPlaceholderText("نام و نام‌خانوادگی");
    const emailInput = screen.getByPlaceholderText("ایمیل");
    const phoneNumberInput = screen.getByPlaceholderText("شماره موبایل");
    const passwordInput = screen.getByPlaceholderText("رمز عبور");
    const submitButton = screen.getByRole("button", { name: "ثبت‌نام" });

    const fullName = "mahdi";
    const email = "mahdi@gmail.com";
    const phoneNumber = "09333333333";
    const password = "12345678";

    fireEvent.change(fullNameInput, { target: { value: fullName } });
    fireEvent.change(emailInput, { target: { value: email } });
    fireEvent.change(phoneNumberInput, { target: { value: phoneNumber } });
    fireEvent.change(passwordInput, { target: { value: password } });

    fireEvent.click(submitButton);
    const successToast = await screen.findByText(
      "ثبت‌نام با موفقیت انجام شد. ایمیل خود را تایید کنید و وارد شوید"
    );
    expect(successToast).toBeInTheDocument();
  });

  test("fills in the form and submits it and display error message", async () => {
    render(
      <MemoryRouter>
        <Signup />
      </MemoryRouter>
    );

    const fullNameInput = screen.getByPlaceholderText("نام و نام‌خانوادگی");
    const emailInput = screen.getByPlaceholderText("ایمیل");
    const phoneNumberInput = screen.getByPlaceholderText("شماره موبایل");
    const passwordInput = screen.getByPlaceholderText("رمز عبور");
    const submitButton = screen.getByRole("button", { name: "ثبت‌نام" });

    const fullName = "reza";
    const email = "mahdi@gmail.com";
    const phoneNumber = "09333333333";
    const password = "12345678";

    fireEvent.change(fullNameInput, { target: { value: fullName } });
    fireEvent.change(emailInput, { target: { value: email } });
    fireEvent.change(phoneNumberInput, { target: { value: phoneNumber } });
    fireEvent.change(passwordInput, { target: { value: password } });

    fireEvent.click(submitButton);
    const successToast = await screen.findByText("ایمیل وارد شده تکراری است");
    expect(successToast).toBeInTheDocument();
  });

  test("displays an error message when phone number is invalid", async () => {
    render(
      <MemoryRouter>
        <Signup />
      </MemoryRouter>
    );

    const fullNameInput = screen.getByPlaceholderText("نام و نام‌خانوادگی");
    const emailInput = screen.getByPlaceholderText("ایمیل");
    const phoneNumberInput = screen.getByPlaceholderText("شماره موبایل");
    const passwordInput = screen.getByPlaceholderText("رمز عبور");
    const submitButton = screen.getByRole("button", { name: "ثبت‌نام" });

    const fullName = "mahdi";
    const email = "mahdi@gmail.com";
    const password = "12345678";
    const invalidPhoneNumber = "12345";

    fireEvent.change(fullNameInput, { target: { value: fullName } });
    fireEvent.change(emailInput, { target: { value: email } });
    fireEvent.change(passwordInput, { target: { value: password } });
    fireEvent.change(phoneNumberInput, {
      target: { value: invalidPhoneNumber },
    });
    fireEvent.click(submitButton);

    // const errorMessage = screen.getByText("لطفا شماره تلفن صحیح وارد کنید");
    // expect(errorMessage).toBeInTheDocument();

    const errorMessage = await screen.findByText(
      "لطفا شماره تلفن صحیح وارد کنید"
    );
    expect(errorMessage).toBeInTheDocument();
  });

  test("displays an error message when email is invalid", async () => {
    render(
      <MemoryRouter>
        <Signup />
      </MemoryRouter>
    );

    const fullNameInput = screen.getByPlaceholderText("نام و نام‌خانوادگی");
    const emailInput = screen.getByPlaceholderText("ایمیل");
    const phoneNumberInput = screen.getByPlaceholderText("شماره موبایل");
    const passwordInput = screen.getByPlaceholderText("رمز عبور");
    const submitButton = screen.getByRole("button", { name: "ثبت‌نام" });

    const fullName = "mahdi";
    const phoneNumber = "09333333333";
    const password = "12345678";
    const invalidEmail = "mahdi";

    fireEvent.change(fullNameInput, { target: { value: fullName } });
    fireEvent.change(phoneNumberInput, { target: { value: phoneNumber } });
    fireEvent.change(passwordInput, { target: { value: password } });
    fireEvent.change(emailInput, {
      target: { value: invalidEmail },
    });
    fireEvent.click(submitButton);

    const errorMessage = await screen.findByText(
      "لطفا یک ایمیل صحیح وارد کنید"
    );
    expect(errorMessage).toBeInTheDocument();
  });

  test("displays an error message when password is too short", async () => {
    render(
      <MemoryRouter>
        <Signup />
      </MemoryRouter>
    );

    const fullNameInput = screen.getByPlaceholderText("نام و نام‌خانوادگی");
    const emailInput = screen.getByPlaceholderText("ایمیل");
    const phoneNumberInput = screen.getByPlaceholderText("شماره موبایل");
    const passwordInput = screen.getByPlaceholderText("رمز عبور");
    const submitButton = screen.getByRole("button", { name: "ثبت‌نام" });

    const fullName = "mahdi";
    const email = "mahdi@gmail.com";
    const phoneNumber = "09333333333";
    const invalidPassword = "1234";

    fireEvent.change(fullNameInput, { target: { value: fullName } });
    fireEvent.change(emailInput, { target: { value: email } });
    fireEvent.change(phoneNumberInput, { target: { value: phoneNumber } });
    fireEvent.change(passwordInput, {
      target: { value: invalidPassword },
    });
    fireEvent.click(submitButton);

    const errorMessage = await screen.findByText(
      "لطفا یک پسورد صحیح وارد کنید"
    );
    expect(errorMessage).toBeInTheDocument();
  });

  test("renders signup form with password visibility toggle", () => {
    render(
      <MemoryRouter>
        <Signup />
      </MemoryRouter>
    );
    const passwordInput = screen.getByPlaceholderText("رمز عبور");
    const toggleButton = screen.getByTestId("password-toggle");

    fireEvent.click(toggleButton);

    expect(passwordInput.type).toBe("text");

    fireEvent.click(toggleButton);

    expect(passwordInput.type).toBe("password");
  });

  test("should navigate to the / path on click", async () => {
    render(
      <MemoryRouter>
        <Signup />
      </MemoryRouter>
    );

    const fullNameInput = screen.getByPlaceholderText("نام و نام‌خانوادگی");
    const emailInput = screen.getByPlaceholderText("ایمیل");
    const phoneNumberInput = screen.getByPlaceholderText("شماره موبایل");
    const passwordInput = screen.getByPlaceholderText("رمز عبور");
    const submitButton = screen.getByRole("button", { name: "ثبت‌نام" });

    const fullName = "mahdi";
    const email = "mahdi@gmail.com";
    const phoneNumber = "09333333333";
    const password = "12345678";

    fireEvent.change(fullNameInput, { target: { value: fullName } });
    fireEvent.change(emailInput, { target: { value: email } });
    fireEvent.change(phoneNumberInput, { target: { value: phoneNumber } });
    fireEvent.change(passwordInput, { target: { value: password } });

    fireEvent.click(submitButton);
    const successToast = await screen.findByText(
      "ثبت‌نام با موفقیت انجام شد. ایمیل خود را تایید کنید و وارد شوید"
    );
    expect(successToast).toBeInTheDocument();

    jest.advanceTimersByTime(3000);
    expect(mockedUsedNavigate).toHaveBeenCalledWith("");
  });

  test("submit button is disabled when inputs are empty", () => {
    render(
      <MemoryRouter>
        <Signup />
      </MemoryRouter>
    );

    const submitButton = screen.getByRole("button", { name: "ثبت‌نام" });
    expect(submitButton).toBeDisabled();
  });

  test("submit button is enabled when inputs are filled", () => {
    render(
      <MemoryRouter>
        <Signup />
      </MemoryRouter>
    );
    const fullNameInput = screen.getByPlaceholderText("نام و نام‌خانوادگی");
    const emailInput = screen.getByPlaceholderText("ایمیل");
    const phoneNumberInput = screen.getByPlaceholderText("شماره موبایل");
    const passwordInput = screen.getByPlaceholderText("رمز عبور");

    const fullName = "mahdi";
    const email = "mahdi@gmail.com";
    const phoneNumber = "09123456789";
    const password = "12345678";

    fireEvent.change(fullNameInput, { target: { value: fullName } });
    fireEvent.change(emailInput, { target: { value: email } });
    fireEvent.change(phoneNumberInput, { target: { value: phoneNumber } });
    fireEvent.change(passwordInput, { target: { value: password } });

    const submitButton = screen.getByRole("button", { name: "ثبت‌نام" });
    expect(submitButton).not.toBeDisabled();
  });
});
