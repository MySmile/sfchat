# run - Run local server with --nostatic
run:
	@echo "------------------------------------------"
	@echo "***  run local server with --nostatic  ***"
	@echo "=========================================="
	@python3 manage.py runserver --nostatic --setting=sfchat.settings.local  


# help - Display callable targets.
help:
	@egrep "^# [a-z,\",=,_,-]+ - " Makefile	

# install-local - install locally dependencies --- move this into "one-install-script"
install-local:
	@cd ./config/requirements && sudo pip3 install -r local.txt
	@./bin/install-local.sh

install-prod:
	@cd ./config/requirements && sudo pip3 install -r production.txt
	@./bin/install-production

# test - test project
test:
	@python3 manage.py test --pattern="test_*.py" --settings=sfchat.settings.test


# style - Check PEP8 and others
PEP8IGNORE=E22,E23,E24,E302,E401,E501
style:
	@echo "PyFlakes check:"
	@echo
	-pyflakes .
	@echo
	@echo "PEP8 check:"
	@echo
	-pep8 --ignore=$(PEP8IGNORE) .


# pylint - Run pylint with pylint-django
# pylint:
# 	pylint *.py --load-plugins pylint_django --py3k

# clean - Clean all temporary files
clean:
	find . -name "*.pyc" -print0 | xargs -0 rm -rf
	find . -name "*.*~" -print0 | xargs -0 rm -rf
	find . -name "__pycache__" -print0 | xargs -0 rm -rf
	@echo "Clean was successfully done!"

# syncdb - Run syncdb command
admin:
	python3 manage.py migrate --database='default'
	python3 manage.py createsuperuser  --database='default'

syncdb:
	python3 manage.py syncdb

# build-js - build jscript
build-js:
	cd sfchat/static&&node ./bower_components/rjs/dist/r.js -o ./js/build.js
