import React from 'react';
import ReactDOM from 'react-dom';
import App from '../App';
import { render, screen, fireEvent } from "@testing-library/react";

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
});

test("admin login page renders", () => {
    const { getByTestId } = render(
        <App />
    );
    const adminLoginButton = screen.getByTestId('admin-login-btn')
    expect(adminLoginButton).toBeTruthy()
    fireEvent.click(adminLoginButton)
    const adminLoginPage = screen.getByTestId('admin-login-container')
    expect(adminLoginPage).toBeTruthy()

    expect(getByTestId("username-bar")).toBeTruthy();
    expect(getByTestId("password-bar")).toBeTruthy();
    expect(getByTestId("login-btn")).toBeTruthy();
});
