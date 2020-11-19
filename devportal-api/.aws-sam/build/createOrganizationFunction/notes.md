`brew install postgresql`
`brew services start postgresql`

if you get:
```
➜  zenpayroll git:(development) ✗ psql
psql: error: could not connect to server: could not connect to server: No such file or directory
	Is the server running locally and accepting
	connections on Unix domain socket "/tmp/.s.PGSQL.5432"?
```

you may need to:
`brew postgresql-upgrade-database`

if you get:
```
➜  zenpayroll git:(development) ✗ psql
psql: error: could not connect to server: FATAL:  database "casey.rollins" does not exist
```

run `createdb`

Add `postgres` role
```
➜  zenpayroll git:(development) ✗ psql
psql (13.0)
Type "help" for help.

casey.rollins=# \du
                                     List of roles
   Role name   |                         Attributes                         | Member of
---------------+------------------------------------------------------------+-----------
 casey.rollins | Superuser, Create role, Create DB, Replication, Bypass RLS | {}

casey.rollins=#

open pgadmin and create devportal_development database
