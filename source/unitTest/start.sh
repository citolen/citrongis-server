echo "Start unitTest :"

echo "   - Clear Database ..."
./db_cleaner.sh "localhost:27017" > /dev/null

echo "   - Launch UT_susbcribe.js"
nodejs user_api/UT_subscribe.js

echo "   - Clear Database ..."
./db_cleaner.sh "localhost:27017" > /dev/null

echo "   - Launch UT_login.js"
nodejs user_api/UT_login.js

echo "   - Clear Database ..."
./db_cleaner.sh "localhost:27017" > /dev/null

echo "   - Launch UT_profile.js"
nodejs user_api/UT_profile.js
