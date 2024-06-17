"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../models/database"));
const getshelfdata = async (req, res) => {
    const id = req.params.user_id;
    let issueuser = await database_1.default.getall(`select books_log.reader_id,books_log.book_id,books_log.borrow_date,books_log.status,inventory.prime_book_id from books_log
    join inventory on inventory.book_id=books_log.book_id where reader_id=${id};`);
    let watchlist = await database_1.default.getall(`select watch_lists.reader_id, watch_lists.prime_book_id from watch_lists where watch_lists.reader_id=${id} and isDeleted=0;`);
    res.json({ issueuser: issueuser, watchlist: watchlist });
};
exports.default = { getshelfdata };
//# sourceMappingURL=bookshelf.js.map