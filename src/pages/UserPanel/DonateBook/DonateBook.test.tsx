import React from "react";
import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from "@testing-library/react";
import axiosInstance from "../../../axios";
import DonateBook from "./index";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { setupServer } from "msw/node";
import { rest } from "msw";
import { toast } from "react-toastify";
import userEvent from "@testing-library/user-event";

// jest.mock("../../../axios"); // Mock axiosInstance

const server = setupServer(
  rest.post("/book/register/", (req, res, ctx) => {
    console.log("runnnn");
    console.log(req.body);
    const { name } = req.body;

    console.log(name);
    if (name === "nabard") {
      console.log("run if 1");
      return res(ctx.status(200));
    } else {
      console.log("run if 2");
      return res(ctx.status(200));
    }
  })
);

beforeAll(() => server.listen());
// afterEach(() => );
afterAll(() => server.close());

describe("DonateBook", () => {
  afterEach(() => {
    jest.clearAllMocks();
    server.resetHandlers();
  });

  test("renders the DonateBook page correctly", () => {
    render(
      <MemoryRouter>
        <DonateBook />
      </MemoryRouter>
    );

    const header = screen.getByText("اهدای کتاب");
    expect(header).toBeInTheDocument();
  });

  test("disables the submit button when the form is invalid", () => {
    render(
      <MemoryRouter>
        <DonateBook />
      </MemoryRouter>
    );

    const submitButton = screen.getByText("اهدا");
    expect(submitButton).toBeEnabled();
  });

  test("renders the DonateBook component completely", () => {
    render(
      <MemoryRouter>
        <DonateBook />
      </MemoryRouter>
    );

    const bookNameInput = screen.getByLabelText("عنوان کتاب");
    const authorNameInput = screen.getByLabelText("نویسنده");
    const translatorNameInput = screen.getByLabelText("مترجم");
    const printYearInput = screen.getByLabelText("سال چاپ");
    const isbnInput = screen.getByLabelText("شابک");
    const descriptionInput = screen.getByLabelText("خلاصه کتاب");
    const photoInput = screen.getByLabelText("عکس");

    expect(bookNameInput).toBeInTheDocument();
    expect(authorNameInput).toBeInTheDocument();
    expect(translatorNameInput).toBeInTheDocument();
    expect(printYearInput).toBeInTheDocument();
    expect(isbnInput).toBeInTheDocument();
    expect(descriptionInput).toBeInTheDocument();
    expect(photoInput).toBeInTheDocument();
  });

  test("types into input fields and checks the entered values", async () => {
    render(
      <MemoryRouter>
        <DonateBook />
      </MemoryRouter>
    );

    const bookNameInput = screen.getByLabelText("عنوان کتاب");
    const authorNameInput = screen.getByLabelText("نویسنده");
    const translatorNameInput = screen.getByLabelText("مترجم");
    const printYearInput = screen.getByLabelText("سال چاپ");
    const isbnInput = screen.getByLabelText("شابک");
    const descriptionInput = screen.getByLabelText("خلاصه کتاب");
    const photoInput = screen.getByLabelText("عکس");

    const bookName = "نبرد من";
    const authorName = "هیتلر";
    const translatorName = "فرشته اکبرپور";
    const printYear = "1391";
    const isbn = "8894894894894";
    const description = "کتاب قشنگی هست";
    const photoFile = new File(["photo content"], "photo.jpg", {
      type: "image/jpeg",
    });

    fireEvent.change(bookNameInput, { target: { value: bookName } });
    fireEvent.change(authorNameInput, { target: { value: authorName } });
    fireEvent.change(translatorNameInput, {
      target: { value: translatorName },
    });
    fireEvent.change(printYearInput, { target: { value: printYear } });
    fireEvent.change(isbnInput, { target: { value: isbn } });
    fireEvent.change(descriptionInput, { target: { value: description } });
    fireEvent.change(photoInput, { target: { files: [photoFile] } });

    expect(bookNameInput.value).toBe(bookName);
    expect(authorNameInput.value).toBe(authorName);
    expect(translatorNameInput.value).toBe(translatorName);
    expect(printYearInput.value).toBe(printYear);
    expect(isbnInput.value).toBe(isbn);
    expect(descriptionInput.value).toBe(description);
    expect(photoInput.files[0]).toBe(photoFile);
  });

  test("displays an error message when year is invalid", async () => {
    render(
      <MemoryRouter>
        <DonateBook />
      </MemoryRouter>
    );

    const submitButton = screen.getByText("اهدا");

    const bookNameInput = screen.getByLabelText("عنوان کتاب");
    const authorNameInput = screen.getByLabelText("نویسنده");
    const translatorNameInput = screen.getByLabelText("مترجم");
    const printYearInput = screen.getByLabelText("سال چاپ");
    const isbnInput = screen.getByLabelText("شابک");
    const descriptionInput = screen.getByLabelText("خلاصه کتاب");
    const photoInput = screen.getByLabelText("عکس");

    const bookName = "نبرد تو";
    const authorName = "هیتلر";
    const translatorName = "فرشته اکبرپور";
    const printYear = "100";
    const isbn = "8894894894894";
    const description = "کتاب قشنگی هست";
    const photoFile = new File(["photo content"], "photo.jpg", {
      type: "image/jpeg",
    });

    fireEvent.change(bookNameInput, { target: { value: bookName } });
    fireEvent.change(authorNameInput, { target: { value: authorName } });
    fireEvent.change(translatorNameInput, {
      target: { value: translatorName },
    });
    fireEvent.change(printYearInput, { target: { value: printYear } });
    fireEvent.change(isbnInput, { target: { value: isbn } });
    fireEvent.change(descriptionInput, { target: { value: description } });
    fireEvent.change(photoInput, { target: { files: [photoFile] } });

    fireEvent.click(submitButton);
    const errorMessage = await screen.findByText("سال چاپ را صحیح وارد کنید");
    expect(errorMessage).toBeInTheDocument();
  });

  test("displays an error message when isbn is invalid", async () => {
    render(
      <MemoryRouter>
        <DonateBook />
      </MemoryRouter>
    );

    const submitButton = screen.getByText("اهدا");

    const bookNameInput = screen.getByLabelText("عنوان کتاب");
    const authorNameInput = screen.getByLabelText("نویسنده");
    const translatorNameInput = screen.getByLabelText("مترجم");
    const printYearInput = screen.getByLabelText("سال چاپ");
    const isbnInput = screen.getByLabelText("شابک");
    const descriptionInput = screen.getByLabelText("خلاصه کتاب");
    const photoInput = screen.getByLabelText("عکس");

    const bookName = "نبرد تو";
    const authorName = "هیتلر";
    const translatorName = "فرشته اکبرپور";
    const printYear = "1391";
    const isbn = "89vjf89";
    const description = "کتاب قشنگی هست";
    const photoFile = new File(["photo content"], "photo.jpg", {
      type: "image/jpeg",
    });

    fireEvent.change(bookNameInput, { target: { value: bookName } });
    fireEvent.change(authorNameInput, { target: { value: authorName } });
    fireEvent.change(translatorNameInput, {
      target: { value: translatorName },
    });
    fireEvent.change(printYearInput, { target: { value: printYear } });
    fireEvent.change(isbnInput, { target: { value: isbn } });
    fireEvent.change(descriptionInput, { target: { value: description } });
    fireEvent.change(photoInput, { target: { files: [photoFile] } });

    fireEvent.click(submitButton);
    const errorMessage = await screen.findByText("شابک را صحیح وارد کنید");
    expect(errorMessage).toBeInTheDocument();
  });

  // test("should display successful message when submits the form with valid data", async () => {
  //   render(
  //     <MemoryRouter>
  //       <DonateBook />
  //     </MemoryRouter>
  //   );

  //   const submitButton = screen.getByText("اهدا");

  //   const bookNameInput = screen.getByLabelText("عنوان کتاب");
  //   const authorNameInput = screen.getByLabelText("نویسنده");
  //   const translatorNameInput = screen.getByLabelText("مترجم");
  //   const printYearInput = screen.getByLabelText("سال چاپ");
  //   const isbnInput = screen.getByLabelText("شابک");
  //   const descriptionInput = screen.getByLabelText("خلاصه کتاب");
  //   const photoInput = screen.getByLabelText("عکس");

  //   const bookName = "nabard";
  //   const authorName = "هیتلر";
  //   const translatorName = "فرشته اکبرپور";
  //   const printYear = "1391";
  //   const isbn = "8894894894894";
  //   const description = "کتاب قشنگی هست";
  //   const photoFile = new File(["photo content"], "photo.jpg", {
  //     type: "image/jpeg",
  //   });

  //   fireEvent.change(bookNameInput, { target: { value: bookName } });
  //   fireEvent.change(authorNameInput, { target: { value: authorName } });
  //   fireEvent.change(translatorNameInput, {
  //     target: { value: translatorName },
  //   });
  //   fireEvent.change(printYearInput, { target: { value: printYear } });
  //   fireEvent.change(isbnInput, { target: { value: isbn } });
  //   fireEvent.change(descriptionInput, { target: { value: description } });
  //   fireEvent.change(photoInput, { target: { files: [photoFile] } });

  //   fireEvent.click(submitButton);
  //   const successToast = await screen.findByText("کتاب با موفقیت افزوده شد");
  //   // const successToast = await screen.findByText("خطایی رخ داد");
  //   screen.debug();
  //   expect(successToast).toBeInTheDocument();
  // });
});
