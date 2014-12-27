#!/bin/sh

echo "   - Clear Database ..."
./db_cleaner.sh "localhost:27017" > /dev/null

echo "   - Launch shop_api/UT_testAuth.js"
nodejs shop_api/UT_testAuth.js

echo "   - Clear Database ..."
./db_cleaner.sh "localhost:27017" > /dev/null

echo "   - Launch shop_api/UT_upload.js"
nodejs shop_api/UT_upload.js

echo "   - Clear Database ..."
./db_cleaner.sh "localhost:27017" > /dev/null

echo "   - Launch shop_api/UT_uploadBadFiles.js"
nodejs shop_api/UT_uploadBadFiles.js

echo "   - Clear Database ..."
./db_cleaner.sh "localhost:27017" > /dev/null

echo "   - Launch shop_api/UT_getExt.js"
nodejs shop_api/UT_getExt.js

