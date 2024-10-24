# Retrospective Devlog - *Ready, aim, shoot!*

<img src="./assets/kagura.png" width="500" >

## A. Motivation

As a developer, building things is fun, and as all devs know, *the more we create, the better we get at it*. With our growth, the ambition and quality of the programs we work on tend to rise as well, and naturally, the complexity of the codebase as well as the ecosystem increases along with them.

Now, when I found myself in this place, I realised I couldn't keep working on projects in this way that (even though good) turn into a never ending endeavour of implementing the newest and best features that pop into my head as I'm working.

Thus, I got into system design. Learning about system architectures, resilience, patterns, components, etc... diving deep, but then I see I've been through most of it in college - thanks to which I always had some methodologies in place already that I didn't realise were cornerstones. But then how do I get better at it? We do, we improve, right? Then how do I gain expertise in seemingly theoretical subject matter without having to implement like 20 more projects? 

That is where **net archer** came up, after the realisation that there isn't really a solid dedicated solution for building and sharing system designs and network architectures.

- For experienced developers, rapidly building systems and sharing it with the team has them often relying on simple flowcharts and diagram creators (*no offense to them - I've used `draw.io` for a plethora of tasks myself*), which do get the job done, but are general purpose flowchart makers. 

- More so, for newer enthusiasts and entrants into the domain, there's no real way to recieve clear and concise feedback when trying to take on more difficult projects. *Also, imagine having to pay for something too heavyweight like Microsoft Visio when all you want to do is learn, experiment and brainstorm on what your next project should be.*

- Thus, not seeing much of a benefit, many new and solo developers completely skip it - the crucial planning part of the project - and end up wasting a lot more time on unexpected requirements, unclear specifications, unstructured codebases, and so on.

## B. Planning & Modelling
The main goal of the project is to build the aforementioned coveted "dedicated solution" and as result, provide a one-stop solution to network architecture needs.

Given this statement, the roadmap is definitely on the ambitious side, and a system such as this would benefit out of the existence of itself.

The base requirements has essential features such as creating nodes, variables, dynamic handles, edge animations and flows, as well as functionalites for sharing, saving and exporting the graph in multiple formats (or as a link).

Here's the ***net archerized*** architecture of *net archer* (will update to a more detailed version as soon as I get time):

<img src="./assets/kagura.png" width = 400>

## C. User Interface and Design

Design inspired by the frutiger aero visual aesthetic.

<img src="https://images4.alphacoders.com/134/thumb-1920-1349546.png" 
style="border-radius:10px; width:500px">

## D. Storing & Processing Graph Data

### Backend
net-archer uses Python's Fast API on the backend, which, well, is pretty fast. 

No, stupid jokes aside, the roadmap ahead requires processing graphs and marking them for the user, and providing AI generated suggestions of the system's performance. This is the primary reason that python was chosen for the backend, due to the well-established AI ecosystem, as well as data manipulation support.

### Database
Since the graph data can have a lot of user defined variables and dynamic fields, the Database is MongoDB, which is non-relational. While this isn't something that cannot be done using relational databases, the nature of the graph is inherently a json object, which requires parsing every time the user performs an operation on it.

More implications/ migration discussions will stay on hold until requirements arise.

## E. What next?

Down the line, the focus will stay on implementing newer, and better nodes based on user feedback, and adding functionalities dedicated to estimate the performance and feasibility of the system.
