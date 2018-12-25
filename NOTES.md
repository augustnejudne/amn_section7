#TODOS
##NO-AUTH
###POST TODOS
/todos
test todo 001       BAD           forgot to delete creator under TodosSchema

/todos
test todo 002       GOOD

/todos
test todo 003       GOOD

/todos
test todo 004       GOOD

###GET TODOS
/todos
get test 001        GOOD          got back an array of three todos: test todo (001, 002, 003)

###PATCH TODOS
/todos/5c21b460b7fafc1fd8916c97
update test 001     GOOD          200 OK successfully updated test todo 002

/todos/5c21b554b7fafc1fd8916c98
update test 002     GOOD          200 OK successfully updated test todo 002

###DELETE TODOS
{{url}}/todos/5c21b564b7fafc1fd8916c99

