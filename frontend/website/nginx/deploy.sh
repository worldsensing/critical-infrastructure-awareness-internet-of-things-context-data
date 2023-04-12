#!/usr/bin/env bash
cd ..

echo "Frontend - deploy.sh - Clean old build"
rm -rf ./build || true
rm -rf ./node_modules || true

echo "Frontend - deploy.sh - Build frontend"
npm install && npm run build

echo "Frontend - deploy.sh - Deploy to nginx"
cd ./nginx || true
rm -rf ./build || true
cp -r ../build .
echo "Frontend - deploy.sh - DONE"
