# Survey-NPS API
Simple backend app made at Rocket Seat's Next Level Week #04, which purpose is to sendEmail for people who are part of surveys, 
to know their feedback and calculate the NPS(Net Promoter Score)

## Getting started

You can use git clone to copy this repository by typing this command on your console:
`` https://github.com/gustavonikov/moveit.git ``
or you can download the zip file and open it in your IDE.

Then you run ```npm install``` if you have npm installed on your machine or ```yarn add``` if you have yarn,
to install all the dependencies that are necessarily to run the project.

After install the necessarily packages, run the development server, that by default will open on http://localhost:3000,
```bash
npm run dev
# or
yarn dev
```

## Main Tools
<li>Express</li>
<li>TypeScript</li>
<li>Jest</li>
<li>Typeorm</li>
<li>Nodemailer</li>
<li>Sqlite3</li>
<li>Yup</li>

## Features

<li>Automatic Integration Tests</li>
<li>Send email with survey feedback</li>
<li>Calculate nps</li>

## Routes

The base url for us in this app is http://localhost:8080, which 8080 is the PORT.

### Create User -> /users

Method: POST

You have to send to pass:

{
	"name": "Sample 01",
	"email": "sample01@gmail.com"
}

### Create Feedback Survey -> /surveys

Method: POST

You have to send to pass:

{
	"title": "Pesquisa de satisfação",
	"description": "De 0 a 10, quanto você recomendaria a Rocketseat?"
}


### Get created surveys -> /surveys

Method: GET

will return:

[

  {
    "id": "d549807e-0339-448c-a0e4-15363d3d815f",
    "title": "Pesquisa de satisfação",
    "description": "De 0 a 10, quanto você recomendaria a Rocketseat?",
    "created_at": "2021-02-25T20:15:40.000Z"
  },

  {
    "id": "b23f501d-1241-432a-a2d4-48532d3d815f",
    "title": "Pesquisa de satisfação",
    "description": "De 0 a 10, quanto você recomendaria a Rocketseat?",
    "created_at": "2021-02-25T20:15:40.000Z"
  }

]

### Send Email -> /send-mail

Method: POST

You have to send to pass:

{
	"email": "gustavonikov@gmail.com",
	"survey_id": "d549807e-0339-448c-a0e4-15363d3d815f"
}

### Get Answers -> /answers/:value

Method: Get

will return: 

{
  id: "98a82490-7b83-4b28-8e57-dfc9393eeb8c",
  user_id: "9679dac6-592d-4b79-9ee2-ce3ddded4102",
  survey_id: "d549807e-0339-448c-a0e4-15363d3d815f",
  value: 9,
  created_at: "2021-03-01T16:25:31.000Z"
}

### Get Answers -> /nps/:survey_id

Method: Get

will return: 

{
  "detractors": 2,
  "promoters": 1,
  "passive": 0,
  "totalAnswers": 3,
  "nps": -33.33
}
