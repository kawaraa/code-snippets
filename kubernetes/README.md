# Deploy to Kubernetes

## Build Node.js app Docker image inside Minikube's Docker environment:

```
eval $(minikube docker-env)
docker build -t node-app .
```

## Build MySQL Docker image:

```
docker pull mysql:5.7
docker tag mysql:5.7 your-dockerhub-username/mysql:5.7
```

## Apply the Node.js deployment and service:

```
kubectl apply -f node-app-deployment.yaml
kubectl apply -f node-app-service.yaml
```

```
kubectl apply -f mysql-deployment.yaml
kubectl apply -f mysql-service.yaml
```

## Verify Deployment:

```
kubectl get pods
kubectl get services
```

## Access Your Application:

Use the external IP provided by the node-app service to access your Node.js application.
Your Node.js application should be configured to connect to the MySQL service using the service name mysql and port 3306.
Example Node.js MySQL Connection Configuration. In your Node.js application, configure the MySQL connection:

```
const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'mysql',
  user: 'root',
  password: 'yourpassword',
  database: 'yourdatabase'
});

```
