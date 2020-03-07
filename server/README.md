# Server setup
On a virtual environment install the dependencies listed in `requirements.txt`

```
pip install -r requirements.txt
```

## Running the migrations
In the `server` directory run the following commands:

`$ python manage.py makemigrations`

`$ python manage.py migrate`

# Running the server
`$ python manage.py runserver`

# Creating a super-user
To authenticate to the admin API you need to provide super-user credentials.

`$ python manage.py createsuperuser`

You will be asked to create credentials, these will be used to authenticate
to the API.
