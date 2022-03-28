# set base image (host OS)
FROM python:3.9.2

# set the working directory in the container
WORKDIR /server 

# copy the dependencies file to the working directory
COPY pyproject.toml .

# RUN source $HOME/.poetry/env
RUN pip install poetry 

# removing virtualenv config 
RUN poetry config virtualenvs.create false

# install dependencies
RUN poetry install

# copy the content of the local src directory to the working directory
COPY . .

# command to run on container start
EXPOSE 8080
CMD ["uvicorn", "server.main:app", "--host", "0.0.0.0", "--port", "8080"]
