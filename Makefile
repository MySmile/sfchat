# run - Run local server with --nostatic
run:
	@echo "------------------------------------------"
	@echo "***  run local server with --nostatic  ***"
	@echo "=========================================="
	@python3 manage.py runserver --nostatic --setting=sfchat.settings.local  


# help - Display callable targets.
help:
	@egrep "^# [a-z,\",=,_,-]+ - " Makefile	

# install-local - install locally dependenses --- move this into "one-install-script"
install-local:
	@cd ./config/requirements && sudo pip3 install -r local.txt

test:
	@python3 manage.py test

	
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


