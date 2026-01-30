curl https://bootstrap.pypa.io/get-pip.py -o get-pip.py
python3.12 get-pip.py --break-system-packages
python3.12 -m pip install -r requirements.txt --break-system-packages
python3.12 manage.py collectstatic --noinput --clear