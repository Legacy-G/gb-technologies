curl https://bootstrap.pypa.io/get-pip.py -o get-pip.py
python3.9 get-pip.py
python3.9 -m pip install -r requirements.txt
python3.9 manage.py collectstatic --noinput --clear