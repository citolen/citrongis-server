echo "*******************************************"
echo "             DATABASE CLEANER"
echo "*******************************************"
echo
echo "Clear mongoDB User :"
echo

mongo $1 --eval "var udb = db.getSiblingDB('eip'); udb.User.remove({})";
mongo $1 --eval "var udb = db.getSiblingDB('eip'); udb.Extensions.remove({})";


echo
echo
