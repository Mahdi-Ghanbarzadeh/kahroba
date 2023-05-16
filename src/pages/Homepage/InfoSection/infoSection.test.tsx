import React from "react";
import { render, screen } from "@testing-library/react";
import InfoSection from "./index.js";
import "@testing-library/jest-dom";
// import "@testing-library/jest-dom/extend-expect";

describe("InfoSection component", () => {
  test("renders the correct content", () => {
    render(<InfoSection />);

    const textElement1 = screen.getByText(
      "ما به شما دقیق ترین پیشنهاد را ارائه میدهیم"
    );

    expect(textElement1).toBeInTheDocument();

    const textElement2 = screen.getByText(
      "ما یه شما دقیق ترین پیشنهاد را ارائه میدهیم"
    );
    expect(textElement2).toBeInTheDocument();
    expect(
      screen.getByText("لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم")
    ).toBeInTheDocument();

    const images = screen.getAllByRole("img");
    expect(images).toHaveLength(3);
    expect(images[0]).toHaveAttribute("src", "./images/illustration11.png");
    expect(images[1]).toHaveAttribute("src", "./images/illustration12.png");
    expect(images[2]).toHaveAttribute("src", "./images/illustration9.png");
  });
});
