const Books = require('../model/books');

const queries = {
    getAllBooks: async () => {
        const books = await Books.findAll()
        return books
    },
    availableBookForBorrowAndBuy: async () => {
        const books = await Books.findAll({ where: { borrowedUserId: 0, soldOutUserId: 0 } })
        return books;
    }
}

const mutation = {
    addBook: async (parent, args, context) => {
        console.log(context)
        if (context.id) {
            const { title, author } = args
            if (context.admin == true) {
                await Books.create({ title, author, soldOutUserId: 0, borrowedUserId: 0 })
                return `${context.name} successful add book`
            }
            return `${context.name} not a admin user`
        }
        else{
            return "you are logout plese login"
        }
    },

    borrowBook: async (parent, args, context) => {
        console.log(context)
        if (context.id) {
            console.log(args)
            const book = await Books.findOne({ where: { id: args.bookId } })
            if (book.soldOutUserId != 0) {
                return `this book is sold out`
            }
            else if (book.borrowedUserId != 0) {
                return `this book is already borrowed`

            }
            await Books.update({ borrowedUserId: context.id }, {
                where: { id: args.bookId }
            })
            return `Successful borrow the book`
        }
        else {
            return "You are logout plese login"
        }
    },

    buyBook: async (parent, args, context) => {
        console.log(context)
        if (context.id) {
            console.log(args)
            const book = await Books.findOne({ where: { id: args.bookId } })
            if (book.soldOutUserId != 0) {
                return `this book is already sold out`
            }
            else if (book.borrowedUserId != 0) {
                return `this book is already borrowed`
            }
            await Books.update({ soldOutUserId: context.id }, {
                where: { id: args.bookId }
            })
            return `Successful buy the book`
        }
        else {
            return "You are logout plese login"
        }
    },

    sendReqtoUser: async (parent, args) => {
        const book = await Books.findOne({ where: { id: args.bookId } })
        if (!book) {
            return "unvadil Book id "
        }
        if (book.borrowedUserId == 0 && book.soldOutUserId == 0) {
            return "no need for request, available for buy and borrow"
        }
        return "your request send to user"
    }
}

module.exports = { mutation, queries }