# Herbapedia - Cloud Computing Documentation
[![Country](https://img.shields.io/badge/country-Indonesia-blue.svg)](#)
[![Version](https://img.shields.io/badge/Herbapedia-Alpha-brightgreen.svg?maxAge=259200)]()

## What is Herbapedia
Herbapedia is an Android-based mobile application that is used as a means of educating the public about Indonesian herbal plants. This project is part of the Bangkit 2022 Capstone Project.

## Getting Started
Here are a few steps to get our system up and running in your local computer :
1. **Prequerities** :
    - NodeJS `18.2.0`
    - NPM `8.9.0`
    - Docker `20.10.16`

2. **Initial Setup** :
    - Pull the project on our [Github Repo](https://github.com/herbapedia/cloud-api/actions)
    - Run the command below inside the repo directory to install all the node modules in `package.json`
        ```bash
        $ npm install
        ```
    - Create `.env` file inside the folder, that contains the key below.
        ```txt
        DATABASE_HOST=
        DATABASE_SCHEMA=
        DATABASE_USER=
        DATABASE_PASSWORD=

        ACCESS_TOKEN_SECRET=
        ```
        The DATABASE_ information will be use to connect to your preffered database. The ACCESS_TOKEN_SECRET will be used to hash and verify JWT token.
    - Run the command below inside the repo directory to start the app
        ```bash
        $ npm run start-dev
        ```
        By default the application will run on port `23450`. To change this, open `src/server.js` on the listen arguments.
    - Go ahead and test the app, open [localhost](https://localhost:23450/plants)
3. **Building Docker Container** :
    - Build the docker image
        ```bash
        $ docker build -t herbapedia/local:latest .
        ```
    - Run the docker image in a container
        ```bash
        $ docker run -p 8080:23450 herbapedia/local:latest
        ```
        You can specify the end point here by mapping the `computer`:`container` port , I used 8080 for conveniences.
    - Go ahead and test the app, open [localhost](https://localhost:8080/plants)


## Docker Environment
![Docker Architechture](./assets/architechture_cicd.png)
For the Docker environment, we setup CI/CD development by using GitHub actions. 

Here are Google Services that we use for CI/CD environment :
1. Container Registry : To create the image on GCP
2. Cloud Run : To run and serve the app on GCP. Endpoint will be provided.

Because the .env is ignored, we need to setup the environment variables manually on the Cloud Run  by using `Secrets and Variables` setting. 

The service is currently up and running on this [endpoints](https://herbapedia-umpbwdfpnq-as.a.run.app). To make a request, you need to logged in, by sending auth bearer token in a form of JWT. 

## API Architechture
![API Architechture](./assets/architechture_api.png)

In the API environemnt, we use express to serve the app. 

We have 3 major routes that can be used, which are :
1. Auth
2. Plants
3. Locations

Each of its function can be found in the image above.

## API Endpoints

<details>
<summary><h3 style='display: inline'>Login<h3></summary>

`REQUEST`

```jsx
POST http://URL/auth/login
Content-Type: application/json

{
    "email":"ivan@gmail.com",
    "password":"pass"
}
```

`RESULT`

Query Error

```json
{
  "error": "Update Token Failed",
  "success": ""
}
```

Wrong Pass/Email 

```json
{
    "error": "Incorrect Email or Password",
  "success": ""
}
```

Update Token Failed 

```json
{
    "error": "No User Token Affected",
  "success": ""
}
```

Success 

```json
{
    "error": "",
  "success": "Login Success",
  "name": "ivan",
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Iml2YW5AZ21haWwuY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjU0NDQyMDM0fQ.kcXSdeQDpjJgz7UqpLKINir8a0K6OFoQl4W6kGDo-P0"
}
```

</details>

---

<details>
<summary><h3 style='display: inline'>Register<h3></summary>

`REQUEST`

```jsx
POST http://URL/auth/register
Content-Type: application/json

{
    "name":"ana",
    "email":"ana@gmail.com",
    "password":"pass"
}
```

`RESULT`

Query Error 

```json
{
  "error": "Query Insert/Select Existing User Failed",
  "success": ""
}
```

Email Exists : 

```json
{
  "error": "Email Already Exists",
  "success": ""
}
```

Insert Account Failed 

```json
{
  "error": "Insert User Failed",
  "success": ""
}
```

Success

```json
{
  "error": "",
  "success": "Registration Success"
}
```

</details>

---

<details>
<summary><h3 style='display: inline'>Plant List and Search<h3></summary>

- Note
    - Link Gambar bentuk **GDRIVE**
    - Data Nutritions and Benefit di sort dari most short.

`REQUEST`

```jsx
// GET http://URL/plants?keyword=Sambiloto
GET http://URL/plants
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Iml2YW5AZ21haWwuY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjU0MjgxMTI2fQ.wJdDWjHUbIkzwVkT44XPVnTOdPlpZmx_8P9fLYyMqD0
```

`RESULT`

Currently

```json
{
  "error": "",
  "success": "Get Plant Success",
  "plants": [
    {
      "id": 1,
      "name": "Sambiloto",
      "latin_name": "Andrographis paniculata",
      "description": "Sambiloto merupakan tumbuhan berkhasiat obat berupa terna tegak yang tingginya bisa mencapai 90 sentimeter. Asalnya diduga dari Asia tropika. Penyebarannya dari India meluas ke selatan sampai di Siam, ke timur sampai semenanjung Malaya, kemudian ditemukan Jawa.",
      "consumption": "- Cuci bersih daun sambiloto dengan air mengalir.",
      "image": "https://storage.googleapis.com/herbapedia-asset/sambiloto.jpg",
      "ref": "https://www.alodokter.com/4-manfaat-daun-sambiloto-untuk-kulit-yang-sayang-dilewatkan",
      "benefits": [        {
          "id": 2,
          "name": "Dikombinasikan dengan kumis kucing untuk penyembuhan kencing manis.",
          "plant_id": 1
        },
        {
          "id": 3,
          "name": "Rebusannya dapat mengatasi demam, gatal kulit, desentri, tifus, kolera, gangguan saluran nafas, bengkak kaki, vitiligo dan wasir.",
          "plant_id": 1
        }
      ],
      "nutritions": [
        {
          "id": 11,
          "name": "Kalsium",
          "plant_id": 1
        },
        {
          "id": 12,
          "name": "Karbohidrat",
          "plant_id": 1
        }
      ]
    },
    {
      "id": 2,
      "name": "Sembung",
      "latin_name": "Blumea balsamifera",
      "description": "Sembung adalah tanaman perdu yang biasa dipakai untuk mengobati penyakit pilek, reumatik, kembung, diare, sakit tulang dsb. Di Filipina juga dipakai sebagai obat peluruh. Kegunaan lainnya adalah untuk mengobati luka yang terinfeksi, infeksi pernafasan, dan sakit perut di Thailand dan Tiongkok sebagai obat rakyat.",
      "consumption": "Untuk meningkatkan empedu, daun sembung bisa diolah dengan cara berikut",
      "image": "https://storage.googleapis.com/herbapedia-asset/sambiloto.jpg",
      "ref": "https://www.kompas.com/sains/read/2021/03/12/170000623/manfaat-daun-sembung-untuk-kesehatan-dan-resep-herbalnya?page=all#:~:text=Dalam%20buku%20berjudul%20Ramuan%20Tradisional,tanin%2C%20damar%2C%20dan%20ksantoksilin",
      "benefits": [
        {
          "id": 5,
          "name": "Mengurangi ataupun mengeluarkan batu ginjal",
          "plant_id": 2
        },
        {
          "id": 6,
          "name": "Meningkatkan empedu",
          "plant_id": 2
        },
        {
          "id": 7,
          "name": "Mengobati diare, magh, beri-beri, demam",
          "plant_id": 2
        },
        {
          "id": 8,
          "name": "Mengatasi haid yang tidak teratur",
          "plant_id": 2
        }
      ],
      "nutritions": [
        {
          "id": 1,
          "name": "Antioksidan",
          "plant_id": 2
        }
      ]
    }
	]
}
```

</details>

---


<details>
<summary><h3 style='display: inline'>Plant Detail<h3></summary>

`REQUEST`

```jsx
GET http://URL/plants/[:id]
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Iml2YW5AZ21haWwuY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjU0MjgxMTI2fQ.wJdDWjHUbIkzwVkT44XPVnTOdPlpZmx_8P9fLYyMqD0
```

`RESULT`

```json
{
  "error": "",
  "success": "Get Plant Success",
  "plants": [
    {
      "id": 1,
      "name": "Sambiloto",
      "latin_name": "Andrographis paniculata",
      "description": "Sambiloto merupakan tumbuhan berkhasiat obat berupa terna tegak yang tingginya bisa mencapai 90 sentimeter. Asalnya diduga dari Asia tropika. Penyebarannya dari India meluas ke selatan sampai di Siam, ke timur sampai semenanjung Malaya, kemudian ditemukan Jawa.",
      "consumption": "- Cuci bersih daun sambiloto dengan air mengalir.",
      "image": "https://storage.googleapis.com/herbapedia-asset/sambiloto.jpg",
      "ref": "https://www.alodokter.com/4-manfaat-daun-sambiloto-untuk-kulit-yang-sayang-dilewatkan",
      "benefits": [
        {
          "id": 1,
          "name": "Digunakan untuk mengurangi rasa sakit akibat gigitan ular dan serangga.",
          "plant_id": 1
        },
        {
          "id": 2,
          "name": "Dikombinasikan dengan kumis kucing untuk penyembuhan kencing manis.",
          "plant_id": 1
        },
        {
          "id": 3,
          "name": "Rebusannya dapat mengatasi demam, gatal kulit, desentri, tifus, kolera, gangguan saluran nafas, bengkak kaki, vitiligo dan wasir.",
          "plant_id": 1
        },
        {
          "id": 4,
          "name": "Imunostimulan, Antipiretik, Antitusif",
          "plant_id": 1
        }
      ],
      "nutritions": [
        {
          "id": 11,
          "name": "Kalsium",
          "plant_id": 1
        },
        {
          "id": 12,
          "name": "Karbohidrat",
          "plant_id": 1
        },
        {
          "id": 14,
          "name": "Magnesium",
          "plant_id": 1
        },
        {
          "id": 16,
          "name": "Natrium",
          "plant_id": 1
        },
        {
          "id": 18,
          "name": "Protein",
          "plant_id": 1
        },
        {
          "id": 27,
          "name": "Vitamin C",
          "plant_id": 1
        }
      ],
      "locations": [
        {
          "id": 1,
          "lat": -7.31913,
          "lon": 112.785,
          "description": "di taman masjid",
          "plant_id": 1
        },
        {
          "id": 2,
          "lat": -7.31108,
          "lon": 112.789,
          "description": "di dekat pujasera",
          "plant_id": 1
        }
      ]
    }
  ]
}
```

</details>

---

<details>
<summary><h3 style='display: inline'>All Plants Locations<h3></summary>

`REQUEST`

```jsx
GET http://URL/locations/plants
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Iml2YW5AZ21haWwuY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjU0MjgxMTI2fQ.wJdDWjHUbIkzwVkT44XPVnTOdPlpZmx_8P9fLYyMqD0
```

`RESULT`

```json
{
  "error": "",
  "success": "Find Plants Locations Success",
  "locations": [
    {
      "id": 1,
      "lat": -7.31913,
      "lon": 112.785,
      "description": "di taman masjid",
      "plant_id": 1,
      "name": "Sambiloto",
      "image": "https://storage.googleapis.com/herbapedia-asset/sambiloto.jpg"
    },
    {
      "id": 2,
      "lat": -7.31108,
      "lon": 112.789,
      "description": "di dekat pujasera",
      "plant_id": 1,
      "name": "Sambiloto",
      "image": "https://storage.googleapis.com/herbapedia-asset/sambiloto.jpg"
    },
    {
      "id": 3,
      "lat": -7.30916,
      "lon": 112.795,
      "description": "di taman depan ruangan dosen",
      "plant_id": 2,
      "name": "Sembung",
      "image": "https://storage.googleapis.com/herbapedia-asset/sambiloto.jpg"
    }
  ]
}
```

</details>

---

<details>
<summary><h3 style='display: inline'>One Plants Locations<h3></summary>

`REQUEST`

```jsx
GET http://URL/locations/plants/[:id]
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Iml2YW5AZ21haWwuY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjU0MjgxMTI2fQ.wJdDWjHUbIkzwVkT44XPVnTOdPlpZmx_8P9fLYyMqD0
```

`RESULT`

```json
{
  "error": "",
  "success": "Find Plant Locations Success",
  "locations": [
    {
      "id": 1,
      "lat": -7.31913,
      "lon": 112.785,
      "description": "di taman masjid",
      "plant_id": 1,
      "name": "Sambiloto",
      "image": "https://storage.googleapis.com/herbapedia-asset/sambiloto.jpg"
    },
    {
      "id": 2,
      "lat": -7.31108,
      "lon": 112.789,
      "description": "di dekat pujasera",
      "plant_id": 1,
      "name": "Sambiloto",
      "image": "https://storage.googleapis.com/herbapedia-asset/sambiloto.jpg"
    }
  ]
}
```

</details>

---

<details>
<summary><h3 style='display: inline'>Image Prediction<h3></summary>

`REQUEST`

```jsx
POST http://URL/plants/predict
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Iml2YW5AZ21haWwuY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjU0MjgxMTI2fQ.wJdDWjHUbIkzwVkT44XPVnTOdPlpZmx_8P9fLYyMqD0
Content-Type: multipart/form-data; boundary=---------------------------9051914041544843365972754266

-----------------------------9051914041544843365972754266
Content-Disposition: form-data; name="image"; filename="plant_dengan_id_1.png"
Content-Type: image/jpeg

< ./plant_dengan_id_1.png
-----------------------------9051914041544843365972754266--
```

`RESULT`

```json
{
  "error": "",
  "success": "Predict Plant Data Success"
  "plant_id": "1"
}
```

</details>

---




