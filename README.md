<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>  
  <a href="https://www.postgresql.org/" trget="blank"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original-wordmark.svg" width="200" alt="PostgreSql Logo"/></a>    
</p>

<h1 align="center"> Challenge NestJS and PostgreSQL </h1>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  
<p>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>

</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description
Challenge of building an API using nestjs [Nest](https://github.com/nestjs/nest) framework TypeScript and [PostgreSql](https://git.postgresql.org/gitweb/?p=postgresql.git;a=summary).

## Clone

```bash
https://github.com/EduDevHe/challenge-nestJs-postgresql.git
```

## Running the app

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```
# API docs
## Get place by id in API

### Url example
```
http://localhost:3000/place/1
```
### Method GET
### Return
``` 
	{
        "id": 1,
        "name": "rio",
        "state": "bahia",
        "city": "barreiras",
        "createdAt": "2024-01-11T00:28:03.143Z",
        "updatedAt": "2024-01-11T00:28:03.143Z"
    }
```


## Get all places in api

### Url example

```
	http://localhost:3000/place/all
```
### Method GET

### Return
```
[
	{
		"id": 1,
		"name": "rio",
		"state": "bahia",
		"city": "barreiras",
		"createdAt": "2024-01-11T00:28:03.143Z",
		"updatedAt": "2024-01-11T00:28:03.143Z"
	},
	{
		"id": 2,
		"name": "cais",
		"state": "bahia",
		"city": "barreiras",
		"createdAt": "2024-01-11T00:28:19.339Z",
		"updatedAt": "2024-01-11T00:28:19.339Z"
	},
	{
		"id": 3,
		"name": "centro",
		"state": "bahia",
		"city": "barreiras",
		"createdAt": "2024-01-11T00:28:10.101Z",
		"updatedAt": "2024-01-11T01:31:58.283Z"
	}
]
```

## Search places in API

### Url example
```
http://localhost:3000/place?name=barreirinhas
http://localhost:3000/place?name=barreirinhas&state=bahia

```
### Method GET

### Return
```
[
	{
		"id": 5,
		"name": "barreirinhas",
		"state": "bahia",
		"city": "barreiras",
		"createdAt": "2024-01-11T00:28:03.143Z",
		"updatedAt": "2024-01-11T00:28:03.143Z"
	}
]
```
# Create a place in the api
### Url example

```
http://localhost:3000/place/create
```
### Method POST
### Body

```
{
"name":"centro",
"city":"barreiras",
"state":"bahia"
}
```

### Return

```
{
	"message": "Place created successfully",
	"place": {
		"id": 8,
		"name": "centro",
		"state": "bahia",
		"city": "barreiras",
		"createdAt": "2024-01-11T03:10:31.861Z",
		"updatedAt": "2024-01-11T03:10:31.861Z"
	}
}
```

## Delete a place by id in the API

>  You need to be authenticated with a valid jwt token

### Url example
```
http://localhost:3000/place/8
```
### Method DELETE

### Header example
```
method: 'DELETE',
headers: {
    'Authorization': `Bearer ${token}`,
  },
```
### Return

```
{
	"message": "Deleted place",
	"place": {
		"id": 8,
		"name": "centro",
		"state": "bahia",
		"city": "barreiras",
		"createdAt": "2024-01-11T03:10:31.861Z",
		"updatedAt": "2024-01-11T03:10:31.861Z"
	}
}
```
## Upadate a place by id in the API

>  You need to be authenticated with a valid jwt token

### Example
```
http://localhost:3000/place/7
```
### Method PATCH

### Header example
```
method: 'PATCH',
headers: {
    'Authorization': `Bearer ${token}`,
  },
```
### Body
```
{
"name":"centro"
}

```

### Return

```
{
	"message": "Updated place",
	"place": {
		"id": 7,
		"name": "centro",
		"state": "bahia",
		"city": "barreiras",
		"createdAt": "2024-01-11T00:28:19.339Z",
		"updatedAt": "2024-01-11T04:18:01.780Z"
	}
}
```
## Create a user in the API

### Url example
```
http://localhost:3000/auth/register
```
### Method POST
### Body
```
{
	"username":"test",
	"email": "testEmail@email.com",
	"password": "12345"
}
```
### Return

```
{
	"message": "User created successfully",
	"username": "test",
	"email": "testEmail@email.com",
	"createdAt": "2024-01-11T03:27:02.702Z"
}
```

# Login 

### Url example
```
http://localhost:3000/auth/login
```
### Method POST
### Body

```
{
	"email": "testEmail@email.com",
	"password": "12345"

}
```
### Return

```
{
	"message": "login successfully",
	"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3QiLCJzdWIiOjUsImlhdCI6MTcwNDk0MzY1MSwiZXhwIjoxNzA0OTQ3MjUxfQ.Wa3lx6HUv6x5h90HBpb1DdF6ivHa8Ohybgr_ycekNHw",
	"login": true
}
```
## License

Nest is [MIT licensed](LICENSE).
