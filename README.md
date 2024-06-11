User Apis:





Category Apis:



Question Apis:

i.) create question:
http://localhost:8085/api/v1/question/create-question
payload:
{
    "question":"What is 2+2 ?",
    "options":[
        {
            "option":"2",
            "isCorrect":false
        },
        {
            "option":"3",
            "isCorrect":false
        },
        {
            "option":"4",
            "isCorrect":true
        }
    ],
    "categories":[
      "666800ca867ee717c58045de",
      "666800d11420e88e2eb2a1a7"
    ]
}