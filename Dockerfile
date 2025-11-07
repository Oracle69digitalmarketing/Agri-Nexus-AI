# Stage 1: Build the React Frontend
FROM node:18-alpine AS build

WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Build the application
RUN npm run build

# Stage 2: Build the Python Backend
FROM python:3.9-slim

WORKDIR /app

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Install dependencies
COPY backend/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the backend application files
COPY ./backend ./backend

# Copy the built frontend from the build stage
COPY --from=build /app/dist ./dist

# Expose the port the app runs on
EXPOSE 8000

# Run the application
CMD ["python", "backend/app.py"]
