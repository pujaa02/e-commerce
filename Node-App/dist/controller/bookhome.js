"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../models/database"));
const getdata = async (req, res) => {
    const id = req.params.user_id;
    const newarrivalbooks = await database_1.default.getall(`select prime_book_id,book_img,created_at from books_detail 
        where created_at between DATE_SUB(DATE_SUB(NOW(), INTERVAL 3 HOUR), INTERVAL 70 DAY) AND DATE_SUB(NOW(), INTERVAL 3 HOUR);`);
    const findrecentreadingquery = await database_1.default.getall(`SELECT inventory.prime_book_id,inventory.book_id,books_log.borrow_date FROM books_log
        join inventory on books_log.book_id=inventory.book_id
         where borrow_date between DATE_SUB(DATE_SUB(NOW(),INTERVAL 3 HOUR), INTERVAL 70 DAY)  AND DATE_SUB(NOW(), INTERVAL 3 HOUR);`);
    const genre = await database_1.default.getall(`SELECT * FROM genres`);
    const allbook = await database_1.default.getall(`select books_detail.prime_book_id,books_detail.book_title,books_detail.genre_id,authors.author_name,
     genres.genre_name, books_detail.book_publication_year,books_detail.book_img from books_detail
       join genres on genres.genre_id=books_detail.genre_id
      join books_author on books_author.prime_book_id=books_detail.prime_book_id
      join authors on authors.author_id=books_author.author_id;`);
    const rating = await database_1.default.getall(`select inventory.prime_book_id, floor(Avg(rating.rating)) AS rating from rating
      join inventory on inventory.book_id=rating.book_id group by inventory.prime_book_id ;`);
    let issueuser = await database_1.default.getall(`select books_log.reader_id,books_log.book_id,books_log.borrow_date,books_log.return_date,books_log.status,inventory.prime_book_id from books_log
      join inventory on inventory.book_id=books_log.book_id where reader_id=${id};`);
    let watchlist = await database_1.default.getall(`select watch_lists.reader_id, watch_lists.prime_book_id from watch_lists where watch_lists.reader_id=${id} and isDeleted=0;`);
    //recommeddata mapping
    const recommendeddata = rating.map((t1) => ({
        ...t1,
        ...allbook.find((t2) => t2.prime_book_id === t1.prime_book_id),
    }));
    //recentdata mapping
    const filterdataofrecent = findrecentreadingquery.filter((value, index, self) => {
        return (self.findIndex((v) => v.prime_book_id === value.prime_book_id) ===
            index);
    });
    // mapping of two query result
    const maprecentdata = filterdataofrecent.map((t1) => ({
        ...t1,
        ...allbook.find((t2) => t2.prime_book_id === t1.prime_book_id),
    }));
    const recentdata = maprecentdata.map((t1) => ({
        ...t1,
        ...rating.find((t2) => t2.prime_book_id === t1.prime_book_id),
    }));
    //allbook
    let ratingfilter = rating.filter((value, index, self) => {
        return (self.findIndex((v) => v.prime_book_id === value.prime_book_id) === index);
    });
    const finalresultdata = allbook.map((t1) => ({
        ...t1,
        ...ratingfilter.find((t2) => t2.prime_book_id === t1.prime_book_id),
    }));
    const data = watchlist.map((t1) => ({
        ...t1,
        ...allbook.find((t2) => t2.prime_book_id === t1.prime_book_id),
    }));
    const finallist = data.map((t1) => ({
        ...t1,
        ...rating.find((t2) => t2.prime_book_id === t1.prime_book_id),
    }));
    const userissue = issueuser.map((t1) => ({
        ...t1,
        ...ratingfilter.find((t2) => t2.prime_book_id === t1.prime_book_id),
    }));
    const finalissuebook = userissue.map((t1) => ({
        ...t1,
        ...allbook.find((t2) => t2.prime_book_id === t1.prime_book_id),
    }));
    res.json({ newarrivalbooks: newarrivalbooks, recommended: recommendeddata, recent: recentdata, genre: genre, allbook: finalresultdata, rating: rating, issueuser: finalissuebook, watchlist: finallist });
};
exports.default = { getdata };
//# sourceMappingURL=bookhome.js.map