#!/bin/bash

echo "🧪 Testing VSS Authentication Flow"
echo "=================================="
echo

# Test 1: Login with Keith (admin)
echo "Test 1: Login as Keith (admin)"
RESPONSE=$(curl -s -c cookies.txt -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"keith","password":"lithodat2024"}')
echo "Response: $RESPONSE"
echo

# Test 2: Check session
echo "Test 2: Check session"
SESSION=$(curl -s -b cookies.txt http://localhost:3000/api/auth/session)
echo "Session: $SESSION"
echo

# Test 3: Login as regular team member
echo "Test 3: Login as Fabian (team member)"
RESPONSE2=$(curl -s -c cookies2.txt -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"fabian","password":"welcome2024"}')
echo "Response: $RESPONSE2"
echo

# Test 4: Logout
echo "Test 4: Logout"
LOGOUT=$(curl -s -b cookies.txt -X POST http://localhost:3000/api/auth/logout)
echo "Logout: $LOGOUT"
echo

# Test 5: Check session after logout
echo "Test 5: Check session after logout"
SESSION_AFTER=$(curl -s -b cookies.txt http://localhost:3000/api/auth/session)
echo "Session after logout: $SESSION_AFTER"
echo

# Cleanup
rm -f cookies.txt cookies2.txt

echo "=================================="
echo "✅ Authentication tests completed!"
