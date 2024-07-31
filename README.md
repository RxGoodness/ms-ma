# Netware Microservices

## Overview

This project demonstrates a basic microservices-based application with three services: User Service, Auth Service, and Product Service. Each service is built using Express, TypeScript, and MongoDB, following the MVC architecture. RabbitMQ is used for inter-service communication, particularly for token validation in the Auth Service.

## Services

### User Service

- **Endpoint:** `/api/users`
- **Description:** Manages user-related operations.
- **Routes:**
  - `PUT /`: Update a new user name.

### Auth Service

- **Endpoint:** `/api/auth`
- **Description:** Manages authentication and token validation.
- **Routes:**
  - `POST /register`: Register a new user.
  - `POST /login`: Authenticate user and issue a JWT.
- **Inter-Service Communication:** Listens on RabbitMQ for token validation requests. Tokens are validated, and a response is sent back via the `replyTo` queue.

### Product Service

- **Endpoint:** `/api/products`
- **Description:** Manages product-related data.
- **Routes:**
  - `POST /`: Create a new product (requires authentication).
  <!-- - `GET /:id`: Get a product by ID. -->
- **Authentication Middleware:** Uses RabbitMQ to communicate with the Auth Service for token validation.

## Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/your-repo/assessment-microservices.git
   cd assessment-microservices
