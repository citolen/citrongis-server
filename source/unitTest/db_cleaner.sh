echo "*******************************************"
echo "             DATABASE CLEANER"
echo "*******************************************"
echo
echo "Clear mongoDB User :"
echo

mongo localhost:27017 --eval "var udb = db.getSiblingDB('eip'); udb.User.remove({})";

echo
echo
