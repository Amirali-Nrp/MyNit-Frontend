import "@testing-library/jest-dom";

import React from "react";
import { render, waitFor, screen, fireEvent } from "@testing-library/react";
import axios from "axios";
import ManageStudents from "@/app/(Tabs)/ManageStudents/page"

jest.mock("axios");

describe("get data from api", () => {
  it("fetches and displays data from api", async () => {
    const mock = jest.spyOn(axios, "get");
    mock.mockResolvedValueOnce({
      data: 5,
    });

    render(<ManageStudents />);

    await waitFor(() => {
      expect(mock).toHaveBeenCalledTimes(1);

      const h1 = screen.getByTestId("h1");

      expect(h1).toHaveTextContent("تعداد افراد : 5")
    });
  });

  it("posts data to api", async () => {
    const mock = jest.spyOn(axios, "post");
    mock.mockResolvedValueOnce({});

    render(<ManageStudents />);

    const input = screen.getByTestId("id-input");
    const submitButton = screen.getByTestId("submit-button");

    fireEvent.change(input, { target: { value: "40030112122" } });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mock).toHaveBeenCalledTimes(1);
      expect(mock).toHaveBeenCalledWith("/api", { stuNum: "40030112122" });
    });
  });

  it("deletes data from api", async () => {
    const mock = jest.spyOn(axios, "delete");
    mock.mockResolvedValueOnce({});

    render(<ManageStudents />);

    const input = screen.getByTestId("id-input");
    const deleteButton = screen.getByTestId("delete-button");
    fireEvent.change(input, { target: { value: "40030112122" } });

    fireEvent.click(deleteButton);

    await waitFor(() => {
      expect(mock).toHaveBeenCalledTimes(1);
      expect(mock).toHaveBeenCalledWith("/api/40030112122");
    });
  });
});
