// 1. Find all books in a specific genre (e.g., "Fantasy")
db.books.find({ genre: "Fantasy" });

// 2. Find books published after a certain year (e.g., after 2020)
db.books.find({ published_year: { $gt: 2020 } });

// 3. Find books by a specific author (e.g., "Margaret Atwood")
db.books.find({ author: "Margaret Atwood" });

// 4. Update the price of a specific book (e.g., change price of "The Testaments" to 18.50)
db.books.updateOne(
  { title: "The Testaments" },
  { $set: { price: 18.50 } }
);

// 5. Delete a book by its title (e.g., "Journey to Mars")
db.books.deleteOne({ title: "Journey to Mars" });


//Advanced Queries

// 6. Find books that are both in stock and published after 2000
db.books.find({ in_stock: true, published_year: { $gt: 2000 } });

// 7. Use projection to return only the title, author, and price fields
db.books.find(
  {},
  { title: 1, author: 1, price: 1, _id: 0 }
);

// 8. Sort books by price in ascending order
db.books.find().sort({ price: 1 });

// 9. Sort books by price in descending order
db.books.find().sort({ price: -1 });

// 10. Pagination: Get the first 5 books (page 1)
db.books.find().limit(5);

// 11. Pagination: Get the next 5 books (page 2)
db.books.find().skip(5).limit(5);


// --- Task 4: Aggregation Pipeline ---

// 12. Calculate the average price of books by genre
db.books.aggregate([
  { $group: { _id: "$genre", avgPrice: { $avg: "$price" } } }
]);

// 13. Find the author with the most books in the collection
db.books.aggregate([
  { $group: { _id: "$author", count: { $sum: 1 } } },
  { $sort: { count: -1 } },
  { $limit: 1 }
]);

// 14. Group books by publication decade and count them
db.books.aggregate([
  {
    $group: {
      _id: { $floor: { $divide: ["$published_year", 10] } },
      count: { $sum: 1 }
    }
  },
  {
    $project: {
      decade: { $concat: [ { $toString: { $multiply: [ "$_id", 10 ] } }, "s" ] },
      count: 1,
      _id: 0
    }
  }
]);


// --- Task 5: Indexing ---

// 15. Create an index on the title field
db.books.createIndex({ title: 1 });

// 16. Create a compound index on author and published_year
db.books.createIndex({ author: 1, published_year: 1 });

// 17. Use explain() to show performance improvement with indexes (example for title search)
db.books.find({ title: "The Testaments" }).explain("executionStats");