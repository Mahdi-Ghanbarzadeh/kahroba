import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { Login } from "./index";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import * as UserContext from "../../../store/UserContext";

jest.useFakeTimers();

const server = setupServer(
  rest.post("/auth/login/", (req, res, ctx) => {
    const { username, password } = req.body;

    if (username === "mahdi@gmail.com" && password === "12345678") {
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

describe("Login Component", () => {
  test("renders Login form correctly", () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );
    const emailInput = screen.getByPlaceholderText("ایمیل");
    const passwordInput = screen.getByPlaceholderText("رمز عبور");
    const submitButton = screen.getByRole("button", { name: "ورود" });

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });

  test("submits the login form with valid credentials and display welcome message", async () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );
    const emailInput = screen.getByPlaceholderText("ایمیل");
    const passwordInput = screen.getByPlaceholderText("رمز عبور");
    const submitButton = screen.getByRole("button", { name: "ورود" });

    fireEvent.change(emailInput, { target: { value: "mahdi@gmail.com" } });
    fireEvent.change(passwordInput, { target: { value: "12345678" } });
    fireEvent.click(submitButton);

    const successToast = await screen.findByText("خوش آمدید");
    expect(successToast).toBeInTheDocument();
  });

  test("submits the login form with invalid credentials and display error", async () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );
    const emailInput = screen.getByPlaceholderText("ایمیل");
    const passwordInput = screen.getByPlaceholderText("رمز عبور");
    const submitButton = screen.getByRole("button", { name: "ورود" });

    fireEvent.change(emailInput, { target: { value: "mahdi@gmail.com" } });
    fireEvent.change(passwordInput, { target: { value: "1234" } });
    fireEvent.click(submitButton);

    const successToast = await screen.findByText(
      "ایمیل یا رمز عبور نامعتبر است"
    );
    expect(successToast).toBeInTheDocument();
  });

  test("renders Login form with password visibility toggle and show password", () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );
    const passwordInput = screen.getByPlaceholderText("رمز عبور");
    const toggleButton = screen.getByTestId("password-toggle");

    fireEvent.click(toggleButton);

    expect(passwordInput.type).toBe("text");

    fireEvent.click(toggleButton);

    expect(passwordInput.type).toBe("password");
  });

  test("disables submit button when form inputs are empty", () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    const submitButton = screen.getByRole("button", { name: "ورود" });
    expect(submitButton.disabled).toBe(true);
  });

  test("enables submit button when form inputs are filled", () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    const emailInput = screen.getByPlaceholderText("ایمیل");
    const passwordInput = screen.getByPlaceholderText("رمز عبور");
    const submitButton = screen.getByRole("button", { name: "ورود" });

    fireEvent.change(emailInput, { target: { value: "mahdi@gmail.com" } });
    fireEvent.change(passwordInput, { target: { value: "12345678" } });

    expect(submitButton.disabled).toBe(false);
  });

  test("submits the login form and performs login actions", async () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );
    const emailInput = screen.getByPlaceholderText("ایمیل");
    const passwordInput = screen.getByPlaceholderText("رمز عبور");
    const submitButton = screen.getByRole("button", { name: "ورود" });

    fireEvent.change(emailInput, { target: { value: "mahdi@gmail.com" } });
    fireEvent.change(passwordInput, { target: { value: "12345678" } });
    fireEvent.click(submitButton);

    const successToast = await screen.findByText("خوش آمدید");
    expect(successToast).toBeInTheDocument();
  });

  test("submit button is disabled when inputs are empty", () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    const submitButton = screen.getByRole("button", { name: "ورود" });
    expect(submitButton).toBeDisabled();
  });

  test("submit button is enabled when inputs are filled", () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    const emailInput = screen.getByPlaceholderText("ایمیل");
    const passwordInput = screen.getByPlaceholderText("رمز عبور");

    fireEvent.change(emailInput, { target: { value: "mahdi@gmail.com" } });
    fireEvent.change(passwordInput, { target: { value: "12345678" } });

    const submitButton = screen.getByRole("button", { name: "ورود" });
    expect(submitButton).not.toBeDisabled();
  });
});
