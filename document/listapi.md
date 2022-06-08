# Architecting API 
## Authentication
- Login
- Register
- Logout
## Users
---
## Plants
### GET
- Display All Plants
    ```
    GET URL/plants
    ```
- Display Plant Details Based on Name
    ```
    GET URL/plants/:name
    ```
- Display Plant Details by Location
- Display Plants of the day 
  Generate 3 random plants(?)

### POST ()
- Create Plant Name 
- create Plant Name by location

### DELETE
- Delete Plant by Name
- Delete Plant by Location

### PUT
- Update All Plants
- Update Details Plant by Name
---
## Nutritions ()
Relation: M-N (plants)

### GET()
- Display All Plants based on Nutritions

### POST ()
### DELETE ()
### PUT ()
--
## Benefits
### GET()
- Display Benefits Plant by Name

### POST ()
- Display Benefits Plant based on Name
- Display Benefits Plant based on Location

### DELETE ()
- Delete Benefits Plant based on Name
- Delete Benefits Plant based on Location

### PUT ()
- Update 
---
## Location
Relation: 1-N (plants)
For pin/unpin plants
### POST()
- Pin plants location based on user

### DELETE()
- Unpin plants location based on user
---
