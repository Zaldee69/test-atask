# GitHub User Search App

A simple web application built with React for searching GitHub users based on their usernames

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
  - [Components](#components)
  - [Functions](#functions)

## Introduction

This web application allows users to search for GitHub users by entering their usernames. It provides a clean and straightforward user interface, fetching user data from the GitHub API and displaying the results in a collapsible format.

## Features

- User-friendly interface.
- Real-time search as you type.
- Displays up to 5 search results.
- Collapsible user cards for detailed information.
- Loading spinner during API requests.
- Error message for unfound users.

## Installation

To run this application locally, follow these steps:

1. Clone this repository to your local machine:

   ```bash
   git clone https://github.com/Zaldee69/test-atask.git
   ```

2. Navigate to the project directory:

   ```bash
   cd your-repo
   ```

3. Install the required dependencies:

   ```bash
   yarn install
   ```

## Usage

1. Start the development server:

   ```bash
   yarn start
   ```

2. Open your web browser and visit `http://localhost:3000` to access the application.

3. Enter a GitHub username in the input field and click the "Search" button.

4. The application will fetch and display the user's information in collapsible cards.

### Components

#### `Collapsible` Component
- **Description**: This component serves as a container for rendering multiple `CollapsibleContent` components.
- **Props**:
  - `data` (`IUsers[]`): An array of GitHub user data.
  - `wasFetchedIndex` (`Number[]`): An array to track which users' repositories have been fetched.

#### `Spinner` Icons (`./public/icons/Spinner`)

- **Description**: The `Spinner` component is used to display a loading spinner during API requests.

#### `CollapsibleContent` Component
- **Description**: This component represents an individual user entry. It displays the user's name and repositories when expanded.
- **Props**:
  - `toggle` (`(idx: number) => void`): A function to toggle the collapse state.
  - `activeCollapse` (`number | null`): The index of the currently active (expanded) user entry.
  - `id` (`number`): The unique identifier for the user entry.
  - `name` (`string`): The GitHub username.
  - `wasFetchedIndex` (`Number[]`): An array to track which users' repositories have been fetched.

### Functions

#### `handleSearchUsers(e: React.FormEvent<HTMLFormElement>)`

- **Parameters**:
  - `e` (React.FormEvent<HTMLFormElement>): The form event triggered when the user submits the search form.

- **Description**: This function is responsible for handling the user search. It performs the following steps:
  1. Prevents the default form submission behavior.
  2. Clears the `wasFetchedIndex` array.
  3. Retrieves the username entered by the user.
  4. Checks if the entered username is the same as the previous one to prevent redundant searches.
  5. Sets the `isLoading` state to `true`.
  6. Makes an API request to GitHub's user search endpoint with the entered username.
  7. Updates the `users` state with the search results.
  8. Updates the `searchedUsername` variable.
  9. Sets `isLoading` back to `false`.
 
#### `fetchRepos`

- **Description**: This function is responsible for fetching user repositories from the GitHub API. It only fetches repositories if the user entry is expanded and if the repositories haven't been fetched before.
