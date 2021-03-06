import Mock from "mockjs"
import { createBook } from "./data";

const mockData = Mock.mock({
    'bookList|10': [
        createBook
    ]
})

export default [
    {
        url: RegExp('/api/book/search.*'),
        type: 'get',
        isReg: true,
        response: () => {
            return {
                code: 0,
                data: mockData
            }
        }
    },
]
