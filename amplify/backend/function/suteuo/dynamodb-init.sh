#!/usr/bin/env bash

aws dynamodb \
  --region ap-northeast-1 \
  --endpoint-url http://dynamodb:8000 \
    create-table \
  --table-name suteuomessaging \
  --attribute-definitions \
    AttributeName=PK,AttributeType=S \
    AttributeName=SK,AttributeType=S \
  --key-schema \
    AttributeName=PK,KeyType=HASH AttributeName=SK,KeyType=RANGE \
  --billing-mode PAY_PER_REQUEST

aws dynamodb \
  --region ap-northeast-1 \
  --endpoint-url http://dynamodb:8000 \
    create-table \
  --table-name suteuousers \
  --attribute-definitions \
    AttributeName=PK,AttributeType=S \
    AttributeName=SK,AttributeType=S \
  --key-schema \
    AttributeName=PK,KeyType=HASH AttributeName=SK,KeyType=RANGE \
  --billing-mode PAY_PER_REQUEST

aws dynamodb \
  --region ap-northeast-1 \
  --endpoint-url http://dynamodb:8000 \
    create-table \
  --table-name suteuonotification \
  --attribute-definitions \
    AttributeName=PK,AttributeType=S \
    AttributeName=SK,AttributeType=S \
  --key-schema \
    AttributeName=PK,KeyType=HASH AttributeName=SK,KeyType=RANGE \
  --billing-mode PAY_PER_REQUEST

aws dynamodb \
  --region ap-northeast-1 \
  --endpoint-url http://dynamodb:8000 \
    create-table \
  --table-name suteuorequests \
  --attribute-definitions \
    AttributeName=PK,AttributeType=S \
    AttributeName=SK,AttributeType=S \
  --key-schema \
    AttributeName=PK,KeyType=HASH AttributeName=SK,KeyType=RANGE \
  --billing-mode PAY_PER_REQUEST
