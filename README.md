User Apis:
i.) http://localhost:8085/api/v1/user/sign-up--> POST
ii.)http://localhost:8085/api/v1/user/log-in--> POST
iii.) http://localhost:8085/api/v1/user/view-user-profile-->get
iv.)http://localhost:8085/api/v1/user/edit-user-->POST


Category Apis:
i.)http://localhost:8085/api/v1/category/create-category-->POST
ii.)http://localhost:8085/api/v1/category/category-listing-->GET


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

ii.) http://localhost:8085/api/v1/question/get-question-by-catId/6667fc44271de6005a3fb5c0-->GET
iii.) http://localhost:8085/api/v1/question/add_question_in_bulk-->POST


Question ans:
i.)http://localhost:8085/api/v1/answer-question/submit-answer-against-question-->POST
ii.)http://localhost:8085/api/v1/answer-question/search-question-by-answer?answer=120-->GET