# Node SWAPI

This repository contains a simple Node.js web application that utilizes the [Star Wars API (SWAPI)](https://swapi.dev/) to display information about Star Wars films and characters. The application is built with Express for server-side logic, Axios for making API requests, and integrates Bootstrap, Vanilla JavaScript, and Font Awesome for the frontend. Containerized with Docker, it offers easy deployment and scalability, ensuring consistency across different environments.

## Features

- Display a list of Star Wars films and people from the SWAPI.
- Modern, responsive UI built with Bootstrap and Font Awesome.
- Backend API integration using Axios in a Node.js/Express environment.
- Docker containerization for simplified setup and deployment.

## Getting Started

To get a local copy up and running follow these simple steps.

### Prerequisites

- [Docker](https://www.docker.com/products/docker-desktop) (if you want to run the application in a container)
- [Node.js](https://nodejs.org/en/download/) (if you want to run the application without Docker)

### Installation

1. Clone the repository
  ```bach
  git clone https://github.com/ismailza/node-swapi.git
  ```

2. Navigate to the project directory
  ```bash
  cd node-swapi
  ```

3. Build the Docker image
  ```bash
  docker build -t node-swapi .
  ```

4. Run the Docker container
  ```bash
  docker run -p 3000:3000 node-swapi
  ```
  The `-p 3000:3000` flag maps port 3000 on the host to port 3000 on the container.

The application should now be running in the Docker container.

5. Open your browser and navigate to `http://localhost:3000`

### Development Setup (without Docker)

If you prefer to run the application without Docker, follow these steps:

1. Navigate to the project directory
  ```bash
  cd node-swapi
  ```

2. Install dependencies
  ```bash
  npm install
  ```

3. Start the server
  ```bash
  node app/index.js
  ```

The application should now be running at `http://localhost:3000`

## Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are greatly appreciated.

## License
This project is licensed under the [MIT License](LICENCE) - see the LICENSE file for details.
