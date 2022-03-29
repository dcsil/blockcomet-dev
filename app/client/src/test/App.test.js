import React from 'react';
import ReactDOM from 'react-dom';
import App from '../App';
import { render, screen } from "@testing-library/react";

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});

test("logo exists", () => {
  const { getByTestId } = render(
    <App />
  );
  expect(getByTestId("logo")).toBeTruthy();
});

test("search bar exists", () => {
  const { getByTestId } = render(
    <App />
  );
  expect(getByTestId("search-bar")).toBeTruthy();
});

test("validate button exists", () => {
  const { getByTestId } = render(
    <App />
  );
  expect(getByTestId("search-btn")).toBeTruthy();
});

test("admin login button exists", () => {
  const { getByTestId } = render(
    <App />
  );
  const adminLoginButton = screen.getByTestId('admin-login-btn')
  expect(adminLoginButton).toBeTruthy()
});
