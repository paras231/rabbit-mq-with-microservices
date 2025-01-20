This repo is designed to work with rabbitmq which is a message brocker
1. it can be utilized to communicate b/w microservices

in this repo we have 2 services one is user-service and one service is payment-service

user-service sends a message to payment service and it passed to queue

This codebase does not use database or API it is just for gaining knowledge about rabbitmq and how it works


Each service is deployed separately through docker compose 
