# SmartEnergy AI

## Household Electricity Consumption Prediction System

SmartEnergy AI is a full-stack machine learning application that predicts **household electricity consumption in kilowatt-hours (kWh)** using historical consumption data and relevant time-based and environmental factors.

The system provides users with consumption history, usage trends, and electricity consumption predictions through a web-based dashboard.

## Project Objective

The objective of this project is to develop a **machine learning regression system** capable of predicting future household electricity consumption based on historical data.

The system aims to help users:

* Monitor electricity consumption
* Understand consumption patterns
* Predict future electricity usage
* Identify potentially high-consumption periods

## Machine Learning

**Problem Type:** Supervised Learning — Regression

**Target Variable:** Electricity Consumption (kWh)

### Possible Features

The features used by the final model depend on the selected dataset and may include:

* Date and time
* Previous electricity consumption
* Temperature
* Humidity
* Voltage
* Current
* Day of week
* Weekend/weekday

### Machine Learning Workflow

```text
Dataset
   ↓
Data Preprocessing
   ↓
Exploratory Data Analysis
   ↓
Feature Engineering
   ↓
Train/Test Split
   ↓
Model Training
   ↓
Model Evaluation
   ↓
Model Comparison
   ↓
Best Model Selection
   ↓
Model Integration
```

### Models

Multiple regression algorithms are compared to identify the best-performing model:

* Linear Regression
* Decision Tree Regressor
* Random Forest Regressor
* Gradient Boosting Regressor

### Evaluation Metrics

The models are evaluated using:

* MAE
* MSE
* RMSE
* R² Score

## System Architecture

```text
React Frontend
       ↓
Spring Boot REST API
       ↓
Python ML Service
       ↓
Trained Regression Model
       ↓
Prediction
       ↓
Spring Boot
       ↓
React Dashboard
```

**MySQL** is used for application and prediction-related data.

## Main Features

### Consumption Dashboard

Provides an overview of household electricity consumption and usage trends.

### Consumption History

Allows users to view historical electricity consumption records.

### Consumption Prediction

Accepts the required input features and returns the predicted electricity consumption in kWh.

### Prediction History

Stores and displays previous prediction results.

### Model Information

Provides information about the selected machine learning model and its evaluation performance.

## Technology Stack

| Component        | Technologies                          |
| ---------------- | ------------------------------------- |
| Frontend         | React, Vite, Tailwind CSS             |
| Backend          | Java, Spring Boot                     |
| Machine Learning | Python, Pandas, NumPy, Scikit-learn   |
| ML API           | Flask / FastAPI                       |
| Database         | MySQL                                 |
| Data Analysis    | Jupyter Notebook, Matplotlib, Seaborn |
| Version Control  | Git, GitHub                           |

## Project Structure

```text
SmartEnergy-AI/
│
├── frontend/
├── backend/
├── ml-service/
├── database/
└── README.md
```

## Getting Started

### Prerequisites

* Node.js
* npm
* Java JDK
* Maven
* Python
* MySQL
* Git

### Clone the Repository

```bash
git clone <repository-url>
cd SmartEnergy-AI
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

### Backend

```bash
cd backend
mvn spring-boot:run
```

### ML Service

```bash
cd ml-service
python -m venv venv
```

Activate the virtual environment on Windows:

```powershell
venv\Scripts\activate
```

Install the required dependencies:

```bash
pip install -r requirements.txt
```

Run the ML service:

```bash
python app.py
```

## Project Status

**Status: In Development**

The dataset, final feature set, machine learning model, and application components are being finalized as part of the project development.

## Academic Project

This project is developed as a **Machine Learning Module Group Project** to demonstrate the practical integration of machine learning with a full-stack web application.

The project covers:

* Data preprocessing
* Exploratory data analysis
* Feature engineering
* Regression model development
* Model evaluation
* ML API development
* REST API integration
* Full-stack application development
* Database integration

## License

This project is developed for **academic purposes**.
