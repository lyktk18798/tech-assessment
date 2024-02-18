import React from "react";

import { ShortenUrl } from "../ShortenUrl";
import {render, screen, fireEvent, waitFor} from "@testing-library/react";
import * as requestModule from '../../../apis/request';
// Mock the API function
const shortenURLMock = jest.spyOn(requestModule, 'shortenURL');

test("renders input field and button", () => {
  render(<ShortenUrl />);
  const input = screen.getByTestId('input');
  const button = screen.getByTestId('button');

  expect(input).toBeInTheDocument();
  expect(button).toBeInTheDocument();
});

test("check initial button status", () => {
  render(<ShortenUrl />);
  const button = screen.getByTestId("button");
  expect(button).toBeDisabled();
});

test("check button status when input correct URL format", () => {
  render(<ShortenUrl />);
  const button = screen.getByTestId("button");
  const input = screen.getByTestId("input");
  fireEvent.change(input, { target: { value: "https://example.com" } });
  expect(button).toBeEnabled();
});

test("check button status when input incorrect URL format", () => {
  render(<ShortenUrl />);
  const button = screen.getByTestId("button");
  const input = screen.getByTestId("input");
  fireEvent.change(input, { target: { value: "example com" } });
  expect(button).toBeDisabled();
});

test("handles button click properly", async () => {
  render(<ShortenUrl />);

  const input = screen.getByTestId('input');
  const button = screen.getByTestId('button');

  // Mock API response
  shortenURLMock.mockResolvedValue('c984d0');

  fireEvent.change(input, { target: { value: 'https://example.com' } });
  fireEvent.click(button);

  // Ensure short URL is not visible yet
  expect(screen.queryByText(/http:\/\/localhost:8080\/c984d0/i)).not.toBeInTheDocument();

  // Wait for API call to resolve
  await waitFor(() => {
    expect(shortenURLMock).toHaveBeenCalledWith('https://example.com');
    expect(screen.getByText(/http:\/\/localhost:8080\/c984d0/i)).toBeInTheDocument();
    expect(screen.getByText(/Get Shortened URL Successfully/i)).toBeInTheDocument();
    expect(screen.queryByText(/Get Shortened URL Failed/i)).not.toBeInTheDocument();
  });
});

test("handles button click properly - API Bad Request case", async () => {
  render(<ShortenUrl />);

  const input = screen.getByTestId('input');
  const button = screen.getByTestId('button');

  // Mock API response with 400 Bad Request
  shortenURLMock.mockRejectedValue({ response: { status: 400 } });

  fireEvent.change(input, { target: { value: 'https://example.com' } });
  fireEvent.click(button);

  // Wait for API call to resolve
  await waitFor(() => {
    expect(shortenURLMock).toHaveBeenCalledWith('https://example.com');
    expect(screen.getByTestId('button')).not.toBeDisabled();
    expect(screen.queryByText(/http:\/\/localhost:8080\/c984d0/i)).not.toBeInTheDocument();
    expect(screen.queryAllByText(/Get Shortened URL Failed/i).at(0)).toBeInTheDocument();
    expect(screen.queryByText(/Get Shortened URL Successfully/i)).not.toBeInTheDocument();
  });
});


