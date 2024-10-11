# net archer 🎯

Design inspired by the frutiger aero visual aesthetic.

<img src="https://images4.alphacoders.com/134/thumb-1920-1349546.png" 
style="border-radius:10px; width:500px">

## Introduction

<img src="./assets/kagura.png" width = "150px"> * *logo* *

Net archer is the one-stop solution to all your network architecture needs. It is designed to help engineers rapidly design, prototype and share interactive(and appealing) network architecture, with ease.

Places to check out: 
- **The live demo at [this link]().** * *// will be updated soon* *

- **A lengthy [retrospective devlog](https://github.com/PrateekTh/net-archer/blob/main/README_long.md).**

### Tech Stack

#### Languages

- JavaScript
- Python
- HTML & CSS

### Frameworks & Libraries

The front end is powered by -
- `React`: Prominent front-end JS framework/library.
- `Reactflow`: Amazing react library for node based workflows.
- `Zustand`: 🐻 Bear necessities for state management in React.
- `Jest`: Testing for React

The backend runs on - 
- `FastAPI`: Modern high-performance web framework for building APIs with Python.
- `Uvicorn`: ASGI web server implementation for Python.
- `Pymongo`: Python distribution containing tools for working with MongoDB.

The database for graphs is a `MongoDB` cluster.


## Setup
In order to run project in a dev environment, follow the following steps:
- Clone this repository
- Navigate to the directory with using Command Prompt or a code editor of your choice.
- Add your MongoDB cluster link as `mongo_client`, in `/backend/vars/var.py` file (create the directory).
    - Visit [MongoDB Cloud](https://www.mongodb.com/products/platform/cloud) to create a profile in case there isn't one.
- Run the desired scripts from the `frontend` and `backend` folders respectively, after installing the dependencies.

#### Frontend
- Navigate to `./frontend`
- Run `npm install` to fetch the dependencies.
    - In case you do not have Node Package Manager installed, download it from [this link](https://nodejs.org/en/download/prebuilt-installer).
- **Run `npm start` to start the local frontend development server.**

#### Backend
- Navigate to `./backend`
- Create a virtual environment [`python3 -m venv env`], and activate it [`env\Scripts\activate`].
- Run `pip install -r requirements.txt` to install the dependencies into the virtual environment
- **Run ` python -m uvicorn main:app --reload` to run the local development server.**

Naturally, both the frontend and backend must be running (in separate terminals) simultaneously, after which all of the app's functionality can be accessed from the frontend. The frontend by itself can provide all export and graphing functionality except the parts involving the database/graph processing.

## Tutorial & Overview

Net Archer follows a simple drag and drop approach to create node based systems, which eventually contain a diverse amount of individual features and (intended) purposes. 

#### Nodes

#### Edges

#### Toolbar

#### Functions

## Examples

There are several example graphs set-up for exploration:
- Editor preview
- Net Archer Example
- YouTube Example