# Cloud-Native Food Ordering & Delivery System

A microservices-based food ordering and delivery application built with MongoDB, Express.js, React, Node.js, Docker, and Kubernetes.

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Prerequisites](#prerequisites)
3. [Getting Started](#getting-started)
   - [Clone the Repository](#clone-the-repository)
   - [Configuration](#configuration)
4. [Local Development](#local-development)
   - [Build Docker Images](#build-docker-images)
   - [Start Minikube (Optional)](#start-minikube-optional)
5. [Kubernetes Deployment](#kubernetes-deployment)
   - [Deploy to Cluster](#deploy-to-cluster)
   - [Verify Deployment](#verify-deployment)
6. [Usage](#usage)
7. [Cleanup](#cleanup)
8. [Contributing](#contributing)


---

## 1. Project Overview

This project consists of three core microservices:

- **Restaurant Service**: Manages restaurant data and menu items.
- **Order Service**: Handles customer orders and order processing.
- **Delivery Service**: Tracks delivery assignments and statuses.

Each service is a Node.js application that exposes a REST API and persists data in MongoDB. The frontend is built with React and connects to these services.

## 2. Prerequisites

Ensure you have the following installed:

- **Git** (version control)
- **Docker** (to build container images)
- **kubectl** (to interact with Kubernetes clusters)
- **Minikube** or access to a Kubernetes cluster



## 3. Getting Started

### Clone the Repository

```bash
git clone https://github.com/Achintha0626/food-delivery-system.git
cd food-ordering-delivery-system
```

### Configuration

1. Copy the example environment files for each service:

   ```bash
   cp restaurant-service/.env.example restaurant-service/.env
   cp order-service/.env.example order-service/.env
   cp delivery-service/.env.example delivery-service/.env
   cp auth-service/.env.example auth-service/.env
   ```

2. Open each `.env` and set the required variables (e.g., MongoDB URI, service ports).

3. (Optional) Create a `frontend/.env` for the React app if environment variables are used.

## 4. Local Development

### Build Docker Images

If using Minikube, point Docker to Minikube’s daemon:

```bash
eval $(minikube docker-env)
```

Build each service image:

```bash
docker build -t restaurant-service:latest ./restaurant-service
docker build -t auth-service:latest ./auth-service
docker build -t order-service:latest ./order-service
docker build -t delivery-service:latest ./delivery-service
docker build -t frontend:latest ./frontend
```

### Start Minikube (Optional)

```bash
minikube start --driver=docker
```

## 5. Kubernetes Deployment

All Kubernetes manifests are located in the `k8s/` directory.

### Deploy to Cluster

Create a namespace (optional):

```bash
kubectl create namespace foodapp
```

Apply all manifests:

```bash
kubectl apply -f k8s/ -n foodapp
```

### Verify Deployment

Check pods and services:

```bash
kubectl get pods -n foodapp
kubectl get svc -n foodapp
```

View logs for a service:

```bash
kubectl logs deployment/restaurant-service -n foodapp
```

## 6. Usage

1. Determine the frontend service URL:

   ```bash
   minikube service frontend -n foodapp --url
   ```

2. Open the URL in your browser.
3. Place orders and track deliveries through the UI.

## 7. Cleanup

To tear down the deployment:

```bash
kubectl delete -f k8s/ -n foodapp
minikube stop
```

## 8. Contributing

1. Fork the repository.
2. Create a feature branch (`git checkout -b feature/YourFeature`).
3. Commit your changes (`git commit -m 'Add YourFeature'`).
4. Push to the branch (`git push origin feature/YourFeature`).
5. Open a pull request.




