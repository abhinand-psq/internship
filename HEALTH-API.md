# 🏥 Health Check API Documentation

## Overview
The Health Check API provides a simple endpoint to verify the application status and database connectivity.

## Available Endpoints

### **GET /health** - Health Check
**Purpose**: Simple health status with database connectivity test

**Response (200 - Healthy)**:
```json
{
  "status": "healthy",
  "message": "API is running and database is connected",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

**Response (503 - Unhealthy)**:
```json
{
  "status": "unhealthy",
  "message": "API is running but database connection failed",
  "error": "Database connection failed",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

## Testing with Postman

### Health Check
- **Method**: GET
- **URL**: `http://localhost:3000/health`
- **Expected**: 200 OK if healthy, 503 if database connection fails

## Testing with cURL

```bash
# Health check
curl -X GET http://localhost:3000/health
```

## Monitoring Integration

### Load Balancer Health Checks
Use `/health` for health checks in load balancer configurations.

### Application Monitoring
Use `/health` for simple monitoring of application and database status.

## Status Codes

| Code | Meaning | Description |
|------|---------|-------------|
| 200  | OK | API is healthy and database is connected |
| 503  | Service Unavailable | API is running but database connection failed |

## Troubleshooting

### Database Connection Issues
If you see "unhealthy" status:
1. Check if PostgreSQL is running
2. Verify database credentials in `.env`
3. Ensure the `usercreation` database exists
4. Check network connectivity

### Application Not Starting
1. Verify all dependencies are installed (`npm install`)
2. Check if port 3000 is available
3. Review error logs for specific issues
