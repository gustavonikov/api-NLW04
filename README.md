# Survey-NPS API
Simple backend app made at Rocket Seat's Next Level Week #04, which purpose is to sendEmail for people who are part of surveys, 
to know their feedback and calculate the NPS(Net Promoter Score)

## Getting started

You can use git clone to copy this repository by typing this command on your console:
`` https://github.com/gustavonikov/api-nlw04.git ``
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
<li>Handlebars</li>
<li>Yup</li>

## Features

<li>Automatic Integration Tests</li>
<li>Send email with survey feedback</li>
<li>Calculates the NPS</li>

## Routes

The base url for us in this app is http://localhost:8080, which 8080 is the PORT.

### Create User -> /users

Method: POST

You have to pass:
```bash
{
	"name": "Sample 01",
	"email": "sample01@gmail.com"
}
```

Types:
<li>name: string</li>
<li>email: string</li>

### Create Feedback Survey -> /surveys

Method: POST

You have to pass:
```bash
{
	"title": "Survey's title",
	"description": "Survey's description"
}
```

Types:
<li>title: string</li>
<li>description: string</li>

### Get created surveys -> /surveys

Method: GET

Will return:
```bash
[
  {
    "id": "an uuid",
    "title": "Surveys's title",
    "description": "Survey's description",
    "created_at": "the date at the moment that was created"
  },
  {
    "id": "and uuid",
    "title": "Surveys's title",
    "description": "Survey's description",
    "created_at": "the date at the moment that was created"
  }
]
```

Types:
<li>id: string</li>
<li>title: string</li>
<li>description: string</li>
<li>created_at: string</li>

### Send Email -> /send-mail

Method: POST

You have to pass:
```bash
{
	"email": "example@sample.com",
	"survey_id": "an uuid"
}
```

Types:
<li>email: string</li>
<li>survey_id: string</li>

### Get Answers -> /answers/:value

Method: Get

Will return: 
```bash
{
  id: "an uuid",
  user_id: "an uuid",
  survey_id: "an uuid",
  value: a number from 0 to 10,
  created_at: "the date at the moment that was created"
}
```

Types:
<li>id: string</li>
<li>user_id: string</li>
<li>survey_id: string</li>
<li>value: number</li>
<li>created_at: string</li>

### Get NPS -> /nps/:survey_id

Method: Get

Will return: 
```bash
{
  "detractors": a number, that corresponds to a grade < 6 and > 0,
  "promoters": a number, that corresponds to a grade > 9 and < 10,
  "passive": a number, that corresponds to a grade > 6 and < 9, wont affect the nps by any means,
  "totalAnswers": a number, that represents the total number of the feedbacks by the users,
  "nps": a number that corresponds to the calculate nps
}
```

Types:
<li>detractors: number</li>
<li>promoters: number</li>
<li>passive: number</li>
<li>totalAnswers: number</li>
<li>nps: number</li>

### Observation file .env

You should create a file named .env, and then create a variable called "URL_MAIL" that will
have the value of 'http://localhost:8080/answers', you can alter the 8080 to your port.
The reason of this is because this route can change depending on your environment, and it is
easier to only change in one place, that's in the .env file.
