#!/bin/sh

echo "   - Clear Database ..."
./db_cleaner.sh "localhost:27017" > /dev/null

echo "   - Launch user_api/UT_susbcribe.js"
nodejs user_api/UT_subscribe.js

echo "   - Clear Database ..."
./db_cleaner.sh "localhost:27017" > /dev/null

echo "   - Launch user_api/UT_login.js"
nodejs user_api/UT_login.js

echo "   - Clear Database ..."
./db_cleaner.sh "localhost:27017" > /dev/null

echo "   - Launch user_api/UT_profile.js"
nodejs user_api/UT_profile.js

echo "   - Clear Database ..."
./db_cleaner.sh "localhost:27017" > /dev/null
echo "   - Launch user_api/UT_getUser.js"
nodejs user_api/UT_getUser.js